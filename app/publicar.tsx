import { getCategorias } from '@/services/categoriaService';
import { createPublicacion } from '@/services/publicacionService';
import embeddedCss from '@/styles/PaginaPrincipal';
import PublicarCss from '@/styles/Publicar';
import { storage } from '@/utils/storage';
import { router } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Navbar from './navbar';

function escapeHtml(str: string) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

function buildHtml(categoryOptionsHtml: string) {
	const todayISO = new Date().toISOString().split('T')[0];
	return `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Crear Publicación</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
	<style>
		body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
		${embeddedCss}
		${PublicarCss}
	</style>
</head>
<body>
	<div class="min-h-screen relative" style="background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 50%, #fff7ed 100%);">
		<div class="floating-element top-10 left-10 text-6xl" style="animation-delay: 0s;">🥕</div>
		<div class="floating-element top-20 right-20 text-4xl" style="animation-delay: 1s;">🍞</div>
		<div class="floating-element bottom-20 left-20 text-5xl" style="animation-delay: 2s;">🍅</div>
		<div class="floating-element bottom-32 right-16 text-3xl" style="animation-delay: 1.5s;">🥬</div>
		<div class="floating-element top-1/2 left-16 text-4xl" style="animation-delay: 3s;">🍎</div>
		<div class="floating-element top-1/3 right-32 text-3xl" style="animation-delay: 2.5s;">🥐</div>

		<main class="pt-24 pb-12 px-4 relative z-10">
			<div class="max-w-6xl mx-auto">
				<div class="text-center mb-12 animate-slide-up">
					<h1 class="text-4xl md:text-5xl font-bold mb-4"><span class="text-primary-600">📝 Crear Nueva Publicación</span></h1>
					<p class="text-xl text-gray-600 max-w-2xl mx-auto">Comparte alimentos disponibles para donación o venta y ayuda a reducir el desperdicio alimentario</p>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div class="lg:col-span-2">
						<div class="form-container p-8 animate-slide-up" style="animation-delay: 0.2s">
							<form id="pubForm" class="space-y-6">
								<div>
									<h3 class="text-lg font-semibold text-gray-800 mb-4">🎯 Tipo de Publicación</h3>
									<div id="typeSelector" class="type-selector">
										<button type="button" class="type-option donation" data-type="donation">
											<div class="text-4xl mb-3">🤝</div>
											<h4 class="text-lg font-bold text-gray-800 mb-2">Donación</h4>
											<p class="text-sm text-gray-600">Comparte alimentos de forma gratuita</p>
										</button>
										<button type="button" class="type-option sale" data-type="sale">
											<div class="text-4xl mb-3">💰</div>
											<h4 class="text-lg font-bold text-gray-800 mb-2">Venta</h4>
											<p class="text-sm text-gray-600">Vende productos próximos a vencer</p>
										</button>
									</div>
								</div>

								<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label class="block text-sm font-semibold text-gray-700 mb-2">🏷️ Título *</label>
										<input id="title" type="text" class="input-field" placeholder="Ej: Excedente de verduras frescas" required />
									</div>
									<div>
										<label class="block text-sm font-semibold text-gray-700 mb-2">🍽️ Categoría *</label>
										<select id="category" class="select-field" required>
											<option value="">Selecciona una categoría</option>
											${categoryOptionsHtml}
										</select>
									</div>
								</div>

								<div>
									<label class="block text-sm font-semibold text-gray-700 mb-2">📝 Descripción Detallada *</label>
									<textarea id="description" class="textarea-field" placeholder="Describe los alimentos, cantidad, estado, condiciones especiales, etc." required></textarea>
									<p class="text-xs text-gray-500 mt-1">Mínimo 20 caracteres</p>
								</div>

								<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label class="block text-sm font-semibold text-gray-700 mb-2">📍 Ubicación (Ciudad) *</label>
										<input id="location" type="text" class="input-field" placeholder="Madrid, Barcelona, Valencia..." required />
									</div>
									<div>
										<label class="block text-sm font-semibold text-gray-700 mb-2">📞 Información de Contacto *</label>
										<input id="contact" type="text" class="input-field" placeholder="Teléfono, email o dirección" required />
									</div>
								</div>

								<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label class="block text-sm font-semibold text-gray-700 mb-2">⚖️ Cantidad Aproximada</label>
										<input id="quantity" type="text" class="input-field" placeholder="Ej: 5 kg, 20 unidades, 3 cajas..." />
									</div>
									<div id="expirationWrap">
										<label class="block text-sm font-semibold text-gray-700 mb-2">📅 Fecha de Vencimiento</label>
										<input id="expiration" type="date" class="input-field" min="${todayISO}" />
									</div>
									<div id="priceWrap" class="md:col-span-2">
										<label class="block text-sm font-semibold text-gray-700 mb-2">💶 Precio</label>
										<input id="price" type="number" step="0.01" min="0" inputmode="decimal" class="input-field" placeholder="Ej: 5.00, 2.50" />
									</div>
								</div>

								<div class="flex flex-col sm:flex-row gap-4 pt-6">
									<button type="submit" class="btn-primary flex-1">🚀 Publicar Ahora</button>
									<button type="button" id="cancelBtn" class="btn-cancel flex-1">✖️ Cancelar</button>
								</div>
							</form>
						</div>
					</div>

					<div class="lg:col-span-1">
						<div class="sticky top-24">
							<div class="form-container form-vista-previa p-6 animate-slide-up" style="animation-delay: 0.4s">
								<h3 class="text-lg font-semibold text-gray-800 mb-4">👁️ Vista Previa</h3>
								<div id="previewCard" class="preview-card"></div>
							</div>
							<div class="form-container p-6 mt-6 animate-slide-up" style="animation-delay: 0.6s">
								<h3 class="text-lg font-semibold text-gray-800 mb-4">💡 Consejos para una buena publicación</h3>
								<ul class="space-y-3 text-sm text-gray-600">
									<li class="flex items-start gap-2"><span class="text-primary-500">✅</span><span>Usa un título claro y descriptivo</span></li>
									<li class="flex items-start gap-2"><span class="text-primary-500">✅</span><span>Incluye fotos de buena calidad</span></li>
									<li class="flex items-start gap-2"><span class="text-primary-500">✅</span><span>Especifica cantidad y estado</span></li>
									<li class="flex items-start gap-2"><span class="text-primary-500">✅</span><span>Proporciona contacto claro</span></li>
									<li class="flex items-start gap-2"><span class="text-primary-500">✅</span><span>Indica fechas de vencimiento</span></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>

	<!-- Simple modal popup for messages -->
	<div id="popupOverlay" class="fixed inset-0 z-50 hidden bg-black/40 flex items-center justify-center p-4">
		<div class="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
			<div class="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
				<span class="text-2xl">ℹ️</span>
				<h4 class="text-lg font-semibold text-gray-800">Aviso</h4>
			</div>
			<div class="px-6 py-5">
				<p id="popupMessage" class="text-gray-700 leading-relaxed">Mensaje</p>
			</div>
			<div class="px-6 py-4 bg-gray-50 flex justify-end gap-3">
				<button id="popupOk" class="btn-primary px-4 py-2">Entendido</button>
			</div>
		</div>
	</div>

	<script>
		var postType = '';
		var lastSalePrice = '';
		var popup = {
			el: null,
			msgEl: null,
			okBtn: null,
			focusTarget: null,
			open: function(message, opts){
				try{
					this.el = this.el || document.getElementById('popupOverlay');
					this.msgEl = this.msgEl || document.getElementById('popupMessage');
					this.okBtn = this.okBtn || document.getElementById('popupOk');
					if(this.msgEl) this.msgEl.textContent = String(message || '');
					this.focusTarget = opts && opts.focus ? opts.focus : null;
					if(this.el) this.el.classList.remove('hidden');
				}catch(e){}
			},
			close: function(){
				try{
					(this.el || document.getElementById('popupOverlay')).classList.add('hidden');
					if (this.focusTarget) {
						var el = (typeof this.focusTarget === 'string') ? document.querySelector(this.focusTarget) : this.focusTarget;
						if (el && typeof el.focus === 'function') el.focus();
					}
				}catch(e){}
			}
		};

		function normalize(s){
			// Reemplazar diacríticos de forma compatible con más motores JS
			return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
		}

		function updateTypeUI(){
			var donationBtn = document.querySelector('[data-type="donation"]');
			var saleBtn = document.querySelector('[data-type="sale"]');
			donationBtn.classList.toggle('selected', postType==='donation');
			donationBtn.classList.add('donation');
			saleBtn.classList.toggle('selected', postType==='sale');
			saleBtn.classList.add('sale');
			// Gestionar el campo precio según tipo
			var priceEl = document.getElementById('price');
			if (priceEl) {
				if (postType === 'donation') {
					// guardar último precio de venta si estaba habilitado
					if (!priceEl.disabled && priceEl.value && priceEl.value !== '0' && priceEl.value !== '0.0' && priceEl.value !== '0.00') {
						lastSalePrice = priceEl.value;
					}
					priceEl.value = '0.00';
					priceEl.disabled = true;
					priceEl.setAttribute('aria-disabled', 'true');
					priceEl.placeholder = 'No aplica en donación';
					priceEl.classList.add('opacity-60', 'cursor-not-allowed');
				} else {
					priceEl.disabled = false;
					priceEl.removeAttribute('aria-disabled');
					priceEl.placeholder = 'Ej: 5.00, 2.50';
					priceEl.classList.remove('opacity-60', 'cursor-not-allowed');
					if (priceEl.value === '0' || priceEl.value === '0.0' || priceEl.value === '0.00') {
						priceEl.value = lastSalePrice || '';
					}
				}
			}
			// La fecha de vencimiento ahora siempre está visible y el precio también; sólo validamos precio si es venta
			renderPreview();
		}

		function categoryEmoji(categoryName){
			var n = normalize(categoryName);
			if(n.includes('fruta') || n.includes('verdura')) return '🥕';
			if(n.includes('pan')) return '🍞';
			if(n.includes('lact') || n.includes('leche') || n.includes('queso') ) return '🥛';
			if(n.includes('carne') || n.includes('pesc')) return '🥩';
			if(n.includes('preparad') || n.includes('cocin')) return '🍽️';
			if(n.includes('conserv') || n.includes('enlat')) return '🥫';
			if(n.includes('bebid') || n.includes('jug' ) ) return '🥤';
			if(n.includes('otro')) return '📦';
			return '🍽️';
		}

		function renderPreview(){
			var isDonation = postType==='donation';
			var title = (document.getElementById('title')||{}).value || '';
			var categoryEl = document.getElementById('category');
			var category = '';
			if (categoryEl && categoryEl.options && categoryEl.selectedIndex >= 0) {
				category = categoryEl.options[categoryEl.selectedIndex].textContent || '';
			}
			var description = (document.getElementById('description')||{}).value || '';
			var location = (document.getElementById('location')||{}).value || '';
			var contact = (document.getElementById('contact')||{}).value || '';
			var quantity = (document.getElementById('quantity')||{}).value || '';
			var expiration = (document.getElementById('expiration')||{}).value || '';
			var priceInputVal = (document.getElementById('price')||{}).value || '';
			var priceNum = null; // número para vista previa
			if (priceInputVal) {
				var cleanedPrev = String(priceInputVal).replace(/[^0-9,.-]/g,'').replace(',','.');
				var parsedPrev = parseFloat(cleanedPrev);
				if (isFinite(parsedPrev)) priceNum = parsedPrev; else priceNum = null;
			}
			var badgeClass = isDonation ? 'badge-donation' : 'badge-sale';
			var badgeText = isDonation ? '🤝 Donación Gratuita' : '💰 Oferta Especial';
			var expText = '';
			if (expiration && expiration.indexOf('-')>0) {
				var p = expiration.split('-');
				if (p.length===3) { expText = p[2]+'/'+p[1]+'/'+p[0]; }
			}
			var expHtml = (expText) ? '<div class="flex items-center gap-2 text-sm text-secondary-600 bg-secondary-50 px-3 py-1 rounded-full mb-2"><span>📅</span><span class="font-medium">Vence: '+expText+'</span></div>' : '';
			var priceHtml = (!isDonation && priceNum!==null) ? '<div class="flex items-center gap-2 text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-2"><span>💶</span><span class="font-medium">'+priceNum.toFixed(2)+'</span></div>' : '';
			var qtyHtml = quantity ? '<div class="flex items-center gap-2 text-sm text-gray-600 mb-2"><span>⚖️</span><span>'+quantity+'</span></div>' : '';

			var card = [
				'<div class="post-card p-4">',
					'<div class="flex items-center gap-3 mb-2">',
						'<div class="text-3xl">'+categoryEmoji(category)+'</div>',
						'<div>',
							'<h4 class="text-lg font-bold text-gray-800">'+(title||'Tu título aparecerá aquí')+'</h4>',
							'<p class="text-gray-600">'+(location||'Ubicación')+'</p>',
						'</div>',
					'</div>',
					'<span class="'+badgeClass+'">'+badgeText+'</span>',
					expHtml,
					'<p class="text-gray-700 my-3 leading-relaxed">'+(description||'La descripción aparecerá aquí...')+'</p>',
					qtyHtml,
					priceHtml,
					'<div class="text-sm text-gray-600 mt-2">📨 '+(contact||'Contacto')+'</div>',
				'</div>'
			].join('');
			document.getElementById('previewCard').innerHTML = card;
		}

		document.addEventListener('DOMContentLoaded', function(){
			var donationBtn = document.querySelector('[data-type="donation"]');
			var saleBtn = document.querySelector('[data-type="sale"]');
			donationBtn.addEventListener('click', function(){ postType='donation'; updateTypeUI(); });
			saleBtn.addEventListener('click', function(){ postType='sale'; updateTypeUI(); });

			// Event delegation to ensure clicks on inner elements also toggle selection
			var typeSelector = document.getElementById('typeSelector');
			if (typeSelector) {
				typeSelector.addEventListener('click', function(e){
					var target = e.target;
					// @ts-ignore - closest is supported in browser
					var option = target && target.closest ? target.closest('[data-type]') : null;
					if (option && option.getAttribute) {
						var t = option.getAttribute('data-type');
						if (t === 'donation' || t === 'sale') {
							e.preventDefault();
							postType = t;
							updateTypeUI();
						}
					}
				});
			}

			Array.prototype.forEach.call(document.querySelectorAll('#title,#category,#description,#location,#contact,#quantity,#expiration,#price'), function(el){ el.addEventListener('input', renderPreview); });

			// Enforce max 2 decimals for price input and normalize separators
			function clampPrice(val){
				var s = String(val || '').replace(/[^0-9.,-]/g, '');
				// normalize comma to dot
				s = s.replace(/,/g, '.');
				// keep only first dot
				var parts = s.split('.');
				if (parts.length > 2) {
					s = parts[0] + '.' + parts.slice(1).join('');
					parts = s.split('.');
				}
				if (parts.length === 2) {
					parts[1] = parts[1].slice(0, 2);
					s = parts[0] + (parts[1].length ? '.' + parts[1] : '');
				}
				return s;
			}

			var priceEl = document.getElementById('price');
			if (priceEl) {
				priceEl.addEventListener('input', function(e){
					var v = clampPrice(e.target && e.target.value);
					if (e.target && v !== e.target.value) e.target.value = v;
					renderPreview();
				});
				priceEl.addEventListener('blur', function(e){
					var raw = (e.target && e.target.value) ? String(e.target.value) : '';
					var cleaned = raw.replace(/[^0-9,.-]/g,'').replace(/,/g,'.');
					var num = parseFloat(cleaned);
					if (isFinite(num)) {
						// format to 2 decimals on blur
						e.target.value = num.toFixed(2);
					} else {
						e.target.value = '';
					}
					renderPreview();
				});
			}

			// Popup wire
			var overlay = document.getElementById('popupOverlay');
			var ok = document.getElementById('popupOk');
			if (ok) ok.addEventListener('click', function(){ popup.close(); });
			if (overlay) overlay.addEventListener('click', function(e){ if (e.target === overlay) popup.close(); });

			// Vista previa se actualiza en tiempo real via eventos 'input'
			document.getElementById('cancelBtn').addEventListener('click', function(){
				try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate', path:'/mis-publicaciones'})); } catch(e) {}
				try { if (window.top !== window && window.parent) { window.parent.postMessage({type:'navigate', path:'/mis-publicaciones'}, '*'); } } catch(e) {}
			});

			document.getElementById('pubForm').addEventListener('submit', function(e){
				e.preventDefault();
				var title = (document.getElementById('title')||{}).value || '';
				var description = (document.getElementById('description')||{}).value || '';
				var categoryId = (document.getElementById('category')||{}).value || '';
				var location = (document.getElementById('location')||{}).value || '';
				var contact = (document.getElementById('contact')||{}).value || '';
				var quantity = (document.getElementById('quantity')||{}).value || '';
				var expiration = (document.getElementById('expiration')||{}).value || '';
				var priceRaw = (document.getElementById('price')||{}).value || '';
				var priceNum = null;
				if (priceRaw) {
					var cleaned = String(priceRaw).replace(/[^0-9,.-]/g,'').replace(',','.');
					var parsed = parseFloat(cleaned);
					if (isFinite(parsed)) priceNum = parsed; else priceNum = null;
				}
				title = title.trim(); description = description.trim();
				if(title.length < 3 || description.length < 20){
					var msg = '';
					if (title.length < 3 && description.length < 20) {
						msg = 'Faltan datos para continuar:\\n\\n• Título: escribe al menos 3 caracteres.\\n• Descripción: escribe al menos 20 caracteres explicando qué ofreces, estado y condiciones.';
						popup.open(msg, { focus: (title.length < 3 ? '#title' : '#description') });
						return;
					}
					if (title.length < 3) {
						msg = 'El título es muy corto. Escribe un título descriptivo con al menos 3 caracteres.';
						popup.open(msg, { focus: '#title' });
						return;
					}
					if (description.length < 20) {
						msg = 'La descripción es muy breve. Indica detalles como cantidad, estado del alimento y cómo entregarlo (mínimo 20 caracteres).';
						popup.open(msg, { focus: '#description' });
						return;
					}
				}
				if(!categoryId){ popup.open('Selecciona la categoría que mejor describa tu publicación.', { focus: '#category' }); return; }
				if(!postType){ popup.open('Elige si es una Donación o una Venta tocando una de las dos opciones de arriba.', { focus: '#typeSelector' }); return; }
				if(postType==='sale' && (priceNum===null)) { popup.open('Para Venta, ingresa un precio válido (por ejemplo: 5.00).', { focus: '#price' }); return; }
				var payload = {
					categoriaId: Number(categoryId),
					titulo: title,
					descripcion: description,
					tipo: (postType==='sale' ? 'venta' : 'donacion'),
					cantidad: quantity || '',
					precio: (postType==='sale' && priceNum!==null) ? priceNum : undefined,
					fechaCaducidad: expiration || undefined,
					extra: { location: location, contact: contact }
				};
				try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({type:'createPublicacion', payload: payload})); } catch(e) {}
				try { if (window.top !== window && window.parent) { window.parent.postMessage({type:'createPublicacion', payload: payload}, '*'); } } catch(e) {}
			});

			// Inicial
			postType='donation';
			updateTypeUI();
			renderPreview();
		});
	</script>
</body>
</html>`;
}

