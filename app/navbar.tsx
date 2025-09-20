import { useAuth } from '@/context/AuthContext';
import navbarCss from '@/styles/Navbar';
import embeddedCss from '@/styles/PaginaPrincipal';
import { overlayBus } from '@/utils/overlayBus';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface NavbarProps {
  onMessage?: (data: any) => void;
}

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Navbar</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    ${embeddedCss}
    ${navbarCss}
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="brand" onclick="navigateTo('/PantallaPrincipal')">
        <div class="brand-icon">
          <svg class="nav-icon" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 class="brand-title">FoodLoop</h1>
      </div>

      <!-- Enlaces y acciones -->
      <div class="flex items-center gap-3 md:gap-6">
        <div class="nav-links">
          <button onclick="navigateTo('/explorador')" class="nav-link">
            Inicio
          </button>
          <button onclick="navigateTo('/mis-publicaciones')" class="nav-link">
            Mis Publicaciones
          </button>
          <button onclick="navigateTo('/publicar')" class="nav-link">
            Publicar
          </button>
          <button onclick="navigateTo('/solicitadas')" class="nav-link">
            Solicitadas
          </button>
          
          <!-- Dropdown menu funcional para ambas plataformas -->
          <div class="dropdown">
            <button class="dropdown-trigger" onclick="handleAccountClick()">
              🔑 Mi Cuenta
              <svg class="dropdown-icon" id="dropdownIcon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu Desktop (solo para web) -->
            <div id="dropdownMenu" class="dropdown-menu">
              <button class="dropdown-item" onclick="navigateTo('/configuracion-usuario')">
                ⚙️ Actualizar Datos
              </button>
              <button class="dropdown-item logout" onclick="handleLogout()">
                🚪 Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        <button class="menu-toggle" onclick="toggleMobileMenu()">
          ☰
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <div id="mobileMenu" class="mobile-menu">
      <div class="mobile-menu-content">
        <button onclick="navigateTo('/explorador')" class="mobile-link">
          Inicio
        </button>
        <button onclick="navigateTo('/mis-publicaciones')" class="mobile-link">
          Mis Publicaciones
        </button>
        <button onclick="navigateTo('/publicar')" class="mobile-link">
          Publicar
        </button>
        <button onclick="navigateTo('/solicitadas')" class="mobile-link">
          Solicitadas
        </button>
        
        <!-- Sección de usuario en móvil -->
          <div class="mobile-account-section">
          <div class="mobile-account-title">Mi Cuenta</div>
          <button onclick="navigateTo('/configuracion-usuario')" class="mobile-link">
            ⚙️ Actualizar Datos
          </button>
          <button onclick="handleLogout()" class="mobile-link logout">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </nav>

  <script>
    let dropdownOpen = false;
    let mobileMenuOpen = false;
    let isReactNative = false;

    // Detectar si estamos en React Native
    try {
      isReactNative = !!window.ReactNativeWebView;
    } catch (e) {
      isReactNative = false;
    }

    // Función de navegación
    function navigateTo(path) {
      try {
        if (isReactNative && window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'navigate', path }));
        } else {
          window.top && (window.top.location.href = path);
        }
      } catch (e) {
        console.error('Error navegando:', e);
      }
    }

    // Función para manejar logout
    function handleLogout() {
      try {
        // Siempre notificar hacia el contenedor (RN o parent web)
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'logout' }));
        }
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'logout' }, '*');
        }
        // Fallback para web pura en caso de que no haya contenedor
        if (!isReactNative && (!window.parent || window.parent === window)) {
          try{ localStorage.removeItem('authToken'); localStorage.removeItem('userData'); }catch(e){}
          window.top && (window.top.location.href = '/PantallaPrincipal');
        }
      } catch (e) {
        console.error('Error en logout:', e);
      }
    }

    // Manejar clic en Mi Cuenta
    function handleAccountClick() {
      if (isReactNative) {
        // En React Native, enviar mensaje para mostrar modal
        try {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'showAccountMenu' }));
        } catch (e) {
          console.error('Error mostrando menú:', e);
        }
      } else {
        // En web, mostrar dropdown normal
        toggleDropdown();
      }
    }

    // Toggle dropdown (solo para web)
    function toggleDropdown() {
      if (isReactNative) return; // No hacer nada en React Native
      
      dropdownOpen = !dropdownOpen;
      const menu = document.getElementById('dropdownMenu');
      const icon = document.getElementById('dropdownIcon');
      
      if (dropdownOpen) {
        menu.classList.add('show');
        icon.classList.add('open');
      } else {
        menu.classList.remove('show');
        icon.classList.remove('open');
      }

      // Notificar al padre (React) para ajustar altura del iframe
      try {
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({ type: 'navbarDropdown', open: dropdownOpen }, '*');
        }
      } catch (e) {}
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
      mobileMenuOpen = !mobileMenuOpen;
      const menu = document.getElementById('mobileMenu');
      
      if (mobileMenuOpen) {
        menu.classList.add('show');
      } else {
        menu.classList.remove('show');
      }
    }

    // Cerrar dropdown al hacer clic fuera (solo para web)
    if (!isReactNative) {
      document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && !dropdown.contains(event.target)) {
          dropdownOpen = false;
          document.getElementById('dropdownMenu').classList.remove('show');
          document.getElementById('dropdownIcon').classList.remove('open');

          // Notificar cierre al padre para volver a altura mínima
          try {
            if (window.parent && window.parent !== window) {
              window.parent.postMessage({ type: 'navbarDropdown', open: false }, '*');
            }
          } catch (e) {}
        }
      });
    }

    // Cerrar menú móvil al navegar
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuOpen = false;
        document.getElementById('mobileMenu').classList.remove('show');
      });
    });
  </script>
