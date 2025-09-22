import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL as API_BASE } from '@/services/authService';
import exploradorCss from '@/styles/Explorador';
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
  <title>Explorador de Alimentos</title>
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
    ${exploradorCss}
  </style>
</head>
<body class="bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 font-sans">
  <script>
    // Variables inyectadas desde React
    const API_BASE_URL = '__API_BASE_URL__';
    const AUTH_TOKEN = '__AUTH_TOKEN__';
    const CURRENT_USER_ID = '__CURRENT_USER_ID__';
  </script>
  <div class="min-h-screen" style="background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%);">
    <!-- Hero -->
    <section class="hero-gradient py-24 px-6 text-center text-white relative overflow-hidden">
      <div class="absolute inset-0 overlay-light"></div>
      <div class="relative z-10 max-w-4xl mx-auto">
        <h2 class="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">🍎 Encuentra Comida 🥖</h2>
        <p class="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up" style="animation-delay: 0.2s;">
          Conectamos donaciones de comida y alimentos próximos a vencer con personas que los necesitan
        </p>
        <div class="flex flex-wrap justify-center gap-4 animate-slide-up" style="animation-delay: 0.4s;">
          <div class="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
            <span class="text-2xl">🤝</span>
            <span class="font-medium text-black">Donaciones Gratuitas</span>
          </div>
          <div class="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
            <span class="text-2xl">💰</span>
            <span class="font-medium text-black">Precios Reducidos</span>
          </div>
          <div class="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
            <span class="text-2xl">🌍</span>
            <span class="font-medium text-black">Reduce Desperdicio</span>
          </div>
        </div>
      </div>
      <!-- Floating elements -->
      <div class="absolute top-20 left-10 text-6xl floating-element opacity-30">🥕</div>
      <div class="absolute top-40 right-20 text-4xl floating-element opacity-40" style="animation-delay: 1s;">🍞</div>
      <div class="absolute bottom-20 left-20 text-5xl floating-element opacity-35" style="animation-delay: 2s;">🍅</div>
      <div class="absolute bottom-40 right-10 text-3xl floating-element opacity-45" style="animation-delay: 1.5s;">🥬</div>
    </section>

    <!-- Main -->
    <main class="py-12 px-6">
      <div class="max-w-7xl mx-auto space-y-12">
        <!-- Search -->
        <div class="card p-8 animate-fade-in">
          <h3 class="text-2xl font-bold text-center mb-8">
            <span class="align-middle mr-2">🔍</span>
            <span class="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent inline-block">
              Busca lo que necesitas
            </span>
          </h3>
          <div class="flex flex-col lg:flex-row gap-6">
            <select id="foodTypeSelect" class="select-field lg:w-48">
              <option value="all">🍽️ Todos los tipos</option>
              <option value="donacion">🤝 Donaciones</option>
              <option value="venta">💰 Ventas</option>
            </select>
            <div class="relative lg:w-48">
              <svg class="icon absolute left-4 top-1/2 -translate-y-1/2 text-primary-500" viewBox="0 0 24 24">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                id="locationInput"
                placeholder="📍 Ciudad"
                class="input-field pl-12"
              />
            </div>
            <div class="relative flex-1">
              <input
                type="text"
                id="searchInput"
                placeholder="🔍 Buscar comida..."
                class="input-field"
              />
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div id="statsContainer" class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <div class="card p-6 text-center">
            <div class="text-4xl mb-3">📊</div>
            <div id="totalCount" class="text-3xl font-bold text-primary-600">0</div>
            <div class="text-gray-600 font-medium">Listados Activos</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl mb-3">🎁</div>
            <div id="donationCount" class="text-3xl font-bold text-primary-600">0</div>
            <div class="text-gray-600 font-medium">Donaciones</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl mb-3">🏪</div>
            <div id="saleCount" class="text-3xl font-bold text-secondary-600">0</div>
            <div class="text-gray-600 font-medium">Ofertas Especiales</div>
          </div>
        </div>

        <!-- Listings -->
        <div id="listingsContainer">
          <!-- Los listados se generarán aquí dinámicamente -->
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-primary-800 to-accent-800 text-white py-12 px-6 mt-20">
      <div class="max-w-6xl mx-auto text-center">
        <div class="text-4xl mb-4">🌱</div>
        <h3 class="text-2xl font-bold mb-4">Juntos reducimos el desperdicio alimentario</h3>
        <p class="text-primary-100 mb-6 max-w-2xl mx-auto">
          FoodLoop conecta a donantes y vendedores de alimentos con personas que los necesitan, creando un impacto positivo en nuestra comunidad y el medio ambiente.
        </p>
        <div class="flex justify-center gap-8 text-sm">
          <span>💚 Sostenible</span>
          <span>🤝 Solidario</span>
          <span>🌍 Responsable</span>
        </div>
      </div>
    </footer>

    <!-- Modal -->
    <div id="modal" class="modal">
      <div class="modal-content">
        <div class="text-center">
          <div class="text-6xl mb-4">✅</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">¡Solicitud Enviada!</h3>
          <p id="modalMessage" class="text-gray-600 mb-6"></p>
          <button class="btn-request" style="width: auto; padding: 0.5rem 2rem;" onclick="closeModal()">
            Entendido
          </button>
        </div>
      </div>
    </div>

    <!-- Report Modal -->
    <div id="reportModal" class="modal">
      <div class="modal-content" style="max-width: 600px;">
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-800">🚩 Reportar Publicación</h3>
          <button aria-label="Cerrar" onclick="closeReportModal()" class="text-gray-500 hover:text-gray-700">✖</button>
        </div>
        <div class="space-y-3">
          <p class="text-sm text-gray-600">Cuéntanos brevemente el motivo del reporte.</p>
          <textarea id="reportDescription" class="input-field" placeholder="Describe el problema..." rows="4"></textarea>
          <div id="reportError" class="text-sm text-red-600 hidden"></div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button class="btn-secondary" onclick="closeReportModal()">Cancelar</button>
          <button id="reportSubmitBtn" class="btn-request" onclick="submitReport()">Enviar Reporte</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Estado global y datos
    let ALL_LISTINGS = [];
    let currentListings = [];
    let requestedItems = new Set();
    let currentFilters = {
      search: '',
      foodType: 'all',
      location: ''
    };
  let REPORT_CTX = { listingId: null, sending: false };

    async function fetchListings(){
      try{
        if(!API_BASE_URL){ return; }
        const headers = { 'Accept':'application/json', ...(AUTH_TOKEN ? { 'Authorization': 'Bearer '+AUTH_TOKEN } : {}) };
        const [pRes, uRes] = await Promise.all([
          fetch(API_BASE_URL + '/publicaciones', { headers }),
          fetch(API_BASE_URL + '/users', { headers })
        ]);
        const pData = pRes.ok ? await pRes.json() : [];
        const uData = uRes.ok ? await uRes.json() : [];
        // Mapear usuarios
        const userMap = {};
        (Array.isArray(uData)?uData:[]).forEach(u=>{
          const id = (u && (u.id_usuario||u.id));
          if(id!=null){ userMap[id] = {
            nombre: (u.nombre_entidad||u.nombreEntidad||u.nombre||('Usuario #'+id)),
            ubicacion: (u.ubicacion||u.ciudad||'')
          }; }
        });
        // Filtrar solo publicaciones activas y excluir las del usuario actual
        const myId = CURRENT_USER_ID ? Number(CURRENT_USER_ID) : null;
        const onlyActiveFromOthers = (Array.isArray(pData)?pData:[]).filter(p=>{
          const estado = Number(p && p.estado);
          if (estado !== 1) return false;
          if (myId != null) {
            const uid = (p && (p.usuario_id || p.usuarioId || (p.usuario && (p.usuario.id || p.usuario.id_usuario))));
            if (uid != null && Number(uid) === myId) return false;
          }
          return true;
        });
        // Mapear a tarjetas
        ALL_LISTINGS = onlyActiveFromOthers.map(p=>{
          const id = (p && (p.id_publicacion||p.id));
          const uid = (p && (p.usuario_id || p.usuarioId || (p.usuario && (p.usuario.id || p.usuario.id_usuario))));
          const uinfo = (uid!=null && userMap[uid]) ? userMap[uid] : { nombre: 'Usuario #'+uid, ubicacion: '' };
          const tipo = (p && (p.tipo||'')).toLowerCase();
          const expiration = (p && (p.fecha_caducidad || p.fechaCaducidad));
          return {
            id: String(id),
            usuarioId: uid,
            entityName: uinfo.nombre,
            title: p.titulo || '',
            description: p.descripcion || '',
            foodType: (tipo.indexOf('don')===0 ? 'donacion' : (tipo==='venta'?'venta':'donacion')),
            location: uinfo.ubicacion || '',
            contactInfo: '',
            createdAt: new Date().toISOString(),
            expirationDate: expiration ? String(expiration).slice(0,10) : '',
            emoji: (tipo.indexOf('don')===0 ? '🤝' : '💰')
          };
        });
        currentListings = [...ALL_LISTINGS];
        updateStats();
        renderListings();
      }catch(e){ console.error('Error cargando publicaciones', e); }
    }

    // Función de navegación
    function navigateTo(path) {
      try {
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'navigate', path }));
        } else {
          window.top && (window.top.location.href = path);
        }
      } catch (e) {
        console.error('Error navegando:', e);
      }
    }

    // Función para filtrar listados
    function filterListings() {
      const search = currentFilters.search.toLowerCase();
      const foodType = currentFilters.foodType;
      const location = currentFilters.location.toLowerCase();

      currentListings = ALL_LISTINGS.filter(listing => {
        const matchesSearch = search === '' || 
          listing.title.toLowerCase().includes(search) ||
          listing.description.toLowerCase().includes(search) ||
          listing.entityName.toLowerCase().includes(search);
        
        const matchesFoodType = foodType === 'all' || listing.foodType === foodType;
        
        const matchesLocation = location === '' || 
          listing.location.toLowerCase().includes(location);

        return matchesSearch && matchesFoodType && matchesLocation;
      });

      updateStats();
      renderListings();
    }

    // Actualizar estadísticas
    function updateStats() {
      const total = currentListings.length;
      const donationCount = currentListings.filter(l => l.foodType === 'donacion').length;
      const saleCount = currentListings.filter(l => l.foodType === 'venta').length;

      var totalEl = document.getElementById('totalCount');
      var donEl = document.getElementById('donationCount');
      var saleEl = document.getElementById('saleCount');
      if (totalEl) totalEl.textContent = String(total);
      if (donEl) donEl.textContent = String(donationCount);
      if (saleEl) saleEl.textContent = String(saleCount);
    }

    // Renderizar listados
    function renderListings() {
      const container = document.getElementById('listingsContainer');
      
      if (currentListings.length === 0) {
        container.innerHTML = \`
          <div class="text-center py-16">
            <div class="text-8xl mb-4">😔</div>
            <h3 class="text-2xl font-bold text-gray-700 mb-2">No encontramos resultados</h3>
            <p class="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        \`;
        return;
      }

      const listingsHTML = currentListings.map(listing => {
        const isDonation = listing.foodType === 'donacion';
        const badgeClass = isDonation ? 'badge-donation' : 'badge-sale';
        const badgeText = isDonation ? '🤝 Donación Gratuita' : '💰 Oferta Especial';
        const buttonText = isDonation ? '🤝 Solicitar Donación' : '🛒 Solicitar Compra';
        const isRequested = requestedItems.has(listing.id);

        return \`
          <div class="card p-6 animate-fade-in">
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div class="text-4xl">\${listing.emoji}</div>
                <div>
                  <h3 class="text-xl font-bold text-gray-800">\${listing.title}</h3>
                  <p class="text-gray-600 font-medium">\${listing.entityName}</p>
                </div>
              </div>
              <span class="\${badgeClass}">\${badgeText}</span>
            </div>
            
            <p class="text-gray-700 mb-4 leading-relaxed">\${listing.description}</p>
            
            <div class="space-y-2 mb-6">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>\${listing.location}</span>
              </div>
              \${listing.expirationDate ? \`
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="icon" viewBox="0 0 24 24">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span>Caduca: \${String(listing.expirationDate).slice(0,10)}</span>
                </div>
              \` : ''}
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="icon" viewBox="0 0 24 24">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Publicado: \${new Date(listing.createdAt).toLocaleDateString('es-ES')}</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-3">
              <button 
                class="btn-request \${isRequested ? 'requested' : ''}"
                onclick="handleRequest('\${listing.id}')"
                \${isRequested ? 'disabled' : ''}
              >
                \${isRequested ? '✅ Solicitado' : buttonText}
              </button>
              <button 
                class="btn-secondary"
                onclick="openReportModal('\${listing.id}')"
                title="Reportar esta publicación"
              >
                🚩 Reportar
              </button>
            </div>
          </div>
        \`;
      }).join('');

      container.innerHTML = \`
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          \${listingsHTML}
        </div>
      \`;
    }

    // Manejar solicitudes
    function handleRequest(listingId) {
      if (!listingId) return;
      // Si ya se solicitó, no repetir
      if (requestedItems.has(listingId)) return;

      // Buscar en las listas reales cargadas desde backend
      const listing = (ALL_LISTINGS || []).find(l => String(l.id) === String(listingId))
                    || (currentListings || []).find(l => String(l.id) === String(listingId));
      if (!listing) return;

      // Navegar a la pantalla correspondiente con el id como query param
      if (listing.foodType === 'venta') {
        navigateTo('/solicitar-compra?id=' + encodeURIComponent(listing.id));
        return;
      }
      if (listing.foodType === 'donacion') {
        navigateTo('/solicitar-donacion?id=' + encodeURIComponent(listing.id));
        return;
      }

      // Fallback (por si se agrega otro tipo en el futuro); mostrar confirmación local
      requestedItems.add(listingId);
      const actionText = 'solicitud';
      const message = 'Tu ' + actionText + ' para "' + listing.title + '" de ' + listing.entityName + ' ha sido enviada correctamente.';
      showModal(message);
      renderListings();
    }

    // Modal functions
    function showModal(message) {
      document.getElementById('modalMessage').textContent = message;
      document.getElementById('modal').classList.add('show');
      
      // Auto cerrar después de 3 segundos
      setTimeout(() => {
        closeModal();
      }, 3000);
    }

    function closeModal() {
      document.getElementById('modal').classList.remove('show');
    }

    // Report modal handlers
    function openReportModal(listingId){
      try{
        REPORT_CTX.listingId = listingId || null;
        REPORT_CTX.sending = false;
        var err = document.getElementById('reportError'); if(err){ err.classList.add('hidden'); err.textContent=''; }
        var ta = document.getElementById('reportDescription'); if(ta){ ta.value=''; }
        var btn = document.getElementById('reportSubmitBtn'); if(btn){ btn.disabled=false; btn.textContent='Enviar Reporte'; }
        document.getElementById('reportModal').classList.add('show');
      }catch(_){ }
    }
    function closeReportModal(){
      try{ document.getElementById('reportModal').classList.remove('show'); }catch(_){ }
    }
    async function submitReport(){
      try{
        if(REPORT_CTX.sending){ return; }
        var listingId = REPORT_CTX.listingId;
        var ta = document.getElementById('reportDescription');
        var err = document.getElementById('reportError');
        var btn = document.getElementById('reportSubmitBtn');
        var desc = ta && ta.value ? String(ta.value).trim() : '';
        if(!listingId){ if(err){ err.textContent='No se encontró la publicación a reportar.'; err.classList.remove('hidden'); } return; }
        if(!CURRENT_USER_ID){ if(err){ err.textContent='Debes iniciar sesión para reportar.'; err.classList.remove('hidden'); } return; }
        if(!AUTH_TOKEN){ if(err){ err.textContent='Sesión no válida. Intenta iniciar sesión nuevamente.'; err.classList.remove('hidden'); } return; }
        if(!desc){ if(err){ err.textContent='Describe brevemente el motivo del reporte.'; err.classList.remove('hidden'); } return; }
        REPORT_CTX.sending = true;
        if(btn){ btn.disabled = true; btn.textContent = 'Enviando...'; }
        if(err){ err.classList.add('hidden'); err.textContent=''; }
        // Construir payload acorde al backend
        var payload = {
          reportanteId: Number(CURRENT_USER_ID),
          publicacionId: Number(listingId),
          descripcion: desc,
          estado: 1
        };
        var headers = { 'Content-Type':'application/json', 'Accept':'application/json', 'Authorization':'Bearer '+AUTH_TOKEN };
        var res = await fetch(API_BASE_URL + '/reportes', { method:'POST', headers: headers, body: JSON.stringify(payload) });
        var data = null; try{ data = await res.json(); }catch(_){ }
        if(!res.ok){
          var msg = (data && (data.message||data.error)) || ('Error '+res.status+': '+res.statusText);
          if(err){ err.textContent = msg; err.classList.remove('hidden'); }
          REPORT_CTX.sending = false;
          if(btn){ btn.disabled=false; btn.textContent='Enviar Reporte'; }
          return;
        }
        // Éxito
        closeReportModal();
        showModal('¡Gracias! Tu reporte ha sido enviado.');
      }catch(e){
        var errEl = document.getElementById('reportError');
        if(errEl){ errEl.textContent = 'No se pudo enviar el reporte.'; errEl.classList.remove('hidden'); }
      }finally{
        REPORT_CTX.sending = false;
        var btn2 = document.getElementById('reportSubmitBtn'); if(btn2){ btn2.disabled=false; btn2.textContent='Enviar Reporte'; }
      }
    }

    // Event listeners
  document.addEventListener('DOMContentLoaded', function() {
      // Animaciones de entrada
      setTimeout(() => {
        const elements = document.querySelectorAll('.animate-fade-in');
        elements.forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 100);
        });
      }, 200);

      // Filtros
      document.getElementById('searchInput').addEventListener('input', function(e) {
        currentFilters.search = e.target.value;
        filterListings();
      });

      document.getElementById('foodTypeSelect').addEventListener('change', function(e) {
        currentFilters.foodType = e.target.value;
        filterListings();
      });

      document.getElementById('locationInput').addEventListener('input', function(e) {
        currentFilters.location = e.target.value;
        filterListings();
      });

      // Cerrar modal al hacer clic fuera
      document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
          closeModal();
        }
      });
  document.getElementById('reportModal').addEventListener('click', function(e){ if(e.target===this){ closeReportModal(); } });

      // Carga inicial desde backend
      fetchListings();
    });
  </script>
</body>
</html>`;

export default function ExplorerScreen() {
  const { token, user, isLoading } = useAuth();
  const webViewRef = React.useRef<WebView>(null);

  const handleNavbarMessage = (data: any) => {
    // El navbar ya maneja la navegación, pero puedes agregar lógica adicional aquí
    console.log('Mensaje del navbar:', data);
  };

  const htmlWithEnv = React.useMemo(()=>{
    const uid = user?.id ? String(user.id) : '';
    return html
      .replace('__API_BASE_URL__', API_BASE)
      .replace('__AUTH_TOKEN__', token ?? '')
      .replace('__CURRENT_USER_ID__', uid);
  }, [token, user]);

  if (Platform.OS === 'web') {
    if (isLoading) {
      return (
        <SafeAreaView style={styles.safe}>
          <Navbar onMessage={handleNavbarMessage} />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* Loader simple mientras obtenemos token/usuario */}
            <div style={{ color: '#4b5563' }}>Cargando…</div>
          </View>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.safe}>
        <Navbar onMessage={handleNavbarMessage} />
        <View style={styles.iframeContainer}>
          {/* eslint-disable-next-line react/no-danger */}
          <iframe
            key={`explorer-web-${token ? token.slice(-8) : 'anon'}`}
            title="Explorer HTML"
            srcDoc={htmlWithEnv}
            style={styles.iframe}
            sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar onMessage={handleNavbarMessage} />
      <WebView
        key={`explorer-native-${token ? token.slice(-8) : 'anon'}`}
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlWithEnv }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
  androidLayerType={Platform.OS === 'android' ? 'software' : undefined}
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
          if (url.includes('/PantallaPrincipal') || url.includes('/login') || url.includes('/register') || url.includes('/administrador-spt')) {
            const path = url.includes('/administrador-spt') ? '/administrador-spt' : 
                         url.includes('/login') ? '/login' : 
                         url.includes('/register') ? '/register' : '/PantallaPrincipal';
            router.push(path as any);
            return false;
          }
          return true;
        }}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data?.type === 'navigate' && typeof data.path === 'string') {
              router.push(data.path as any);
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
  iframeContainer: { flex: 1, width: '100%' },
  iframe: { borderWidth: 0, width: '100%', height: '100%' } as any,
});
