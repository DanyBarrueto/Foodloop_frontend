import { API_BASE_URL } from '@/services/authService';
import { createTransaccion } from '@/services/transaccionService';
import embeddedCss from '@/styles/PaginaPrincipal';
import SolicitarDonacionCss from '@/styles/SolicitarDonacion';
import { RE_ISO_YYYY_MM_DD } from '@/utils/regex';
import { storage } from '@/utils/storage';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

function buildHtml(initial: any){
  const safe = JSON.stringify(initial || {}).replace(/</g, '\\u003c');
  const regexPack = { RE_ISO_YYYY_MM_DD: RE_ISO_YYYY_MM_DD.source };
  const regexJson = JSON.stringify(regexPack).replace(/</g, '\\u003c');
  return `<!DOCTYPE html>
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
        <div id="pEmoji" class="text-4xl">🍽️</div>
        <div>
          <h3 id="pTitulo" class="text-xl font-bold text-gray-800">Publicación</h3>
          <p id="pMeta" class="text-sm text-gray-600">Entidad - Ciudad</p>
          <div class="flex items-center gap-2 mt-2">
            <span id="pTipo" class="badge badge-green">Donación</span>
            <span id="pFecha" class="badge badge-accent hidden"></span>
          </div>
        </div>
      </div>
      <p id="pDesc" class="text-gray-700 text-sm"></p>
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
        <p id="termsError" class="text-sm text-red-600 hidden">Debes aceptar los términos y condiciones para continuar.</p>

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
      var __REGEX__ = ${regexJson};
      var __INITIAL__ = ${safe};
      function qs(id){ return document.getElementById(id); }
      var form = qs('donationForm');
      var success = qs('successMessage');
      var error = qs('errorMessage');
      var submitBtn = qs('submitBtn');
      var btnBack = document.getElementById('btnBack');
      var btnCancel = document.getElementById('btnCancel');
      var navMsg = JSON.stringify({ type: 'navigate', path: '/explorador' });
      var postMsg = function(obj){
        try {
          var rnwv = (window && window['ReactNativeWebView']) || (window['webkit'] && window['webkit']['messageHandlers'] && window['webkit']['messageHandlers']['ReactNativeWebView']);
          if (rnwv && typeof rnwv.postMessage === 'function') { rnwv.postMessage(JSON.stringify(obj)); }
        } catch(e){}
        try { if (window.parent && window.parent !== window && typeof window.parent.postMessage === 'function') { window.parent.postMessage(obj, '*'); } } catch(e){}
      };

  function show(el){ if(el) el.classList.remove('hidden'); }
  function hide(el){ if(el) el.classList.add('hidden'); }

      function navigateToExplorer(){
        try {
          var rnwv = (window && window['ReactNativeWebView']) || (window['webkit'] && window['webkit']['messageHandlers'] && window['webkit']['messageHandlers']['ReactNativeWebView']);
          if (rnwv && typeof rnwv.postMessage === 'function') { rnwv.postMessage(navMsg); }
        } catch(e){}
        try { if (window.parent && window.parent !== window && typeof window.parent.postMessage === 'function') { window.parent.postMessage(navMsg, '*'); } } catch(e){}
      }

      if(btnBack){ btnBack.addEventListener('click', navigateToExplorer); }
      if(btnCancel){ btnCancel.addEventListener('click', navigateToExplorer); }
      var terms = qs('terms');
      var termsError = qs('termsError');
      if(terms){
        terms.addEventListener('change', function(){
          if(terms.checked){ hide(termsError); }
        });
      }

      // Prefill publication data
      try{
        var p = __INITIAL__ && __INITIAL__.publicacion;
        if(p){
          qs('pTitulo').textContent = p.titulo || 'Publicación';
          qs('pMeta').textContent = (p.entidad || 'Entidad') + (p.ubicacion ? ' - ' + p.ubicacion : '');
          qs('pDesc').textContent = p.descripcion || '';
          qs('pTipo').textContent = (p.tipo||'donacion').toLowerCase().includes('venta') ? 'Venta' : 'Donación';
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
            var m = String(p.fechaCaducidad).match(new RegExp(__REGEX__.RE_ISO_YYYY_MM_DD));
            if(m){ qs('pFecha').textContent = 'Vence: '+m[3]+'/'+m[2]+'/'+m[1]; qs('pFecha').classList.remove('hidden'); }
          }
        }
      }catch(e){}

      form.addEventListener('submit', function(e){
        e.preventDefault();
        hide(success); hide(error); hide(termsError);
        if(!terms || !terms.checked){ show(termsError); return; }
        submitBtn.disabled = true; submitBtn.classList.add('opacity-70');
        // Build payload and send to host to call backend
        try {
          var p = __INITIAL__ && __INITIAL__.publicacion;
          if (!p) { show(error); submitBtn.disabled=false; submitBtn.classList.remove('opacity-70'); return; }
          var payload = {
            type: 'createTransaccion',
            payload: {
              publicacionId: Number(p.id),
              donanteVendedorId: Number(p.usuarioId),
              beneficiarioCompradorId: Number(__INITIAL__ && __INITIAL__.currentUserId || 0),
              fechaTransaccion: new Date().toISOString(),
              meta: {
                deliveryPreference: (qs('deliveryPreference')||{}).value,
                timePreference: (qs('timePreference')||{}).value,
                economicSituation: (qs('economicSituation')||{}).value,
                message: (qs('message')||{}).value,
                termsAccepted: !!qs('terms').checked,
              }
            }
          };
          postMsg(payload);
        } catch(err) {
          show(error);
          submitBtn.disabled = false; submitBtn.classList.remove('opacity-70');
        }
      });
    })();
  </script>
</body>
</html>`;
}

export default function SolicitarDonacionScreen(){
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [html, setHtml] = React.useState<string>('');

  // Web: escuchar mensajes del iframe y navegar
  React.useEffect(() => {
    if (Platform.OS !== 'web') return;
    const handler = (e: MessageEvent) => {
      let data: any = e?.data;
      if (typeof data === 'string') { try { data = JSON.parse(data); } catch {} }
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
  }, []);

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
          <iframe title="SolicitarDonacion" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation allow-modals" />
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
          if (typeof data === 'string') { try { data = JSON.parse(data); } catch {} }
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
