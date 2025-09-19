import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Navbar from './navbar';
import PublicarCss from '@/styles/Publicar';
import embeddedCss from '@/styles/PaginaPrincipal';
import { router } from 'expo-router';

const html = `<!DOCTYPE html>
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
									<div class="type-selector">
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
											<option value="frutas-verduras">🥕 Frutas y Verduras</option>
											<option value="panaderia">🍞 Panadería</option>
											<option value="lacteos">🥛 Lácteos</option>
											<option value="carnes">🥩 Carnes y Pescados</option>
											<option value="comida-preparada">🍽️ Comida Preparada</option>
											<option value="conservas">🥫 Conservas y Enlatados</option>
											<option value="bebidas">🥤 Bebidas</option>
											<option value="otros">📦 Otros</option>
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
									<div id="expirationWrap" class="hidden">
										<label class="block text-sm font-semibold text-gray-700 mb-2">📅 Fecha de Vencimiento</label>
										<input id="expiration" type="date" class="input-field" />
									</div>
									<div id="priceWrap" class="md:col-span-2 hidden">
										<label class="block text-sm font-semibold text-gray-700 mb-2">💶 Precio</label>
										<input id="price" type="text" class="input-field" placeholder="Ej: 5€, 2€/kg, Precio a convenir..." />
									</div>
								</div>

								<div>
									<label class="block text-sm font-semibold text-gray-700 mb-2">📸 Imágenes (Opcional)</label>
									<div id="fileUpload" class="file-upload">
										<div class="text-4xl mb-4">📷</div>
										<p class="text-gray-600 mb-2"><strong>Arrastra imágenes aquí</strong> o haz clic para seleccionar</p>
										<p class="text-xs text-gray-500">Máximo 3 imágenes • JPG, PNG • Máximo 5MB cada una</p>
										<input id="fileInput" type="file" accept="image/*" multiple hidden />
									</div>
									<div id="previewGrid" class="mt-4 grid grid-cols-3 gap-4"></div>
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

	<script>
		var postType = '';
		var images = [];
		var fileInput = null;

		function updateTypeUI(){
			var donationBtn = document.querySelector('[data-type="donation"]');
			var saleBtn = document.querySelector('[data-type="sale"]');
			donationBtn.classList.toggle('selected', postType==='donation');
			donationBtn.classList.add('donation');
			saleBtn.classList.toggle('selected', postType==='sale');
			saleBtn.classList.add('sale');
			document.getElementById('expirationWrap').classList.toggle('hidden', postType!=='sale');
			document.getElementById('priceWrap').classList.toggle('hidden', postType!=='sale');
			renderPreview();
		}

		function categoryEmoji(category){
			var emojis = { 'frutas-verduras':'🥕', panaderia:'🍞', lacteos:'🥛', carnes:'🥩', 'comida-preparada':'🍽️', conservas:'🥫', bebidas:'🥤', otros:'📦' };
			return emojis[category] || '🍽️';
		}

		function renderPreview(){
			var isDonation = postType==='donation';
			var title = (document.getElementById('title')||{}).value || '';
			var category = (document.getElementById('category')||{}).value || '';
			var description = (document.getElementById('description')||{}).value || '';
			var location = (document.getElementById('location')||{}).value || '';
			var contact = (document.getElementById('contact')||{}).value || '';
			var quantity = (document.getElementById('quantity')||{}).value || '';
			var expiration = (document.getElementById('expiration')||{}).value || '';
			var price = (document.getElementById('price')||{}).value || '';
			var badgeClass = isDonation ? 'badge-donation' : 'badge-sale';
			var badgeText = isDonation ? '🤝 Donación Gratuita' : '💰 Oferta Especial';
			var expHtml = (!isDonation && expiration) ? '<div class="flex items-center gap-2 text-sm text-secondary-600 bg-secondary-50 px-3 py-1 rounded-full mb-2"><span>📅</span><span class="font-medium">Vence: '+new Date(expiration).toLocaleDateString('es-ES')+'</span></div>' : '';
			var priceHtml = (!isDonation && price) ? '<div class="flex items-center gap-2 text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full mb-2"><span>💶</span><span class="font-medium">'+price+'</span></div>' : '';
			var qtyHtml = quantity ? '<div class="flex items-center gap-2 text-sm text-gray-600 mb-2"><span>⚖️</span><span>'+quantity+'</span></div>' : '';

			var imgs = images.map(function(img){ return '<img src="'+img.url+'" alt="Preview" class="w-full h-32 object-cover rounded-lg" />'; }).join('');
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
					'<p class="text-gray-700 my-3 leading-relaxed">'+(description||'La descripción aparecerá aquí...')+'</p>',
					qtyHtml,
					expHtml,
					priceHtml,
					'<div class="grid grid-cols-3 gap-2">'+imgs+'</div>',
					'<div class="text-sm text-gray-600 mt-2">📨 '+(contact||'Contacto')+'</div>',
				'</div>'
			].join('');
			document.getElementById('previewCard').innerHTML = card;
		}

		function addFiles(fileList){
			var arr = Array.prototype.slice.call(fileList||[]);
			arr.slice(0, 3 - images.length).forEach(function(file){
				var reader = new FileReader();
				reader.onload = function(e){ images.push({ file: file, url: e.target.result }); renderPreviewGrid(); renderPreview(); };
				reader.readAsDataURL(file);
			});
		}

		function renderPreviewGrid(){
			var grid = document.getElementById('previewGrid');
			grid.innerHTML = images.map(function(img, idx){
				return '<div class="relative"><img src="'+img.url+'" class="w-full h-24 object-cover rounded-lg" /><button type="button" class="remove-image" data-idx="'+idx+'" aria-label="Eliminar imagen">×</button></div>';
			}).join('');
			Array.prototype.forEach.call(grid.querySelectorAll('.remove-image'), function(btn){
				btn.addEventListener('click', function(){
					var i = parseInt(btn.getAttribute('data-idx'), 10);
					images.splice(i,1); renderPreviewGrid(); renderPreview();
				});
			});
		}

		document.addEventListener('DOMContentLoaded', function(){
			var donationBtn = document.querySelector('[data-type="donation"]');
			var saleBtn = document.querySelector('[data-type="sale"]');
			donationBtn.addEventListener('click', function(){ postType='donation'; updateTypeUI(); });
			saleBtn.addEventListener('click', function(){ postType='sale'; updateTypeUI(); });

			fileInput = document.getElementById('fileInput');
			var fileUpload = document.getElementById('fileUpload');
			fileUpload.addEventListener('click', function(){ fileInput && fileInput.click(); });
			fileInput.addEventListener('change', function(e){ addFiles(e.target.files); });
			fileUpload.addEventListener('dragover', function(e){ e.preventDefault(); fileUpload.classList.add('dragover'); });
			fileUpload.addEventListener('dragleave', function(e){ e.preventDefault(); fileUpload.classList.remove('dragover'); });
			fileUpload.addEventListener('drop', function(e){ e.preventDefault(); fileUpload.classList.remove('dragover'); addFiles(e.dataTransfer.files); });

			Array.prototype.forEach.call(document.querySelectorAll('#title,#category,#description,#location,#contact,#quantity,#expiration,#price'), function(el){ el.addEventListener('input', renderPreview); });

			// Vista previa se actualiza en tiempo real via eventos 'input'
			document.getElementById('cancelBtn').addEventListener('click', function(){
				try { window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate', path:'/mis-publicaciones'})); } catch(e) {}
				try { if (window.top !== window && window.parent) { window.parent.postMessage({type:'navigate', path:'/mis-publicaciones'}, '*'); } } catch(e) {}
			});

			document.getElementById('pubForm').addEventListener('submit', function(e){
				e.preventDefault();
				var title = (document.getElementById('title')||{}).value || '';
				var description = (document.getElementById('description')||{}).value || '';
				if(title.length < 3 || description.length < 20){ alert('Completa título (>=3) y descripción (>=20).'); return; }
				alert('Publicación creada (demo).');
			});

			// Inicial
			postType='donation';
			updateTypeUI();
			renderPreview();
		});
	</script>
</body>
</html>`;

export default function PublicarScreen() {
	const webViewRef = React.useRef<WebView>(null);

	if (Platform.OS === 'web') {
			React.useEffect(() => {
				function onMessage(e: MessageEvent) {
					try {
						const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
						if (data?.type === 'navigate' && typeof data.path === 'string') {
							router.push(data.path as any);
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
						<iframe title="Crear Publicación" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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
						if(data?.type==='navigate' && typeof data.path==='string'){
							router.push(data.path as any);
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

