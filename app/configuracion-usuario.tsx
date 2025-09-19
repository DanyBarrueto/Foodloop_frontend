import ConfiguracionUsuarioCss from '@/styles/ConfiguracionUsuario';
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
	<title>Actualizar mis datos</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	<style>
		body { margin:0; padding:0; font-family: 'Inter', sans-serif; }
		${embeddedCss}
		${ConfiguracionUsuarioCss}
	</style>
</head>
<body>
	<div class="flex items-center justify-center min-h-screen p-4 relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-orange-50">
		<div class="absolute top-10 left-10 text-6xl opacity-60 animate-bounce" style="animation-delay: 0s;">🥕</div>
		<div class="absolute top-20 right-20 text-4xl opacity-60 animate-bounce" style="animation-delay: 1s;">🍞</div>
		<div class="absolute bottom-20 left-20 text-5xl opacity-60 animate-bounce" style="animation-delay: 2s;">🍅</div>

		<div class="w-full max-w-lg p-8 relative z-10 bg-white/95 backdrop-blur-sm border border-white/30 rounded-3xl shadow-2xl">
			<div class="text-center mb-6">
				<div class="flex justify-center mb-4">
					<div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg">
						<svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
							<circle cx="9" cy="7" r="4"/>
						</svg>
					</div>
				</div>
				<h1 class="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-1">Actualizar mis datos</h1>
				<p class="text-gray-600 text-sm">Modifica tu información y guarda los cambios</p>
			</div>

			<form id="userForm" class="space-y-5">
				<div>
					<label for="entityType" class="block text-sm font-semibold text-gray-700 mb-2">🏢 Tipo de Entidad</label>
					<select id="entityType" name="entityType" class="select-field focus:ring-4 focus:ring-green-100" required>
						<option value="">Selecciona tu tipo de entidad</option>
						<option value="Restaurante">🍽️ Restaurante</option>
						<option value="Panadería">🥖 Panadería</option>
						<option value="Supermercado">🛒 Supermercado</option>
						<option value="ONG">🤝 ONG / Comedor Social</option>
						<option value="Particular">👤 Particular</option>
						<option value="Otro">🏪 Otro</option>
					</select>
				</div>

				<div>
					<label for="entityName" class="block text-sm font-semibold text-gray-700 mb-2">🏷️ Nombre de la Entidad</label>
					<input id="entityName" name="entityName" type="text" class="input-field focus:ring-4 focus:ring-green-100" placeholder="Ej: Panadería La Espiga" required />
				</div>

				<div>
					<label for="email" class="block text-sm font-semibold text-gray-700 mb-2">📧 Correo Electrónico</label>
					<input id="email" name="email" type="email" class="input-field focus:ring-4 focus:ring-green-100" placeholder="tu@email.com" required />
				</div>

				<div>
					<label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">📱 Teléfono de Contacto</label>
					<input id="phone" name="phone" type="tel" class="input-field focus:ring-4 focus:ring-green-100" placeholder="+34 600 123 456" />
				</div>

				<div>
					<label for="location" class="block text-sm font-semibold text-gray-700 mb-2">📍 Ubicación (Ciudad)</label>
					<input id="location" name="location" type="text" class="input-field focus:ring-4 focus:ring-green-100" placeholder="Madrid, Barcelona..." />
				</div>

				<div>
					<label for="address" class="block text-sm font-semibold text-gray-700 mb-2">🏠 Dirección Completa</label>
					<input id="address" name="address" type="text" class="input-field focus:ring-4 focus:ring-green-100" placeholder="Calle, número, código postal..." />
				</div>

				<div>
					<label for="password" class="block text-sm font-semibold text-gray-700 mb-2">🔒 Nueva Contraseña (opcional)</label>
					<input id="password" name="password" type="password" class="input-field focus:ring-4 focus:ring-green-100" placeholder="Dejar en blanco para mantener la actual" />
					<div class="mt-2">
						<div class="h-1 bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full overflow-hidden">
							<div id="passwordBar" class="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 transition-all duration-300" style="width: 0;"></div>
						</div>
						<p id="passwordHint" class="text-xs text-gray-500 mt-1">Deja en blanco si no quieres cambiarla</p>
					</div>
				</div>

				<div>
					<label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">🔐 Confirmar Nueva Contraseña</label>
					<input id="confirmPassword" name="confirmPassword" type="password" class="input-field focus:ring-4 focus:ring-green-100" placeholder="Repite la nueva contraseña" />
				</div>

				<div class="flex items-start gap-3">
					<input type="checkbox" id="newsletter" name="newsletter" class="mt-1 h-4 w-4 text-green-600 rounded border-green-300 focus:ring-green-500" />
					<label for="newsletter" class="text-sm text-gray-600">Quiero recibir noticias y actualizaciones 📬</label>
				</div>

				<div class="flex gap-3">
					<button type="submit" class="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl">💾 Guardar cambios</button>
					<button type="button" id="backBtn" class="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl">↩️ Volver</button>
				</div>

				<div class="text-right">
					<button type="button" id="deleteBtn" class="text-sm text-red-600 hover:text-red-700 hover:underline transition-colors">Eliminar cuenta</button>
				</div>
			</form>
		</div>
	</div>

	<script>
		function checkPasswordStrength(password){
			var strength = 0; var feedback = [];
			if(password.length >= 8) { strength++; } else { feedback.push('Mínimo 8 caracteres'); }
			if(/[a-z]/.test(password)) { strength++; } else { feedback.push('Una minúscula'); }
			if(/[A-Z]/.test(password)) { strength++; } else { feedback.push('Una mayúscula'); }
			if(/[0-9]/.test(password)) { strength++; } else { feedback.push('Un número'); }
			if(/[^A-Za-z0-9]/.test(password)) { strength++; } else { feedback.push('Un símbolo'); }

			var bar = document.getElementById('passwordBar');
			var hint = document.getElementById('passwordHint');
			if(password.length === 0){ bar.style.width = '0%'; hint.textContent = 'Deja en blanco si no quieres cambiarla'; hint.className = 'text-xs text-gray-500 mt-1'; return; }
			var widths = ['25%','50%','75%','100%','100%'];
			bar.style.width = widths[Math.min(strength-1, widths.length-1)] || '25%';
			if(strength <= 1){ hint.textContent = 'Contraseña débil: ' + feedback.join(', '); hint.className = 'text-xs text-red-500 mt-1'; }
			else if(strength === 2){ hint.textContent = 'Contraseña regular: ' + feedback.join(', '); hint.className = 'text-xs text-yellow-500 mt-1'; }
			else if(strength === 3){ hint.textContent = 'Buena contraseña'; hint.className = 'text-xs text-orange-500 mt-1'; }
			else { hint.textContent = 'Contraseña fuerte 💪'; hint.className = 'text-xs text-green-500 mt-1'; }
		}

		function loadUser(){
			// Simulación de datos existentes
			return { entityType:'restaurant', entityName:'Demo Restaurante', email:'demo@foodconnect.com', phone:'+34 600 123 456', location:'Madrid', address:'Calle Falsa 123', newsletter:true };
		}
		function saveUser(userData){
			console.log('Guardando usuario:', userData);
			alert('✅ Datos actualizados correctamente');
		}

		document.addEventListener('DOMContentLoaded', function(){
			var form = document.getElementById('userForm');
			var data = loadUser();
			if(data){
				document.getElementById('entityType').value = data.entityType || '';
				document.getElementById('entityName').value = data.entityName || '';
				document.getElementById('email').value = data.email || '';
				document.getElementById('phone').value = data.phone || '';
				document.getElementById('location').value = data.location || '';
				document.getElementById('address').value = data.address || '';
				document.getElementById('newsletter').checked = !!data.newsletter;
			}

			document.getElementById('password').addEventListener('input', function(e){ checkPasswordStrength(e.target.value||''); });

			form.addEventListener('submit', function(e){
				e.preventDefault();
				var formData = {
					entityType: (document.getElementById('entityType')||{}).value||'',
					entityName: (document.getElementById('entityName')||{}).value||'',
					email: (document.getElementById('email')||{}).value||'',
					phone: (document.getElementById('phone')||{}).value||'',
					location: (document.getElementById('location')||{}).value||'',
					address: (document.getElementById('address')||{}).value||'',
					password: (document.getElementById('password')||{}).value||'',
					confirmPassword: (document.getElementById('confirmPassword')||{}).value||'',
					newsletter: !!((document.getElementById('newsletter')||{}).checked)
				};
				if(formData.password && formData.password !== formData.confirmPassword){ alert('Las contraseñas no coinciden'); return; }
				saveUser(formData);
			});

			document.getElementById('backBtn').addEventListener('click', function(){
				try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'navigate', path: '/explorador' })); } catch(e) {}
				try { if (window.top !== window && window.parent) window.parent.postMessage({ type:'navigate', path: '/explorador' }, '*'); } catch(e) {}
			});

			document.getElementById('deleteBtn').addEventListener('click', function(){
				if(!confirm('¿Seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
				alert('Tu cuenta ha sido eliminada (demo).');
				try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'navigate', path: '/explorador' })); } catch(e) {}
				try { if (window.top !== window && window.parent) window.parent.postMessage({ type:'navigate', path: '/explorador' }, '*'); } catch(e) {}
			});
		});
	</script>
</body>
</html>`;

export default function ConfiguracionUsuarioScreen(){
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
					<iframe title="Actualizar mis datos" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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

