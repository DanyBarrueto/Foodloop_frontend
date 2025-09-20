import MisPublicacionesCss from '@/styles/MisPublicaciones';
import embeddedCss from '@/styles/PaginaPrincipal';
import { router } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Navbar from './navbar';

const MOCK_POSTS = [
  { id: 1, type: 'donation', title: 'Excedente de verduras frescas', description: 'Tenemos un excedente de verduras frescas de nuestra huerta. Incluye lechugas, tomates, zanahorias y pimientos. Todo en perfecto estado.', category: 'frutas-verduras', location: 'Madrid', contact: '📞 +34 600 123 456', quantity: '15 kg aprox.', status: 'active', createdAt: '2024-01-15' },
  { id: 2, type: 'sale', title: 'Pan artesanal del día anterior', description: 'Pan artesanal de excelente calidad del día anterior. Perfecto para tostadas o para hacer pan rallado. Precio muy reducido.', category: 'panaderia', location: 'Barcelona', contact: '📧 panaderia@email.com', quantity: '20 barras', price: '1€/barra', expiration: '2024-01-18', status: 'active', createdAt: '2024-01-16' },
  { id: 3, type: 'donation', title: 'Comida preparada - Cocido madrileño', description: 'Hemos preparado demasiado cocido madrileño para nuestro evento. Está recién hecho y en perfectas condiciones.', category: 'comida-preparada', location: 'Madrid', contact: '📱 WhatsApp: 600 987 654', quantity: '8 raciones', status: 'active', createdAt: '2024-01-17' },
  { id: 4, type: 'sale', title: 'Productos lácteos próximos a vencer', description: 'Yogures, leche y quesos con fechas de vencimiento próximas pero en perfecto estado. Precios muy reducidos.', category: 'lacteos', location: 'Valencia', contact: '📞 +34 600 555 777', quantity: 'Varios productos', price: '50% descuento', expiration: '2024-01-20', status: 'paused', createdAt: '2024-01-14' },
  { id: 5, type: 'donation', title: 'Frutas maduras para mermeladas', description: 'Frutas muy maduras ideales para hacer mermeladas, compotas o batidos. Incluye plátanos, manzanas y peras.', category: 'frutas-verduras', location: 'Sevilla', contact: '📧 fruteria@email.com', quantity: '10 kg', status: 'active', createdAt: '2024-01-16' },
  { id: 6, type: 'donation', title: 'Conservas variadas', description: 'Conservas en buen estado que no vamos a consumir. Incluye legumbres, verduras y frutas en almíbar.', category: 'conservas', location: 'Bilbao', contact: '📞 +34 600 111 222', quantity: '25 latas', status: 'active', createdAt: '2024-01-13' },
  { id: 7, type: 'sale', title: 'Carne fresca con descuento', description: 'Carne fresca de excelente calidad con fecha de vencimiento próxima. Perfecta para congelar.', category: 'carnes', location: 'Zaragoza', contact: '📱 +34 600 333 444', quantity: '5 kg', price: '8€/kg', expiration: '2024-01-12', status: 'expired', createdAt: '2024-01-10' },
  { id: 8, type: 'donation', title: 'Bebidas variadas', description: 'Refrescos y zumos que sobran de nuestro evento. Todas las bebidas están en perfecto estado.', category: 'bebidas', location: 'Granada', contact: '📧 eventos@email.com', quantity: '30 botellas', status: 'active', createdAt: '2024-01-17' },
];

