import { useAuth } from '@/context/AuthContext';
import { loginUser, resetPassword } from '@/services/authService';
import loginCss from '@/styles/Login';
import embeddedCss from '@/styles/PaginaPrincipal';
import { storage } from '@/utils/storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Iniciar Sesión</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              50: '#f0fdf4',
              100: '#dcfce7',
              200: '#bbf7d0',
              300: '#86efac',
              400: '#4ade80',
              500: '#22c55e',
              600: '#16a34a',
              700: '#15803d',
              800: '#166534',
              900: '#14532d',
            },
            secondary: {
              50: '#fff7ed',
              100: '#ffedd5',
              200: '#fed7aa',
              300: '#fdba74',
              400: '#fb923c',
              500: '#f97316',
              600: '#ea580c',
              700: '#c2410c',
              800: '#9a3412',
              900: '#7c2d12',
            },
            accent: {
              50: '#f0f9ff',
              100: '#e0f2fe',
              200: '#bae6fd',
              300: '#7dd3fc',
              400: '#38bdf8',
              500: '#0ea5e9',
              600: '#0284c7',
              700: '#0369a1',
              800: '#075985',
              900: '#0c4a6e',
            }
          },
          fontFamily: { 'sans': ['Inter','system-ui','sans-serif'] },
          animation: { 'fade-in': 'fadeIn 1s ease-in-out','slide-up': 'slideUp 0.8s ease-out','float': 'float 6s ease-in-out infinite' }
        }
      }
    }
  </script>
  <style>
    ${embeddedCss}
    ${loginCss}
  </style>
