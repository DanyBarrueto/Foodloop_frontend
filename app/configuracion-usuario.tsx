import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL as API_BASE } from '@/services/authService';
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

		/* Toast styles */
		.toast-root { position: fixed; top: 16px; right: 16px; z-index: 99999; display: flex; flex-direction: column; gap: 8px; }
		.toast { min-width: 240px; max-width: 360px; padding: 10px 14px; border-radius: 10px; box-shadow: 0 10px 20px rgba(0,0,0,0.08); font-size: 14px; display: flex; align-items: center; gap: 8px; border: 1px solid rgba(0,0,0,0.06); }
		.toast-success { background: #ecfdf5; color: #065f46; border-color: #a7f3d0; }
		.toast-error { background: #fef2f2; color: #991b1b; border-color: #fecaca; }
		.toast-info { background: #eff6ff; color: #1e40af; border-color: #bfdbfe; }
	</style>
</head>
<body>
  <script>
    const API_BASE_URL = '__API_BASE_URL__';
    const AUTH_TOKEN = '__AUTH_TOKEN__';
    const CURRENT_USER_ID = '__CURRENT_USER_ID__';
  </script>
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
		// Toast helpers (evitan alert/confirm bloqueados en sandbox)
		function ensureToastRoot(){ var r=document.getElementById('toastRoot'); if(!r){ r=document.createElement('div'); r.id='toastRoot'; r.className='toast-root'; document.body.appendChild(r);} return r; }
		function showToast(message, type){ var root=ensureToastRoot(); var el=document.createElement('div'); var icon = type==='success'?'✅':(type==='error'?'⚠️':'ℹ️'); el.className='toast '+(type==='success'?'toast-success':type==='error'?'toast-error':'toast-info'); el.innerHTML='<span>'+icon+'</span><span>'+String(message)+'</span>'; root.appendChild(el); setTimeout(function(){ try{ root.removeChild(el); }catch(e){} }, 3000); }

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

		// Utilidades
		function debounce(fn, wait){ var t; return function(){ var ctx=this, args=arguments; clearTimeout(t); t=setTimeout(function(){ fn.apply(ctx,args); }, wait); }; }
		function getFormData(){
			return {
				entityType: (document.getElementById('entityType')||{}).value||'',
				entityName: (document.getElementById('entityName')||{}).value||'',
				email: (document.getElementById('email')||{}).value||'',
				phone: (document.getElementById('phone')||{}).value||'',
				location: (document.getElementById('location')||{}).value||'',
				address: (document.getElementById('address')||{}).value||'',
				password: (document.getElementById('password')||{}).value||'',
				confirmPassword: (document.getElementById('confirmPassword')||{}).value||''
			};
		}
		function toBackendPayload(fd){
			var base = {
				tipoEntidad: fd.entityType,
				nombreEntidad: fd.entityName,
				correo: fd.email,
				telefono: fd.phone,
				ubicacion: fd.location,
				direccion: fd.address
			};
			if (fd.password && fd.confirmPassword && fd.password === fd.confirmPassword){ base.password = fd.password; }
			return base;
		}

		var LAST_SAVED = null; // Snapshot de últimos datos guardados (sin incluir password)

		async function loadUser(){
			try{
				if(!API_BASE_URL || !AUTH_TOKEN || !CURRENT_USER_ID){
					console.warn('Faltan credenciales para cargar usuario');
					return null;
				}
				const res = await fetch(API_BASE_URL + '/users/' + encodeURIComponent(CURRENT_USER_ID), {
					headers: { 'Accept':'application/json', 'Authorization': 'Bearer ' + AUTH_TOKEN }
				});
				if(!res.ok){ console.error('Error obteniendo usuario', res.status); return null; }
				const u = await res.json();
				var mapped = {
					entityType: u.tipoEntidad || '',
					entityName: u.nombreEntidad || '',
					email: u.correo || '',
					phone: u.telefono || '',
					location: u.ubicacion || '',
					address: u.direccion || '',
					newsletter: false
				};
				LAST_SAVED = {
					tipoEntidad: mapped.entityType,
					nombreEntidad: mapped.entityName,
					correo: mapped.email,
					telefono: mapped.phone,
					ubicacion: mapped.location,
					direccion: mapped.address
				};
				return mapped;
			}catch(e){ console.error('loadUser error', e); return null; }
		}

		async function saveUser(userData){
			try{
				if(!API_BASE_URL || !AUTH_TOKEN || !CURRENT_USER_ID){
					alert('No hay sesión activa');
					return;
				}
				const payload = toBackendPayload(userData);
				const res = await fetch(API_BASE_URL + '/users/' + encodeURIComponent(CURRENT_USER_ID), {
					method: 'PUT',
					headers: { 'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'Bearer ' + AUTH_TOKEN },
					body: JSON.stringify(payload)
				});
				const data = await res.json().catch(()=>({}));
				if(!res.ok){
					showToast('Error: ' + (data?.message || res.statusText), 'error');
					return;
				}
				showToast('Datos actualizados correctamente', 'success');
				// Actualizar snapshot (sin password)
				LAST_SAVED = {
					tipoEntidad: payload.tipoEntidad,
					nombreEntidad: payload.nombreEntidad,
					correo: payload.correo,
					telefono: payload.telefono,
					ubicacion: payload.ubicacion,
					direccion: payload.direccion
				};
				try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'userUpdated' })); } catch(e) {}
			}catch(e){ console.error('saveUser error', e); showToast('Error de conexión', 'error'); }
		}

		async function saveUserPartial(partialPayload){
			try{
				if(!API_BASE_URL || !AUTH_TOKEN || !CURRENT_USER_ID){ return; }
				if(!partialPayload || Object.keys(partialPayload).length===0) return;
				const res = await fetch(API_BASE_URL + '/users/' + encodeURIComponent(CURRENT_USER_ID), {
					method: 'PUT',
					headers: { 'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'Bearer ' + AUTH_TOKEN },
					body: JSON.stringify(partialPayload)
				});
				const data = await res.json().catch(()=>({}));
				if(!res.ok){ console.warn('Auto-guardado error:', data?.message || res.statusText); return; }
				// Merge en snapshot
				LAST_SAVED = Object.assign({}, LAST_SAVED || {}, {
					tipoEntidad: typeof partialPayload.tipoEntidad==='string' ? partialPayload.tipoEntidad : (LAST_SAVED||{}).tipoEntidad,
					nombreEntidad: typeof partialPayload.nombreEntidad==='string' ? partialPayload.nombreEntidad : (LAST_SAVED||{}).nombreEntidad,
					correo: typeof partialPayload.correo==='string' ? partialPayload.correo : (LAST_SAVED||{}).correo,
					telefono: typeof partialPayload.telefono==='string' ? partialPayload.telefono : (LAST_SAVED||{}).telefono,
					ubicacion: typeof partialPayload.ubicacion==='string' ? partialPayload.ubicacion : (LAST_SAVED||{}).ubicacion,
					direccion: typeof partialPayload.direccion==='string' ? partialPayload.direccion : (LAST_SAVED||{}).direccion
				});
				try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'userUpdated' })); } catch(e) {}
			}catch(e){ console.warn('Auto-guardado fallo de red', e); }
		}

			document.addEventListener('DOMContentLoaded', async function(){
			var form = document.getElementById('userForm');
			var data = await loadUser();
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

			// Autosave (debounced)
			var autoSaveHandler = debounce(function(){
				var fd = getFormData();
				var payload = toBackendPayload(fd);
				if(!LAST_SAVED){ LAST_SAVED = Object.assign({}, payload); return; }
				var diff = {};
				['tipoEntidad','nombreEntidad','correo','telefono','ubicacion','direccion'].forEach(function(k){
					if(typeof payload[k] !== 'undefined' && String(payload[k]||'') !== String(LAST_SAVED[k]||'')){
						diff[k] = payload[k];
					}
				});
				// password solo si viene y coincide
				if(fd.password && fd.confirmPassword && fd.password === fd.confirmPassword){ diff.password = fd.password; }
				saveUserPartial(diff);
			}, 800);

			['entityType','entityName','email','phone','location','address'].forEach(function(id){
				var el = document.getElementById(id);
				if(!el) return;
				var evt = (id==='entityType') ? 'change' : 'input';
				el.addEventListener(evt, autoSaveHandler);
			});
			['password','confirmPassword'].forEach(function(id){
				var el = document.getElementById(id);
				if(!el) return;
				el.addEventListener('input', autoSaveHandler);
			});

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
				if(formData.password && formData.password !== formData.confirmPassword){ showToast('Las contraseñas no coinciden', 'error'); return; }
				saveUser(formData);
			});

			document.getElementById('backBtn').addEventListener('click', function(){
				try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'navigate', path: '/explorador' })); } catch(e) {}
				try { if (window.top !== window && window.parent) window.parent.postMessage({ type:'navigate', path: '/explorador' }, '*'); } catch(e) {}
			});

			(function(){
				var armed = false; var timer = null;
				document.getElementById('deleteBtn').addEventListener('click', function(){
					if(!armed){
						armed = true; showToast('Pulsa nuevamente para confirmar eliminación', 'info');
						clearTimeout(timer); timer = setTimeout(function(){ armed=false; }, 4000);
						return;
					}
					armed = false; clearTimeout(timer);
					showToast('Tu cuenta ha sido eliminada (demo)', 'success');
					try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'navigate', path: '/explorador' })); } catch(e) {}
					try { if (window.top !== window && window.parent) window.parent.postMessage({ type:'navigate', path: '/explorador' }, '*'); } catch(e) {}
				});
			})();
		});
	</script>
</body>
</html>`;

export default function ConfiguracionUsuarioScreen(){
	const { token, user, isLoading } = useAuth();
	const webViewRef = React.useRef<WebView>(null);
	const htmlWithEnv = React.useMemo(()=>{
		const uid = user?.id ? String(user.id) : '';
		return html
		  .replace('__API_BASE_URL__', API_BASE)
		  .replace('__AUTH_TOKEN__', token ?? '')
		  .replace('__CURRENT_USER_ID__', uid);
	}, [token, user]);

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

		if (isLoading) {
			return (
				<SafeAreaView style={styles.safe}>
					<Navbar />
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<div style={{ color: '#4b5563' }}>Cargando…</div>
					</View>
				</SafeAreaView>
			);
		}
		return (
			<SafeAreaView style={styles.safe}>
				<Navbar />
				<View style={styles.iframeContainer}>
					<iframe key={`cfg-web-${token ? token.slice(-8) : 'anon'}`} title="Actualizar mis datos" srcDoc={htmlWithEnv} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.safe}>
			<Navbar />
			<WebView
				key={`cfg-native-${token ? token.slice(-8) : 'anon'}`}
				ref={webViewRef}
				originWhitelist={["*"]}
				source={{ html: htmlWithEnv }}
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