export default function PublicarScreen() {
	const webViewRef = React.useRef<WebView>(null);
	const [htmlDoc, setHtmlDoc] = React.useState<string | null>(null);

	React.useEffect(() => {
		let mounted = true;
				(async () => {
			// Verificar token antes de cargar categorías
			const token = await storage.getToken();
			if (!token) {
				// Si no hay token, redirigir a login y mostrar doc mínimo
				try { router.push('/login' as any); } catch {}
				const html = buildHtml('<option disabled>(Debe iniciar sesión)</option>');
				if (mounted) setHtmlDoc(html);
				return;
			}
			// Obtener categorías del backend y construir opciones con ID como value y nombre como etiqueta
			const cats = await getCategorias();
			const options = (cats && cats.length ? cats : [])
			  .map(c => `<option value="${String(c.id)}">${escapeHtml(c.nombre)}</option>`)
			  .join('');
			// Fallback si no hay categorías
						const fallback = !options ? `<option disabled>(Debe iniciar sesión o no hay categorías)</option>` : '';
			const html = buildHtml(options + fallback);
			if (mounted) setHtmlDoc(html);
		})();
		return () => { mounted = false; };
	}, []);

	if (Platform.OS === 'web') {
			React.useEffect(() => {
				async function onMessage(e: MessageEvent) {
					try {
						const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
						if (data?.type === 'navigate' && typeof data.path === 'string') {
							router.push(data.path as any);
							return;
						}
						if (data?.type === 'createPublicacion' && data.payload) {
							const user = await storage.getUserData();
							const usuarioId = Number(user?.id ?? user?.userId ?? 0);
							if (!usuarioId) { alert('No autenticado'); return; }
							const base = data.payload || {};
							const resp = await createPublicacion({
								usuarioId,
								categoriaId: Number(base.categoriaId),
								titulo: String(base.titulo || ''),
								descripcion: String(base.descripcion || ''),
								// Mantener español para compatibilidad con backend/listados
								tipo: String(base.tipo || 'donacion'),
								cantidad: typeof base.cantidad === 'string' ? base.cantidad : '',
								precio: typeof base.precio === 'number' ? base.precio : undefined,
								fechaCaducidad: base.fechaCaducidad || undefined,
							});
								if (resp.success) {
									// show popup in iframe via postMessage back if desired; here we keep native alert as this handler runs in parent
									alert('Publicación creada');
									router.push('/mis-publicaciones' as any);
								} else {
									alert(resp.message || 'No se pudo crear la publicación');
								}
						}
					} catch {}
				}
				window.addEventListener('message', onMessage);
				return () => window.removeEventListener('message', onMessage);
			}, []);

			return (
				<SafeAreaView style={styles.safe}>
					<Navbar />
					<View style={styles.iframeContainer}>
						{/* eslint-disable-next-line react/no-danger */}
						<iframe title="Crear Publicación" srcDoc={htmlDoc || buildHtml('')} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation allow-modals" />
					</View>
				</SafeAreaView>
			);
	}

	return (
		<SafeAreaView style={styles.safe}>
			<Navbar />
			<WebView
				ref={webViewRef}
				originWhitelist={["*"]}
				source={{ html: htmlDoc || buildHtml('') }}
				style={styles.webview}
				javaScriptEnabled
				domStorageEnabled
				setSupportMultipleWindows={false}
				androidLayerType={Platform.OS === 'android' ? 'software' : undefined}
				onMessage={async (event)=>{
					try{
						const data = JSON.parse(event.nativeEvent.data);
						if(data?.type==='navigate' && typeof data.path==='string'){
							router.push(data.path as any);
							return;
						}
						if (data?.type==='createPublicacion' && data.payload){
							const user = await storage.getUserData();
							const usuarioId = Number(user?.id ?? user?.userId ?? 0);
							if (!usuarioId) { alert('No autenticado'); return; }
							const base = data.payload || {};
							const resp = await createPublicacion({
								usuarioId,
								categoriaId: Number(base.categoriaId),
								titulo: String(base.titulo || ''),
								descripcion: String(base.descripcion || ''),
								tipo: String(base.tipo || 'donacion'),
								cantidad: typeof base.cantidad === 'string' ? base.cantidad : '',
								precio: typeof base.precio === 'number' ? base.precio : undefined,
								fechaCaducidad: base.fechaCaducidad || undefined,
							});
							if (resp.success) {
								alert('Publicación creada');
								router.push('/mis-publicaciones' as any);
							} else {
								alert(resp.message || 'No se pudo crear la publicación');
							}
						}
					}catch(e){ /* noop */ }
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: '#fff' },
	webview: { flex: 1 },
	iframeContainer: { flex: 1, width: '100%' },
	iframe: { borderWidth: 0, width: '100%', height: '100%' },
});

