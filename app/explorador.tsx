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
            <div id="totalCount" class="text-3xl font-bold text-primary-600">8</div>
            <div class="text-gray-600 font-medium">Listados Activos</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl mb-3">🎁</div>
            <div id="donationCount" class="text-3xl font-bold text-primary-600">4</div>
            <div class="text-gray-600 font-medium">Donaciones</div>
          </div>
          <div class="card p-6 text-center">
            <div class="text-4xl mb-3">🏪</div>
            <div id="saleCount" class="text-3xl font-bold text-secondary-600">4</div>
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
          FoodConnect conecta a donantes y vendedores de alimentos con personas que los necesitan, creando un impacto positivo en nuestra comunidad y el medio ambiente.
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
  </div>

  <script>
    // Datos mock
    const MOCK_LISTINGS = [
      {
        id: '1',
        entityName: 'Comedor Solidario San José',
        title: 'Excedente de verduras frescas',
        description: 'Tenemos una gran cantidad de verduras variadas: zanahorias, lechugas, tomates y pimientos. Perfectas para comedores sociales o familias necesitadas.',
        foodType: 'donacion',
        location: 'Madrid',
        contactInfo: 'contacto@comedor.org',
        createdAt: '2025-08-13T10:00:00Z',
        emoji: '🥕',
      },
      {
        id: '2',
        entityName: 'Panadería Artesanal El Trigo',
        title: 'Pan del día anterior',
        description: 'Pan artesanal recién horneado del día anterior. Ideal para hacer tostadas, pan rallado o simplemente disfrutar. Variedad de panes integrales y blancos.',
        foodType: 'donacion',
        location: 'Madrid',
        contactInfo: 'contacto@comedor.org',
        createdAt: '2025-08-13T09:00:00Z',
        emoji: '🍞',
      },
      {
        id: '3',
        entityName: 'Panadería La Espiga Dorada',
        title: 'Lotes de bollería a punto de caducar',
        description: 'Bollería variada con fecha de vencimiento próxima (2 días): croissants, magdalenas, donuts y pasteles. Descuento del 50% sobre precio original.',
        foodType: 'venta',
        location: 'Barcelona',
        expirationDate: '2025-08-15',
        contactInfo: 'ventas@panaderia.es',
        createdAt: '2025-08-13T08:00:00Z',
        emoji: '🥐',
      },
      {
        id: '4',
        entityName: 'Lácteos Frescos del Valle',
        title: 'Yogures con 3 días de caducidad',
        description: 'Pack de 6 yogures naturales de alta calidad, caducan en 3 días. Perfectos para consumo inmediato. Precio especial por lote completo.',
        foodType: 'venta',
        location: 'Barcelona',
        expirationDate: '2025-08-16',
        contactInfo: 'ventas@panaderia.es',
        createdAt: '2025-08-13T07:00:00Z',
        emoji: '🥛',
      },
      {
        id: '5',
        entityName: 'Supermercado Verde Ecológico',
        title: 'Frutas maduras para donación',
        description: 'Frutas que están muy maduras pero perfectas para batidos, mermeladas o consumo inmediato: plátanos, manzanas, peras y naranjas.',
        foodType: 'donacion',
        location: 'Valencia',
        contactInfo: 'donaciones@supermercadoverde.com',
        createdAt: '2025-08-12T18:00:00Z',
        emoji: '🍎',
      },
      {
        id: '6',
        entityName: 'Restaurante El Buen Sabor',
        title: 'Comida preparada del día',
        description: 'Platos preparados que no se vendieron hoy: paellas, guisos y ensaladas. Perfectos para llevar y consumir en el día. Calidad garantizada.',
        foodType: 'venta',
        location: 'Sevilla',
        expirationDate: '2025-08-14',
        contactInfo: 'info@elbuensabor.es',
        createdAt: '2025-08-12T20:00:00Z',
        emoji: '🥘',
      },
      {
        id: '7',
        entityName: 'Carnicería Los Hermanos',
        title: 'Embutidos próximos a caducar',
        description: 'Jamón serrano, chorizo y salchichón artesanal con 5 días para caducidad. Excelente calidad a precio reducido del 40%.',
        foodType: 'venta',
        location: 'Bilbao',
        expirationDate: '2025-08-18',
        contactInfo: 'hermanos@carniceria.com',
        createdAt: '2025-08-12T15:00:00Z',
        emoji: '🥓',
      },
      {
        id: '8',
        entityName: 'Huerto Urbano Comunitario',
        title: 'Cosecha excedente de temporada',
        description: 'Verduras frescas recién cosechadas: calabacines, berenjenas, pimientos y hierbas aromáticas. Cultivo ecológico sin pesticidas.',
        foodType: 'donacion',
        location: 'Granada',
        contactInfo: 'huerto@comunidad.org',
        createdAt: '2025-08-12T12:00:00Z',
        emoji: '🍆',
      },
    ];

    // Estado global
    let currentListings = [...MOCK_LISTINGS];
    let requestedItems = new Set();
    let currentFilters = {
      search: '',
      foodType: 'all',
      location: ''
    };

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

      currentListings = MOCK_LISTINGS.filter(listing => {
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

      document.getElementById('totalCount').textContent = total;
      document.getElementById('donationCount').textContent = donationCount;
      document.getElementById('saleCount').textContent = saleCount;
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
                  <span>Caduca: \${new Date(listing.expirationDate).toLocaleDateString('es-ES')}</span>
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
            
            <button 
              class="btn-request \${isRequested ? 'requested' : ''}"
              onclick="handleRequest('\${listing.id}')"
              \${isRequested ? 'disabled' : ''}
            >
              \${isRequested ? '✅ Solicitado' : buttonText}
            </button>
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
      if (requestedItems.has(listingId)) return;
      
      const listing = MOCK_LISTINGS.find(l => l.id === listingId);
      if (!listing) return;

      // Si es compra (venta), redirigir a la pantalla de solicitar compra
      if (listing.foodType === 'venta') {
        navigateTo('/solicitar-compra');
        return;
      }

      // Si es donación, redirigir a la pantalla de solicitar donación
      if (listing.foodType === 'donacion') {
        navigateTo('/solicitar-donacion');
        return;
      }

      // Fallback (por si se agrega otro tipo en el futuro)
      requestedItems.add(listingId);
      const actionText = 'solicitud';
      const message = \`Tu \${actionText} para "\${listing.title}" de \${listing.entityName} ha sido enviada correctamente.\`;
      showModal(message);
      renderListings(); // Re-render para actualizar el botón
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

      // Render inicial
      renderListings();
    });
  </script>
</body>
</html>`;

export default function ExplorerScreen() {
  const webViewRef = React.useRef<WebView>(null);

  const handleNavbarMessage = (data: any) => {
    // El navbar ya maneja la navegación, pero puedes agregar lógica adicional aquí
    console.log('Mensaje del navbar:', data);
  };

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.safe}>
        <Navbar onMessage={handleNavbarMessage} />
        <View style={styles.iframeContainer}>
          {/* eslint-disable-next-line react/no-danger */}
          <iframe title="Explorer HTML" srcDoc={html} style={styles.iframe} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <Navbar onMessage={handleNavbarMessage} />
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html }}
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
