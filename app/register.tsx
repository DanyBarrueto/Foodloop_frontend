import React, { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';
import embeddedCss from '@/styles/PaginaPrincipal';
import registerCss from '@/styles/Register';

export default function RegisterScreen() {
  const htmlContent = useMemo(() => `<!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>${embeddedCss}</style>
      <style>${registerCss}</style>
      <style>
        :root { color-scheme: light; }
        body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif; }
        a { color: inherit; }
      </style>
    </head>
    <body>
      <div class="register-page">
        <div class="floating-element top-10 left-10 text-6xl register-emoji-1">🥕</div>
        <div class="floating-element top-20 right-20 text-4xl register-emoji-2">🍞</div>
        <div class="floating-element bottom-20 left-20 text-5xl register-emoji-3">🍅</div>
        <div class="floating-element bottom-32 right-16 text-3xl register-emoji-4">🥬</div>
        <div class="floating-element top-1/2 left-16 text-4xl register-emoji-5">🍎</div>
        <div class="floating-element top-1/3 right-32 text-3xl register-emoji-6">🥐</div>

        <div id="container" class="auth-container w-full max-w-lg p-8 animate-slide-up relative z-10">
          <div class="text-center mb-8">
            <div class="flex justify-center mb-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-secondary text-white shadow-lg">
                <svg class="icon w-8 h-8" viewBox="0 0 24 24">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
            </div>
            <h1 class="text-3xl font-bold text-gradient mb-2">¡Únete a FoodConnect! 🌟</h1>
            <p class="text-gray-600">Crea tu cuenta y comienza a hacer la diferencia en tu comunidad</p>
          </div>

          <form id="registerForm" class="space-y-6" novalidate>
            <div class="space-y-2">
              <label for="entityType" class="block text-sm font-semibold text-gray-700">🏢 Tipo de Entidad</label>
              <select id="entityType" name="entityType" class="select-field" required>
                <option value="">Selecciona tu tipo de entidad</option>
                <option value="Restaurante">🍽️ Restaurante</option>
                <option value="Panadería">🥖 Panadería</option>
                <option value="Supermercado">🛒 Supermercado</option>
                <option value="ONG">🤝 ONG / Comedor Social</option>
                <option value="Particular">👤 Particular</option>
                <option value="Otro">🏪 Otro</option>
              </select>
            </div>

            <div class="space-y-2">
              <label for="entityName" class="block text-sm font-semibold text-gray-700">🏷️ Nombre de la Entidad</label>
              <input type="text" id="entityName" name="entityName" placeholder="Ej: Panadería La Espiga, Comedor San José..." class="input-field" required />
            </div>

            <div class="space-y-2">
              <label for="email" class="block text-sm font-semibold text-gray-700">📧 Correo Electrónico</label>
              <input type="email" id="email" name="email" placeholder="tu@email.com" class="input-field" required />
            </div>

            <div class="space-y-2">
              <label for="phone" class="block text-sm font-semibold text-gray-700">📱 Teléfono de Contacto</label>
              <input type="tel" id="phone" name="phone" placeholder="+34 600 123 456" class="input-field" required />
            </div>

            <div class="space-y-2">
              <label for="location" class="block text-sm font-semibold text-gray-700">📍 Ubicación (Ciudad)</label>
              <input type="text" id="location" name="location" placeholder="Madrid, Barcelona, Valencia..." class="input-field" required />
            </div>

            <div class="space-y-2">
              <label for="address" class="block text-sm font-semibold text-gray-700">🏠 Dirección Completa</label>
              <input type="text" id="address" name="address" placeholder="Calle, número, código postal..." class="input-field" required />
            </div>

            <div class="space-y-2">
              <label for="password" class="block text-sm font-semibold text-gray-700">🔒 Contraseña</label>
              <input type="password" id="password" name="password" placeholder="Ej: MiClave123!" class="input-field" required />
              <div class="mt-2">
                <div class="progress-bar" id="passwordStrength"></div>
                <p class="text-xs text-gray-500 mt-1" id="passwordText">💡 Debe tener: 8+ caracteres, mayúscula, minúscula, número y símbolo</p>
              </div>
            </div>

            <div class="space-y-2">
              <label for="confirmPassword" class="block text-sm font-semibold text-gray-700">🔐 Confirmar Contraseña</label>
              <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Repite tu contraseña" class="input-field" required />
              <p class="text-xs mt-1" id="matchText"></p>
            </div>

            <div class="flex items-start gap-3">
              <input type="checkbox" id="terms" name="terms" class="mt-1" required />
              <label for="terms" class="text-sm text-gray-600">Acepto los <a href="#" class="text-gradient">términos y condiciones</a> y la <a href="#" class="text-gradient">política de privacidad</a> de FoodConnect 📋</label>
            </div>

            <div id="formError" class="text-red-600 text-sm whitespace-pre-line" style="display:none;"></div>

            <button type="submit" class="btn-primary w-full" id="submitBtn">🎉 Crear mi cuenta</button>
          </form>

          <div class="mt-8 text-center">
            <p class="text-gray-600">¿Ya tienes una cuenta? <a href="/login" id="goLogin" class="text-gradient font-semibold">Inicia sesión aquí 🚀</a></p>
          </div>

          <div class="mt-6 text-center">
            <a href="/" id="goHome" class="btn-secondary">🏠 Volver al inicio</a>
          </div>
        </div>
      </div>

      <script>
        (function(){
          function ready(fn){
            if(document.readyState === 'complete' || document.readyState === 'interactive'){
              setTimeout(fn, 0);
            } else {
              document.addEventListener('DOMContentLoaded', fn);
            }
          }
          const container = document.getElementById('container');
          setTimeout(()=>{ container && container.classList.add('animate-fade-in'); }, 200);

          function postMessageToApp(data){
            if(window.ReactNativeWebView){ window.ReactNativeWebView.postMessage(JSON.stringify(data)); }
          }

          ready(function(){
            const strengthBar = document.getElementById('passwordStrength');
            const strengthText = document.getElementById('passwordText');
            const pwdInput = document.getElementById('password');
            const confInput = document.getElementById('confirmPassword');
            const matchText = document.getElementById('matchText');
            const form = document.getElementById('registerForm');
            const formError = document.getElementById('formError');

            // Estado inicial (idéntico al original)
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

            function updateMatch(p, c){
              if(!matchText) return;
              if(!c){ matchText.textContent = ''; matchText.className = 'text-xs mt-1'; return; }
              if(p === c){ matchText.textContent = '🟢 Las contraseñas coinciden'; matchText.className = 'text-xs mt-1 text-green-500'; }
              else { matchText.textContent = '🔴 Las contraseñas no coinciden'; matchText.className = 'text-xs mt-1 text-red-500'; }
            }

            function handlePwd(e){ const v = (e && e.target && e.target.value) || ''; updateStrength(v); if(confInput && confInput.value){ updateMatch(v, confInput.value); } }
            function handleConf(e){ updateMatch(pwdInput ? pwdInput.value : '', (e && e.target && e.target.value) || ''); }

            if(pwdInput){ pwdInput.addEventListener('input', handlePwd); pwdInput.addEventListener('keyup', handlePwd); pwdInput.addEventListener('change', handlePwd); }
            if(confInput){ confInput.addEventListener('input', handleConf); confInput.addEventListener('keyup', handleConf); confInput.addEventListener('change', handleConf); }

            if(form){
              form.addEventListener('submit', function(e){
                e.preventDefault();
                if(formError){ formError.style.display = 'none'; formError.textContent = ''; }
                const fd = new FormData(form);
                const p = (pwdInput && pwdInput.value) || '';
                const data = {
                  entityType: fd.get('entityType'), entityName: fd.get('entityName'), email: fd.get('email'), phone: fd.get('phone'), location: fd.get('location'), address: fd.get('address'), password: p
                };
                if(!data.entityType || !data.entityName || !data.email || !data.phone || !data.location || !data.address){ if(formError){ formError.textContent = '❌ Por favor completa todos los campos'; formError.style.display = 'block'; } return; }
                const errs = [];
                if(p.length < 8) errs.push('Mínimo 8 caracteres');
                if(!/[a-z]/.test(p)) errs.push('Al menos 1 letra minúscula');
                if(!/[A-Z]/.test(p)) errs.push('Al menos 1 letra mayúscula');
                if(!/[0-9]/.test(p)) errs.push('Al menos 1 número');
                if(!/[^A-Za-z0-9]/.test(p)) errs.push('Al menos 1 carácter especial (!@#$%^&*)');
                if(confInput && p !== confInput.value){ errs.push('Las contraseñas no coinciden'); }
                if(errs.length){ if(formError){ formError.textContent = '❌ La contraseña no cumple los requisitos mínimos:\\n\\n' + errs.join('\\n'); formError.style.display = 'block'; } return; }
                postMessageToApp({ type: 'navigate', href: '/administrador-spt' });
              });
            }

            const goLogin = document.getElementById('goLogin');
            if(goLogin){ goLogin.onclick = function(ev){ ev.preventDefault(); postMessageToApp({ type: 'navigate', href: '/login' }); }; }
            const goHome = document.getElementById('goHome');
            if(goHome){ goHome.onclick = function(ev){ ev.preventDefault(); postMessageToApp({ type: 'navigate', href: '/PantallaPrincipal' }); }; }
          });
        })();
      </script>
    </body>
  </html>`, []);

  const isWeb = Platform.OS === 'web';

  if (isWeb) {
    // Render con iframe vía srcDoc en web
    return (
      <View style={{ flex: 1 }}>
        {/* @ts-ignore - JSX intrinsic*/}
        <iframe
          srcDoc={htmlContent}
          style={{ width: '100%', height: '100%', border: 'none' }}
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation-by-user-activation"
          referrerPolicy="no-referrer"
          onLoad={(e: any) => {
            try {
              const iframeWindow = e.currentTarget.contentWindow;
              if (iframeWindow) {
                // Bridge postMessage desde iframe a app web
                window.addEventListener('message', (evt) => {
                  if (!evt || !evt.data) return;
                  let data = evt.data;
                  try { data = typeof data === 'string' ? JSON.parse(data) : data; } catch {}
                  if (data && data.type === 'navigate' && typeof data.href === 'string') {
                    router.push(data.href);
                  }
                });
                // Inyectar bridge dentro del iframe para reenviar
                iframeWindow.ReactNativeWebView = { postMessage: (msg: string) => window.postMessage(msg, '*') };
              }
            } catch {}
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data?.type === 'navigate' && typeof data.href === 'string') {
              router.push(data.href);
            }
          } catch {}
        }}
        onShouldStartLoadWithRequest={(req) => {
          const url = req.url || '';
          if (url.includes('/login')) { router.push('/login'); return false; }
          if (url.endsWith('/PantallaPrincipal') || url.endsWith('/')) { router.push('/PantallaPrincipal'); return false; }
          return true;
        }}
        javaScriptEnabled
        setSupportMultipleWindows={false}
        domStorageEnabled
        showsVerticalScrollIndicator={false}
        injectedJavaScriptBeforeContentLoaded={`(function(){
          document.addEventListener('click', function(e){
            const a = e.target && e.target.closest('a');
            if(a && a.getAttribute('href')){
              const href = a.getAttribute('href');
              if(href && (href==='/login' || href==='/' || href==='/PantallaPrincipal')){
                e.preventDefault();
                if(window.ReactNativeWebView){ window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'navigate', href: href==='/'?'/PantallaPrincipal':href })); }
              }
            }
          }, true);
        })();`}
      />
    </View>
  );
}