</head>
<body class="bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 font-sans">
  <div class="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
    <!-- Floating Background Elements -->
    <div class="floating-element top-10 left-10 text-6xl login-emoji-1">🥕</div>
    <div class="floating-element top-20 right-20 text-4xl login-emoji-2">🍞</div>
    <div class="floating-element bottom-20 left-20 text-5xl login-emoji-3">🍅</div>
    <div class="floating-element bottom-32 right-16 text-3xl login-emoji-4">🥬</div>
    <div class="floating-element top-1/2 left-16 text-4xl login-emoji-5">🍎</div>
    <div class="floating-element top-1/3 right-32 text-3xl login-emoji-6">🥐</div>

    <!-- Main Container -->
    <div id="container" class="auth-container w-full max-w-md p-8 animate-slide-up relative z-10 opacity-0 translate-y-6 transition-all">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">¡Bienvenido de vuelta! 👋</h1>
        <p class="text-gray-600">Inicia sesión para continuar ayudando a tu comunidad</p>
      </div>

      <!-- Login Form -->
  <form id="loginForm" class="space-y-6">
        <!-- Email -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-semibold text-gray-700">📧 Correo Electrónico</label>
          <input type="email" id="email" name="email" placeholder="tu@email.com" class="input-field" required />
        </div>
        <!-- Password -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-semibold text-gray-700">🔒 Contraseña</label>
          <input type="password" id="password" name="password" placeholder="••••••••" class="input-field" required />
        </div>
        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between text-sm">
          <a href="#" id="forgotLink" class="text-primary-600 hover:text-primary-700 font-medium">¿Olvidaste tu contraseña?</a>
        </div>
        <div id="error" class="error-text hidden"></div>
  <button type="submit" id="submitBtn" class="btn-login-primary w-full">🚀 Iniciar Sesión</button>
      </form>

      <!-- Register Link -->
      <div class="mt-8 text-center">
        <p class="text-gray-600">¿No tienes una cuenta? <a href="/register" class="text-primary-600 hover:text-primary-700 font-semibold" onclick="try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:'/register'}));event.preventDefault();}catch(e){}">Regístrate aquí 🎉</a></p>
      </div>
      <!-- Back to Home -->
      <div class="mt-6 text-center">
        <a href="/PantallaPrincipal" class="btn-secondary" onclick="try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:'/PantallaPrincipal'}));event.preventDefault();}catch(e){}">🏠 Volver al inicio</a>
      </div>
    </div>
  </div>

  <!-- Modal Reset Password -->
  <div id="resetModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6">
      <h3 class="text-lg font-semibold text-gray-900">Restablecer contraseña</h3>
      <p class="text-sm text-gray-600 mt-1">Ingresa tu correo y la nueva contraseña.</p>
      <div class="mt-4 space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700">Correo</label>
          <input id="resetEmail" type="email" class="input-field" placeholder="tu@email.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Nueva contraseña</label>
          <input id="resetPassword" type="password" class="input-field" placeholder="••••••••" />
          <div class="mt-2">
            <div class="progress-bar" id="resetPasswordStrength"></div>
            <p class="text-xs text-gray-500 mt-1" id="resetPasswordText">💡 Debe tener: 8+ caracteres, mayúscula, minúscula, número y símbolo</p>
          </div>
        </div>
        <div id="resetError" class="text-sm text-red-600 hidden"></div>
      </div>
      <div class="mt-6 flex justify-end gap-3">
        <button id="resetCancel" class="btn-secondary">Cancelar</button>
        <button id="resetSubmit" class="btn-primary">Actualizar</button>
      </div>
    </div>
  </div>

  <script>
    // animación de entrada
    setTimeout(()=>{
      const c = document.getElementById('container');
      if(c){ c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }
    }, 200);

    // Escuchar mensajes desde React Native
    if(window.ReactNativeWebView) {
      document.addEventListener('message', function(event) {
        try {
          const data = JSON.parse(event.data);
          if(data.type === 'login_error') {
            const error = document.getElementById('error');
            const submitBtn = document.getElementById('submitBtn');
            if(error) {
              error.textContent = data.message;
              error.classList.remove('hidden');
            }
            if(submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = '🚀 Iniciar Sesión';
            }
          }
        } catch(e) {
          console.error('Error procesando mensaje:', e);
        }
      });
    }

    // manejo de submit con API real
    document.getElementById('loginForm').addEventListener('submit', async function(e){
      e.preventDefault();
      const email = (document.getElementById('email')||{}).value || '';
      const password = (document.getElementById('password')||{}).value || '';
      const error = document.getElementById('error');
      const submitBtn = document.getElementById('submitBtn');
      
      // Validación básica
      if(!email || !password){ 
        if(error){ 
          error.textContent='Por favor, completa todos los campos'; 
          error.classList.remove('hidden'); 
        } 
        return; 
      }

      // Mostrar estado de carga
      if(submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '🔄 Iniciando sesión...';
      }
      if(error) {
        error.classList.add('hidden');
      }

      try{
        // Enviar credenciales al React Native para manejar la API
        if(window.ReactNativeWebView && window.ReactNativeWebView.postMessage){
          window.ReactNativeWebView.postMessage(JSON.stringify({ 
            type: 'login', 
            credentials: { email, password }
          }));
        } else {
          // Para web: realizar petición directa
          const response = await fetch('http://localhost:4001/foodloop/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || \`Error \${response.status}: \${response.statusText}\`);
          }

          // Éxito en web: notificar al parent (iframe) para que guarde y navegue
          try {
            if (window.parent && window.parent !== window) {
              try { console.log('[WEB-IFRAME] Respuesta login data:', data); } catch(e) {}
              const payload = {
                token: (data && (data.token || (data.data && data.data.token))) || null,
                user: (data && (data.user || data.usuario || (data.data && data.data.user))) || null,
                email,
              };
              try { console.log('[WEB-IFRAME] Enviando payload al parent:', payload); } catch(e) {}
              window.parent.postMessage({ type: 'login_success', payload }, '*');
            } else {
              const estado = Number(data.user?.estado);
              const path = estado === 2 ? '/admin' : '/explorador';
              window.top && (window.top.location.href = path);
            }
          } catch {}
        }
      } catch(err){ 
        console.error('Error en login:', err);
        if(error){ 
          error.textContent = err.message || 'No se pudo iniciar sesión. Verifica que el servidor esté ejecutándose.'; 
          error.classList.remove('hidden'); 
        }
      } finally {
        // Restaurar botón
        if(submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '🚀 Iniciar Sesión';
        }
      }
    });

    // Forgot password modal logic
    (function(){
      const forgot = document.getElementById('forgotLink');
      const modal = document.getElementById('resetModal');
      const emailEl = document.getElementById('resetEmail');
      const passEl = document.getElementById('resetPassword');
      const errEl = document.getElementById('resetError');
      const cancelBtn = document.getElementById('resetCancel');
      const submitBtn = document.getElementById('resetSubmit');
      const strengthBar = document.getElementById('resetPasswordStrength');
      const strengthText = document.getElementById('resetPasswordText');

      // Estado inicial
      if (strengthBar) { strengthBar.className = 'progress-bar strength-weak'; }
      if (strengthText) {
        try {
          strengthText.textContent = '💡 Debe tener: 8+ caracteres, mayúscula, minúscula, número y símbolo';
        } catch(_) {
          strengthText.textContent = 'Debe tener: 8+ caracteres, mayúscula, minúscula, número y símbolo';
        }
        strengthText.className = 'text-xs text-gray-500 mt-1';
      }

      function updateStrength(pwd){
        if(!strengthBar || !strengthText) return;
        let strength = 0; let missingRequirements = [];
        if (pwd.length >= 8) strength++; else missingRequirements.push('8 caracteres mínimo');
        if (/[a-z]/.test(pwd)) strength++; else missingRequirements.push('1 letra minúscula (a-z)');
        if (/[A-Z]/.test(pwd)) strength++; else missingRequirements.push('1 letra mayúscula (A-Z)');
        if (/[0-9]/.test(pwd)) strength++; else missingRequirements.push('1 número (0-9)');
        if (/[^A-Za-z0-9]/.test(pwd)) strength++; else missingRequirements.push('1 carácter especial (!@#$%^&*)');
        strengthBar.className = 'progress-bar';
        if (strength === 0) {
          strengthBar.classList.add('strength-weak');
          try { strengthText.textContent = '🔴 Agrega al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos'; }
          catch(_) { strengthText.textContent = 'Agrega al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos'; }
          strengthText.className = 'text-xs text-red-500 mt-1';
        } else if (strength === 1) {
          strengthBar.classList.add('strength-weak');
          try { strengthText.textContent = '🟠 Necesitas: ' + missingRequirements.join(' + '); }
          catch(_) { strengthText.textContent = 'Necesitas: ' + missingRequirements.join(' + '); }
          strengthText.className = 'text-xs text-orange-500 mt-1';
        } else if (strength === 2) {
          strengthBar.classList.add('strength-weak');
          try { strengthText.textContent = '🟠 Te faltan: ' + missingRequirements.join(' + '); }
          catch(_) { strengthText.textContent = 'Te faltan: ' + missingRequirements.join(' + '); }
          strengthText.className = 'text-xs text-orange-500 mt-1';
        } else if (strength === 3) {
          strengthBar.classList.add('strength-fair');
          try { strengthText.textContent = '🟡 ¡Casi! Solo necesitas: ' + missingRequirements.join(' + '); }
          catch(_) { strengthText.textContent = '¡Casi! Solo necesitas: ' + missingRequirements.join(' + '); }
          strengthText.className = 'text-xs text-yellow-500 mt-1';
        } else if (strength === 4) {
          strengthBar.classList.add('strength-good');
          try { strengthText.textContent = '🟡 ¡Excelente progreso! Solo falta: ' + missingRequirements.join(''); }
          catch(_) { strengthText.textContent = '¡Excelente progreso! Solo falta: ' + missingRequirements.join(''); }
          strengthText.className = 'text-xs text-yellow-500 mt-1';
        } else if (strength === 5) {
          strengthBar.classList.add('strength-strong');
          try { strengthText.textContent = '🟢 ¡Contraseña perfecta! Cumple todos los requisitos de seguridad'; }
          catch(_) { strengthText.textContent = '¡Contraseña perfecta! Cumple todos los requisitos de seguridad'; }
          strengthText.className = 'text-xs text-green-500 mt-1';
        }
      }

      function openModal(){ if(modal){ modal.style.display='flex'; } if(errEl){ errEl.classList.add('hidden'); errEl.textContent=''; } }
      function closeModal(){ if(modal){ modal.style.display='none'; } }

      if(forgot){ forgot.addEventListener('click', function(e){ e.preventDefault(); openModal(); }); }
      if(cancelBtn){ cancelBtn.addEventListener('click', function(e){ e.preventDefault(); closeModal(); }); }
      
      // Listeners para actualizar fortaleza en tiempo real
      if(passEl){ 
        passEl.addEventListener('input', function(e){ updateStrength((e && e.target && e.target.value) || ''); }); 
        passEl.addEventListener('keyup', function(e){ updateStrength((e && e.target && e.target.value) || ''); }); 
        passEl.addEventListener('change', function(e){ updateStrength((e && e.target && e.target.value) || ''); }); 
      }

      if(submitBtn){
        submitBtn.addEventListener('click', async function(e){
          e.preventDefault();
          const email = (emailEl||{}).value || '';
          const newPassword = (passEl||{}).value || '';
          if(!email || !newPassword){ if(errEl){ errEl.textContent='Completa correo y nueva contraseña'; errEl.classList.remove('hidden'); } return; }
          // Validación básica de formato email
          if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ if(errEl){ errEl.textContent='Correo inválido'; errEl.classList.remove('hidden'); } return; }
          
          // Validar fortaleza de contraseña
          const errs = [];
          if(newPassword.length < 8) errs.push('Mínimo 8 caracteres');
          if(!/[a-z]/.test(newPassword)) errs.push('Al menos 1 letra minúscula');
          if(!/[A-Z]/.test(newPassword)) errs.push('Al menos 1 letra mayúscula');
          if(!/[0-9]/.test(newPassword)) errs.push('Al menos 1 número');
          if(!/[^A-Za-z0-9]/.test(newPassword)) errs.push('Al menos 1 carácter especial (!@#$%^&*)');
          if(errs.length){ if(errEl){ errEl.textContent = '❌ La nueva contraseña no cumple los requisitos:\\n\\n' + errs.join('\\n'); errEl.classList.remove('hidden'); } return; }
          
          // RN: enviar a contenedor, Web: fetch directo
          try{
            if(window.ReactNativeWebView && window.ReactNativeWebView.postMessage){
              window.ReactNativeWebView.postMessage(JSON.stringify({ type:'reset_password', payload:{ email, newPassword } }));
            } else {
              const resp = await fetch('http://localhost:4001/foodloop/users/reset-password', {
                method: 'POST', headers: { 'Content-Type':'application/json','Accept':'application/json' }, body: JSON.stringify({ email, newPassword })
              });
              const data = await resp.json();
              if(!resp.ok){ throw new Error(data.message || 'No se pudo actualizar la contraseña'); }
              closeModal();
              // Feedback ligero
              alert('Contraseña actualizada. Ahora puedes iniciar sesión.');
            }
          }catch(err){ if(errEl){ errEl.textContent = (err && err.message) || 'Error al actualizar la contraseña'; errEl.classList.remove('hidden'); } }
        });
      }
    })();
  </script>
