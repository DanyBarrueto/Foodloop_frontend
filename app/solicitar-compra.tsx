import { API_BASE_URL } from '@/services/authService';
import { createTransaccion } from '@/services/transaccionService';
import embeddedCss from '@/styles/PaginaPrincipal';
import SolicitarCompraCss from '@/styles/SolicitarCompra';
import { storage } from '@/utils/storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

function buildHtml(initial: any){
const safe = JSON.stringify(initial || {}).replace(/</g, '\\u003c');
return `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Solicitar Compra</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
	<style>
		body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
		${embeddedCss}
		${SolicitarCompraCss}
	</style>
</head>
<body class="solicitar-compra-page">
	<header class="header-glass sticky top-0 z-20">
		<div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="relative">
					<div class="pulse-ring absolute inset-0 rounded-full bg-orange-400 opacity-30"></div>
					<div class="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg">🛒</div>
				</div>
				<div>
					<h1 class="text-2xl font-bold text-gray-800">Solicitar Compra</h1>
					<p class="text-sm text-gray-600">Compra alimentos a precio reducido</p>
				</div>
			</div>
			<a id="btnBack" href="/explorador" target="_top" class="btn-secondary">
				<svg class="icon w-4 h-4" viewBox="0 0 24 24"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
				Volver
			</a>
		</div>
	</header>

	<main class="max-w-4xl mx-auto px-4 py-8">
		<!-- Hero -->
		<div class="text-center mb-10 animate-fade-in">
			<div class="text-6xl mb-3">🛒</div>
			<h2 class="text-4xl font-bold text-gray-800 mb-2">Solicitar Compra</h2>
			<p class="text-gray-600 max-w-xl mx-auto">Completa los detalles para solicitar la compra de este producto a precio especial.</p>
		</div>

		<!-- Product Info -->
		<div class="product-info animate-slide-up">
			<div class="flex items-center gap-4 mb-3">
				<div id="pEmoji" class="text-4xl">🍽️</div>
				<div>
					<h3 id="pTitulo" class="text-xl font-bold text-gray-800">Publicación</h3>
					<p id="pMeta" class="text-sm text-gray-600">Entidad - Ciudad</p>
					<div class="flex items-center gap-2 mt-2">
						<span id="pTipo" class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">💰 Venta</span>
						<span id="pFecha" class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium hidden"></span>
					</div>
				</div>
			</div>
			<p id="pDesc" class="text-gray-700 text-sm"></p>
		</div>

		<div id="alertSuccess" class="success-message">¡Tu solicitud fue enviada correctamente!</div>
		<div id="alertError" class="error-message">Ocurrió un error. Por favor revisa los campos.</div>

		<section class="card p-8 animate-slide-up mt-8">
			<h2 class="text-xl font-semibold text-gray-800 mb-4">Completa tu solicitud</h2>
			<form id="solicitarForm" class="space-y-6">
				<!-- Cantidad y Presupuesto -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
						<svg class="icon text-orange-500" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-6"/></svg>
						Cantidad Deseada
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Cantidad que deseas *</label>
							<select id="quantity" class="select-field" required>
								<option value="">Selecciona la cantidad</option>
								<option value="1">1 lote/unidad</option>
								<option value="2">2 lotes/unidades</option>
								<option value="3">3 lotes/unidades</option>
								<option value="4">4 lotes/unidades</option>
								<option value="5+">5 o más</option>
								<option value="all">Todo lo disponible</option>
							</select>
						</div>
						<div>
							<label class="block text-sm font-medium text-gray-700 mb-1">Presupuesto máximo (opcional)</label>
							<input id="budget" class="input-field" type="text" placeholder="Ej: 15€, 20€..." />
						</div>
					</div>
				</div>

				<!-- Método de pago -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
						<svg class="icon text-orange-500" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
						Método de Pago *
					</h3>
					<div class="payment-methods">
						<label class="payment-option" data-method="cash">
							<input type="radio" name="payment" value="cash" />
							<div class="text-2xl mb-2">💵</div>
							<div class="font-semibold text-sm">Efectivo</div>
							<div class="text-xs text-gray-600">Pago en efectivo</div>
						</label>
						<label class="payment-option" data-method="card">
							<input type="radio" name="payment" value="card" />
							<div class="text-2xl mb-2">💳</div>
							<div class="font-semibold text-sm">Tarjeta</div>
							<div class="text-xs text-gray-600">Débito/Crédito</div>
						</label>
					</div>

					<!-- Detalles según método -->
					<div id="cashInfo" class="payment-detail hidden">
						<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">El pago se acordará directamente con el vendedor en el momento de la entrega o recogida.</div>
					</div>
					<div id="cardDetail" class="payment-detail hidden">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Número de tarjeta *</label>
								<input id="cardNumber" class="input-field" maxlength="19" placeholder="1234 5678 9012 3456" />
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Nombre en la tarjeta *</label>
								<input id="cardName" class="input-field" placeholder="Nombre del titular" />
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">Fecha de vencimiento *</label>
								<input id="expiryDate" class="input-field" maxlength="5" placeholder="MM/AA" />
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
								<input id="cvv" class="input-field" maxlength="4" placeholder="123" />
							</div>
						</div>
						<div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700 mt-2">🔒 Tus datos están protegidos con encriptación SSL.</div>
					</div>
				</div>

				<!-- Entrega -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
						<svg class="icon text-orange-500" viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
						Información de Entrega
					</h3>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Preferencia de entrega *</label>
						<select id="deliveryPreference" class="select-field" required>
							<option value="">Selecciona una opción</option>
							<option value="pickup">Recoger en el establecimiento</option>
							<option value="delivery">Entrega a domicilio (si disponible)</option>
							<option value="both">Cualquiera de las dos opciones</option>
						</select>
					</div>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Horario preferido *</label>
						<select id="timePreference" class="select-field" required>
							<option value="">Selecciona tu horario preferido</option>
							<option value="morning">Mañana (9:00 - 12:00)</option>
							<option value="afternoon">Tarde (12:00 - 18:00)</option>
							<option value="evening">Noche (18:00 - 21:00)</option>
							<option value="weekend">Fines de semana</option>
							<option value="flexible">Horario flexible</option>
						</select>
					</div>
				</div>

				<!-- Mensaje -->
				<div class="space-y-4">
					<h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
						<svg class="icon text-orange-500" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
						Mensaje Adicional
					</h3>
					<div>
						<label class="block text-sm font-medium text-gray-700 mb-1">Comentarios para el vendedor</label>
						<textarea id="message" class="textarea-field" rows="4" placeholder="Cualquier información adicional que quieras compartir con el vendedor (método de pago preferido, preguntas específicas, etc.)..."></textarea>
					</div>
				</div>

				<!-- Términos -->
				<div class="flex items-start gap-3">
					<input id="terms" type="checkbox" class="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" required />
					<label for="terms" class="text-sm text-gray-600">Acepto los términos y condiciones de compra y confirmo mi interés en adquirir este producto. *</label>
				</div>

				<!-- Botones -->
				<div class="flex flex-col sm:flex-row gap-4 pt-4">
					<button id="submitBtn" type="submit" class="btn-primary flex-1">
						<svg class="icon" viewBox="0 0 24 24"><path d="M3 12l2-2 4 4L19 4l2 2-12 12z"/></svg>
						Confirmar Solicitud de Compra
					</button>
					<a id="btnCancel" href="/explorador" target="_top" class="btn-secondary">
						<svg class="icon w-4 h-4" viewBox="0 0 24 24"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
						Cancelar
					</a>
				</div>
			</form>
		</section>

		<!-- Info Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
			<div class="card p-6 text-center">
				<div class="text-4xl mb-3">💰</div>
				<h3 class="text-lg font-semibold text-gray-800 mb-2">Precio Especial</h3>
				<p class="text-sm text-gray-600">Este producto tiene un descuento del 50% sobre su precio original.</p>
			</div>
			<div class="card p-6 text-center">
				<div class="text-4xl mb-3">⚡</div>
				<h3 class="text-lg font-semibold text-gray-800 mb-2">Respuesta Rápida</h3>
				<p class="text-sm text-gray-600">El vendedor te contactará en las próximas horas para coordinar la compra.</p>
			</div>
		</div>
	</main>

	<script>
		(function(){
			var __INITIAL__ = ${safe};
			function qs(id){ return document.getElementById(id); }
			const form = qs('solicitarForm');
			const cardDetail = qs('cardDetail');
			const alertOk = qs('alertSuccess');
			const alertErr = qs('alertError');
			const submitBtn = qs('submitBtn');
			const btnBack = document.getElementById('btnBack');
            var navMsg = JSON.stringify({ type: 'navigate', path: '/explorador' });
			function navigateToExplorer(){
				// RN WebView
				try {
					var rnwv = (window && window['ReactNativeWebView'])
						|| (window['webkit'] && window['webkit']['messageHandlers'] && window['webkit']['messageHandlers']['ReactNativeWebView']);
					if (rnwv && typeof rnwv.postMessage === 'function') { rnwv.postMessage(navMsg); }
				} catch (e) {}
				// Web (iframe -> parent) por si el contenedor quiere interceptar
				try { if (window.parent && window.parent !== window && typeof window.parent.postMessage === 'function') { window.parent.postMessage(navMsg, '*'); } } catch (e) {}
			}

			function postMsg(obj){
				try {
					var rnwv = (window && window['ReactNativeWebView']) || (window['webkit'] && window['webkit']['messageHandlers'] && window['webkit']['messageHandlers']['ReactNativeWebView']);
					if (rnwv && typeof rnwv.postMessage === 'function') { rnwv.postMessage(JSON.stringify(obj)); }
				} catch(e){}
				try { if (window.parent && window.parent !== window && typeof window.parent.postMessage === 'function') { window.parent.postMessage(obj, '*'); } } catch(e){}
			}

			function show(el){ el.classList.remove('hidden'); }
			function hide(el){ el.classList.add('hidden'); }
			function showOk(msg){ alertOk.textContent = msg || '¡Tu solicitud fue enviada correctamente!'; alertOk.classList.add('is-visible'); setTimeout(()=>alertOk.classList.remove('is-visible'), 3000); }
			function showErr(msg){ alertErr.textContent = msg || 'Ocurrió un error. Por favor revisa los campos.'; alertErr.classList.add('is-visible'); setTimeout(()=>alertErr.classList.remove('is-visible'), 3000); }

			// Animación con delay secuencial como referencia (JS puro)
			document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(function(el, idx){
				try { el['style'].animationDelay = (idx * 0.1) + 's'; } catch(e) {}
			});

			// Prefill publication
			try{
				var p = __INITIAL__ && __INITIAL__.publicacion;
				if(p){
					qs('pTitulo').textContent = p.titulo || 'Publicación';
					qs('pMeta').textContent = (p.entidad || 'Entidad') + (p.ubicacion ? ' - ' + p.ubicacion : '');
					qs('pDesc').textContent = p.descripcion || '';
					qs('pTipo').textContent = '💰 Venta';
					var emoji = '🍽️';
					var n = (p.categoriaNombre||'').toLowerCase();
					if(n.indexOf('fruta')>-1||n.indexOf('verdura')>-1) emoji='🥕';
					else if(n.indexOf('pan')>-1) emoji='🍞';
					else if(n.indexOf('lact')>-1) emoji='🥛';
					else if(n.indexOf('carn')>-1||n.indexOf('pesc')>-1) emoji='🥩';
					else if(n.indexOf('preparad')>-1||n.indexOf('cocin')>-1) emoji='🍽️';
					else if(n.indexOf('conserv')>-1||n.indexOf('enlat')>-1) emoji='🥫';
					else if(n.indexOf('bebid')>-1) emoji='🥤';
					qs('pEmoji').textContent = emoji;
					if (p.fechaCaducidad) {
						var m = String(p.fechaCaducidad).match(/^(\d{4})-(\d{2})-(\d{2})/);
						if(m){ qs('pFecha').textContent = '📅 Vence: '+m[3]+'/'+m[2]+'/'+m[1]; qs('pFecha').classList.remove('hidden'); }
					}
				}
			}catch(e){}

			// Métodos de pago: alternar selected y mostrar detalle
			document.querySelectorAll('.payment-option').forEach(function(opt){
				opt.addEventListener('click', function(){
					document.querySelectorAll('.payment-option').forEach(function(o){ o.classList.remove('selected'); });
					opt.classList.add('selected');
					var value = opt.getAttribute('data-method');
					var cashInfo = document.getElementById('cashInfo');
					if(value==='card'){ show(cardDetail); if(cashInfo) hide(cashInfo); }
					else if(value==='cash'){ hide(cardDetail); if(cashInfo) show(cashInfo); }
				});
			});

			// Formateos básicos
			qs('cardNumber').addEventListener('input', (e)=>{
				const v = e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 ');
				e.target.value = v;
			});
			qs('expiryDate').addEventListener('input', (e)=>{
				let v = e.target.value.replace(/\D/g,'').slice(0,4);
				if(v.length>2) v = v.slice(0,2)+'/'+v.slice(2);
				e.target.value = v;
			});
			qs('cvv').addEventListener('input', (e)=>{ e.target.value = e.target.value.replace(/\D/g,'').slice(0,3); });

			function validate(){
				const qty = Number(qs('quantity').value||0);
				const budget = Number(qs('budget').value||0);
				const method = document.querySelector('.payment-option.selected')?.getAttribute('data-method');
				if(!qty || qty<1) return 'Indica una cantidad válida';
				if(budget<0) return 'Presupuesto no puede ser negativo';
				if(!method) return 'Selecciona un método de pago';
				if(method==='card'){
					const cn = qs('cardNumber').value.replace(/\s/g,'');
					const nm = qs('cardName').value.trim();
					const ex = qs('expiryDate').value;
					const cv = qs('cvv').value;
					if(cn.length<16) return 'Número de tarjeta inválido';
					if(nm.length<4) return 'Nombre de tarjeta inválido';
					if(!/^\d{2}\/\d{2}$/.test(ex)) return 'Expiración inválida';
					if(cv.length<3) return 'CVV inválido';
				}
				if(!qs('terms').checked) return 'Debes aceptar los términos y condiciones';
				return '';
			}

			form.addEventListener('submit', function(e){
				e.preventDefault();
				const err = validate();
				if(err){ showErr(err); return; }
				submitBtn.disabled = true; submitBtn.classList.add('opacity-70');
				try {
					var p = __INITIAL__ && __INITIAL__.publicacion;
					if (!p) { showErr('No se pudo cargar la publicación'); submitBtn.disabled=false; submitBtn.classList.remove('opacity-70'); return; }
					var method = (document.querySelector('.payment-option.selected')||{}).getAttribute && (document.querySelector('.payment-option.selected') as any).getAttribute('data-method');
					var payload = {
						type: 'createTransaccion',
						payload: {
							publicacionId: Number(p.id),
							donanteVendedorId: Number(p.usuarioId),
							beneficiarioCompradorId: Number(__INITIAL__ && __INITIAL__.currentUserId || 0),
							fechaTransaccion: new Date().toISOString(),
							meta: {
								quantityDesired: (qs('quantity')||{}).value,
								budget: (qs('budget')||{}).value,
								paymentMethod: method,
								deliveryPreference: (qs('deliveryPreference')||{}).value,
								timePreference: (qs('timePreference')||{}).value,
								message: (qs('message')||{}).value,
								termsAccepted: !!qs('terms').checked,
							}
						}
					};
					postMsg(payload);
				} catch(err) {
					showErr('Error al enviar'); submitBtn.disabled=false; submitBtn.classList.remove('opacity-70');
				}
			});

			// Navegación atrás (comunicación con host) - enviar mensaje y permitir que el enlace navegue
			if(btnBack){ btnBack.addEventListener('click', navigateToExplorer); }

			// Cancelar
			var btnCancel = document.getElementById('btnCancel');
			if(btnCancel){ btnCancel.addEventListener('click', navigateToExplorer); }
		})();
	</script>
</body>
 </html>`;
}