const MOCK_JSON = JSON.stringify(MOCK_POSTS).replace(/</g, '\u003c');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mis Publicaciones</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
    ${embeddedCss}
    ${MisPublicacionesCss}
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
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 animate-slide-up">
          <br><br>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">📋 <span class="text-primary-600">Mis Publicaciones</span></h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Gestiona todas tus donaciones y ventas desde un solo lugar</p>
        </div>

        <div id="stats" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up" style="animation-delay: 0.2s"></div>
        <div id="filters" class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 animate-slide-up" style="animation-delay: 0.4s"></div>
        <div id="content"></div>
      </div>
    </main>
  </div>

  <script>
    var MOCK_POSTS = ${MOCK_JSON};
    var state = { posts: MOCK_POSTS.slice(), filter: 'all' };

    function categoryEmoji(category){ var e={ 'frutas-verduras':'🥕', panaderia:'🍞', lacteos:'🥛', carnes:'🥩', 'comida-preparada':'🍽️', conservas:'🥫', bebidas:'🥤', otros:'📦' }; return e[category]||'🍽️'; }
    function counts(){ var p=state.posts; return { all:p.length, donation:p.filter(function(x){return x.type==='donation'}).length, sale:p.filter(function(x){return x.type==='sale'}).length, active:p.filter(function(x){return x.status==='active'}).length, paused:p.filter(function(x){return x.status==='paused'}).length, expired:p.filter(function(x){return x.status==='expired'}).length }; }
    function stats(){ var p=state.posts; return { total:p.length, active:p.filter(function(x){return x.status==='active'}).length, donations:p.filter(function(x){return x.type==='donation'}).length, sales:p.filter(function(x){return x.type==='sale'}).length }; }
    function filtered(){ var p=state.posts,f=state.filter; if(f==='all')return p; if(f==='donation'||f==='sale')return p.filter(function(x){return x.type===f}); return p.filter(function(x){return x.status===f}); }
    function formatDate(iso){ try{return new Date(iso).toLocaleDateString('es-ES')}catch(e){return ''} }

    // Navegación segura para botón Editar (web y nativo)
    function goEdit(id){
      try {
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'navigate', path: '/editar-publicacion?id='+encodeURIComponent(id) }));
        } else if (window.top) {
          window.top.location.href = '/editar-publicacion?id='+encodeURIComponent(id);
        }
      } catch (e) { /* noop */ }
    }

    function renderStats(){
      var s=stats(); var el=document.getElementById('stats');
      el.innerHTML = [
        '<div class="stats-card"><div class="text-3xl font-bold text-primary-600 mb-2">'+s.total+'</div><div class="text-sm text-gray-600 font-medium">Total Publicaciones</div></div>',
        '<div class="stats-card"><div class="text-3xl font-bold text-primary-600 mb-2">'+s.active+'</div><div class="text-sm text-gray-600 font-medium">Activas</div></div>',
        '<div class="stats-card"><div class="text-3xl font-bold text-primary-600 mb-2">'+s.donations+'</div><div class="text-sm text-gray-600 font-medium">Donaciones</div></div>',
        '<div class="stats-card"><div class="text-3xl font-bold text-accent-600 mb-2">'+s.sales+'</div><div class="text-sm text-gray-600 font-medium">Ventas</div></div>'
      ].join('');
    }

    function renderFilters(){
      var c=counts(); var el=document.getElementById('filters');
      el.innerHTML = [
        '<div class="flex flex-wrap gap-3">',
          '<button class="filter-btn" data-filter="all">📋 Todas ('+c.all+')</button>',
          '<button class="filter-btn" data-filter="donation">🤝 Donaciones ('+c.donation+')</button>',
          '<button class="filter-btn" data-filter="sale">💰 Ventas ('+c.sale+')</button>',
          '<button class="filter-btn" data-filter="active">✅ Activas ('+c.active+')</button>',
          '<button class="filter-btn" data-filter="paused">⏸️ Pausadas ('+c.paused+')</button>',
          '<button class="filter-btn" data-filter="expired">⏰ Vencidas ('+c.expired+')</button>',
        '</div>',
        '<a href="#" class="btn-primary" onclick="event.preventDefault()">➕ Nueva Publicación</a>'
      ].join('');
      Array.prototype.forEach.call(document.querySelectorAll('[data-filter]'), function(btn){ btn.addEventListener('click', function(){ state.filter = btn.getAttribute('data-filter'); render(); }); });
    }

    function renderContent(){
      var list=filtered(); var el=document.getElementById('content');
      if(list.length===0){ el.innerHTML = [
        '<div class="empty-state">',
          '<div class="text-6xl mb-6">📝</div>',
          '<h3 class="text-2xl font-bold text-gray-800 mb-4">No hay publicaciones</h3>',
          '<p class="text-gray-600 mb-6">Aún no has creado ninguna publicación. ¡Comienza a compartir alimentos ahora!</p>',
          '<a href="#" class="btn-primary" onclick="event.preventDefault()">➕ Crear Primera Publicación</a>',
        '</div>'
      ].join(''); return; }
      var cards = list.map(function(post){ var isDonation=post.type==='donation'; var badgeClass=isDonation?'badge-donation':'badge-sale'; var badgeText=isDonation?'🤝 Donación':'💰 Venta'; var parts=[];
        parts.push('<div class="post-card p-6">');
        parts.push('<div class="flex justify-between items-start mb-4">');
        parts.push('<div class="flex items-center gap-3">');
        parts.push('<div class="text-3xl">'+categoryEmoji(post.category)+'</div>');
        parts.push('<div>');
        parts.push('<h3 class="text-xl font-bold text-gray-800">'+post.title+'</h3>');
        parts.push('<p class="text-gray-600 font-medium">'+post.location+'</p>');
        parts.push('</div>');
        parts.push('</div>');
        parts.push('<span class="'+badgeClass+'">'+badgeText+'</span>');
        parts.push('</div>');
        parts.push('<p class="text-gray-700 mb-4 leading-relaxed line-clamp-3">'+post.description+'</p>');
        parts.push('<div class="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-6">');
        parts.push('<div>📦 Cantidad: <span class="font-medium text-gray-800">'+(post.quantity||'')+'</span></div>');
        if(post.price){ parts.push('<div>💶 Precio: <span class="font-medium text-gray-800">'+post.price+'</span></div>'); }
        if(post.expiration){ parts.push('<div>⏰ Vence: <span class="font-medium text-gray-800">'+formatDate(post.expiration)+'</span></div>'); }
        parts.push('<div>📅 Creado: <span class="font-medium text-gray-800">'+formatDate(post.createdAt)+'</span></div>');
        parts.push('<div>📨 Contacto: <span class="font-medium text-gray-800">'+post.contact+'</span></div>');
        parts.push('<div>🔖 Estado: <span class="font-medium text-gray-800">'+post.status+'</span></div>');
        parts.push('</div>');
    parts.push('<div class="flex items-center justify-between">');
        parts.push('<div class="flex items-center gap-2">');
  parts.push('<button class="btn-secondary" onclick="goEdit('+post.id+'); return false;">✏️ Editar</button>');
        parts.push('<button class="btn-warning" onclick="event.preventDefault()">⏸️ '+(post.status==='paused'?'Reanudar':'Pausar')+'</button>');
        parts.push('<button class="btn-danger" onclick="event.preventDefault()">🗑️ Eliminar</button>');
        parts.push('</div>');
        parts.push('</div>');
        parts.push('</div>');
        return parts.join(''); }).join('');
      el.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'+cards+'</div>';
    }

    function render(){ renderStats(); renderFilters(); renderContent(); }
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(function(){ Array.prototype.forEach.call(document.querySelectorAll('.animate-fade-in, .animate-slide-up'), function(el,i){ setTimeout(function(){ el.style.opacity='1'; el.style.transform='translateY(0)'; }, i*80); }); }, 200); render(); });
  </script>
</body>
</html>`;

export default function MisPublicacionesScreen() {
  const webViewRef = React.useRef<WebView>(null);

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.safe}>
        <Navbar />
        <View style={styles.iframeContainer}>
          {/* eslint-disable-next-line react/no-danger */}
          <iframe title="Mis Publicaciones" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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