</body>
</html>`;

export default function Navbar({ onMessage }: NavbarProps) {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const { logout } = useAuth();

  // Sincronizar estado local con el overlay global
  useEffect(() => {
    const offShow = overlayBus.on('showAccountMenu', () => setShowAccountDropdown(true));
    const offHide = overlayBus.on('hideOverlay', () => setShowAccountDropdown(false));
    return () => { offShow(); offHide(); };
  }, []);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      
      if (data?.type === 'navigate' && typeof data.path === 'string') {
        router.push(data.path as any);
      } else if (data?.type === 'logout') {
        setShowAccountDropdown(false);
        // Logout global (RN)
        logout().finally(() => {
          router.replace('/(tabs)/PantallaPrincipal' as any);
        });
      } else if (data?.type === 'showAccountMenu') {
        setShowAccountDropdown(true);
        overlayBus.emit('showAccountMenu', {});
      }

      // Llamar callback si existe
      if (onMessage) {
        onMessage(data);
      }
    } catch (error) {
      console.error('Error procesando mensaje del Navbar:', error);
    }
  };

  // Las acciones ahora las maneja el overlay global

  if (Platform.OS === 'web') {
    // Ajustar altura del iframe en respuesta a eventos del contenido
    const [iframeHeight, setIframeHeight] = useState(80);
    React.useEffect(() => {
      const handler = (e: MessageEvent) => {
        const data = e.data || {};
        if (data && data.type === 'navbarDropdown') {
          setIframeHeight(data.open ? 220 : 80);
          return;
        }
        if (data && data.type === 'logout') {
          // Logout global (web)
          logout().finally(() => {
            router.replace('/(tabs)/PantallaPrincipal' as any);
          });
        }
      };
      window.addEventListener('message', handler);
      return () => window.removeEventListener('message', handler);
    }, []);

    return (
      <View style={styles.containerWeb}>
        {/* eslint-disable-next-line react/no-danger */}
        <iframe
          title="Navbar HTML"
          srcDoc={html}
          style={{ ...(styles.iframe as any), height: iframeHeight }}
          sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation"
        />
        {/* En web, no necesitamos el modal porque el dropdown está en el HTML */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={styles.webview}
        pointerEvents={showAccountDropdown ? 'none' : 'auto'}
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        onMessage={handleMessage}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        bounces={false}
        androidLayerType={Platform.OS === 'android' ? 'software' : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor para nativo (altura fija)
  container: {
    height: 80,
    width: '100%',
    zIndex: 999,
    elevation: 999,
    position: 'relative',
  },
  // Contenedor para web (permite crecer para dropdown)
  containerWeb: {
    minHeight: 80,
    width: '100%',
    position: 'relative',
    zIndex: 999,
    // importante para que el dropdown del iframe sea visible
    overflow: 'visible' as any,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  iframe: {
    borderWidth: 0,
    width: '100%',
    // Altura base; se ajusta dinámicamente cuando se abre el dropdown
    height: 80,
    zIndex: 99999,
  } as any,
});

