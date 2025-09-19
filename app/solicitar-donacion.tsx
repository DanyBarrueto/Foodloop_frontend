import embeddedCss from '@/styles/PaginaPrincipal';
import SolicitarDonacionCss from '@/styles/SolicitarDonacion';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Solicitar Donación</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    ${embeddedCss}
    ${SolicitarDonacionCss}
  </style>
  <script>
    tailwind.config = { theme: { extend: { fontFamily: { 'sans': ['Inter','system-ui','sans-serif'] } } } };
  </script>
</head>
<body class="solicitar-donacion-page">
  <header class="header-glass sticky top-0 z-20">
    <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="pulse-ring absolute inset-0 rounded-full bg-green-400 opacity-30"></div>
          <div class="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg">🤝</div>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Solicitar Donación</h1>
          <p class="text-sm text-gray-600">Recibe alimentos gratuitos</p>
        </div>
      </div>
      <a id="btnBack" href="/explorador" target="_top" class="btn-secondary">
        <svg class="icon w-4 h-4" viewBox="0 0 24 24"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
        Volver
      </a>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 py-8">
    <div class="text-center mb-10 animate-fade-in">
      <div class="text-6xl mb-3">🤝</div>
      <h2 class="text-4xl font-bold text-gray-800 mb-2">Solicitar Donación</h2>
      <p class="text-gray-600 max-w-xl mx-auto">Solicita esta donación gratuita. Solo necesitas completar algunos detalles básicos.</p>
    </div>

    <div class="product-info animate-slide-up">
      <div class="flex items-center gap-4 mb-3">
        <div class="text-4xl">🥕</div>
        <div>
          <h3 class="text-xl font-bold text-gray-800">Excedente de verduras frescas</h3>
          <p class="text-sm text-gray-600">Comedor Solidario San José - Madrid</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="badge badge-green">Disponible hoy</span>
            <span class="badge badge-accent">Prioridad media</span>
          </div>
        </div>
      </div>
      <p class="text-gray-700 text-sm">Tenemos una gran cantidad de verduras variadas: zanahorias, lechugas, tomates y pimientos. Perfectas para comedores sociales o familias necesitadas.</p>
    </div>

    <div id="successMessage" class="success-message hidden">¡Solicitud enviada correctamente! El donante se pondrá en contacto contigo pronto.</div>
    <div id="errorMessage" class="error-message hidden">Error al enviar la solicitud. Por favor verifica los campos.</div>

    <section class="card p-8 animate-slide-up">
      <form id="donationForm" class="space-y-6" novalidate>
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg class="icon text-green-500" viewBox="0 0 24 24"><path d="M3 7l9-4 9 4-9 4-9-4v6" /><path d="M3 13l9 4 9-4" /><path d="M3 17l9 4 9-4" /></svg>
            Información de Entrega
          </h3>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">¿Cómo prefieres recibir la donación?</label>
            <select id="deliveryPreference" class="select-field" required>
              <option value="recoger">Recoger personalmente</option>
              <option value="coordinar">Coordinar recogida con voluntario</option>
              <option value="enviar">Necesito envío (si es posible)</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Horario preferido para coordinar</label>
            <select id="timePreference" class="select-field" required>
              <option value="manana">Mañana (8am - 12pm)</option>
              <option value="tarde">Tarde (12pm - 5pm)</option>
              <option value="noche">Noche (5pm - 9pm)</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg class="icon text-green-500" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" /><path d="M12 17v1" /><circle cx="12" cy="12" r="10" /></svg>
            Situación Económica (Opcional)
          </h3>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Describe brevemente tu situación económica</label>
            <textarea id="economicSituation" class="textarea-field" placeholder="Ej: Actualmente estamos apoyando a 15 familias y nuestros recursos son limitados."></textarea>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg class="icon text-green-500" viewBox="0 0 24 24"><path d="M4 4h16v12H5.17L4 17.17V4z" /></svg>
            Mensaje Adicional
          </h3>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mensaje para el Donante</label>
            <textarea id="message" class="textarea-field" placeholder="Explica por qué solicitas esta donación y cómo será utilizada."></textarea>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <input id="terms" type="checkbox" class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
          <label for="terms" class="text-sm text-gray-600">Confirmo que la información proporcionada es verídica y acepto los términos y condiciones.</label>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 pt-6">
          <button id="submitBtn" type="submit" class="btn-primary flex-1">Enviar Solicitud</button>
          <a id="btnCancel" href="/explorador" target="_top" class="btn-cancelar">Cancelar</a>
        </div>
      </form>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
      <div class="card p-6 text-center">
        <div class="text-4xl mb-3">🤝</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Completamente Gratuito</h3>
        <p class="text-sm text-gray-600">Esta donación es completamente gratuita. Solo necesitas coordinar la recogida.</p>
      </div>
      <div class="card p-6 text-center">
        <div class="text-4xl mb-3">🔒</div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Información Confidencial</h3>
        <p class="text-sm text-gray-600">Tu información se mantiene privada y solo se usa para coordinar la donación.</p>
      </div>
    </div>
  </main>

  <script>
    (function(){
      function qs(id){ return document.getElementById(id); }
      var form = qs('donationForm');
      var success = qs('successMessage');
      var error = qs('errorMessage');
      var submitBtn = qs('submitBtn');
      var btnBack = document.getElementById('btnBack');
      var btnCancel = document.getElementById('btnCancel');
      var navMsg = JSON.stringify({ type: 'navigate', path: '/explorador' });

      function show(el){ el.classList.remove('hidden'); }
      function hide(el){ el.classList.add('hidden'); }

      function navigateToExplorer(){
        try {
          var rnwv = (window && window['ReactNativeWebView']) || (window['webkit'] && window['webkit']['messageHandlers'] && window['webkit']['messageHandlers']['ReactNativeWebView']);
          if (rnwv && typeof rnwv.postMessage === 'function') { rnwv.postMessage(navMsg); }
        } catch(e){}
        try { if (window.parent && window.parent !== window && typeof window.parent.postMessage === 'function') { window.parent.postMessage(navMsg, '*'); } } catch(e){}
      }

      if(btnBack){ btnBack.addEventListener('click', navigateToExplorer); }
      if(btnCancel){ btnCancel.addEventListener('click', navigateToExplorer); }

      form.addEventListener('submit', function(e){
        e.preventDefault();
        hide(success); hide(error);
        if(!qs('terms').checked){ show(error); return; }
        submitBtn.disabled = true; submitBtn.classList.add('opacity-70');
        setTimeout(function(){ show(success); submitBtn.disabled = false; submitBtn.classList.remove('opacity-70'); form.reset(); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 800);
      });
    })();
  </script>
</body>
</html>`;

export default function SolicitarDonacionScreen(){
  const router = useRouter();

  // Web: escuchar mensajes del iframe y navegar
  React.useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handler = (e: MessageEvent) => {
      let data: any = e?.data;
      if (typeof data === 'string') { try { data = JSON.parse(data); } catch {} }
      if (data?.type === 'navigate' && typeof data.path === 'string') { router.push(data.path as any); }
    };
    window.addEventListener('message', handler as any);
    return () => window.removeEventListener('message', handler as any);
  }, [router]);

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.iframeContainer}>
          <iframe title="SolicitarDonacion" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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
        onMessage={(event) => {
          let data: any = event?.nativeEvent?.data;
          if (typeof data === 'string') { try { data = JSON.parse(data); } catch {} }
          if (data?.type === 'navigate' && typeof data.path === 'string') { router.push(data.path as any); }
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
