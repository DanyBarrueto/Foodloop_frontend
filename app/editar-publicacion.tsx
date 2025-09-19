import EditarPublicacionCss from '@/styles/EditarPublicación';
import embeddedCss from '@/styles/PaginaPrincipal';
import { router } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Navbar from './navbar';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Editar Publicación</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	<style>
		body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
		${embeddedCss}
		${EditarPublicacionCss}
	</style>
</head>
<body>
	<div class="min-h-screen relative editar-publicacion-page">
		<div class="floating-icon" style="top:10%; left:5%; animation-delay:0s">🍎</div>
		<div class="floating-icon" style="top:20%; right:10%; animation-delay:1s">🥕</div>
		<div class="floating-icon" style="bottom:30%; left:8%; animation-delay:2s">🍞</div>
		<div class="floating-icon" style="bottom:15%; right:15%; animation-delay:1.5s">🥛</div>
		<div class="floating-icon" style="top:50%; left:3%; animation-delay:3s">🍅</div>
		<div class="floating-icon" style="top:70%; right:5%; animation-delay:2.5s">🥐</div>

		<div class="fixed right-6 top-24 z-40">
			<button data-nav="/mis-publicaciones" class="btn-gradient">Mis publicaciones</button>
		</div>

		<main class="pt-24 pb-12 px-6">
			<div class="max-w-6xl mx-auto">
				<div class="text-center mb-12 animate-fade-in">
					<h1 class="text-3xl md:text-4xl font-extrabold text-gray-900">Editor de Publicaciones</h1>
					<p class="mt-2 text-gray-600">Actualiza los detalles de tu publicación y visualiza los cambios en tiempo real.</p>
				</div>

				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div class="lg:col-span-2 editor-card p-6">
						<div class="mb-6">
							<div class="grid grid-cols-2 gap-4">
																<button type="button" id="btnDonation" class="type-card selected donation">
									<div class="text-3xl mb-2">🤝</div>
									<div class="font-semibold">Donación</div>
																	<div class="text-xs mt-1 text-black">Entrega sin costo</div>
								</button>
								<button type="button" id="btnSale" class="type-card">
									<div class="text-3xl mb-2">💲</div>
									<div class="font-semibold">Venta</div>
																	<div class="text-xs mt-1 text-black">Incluye precio</div>
								</button>
							</div>
						</div>

						<div class="mb-6">
							<div class="flex gap-3 flex-wrap">
								<button type="button" class="status-pill selected" data-status="activa">🟢 Activa</button>
								<button type="button" class="status-pill" data-status="pausada">⏸️ Pausada</button>
							</div>
						</div>

						<div class="section-divider"></div>

						<form id="editForm" class="space-y-5">
							<div>
								<label class="label-modern">Título</label>
								<input id="title" class="input-modern w-full" placeholder="Título de la publicación" />
							</div>
							<div>
								<label class="label-modern">Descripción</label>
								<textarea id="description" class="textarea-modern w-full" placeholder="Describe tu publicación..."></textarea>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label class="label-modern">Ubicación</label>
									<input id="location" class="input-modern w-full" placeholder="Ciudad o dirección" />
								</div>
								<div>
									<label class="label-modern">Cantidad</label>
									<input id="quantity" type="number" min="0" class="input-modern w-full" placeholder="Ej. 10 kg, 5 unidades" />
								</div>
							</div>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label class="label-modern">Contacto</label>
									<input id="contact" class="input-modern w-full" placeholder="Correo o teléfono" />
								</div>
								<div>
									<label class="label-modern">Categoría</label>
									<select id="category" class="input-modern w-full">
										<option value="frutas-verduras">Frutas y verduras</option>
										<option value="panaderia">Panadería</option>
										<option value="lacteos">Lácteos</option>
										<option value="carnes">Carnes</option>
										<option value="comida-preparada">Comida preparada</option>
										<option value="conservas">Conservas</option>
										<option value="bebidas">Bebidas</option>
										<option value="otros">Otros</option>
									</select>
								</div>
							</div>
							<div id="priceWrap" class="hidden">
								<label class="label-modern">Precio</label>
								<input id="price" type="number" min="0" step="0.01" class="input-modern w-full" placeholder="Ej. 10.00" />
							</div>
							<div class="flex flex-wrap gap-3 pt-2">
								<button type="submit" class="btn-success">Guardar cambios</button>
								<button type="button" id="cancelBtn" class="btn-gradient">Cancelar</button>
							</div>
						</form>
					</div>

					<div id="preview" class="glass-card p-6 h-fit">
						<div class="flex items-center justify-between mb-4">
							<div class="flex items-center gap-3">
								<div class="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center shadow-lg">
									<span id="emoji" class="text-2xl">🥕</span>
								</div>
								<div>
									<h3 id="pTitle" class="text-lg font-semibold text-gray-900">Título de la publicación</h3>
									<div id="pStatus" class="text-xs text-gray-600">Estado: Activa</div>
								</div>
							</div>
							<span id="badgeType" class="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">Donación</span>
						</div>
						<div class="preview-card">
							<p id="pDesc" class="text-gray-700 whitespace-pre-wrap">Descripción de la publicación...</p>
							<div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
								<div>📍 <span id="pLoc">Ubicación</span></div>
								<div>📦 <span id="pQty">Cantidad</span></div>
								<div>📞 <span id="pContact">Contacto</span></div>
								<div id="pPriceWrap" class="hidden">💵 $<span id="pPrice"></span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

		<div id="notif" class="notification success">
			<div class="flex items-center gap-3"><span>✅</span><span id="notifMsg"></span></div>
		</div>
	</div>

	<script>
		var postType = 'donation';
		var status = 'activa';
		var fields = { title:'', description:'', location:'', quantity:'', contact:'', category:'frutas-verduras', price:'' };
		var emojiMap = { 'frutas-verduras':'🥕','panaderia':'🍞','lacteos':'🥛','carnes':'🥩','comida-preparada':'🍽️','conservas':'🥫','bebidas':'🥤','otros':'📦' };

		function qs(id){ return document.getElementById(id); }
			function updatePreview(){
				qs('emoji').textContent = emojiMap[fields.category] || '🍽️';
				qs('pTitle').textContent = fields.title || 'Título de la publicación';
				qs('pDesc').textContent = fields.description || 'Descripción de la publicación...';
				qs('pLoc').textContent = fields.location || 'Ubicación';
				qs('pQty').textContent = fields.quantity || 'Cantidad';
				qs('pContact').textContent = fields.contact || 'Contacto';
				qs('pStatus').textContent = 'Estado: ' + (status === 'activa' ? 'Activa' : 'Pausada');
				var isSaleType = postType === 'sale';
				var hasPrice = !!fields.price && Number(fields.price) > 0;
				var badge = qs('badgeType');
				// El badge refleja el tipo seleccionado, no depende del precio
				badge.textContent = isSaleType ? 'Venta' : 'Donación';
				badge.className = 'px-3 py-1 rounded-full text-xs font-semibold ' + (isSaleType ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700');
				// Mostrar el bloque de precio en la preview solo si es venta y hay precio > 0
				qs('pPriceWrap').classList.toggle('hidden', !(isSaleType && hasPrice));
				if (isSaleType && hasPrice) { qs('pPrice').textContent = Number(fields.price).toFixed(2); }
				// Mostrar el input de precio cuando el tipo sea venta
				qs('priceWrap').classList.toggle('hidden', !isSaleType);
			}

		function setType(t){ postType = t; document.getElementById('btnDonation').classList.toggle('selected', t==='donation'); document.getElementById('btnSale').classList.toggle('selected', t==='sale'); updatePreview(); }
		function setStatus(s){ status = s; document.querySelectorAll('.status-pill').forEach(function(el){ el.classList.toggle('selected', el.getAttribute('data-status')===s); }); updatePreview(); }

		function notify(msg){
			var n = qs('notif'); var m = qs('notifMsg'); m.textContent = msg; n.classList.add('show'); setTimeout(function(){ n.classList.remove('show'); }, 3500);
		}

		function navigate(path){
			try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'navigate', path: path })); } catch(e) {}
			try { if (window.top !== window && window.parent) window.parent.postMessage({ type:'navigate', path: path }, '*'); } catch(e) {}
		}

		document.addEventListener('DOMContentLoaded', function(){
			// Tipo
			document.getElementById('btnDonation').addEventListener('click', function(){ setType('donation'); });
			document.getElementById('btnSale').addEventListener('click', function(){ setType('sale'); });
			// Estado
			document.querySelectorAll('.status-pill').forEach(function(btn){ btn.addEventListener('click', function(){ setStatus(btn.getAttribute('data-status')); }); });
			// Campos
			['title','description','location','quantity','contact','category','price'].forEach(function(k){
				var el = qs(k);
				if(!el) return;
				el.addEventListener('input', function(){ fields[k] = el.value; updatePreview(); });
			});
			// Botones de navegación
			document.querySelectorAll('[data-nav]').forEach(function(b){ b.addEventListener('click', function(){ navigate(b.getAttribute('data-nav')); }); });
			document.getElementById('cancelBtn').addEventListener('click', function(){ navigate('/mis-publicaciones'); });
			// Envío
			document.getElementById('editForm').addEventListener('submit', function(e){ e.preventDefault(); notify('Cambios guardados exitosamente.'); });

			// Inicial
			setType('donation'); setStatus('activa'); updatePreview();
		});
	</script>
</body>
</html>`;

export default function EditarPublicacionScreen(){
	const webViewRef = React.useRef<WebView>(null);

	if (Platform.OS === 'web') {
		React.useEffect(() => {
			function onMessage(e: MessageEvent){
				try{
					const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
					if(data?.type==='navigate' && typeof data.path==='string') router.push(data.path as any);
				}catch{}
			}
			window.addEventListener('message', onMessage);
			return () => window.removeEventListener('message', onMessage);
		}, []);

		return (
			<SafeAreaView style={styles.safe}>
				<Navbar />
				<View style={styles.iframeContainer}>
					<iframe title="Editar Publicación" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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
				source={{ html }}
				style={styles.webview}
				javaScriptEnabled
				domStorageEnabled
				setSupportMultipleWindows={false}
				androidLayerType={Platform.OS === 'android' ? 'software' : undefined}
				onMessage={(event)=>{
					try{
						const data = JSON.parse(event.nativeEvent.data);
						if(data?.type==='navigate' && typeof data.path==='string') router.push(data.path as any);
					}catch(e){}
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