</body>
</html>`;

export default function LoginScreen() {
  const webViewRef = React.useRef<WebView>(null);
  const { isAuthenticated } = useAuth();

  // Si ya hay sesión iniciada, redirigir automáticamente
  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const user = await storage.getUserData();
        console.log('DEBUG - Usuario almacenado:', user, 'Estado:', user?.estado, 'Tipo:', typeof user?.estado);
        const estado = Number(user?.estado);
        console.log('DEBUG - Estado convertido en useEffect:', estado, 'Ruta elegida:', estado === 2 ? '/admin' : '/explorador');
        const path = estado === 2 ? '/admin' : '/explorador';
        router.replace(path as any);
      }
    })();
  }, [isAuthenticated]);

  // Función para enviar mensajes al WebView
  const sendMessageToWebView = (message: any) => {
    if (webViewRef.current) {
      const js = `
        document.dispatchEvent(new MessageEvent('message', {
          data: '${JSON.stringify(message)}'
        }));
      `;
      webViewRef.current.injectJavaScript(js);
    }
  };

  // Función para manejar el login
  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      const result = await loginUser(credentials);
      
    if (result.success && result.user) {
        // Determinar la ruta según el estado del usuario
  const estado = Number(result.user.estado);
  const path = estado === 2 ? '/admin' : '/explorador';
  router.replace(path as any);
      } else {
        // Enviar error de vuelta al WebView
        const errorMessage = result.message || 'Error desconocido en el login';
        sendMessageToWebView({
          type: 'login_error',
          message: errorMessage
        });
      }
    } catch (error) {
      console.error('Error inesperado en login:', error);
      sendMessageToWebView({
        type: 'login_error',
        message: 'Error de conexión. Verifica que el servidor esté ejecutándose.'
      });
    }
  };

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.iframeContainer}>
          {/* eslint-disable-next-line react/no-danger */}
          <iframe
            title="Login HTML"
            srcDoc={html}
            style={styles.iframe}
            sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation"
            onLoad={() => {
              // Escuchar mensajes del iframe para guardar token/usuario en web puro
              const handler = async (event: MessageEvent) => {
                try {
                  const data = event.data;
                  try { console.log('[PARENT] Mensaje recibido:', data); } catch(e) {}
                  if (data && data.type === 'login_success' && data.payload) {
                    let payload: any = data.payload;
                    if (typeof payload === 'string') {
                      try { payload = JSON.parse(payload); } catch(err) { try { console.warn('[PARENT] No se pudo parsear payload string:', err); } catch(e) {} }
                    }
                    const token = payload?.token || (payload?.data && payload.data.token);
                    let user = payload?.user || payload?.usuario || (payload?.data && payload.data.user) || null;
                    const email = payload?.email || payload?.correo || (user && (user.correo || user.email)) || null;
                    if (token) await storage.setToken(token);
                    // Fallback: si no vino user pero tenemos token y email, consultar backend
                    if (!user && token && email) {
                      try {
                        const resp = await fetch('http://localhost:4001/foodloop/users/email/' + encodeURIComponent(email), {
                          method: 'GET',
                          headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json' }
                        });
                        const udata = await resp.json();
                        if (resp.ok) { user = udata; }
                      } catch (err) {
                        try { console.warn('[PARENT] Fallback obtener usuario por email falló:', err); } catch(_) {}
                      }
                    }
                    if (user) await storage.setUserData(user);
                    try { console.log('[PARENT] Estado recibido del usuario:', user?.estado, 'typeof:', typeof user?.estado); } catch(e) {}
                    const estado = Number(user?.estado);
                    const path = estado === 2 ? '/admin' : '/explorador';
                    router.replace(path as any);
                  }
                } catch {}
              };
              window.addEventListener('message', handler as any);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safe}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        injectedJavaScriptBeforeContentLoaded={`
          (function(){
            document.addEventListener('click', function(e){
              const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
              if(!a) return;
              const href = a.getAttribute('href');
              if(href && (href.startsWith('/') || href.startsWith('#'))){
                try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:href}));}catch(e){}
                e.preventDefault();
              }
            }, true);
          })();
        `}
        onShouldStartLoadWithRequest={(request) => {
          const url = request?.url || '';
          if (url.includes('/PantallaPrincipal') || url.includes('/register') || url.includes('/explorador') || url.includes('/admin')) {
            const path = url.includes('/admin') ? '/admin' : url.includes('/explorador') ? '/explorador' : url.includes('/register') ? '/register' : '/PantallaPrincipal';
            // Tipado laxo porque estas rutas pueden no estar tipadas aún
            router.replace(path as any);
            return false;
          }
          return true;
        }}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data?.type === 'navigate' && typeof data.path === 'string') {
              router.replace(data.path as any);
            } else if (data?.type === 'login' && data.credentials) {
              // Manejar petición de login desde el WebView
              handleLogin(data.credentials);
            } else if (data?.type === 'reset_password' && data.payload) {
              // Manejar reset de contraseña en RN
              const payload = data.payload as { email: string; newPassword: string };
              (async () => {
                const res = await resetPassword(payload);
                const js = res.success
                  ? `(() => { const m=document.getElementById('resetModal'); if(m){ m.style.display='none'; } })(); true;`
                  : `(() => { const e=document.getElementById('resetError'); if(e){ e.textContent=${JSON.stringify(res.message || 'No se pudo actualizar la contraseña')}; e.classList.remove('hidden'); } })(); true;`;
                if (webViewRef.current) {
                  webViewRef.current.injectJavaScript(js);
                }
              })();
            }
          } catch (error) {
            console.error('Error procesando mensaje del WebView:', error);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  webview: { flex: 1 },
  iframeContainer: { flex: 1, width: '100%', height: '100%' },
  iframe: { borderWidth: 0, width: '100%', height: '100vh' } as any,
});