export default function SolicitarCompraScreen(){
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id?: string }>();
	const [html, setHtml] = React.useState<string>('');

	// Web: escucha mensajes del iframe para navegar
	React.useEffect(() => {
		if (Platform.OS !== 'web') return;
		const handler = (e: MessageEvent) => {
			let data: any = e?.data;
			if (typeof data === 'string') {
				try { data = JSON.parse(data); } catch {}
			}
			if (data?.type === 'navigate' && typeof data.path === 'string') { router.push(data.path as any); return; }
			if (data?.type === 'createTransaccion' && data.payload) {
				(async () => {
					const resp = await createTransaccion(data.payload);
					if (resp.success) {
						alert('Solicitud enviada correctamente');
						router.push('/explorador' as any);
					} else {
						alert(resp.message || 'No se pudo enviar la solicitud');
					}
				})();
			}
		};
		window.addEventListener('message', handler as any);
		return () => window.removeEventListener('message', handler as any);
	}, [router]);

	React.useEffect(() => {
		let aborted = false;
		(async () => {
			const pubId = Number(id);
			const token = await storage.getToken();
			const user = await storage.getUserData();
			const currentUserId = Number(user?.id ?? user?.userId ?? 0);
			let publicacion: any = null;
			if (pubId && token) {
				try {
					const res = await fetch(`${API_BASE_URL}/publicaciones/${pubId}`, { headers: { Authorization: `Bearer ${token}` } });
					if (res.ok) {
						const p = await res.json();
						publicacion = {
							id: p.id,
							usuarioId: p.usuarioId,
							titulo: p.titulo,
							descripcion: p.descripcion,
							tipo: p.tipo,
							categoriaNombre: p.categoria?.nombre,
							fechaCaducidad: p.fechaCaducidad,
							entidad: p.usuario?.nombreEntidad || p.usuario?.nombre_entidad || p.usuario?.nombre || '',
							ubicacion: p.usuario?.ubicacion || p.usuario?.ciudad || '',
						};
					}
				} catch {}
			}
			const initial = { publicacion, currentUserId };
			if (!aborted) setHtml(buildHtml(initial));
		})();
		return () => { aborted = true; };
	}, [id]);

	if (Platform.OS === 'web') {
		return (
			<SafeAreaView style={styles.safe}>
				<View style={styles.iframeContainer}>
					<iframe title="SolicitarCompra" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation allow-modals" />
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.safe}>
			<WebView
				originWhitelist={["*"]}
				source={{ html }}
				style={styles.webview}
				javaScriptEnabled
				domStorageEnabled
				onMessage={async (event) => {
					let data: any = event?.nativeEvent?.data;
					if (typeof data === 'string') {
						try { data = JSON.parse(data); } catch {}
					}
					if (data?.type === 'navigate' && typeof data.path === 'string') { router.push(data.path as any); return; }
					if (data?.type === 'createTransaccion' && data.payload) {
						const resp = await createTransaccion(data.payload);
						if (resp.success) {
							alert('Solicitud enviada correctamente');
							router.push('/explorador' as any);
						} else {
							alert(resp.message || 'No se pudo enviar la solicitud');
						}
					}
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
