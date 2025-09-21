import { useAuth } from '@/context/AuthContext';
import { API_BASE_URL as API_BASE } from '@/services/authService';
import MisPublicacionesCss from '@/styles/MisPublicaciones';
import embeddedCss from '@/styles/PaginaPrincipal';
import { router } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Navbar from './navbar';

// Variables serán inyectadas por React más abajo

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
  <script>
    // Inyectado desde React
    const API_BASE_URL = '__API_BASE_URL__';
    const AUTH_TOKEN = '__AUTH_TOKEN__';
    const CURRENT_USER_ID = '__CURRENT_USER_ID__';
  </script>
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
    var state = { posts: [], filter: 'all' };

    function categoryEmoji(category){ var e={ 'frutas-verduras':'🥕', panaderia:'🍞', lacteos:'🥛', carnes:'🥩', 'comida-preparada':'🍽️', conservas:'🥫', bebidas:'🥤', otros:'📦' }; return e[category]||'🍽️'; }
    function statusLabel(code){ if(code==='active') return 'Activo'; if(code==='paused') return 'Pausado'; if(code==='expired') return 'Vencido'; return code||''; }
    function counts(){ var p=state.posts; return { all:p.length, donation:p.filter(function(x){return x.type==='donation'}).length, sale:p.filter(function(x){return x.type==='sale'}).length, active:p.filter(function(x){return x.status==='active'}).length, paused:p.filter(function(x){return x.status==='paused'}).length, expired:p.filter(function(x){return x.status==='expired'}).length }; }
    function stats(){ var p=state.posts; return { total:p.length, active:p.filter(function(x){return x.status==='active'}).length, donations:p.filter(function(x){return x.type==='donation'}).length, sales:p.filter(function(x){return x.type==='sale'}).length }; }
    function filtered(){ var p=state.posts,f=state.filter; if(f==='all')return p; if(f==='donation'||f==='sale')return p.filter(function(x){return x.type===f}); return p.filter(function(x){return x.status===f}); }
    function formatDate(iso){ try{ if(!iso) return ''; var s=String(iso); var m=/(\d{4}-\d{2}-\d{2})/.exec(s); if(m) return m[1]; var d=new Date(s); if(!isNaN(d.getTime())) return d.toLocaleDateString('es-ES'); return s; }catch(e){return ''} }

    // Navegación
    function navigateTo(path){
      try{
        if(window.ReactNativeWebView && window.ReactNativeWebView.postMessage){ window.ReactNativeWebView.postMessage(JSON.stringify({ type:'navigate', path })); }
        else if(window.top){ window.top.location.href = path; }
      }catch(_){ }
    }

    async function fetchMyPosts(){
      try{
        if(!API_BASE_URL || !CURRENT_USER_ID) { state.posts = []; render(); return; }
        const headers = { 'Accept':'application/json', ...(AUTH_TOKEN?{ 'Authorization':'Bearer '+AUTH_TOKEN }: {}) };
        const [pRes, cRes, uRes] = await Promise.all([
          fetch(API_BASE_URL + '/publicaciones', { headers }),
          fetch(API_BASE_URL + '/categorias', { headers }),
          fetch(API_BASE_URL + '/users', { headers })
        ]);
        const pData = pRes.ok ? await pRes.json() : [];
        const cData = cRes.ok ? await cRes.json() : [];
        const uData = uRes.ok ? await uRes.json() : [];
        var catMap = {}; (Array.isArray(cData)?cData:[]).forEach(function(c){ var id=(c && (c.id_categoria||c.id)); if(id!=null){ catMap[id] = c.nombre || ('Categoría #'+id); } });
        var userMap = {}; (Array.isArray(uData)?uData:[]).forEach(function(u){ var id=(u && (u.id_usuario||u.id)); if(id!=null){ userMap[id] = { nombre:(u.nombre_entidad||u.nombreEntidad||u.nombre||('Usuario #'+id)), ubicacion:(u.ubicacion||u.ciudad||''), contacto:(u.correo||'') }; } });
        var myId = Number(CURRENT_USER_ID);
        var today = new Date(); today.setHours(0,0,0,0);
        state.posts = (Array.isArray(pData)?pData:[]).filter(function(p){ var uid=(p && (p.usuario_id||p.usuarioId|| (p.usuario && (p.usuario.id || p.usuario.id_usuario)))); return uid===myId; }).map(function(p){
          var id = (p && (p.id_publicacion||p.id));
          var uid = (p && (p.usuario_id||p.usuarioId|| (p.usuario && (p.usuario.id || p.usuario.id_usuario))));
          var tipo = (p && p.tipo) ? String(p.tipo).toLowerCase() : '';
          var categoriaId = (p && (p.categoria_id||p.categoriaId||p.categoria))||null;
          var categoriaNombre = (categoriaId!=null && catMap[categoriaId]) ? catMap[categoriaId] : '';
          var uinfo = (uid!=null && userMap[uid]) ? userMap[uid] : { nombre:'', ubicacion:'', contacto:'' };
          var fechaCad = (p && (p.fecha_caducidad || p.fechaCaducidad || p.fecha)) || '';
          var estNum = Number(p && p.estado);
          // Derivar estado visual
          var status = 'active';
          if(estNum!==1) status = 'paused';
          else if(fechaCad){ var s=String(fechaCad); var y=s.slice(0,4), mo=s.slice(5,7), d=s.slice(8,10); var dd=new Date(Number(y), Number(mo)-1, Number(d), 0,0,0); if(!isNaN(dd.getTime()) && dd < today) status='expired'; }
          return {
            id: id,
            type: (tipo.indexOf('don')===0 ? 'donation' : (tipo==='venta' ? 'sale' : 'donation')),
            title: (p && p.titulo) || '',
            description: (p && p.descripcion) || '',
            category: categoriaNombre || 'otros',
            location: uinfo.ubicacion || '',
            contact: uinfo.contacto || '',
            quantity: (p && (p.cantidad!=null ? String(p.cantidad) : '')),
            price: (p && (p.precio!=null ? String(p.precio) : '')),
            expiration: fechaCad ? String(fechaCad).slice(0,10) : '',
            status: status,
            createdAt: new Date().toISOString().slice(0,10)
          };
        }).sort(function(a,b){ return (a.id||0)-(b.id||0); });
        render();
      }catch(e){ console.error('Error cargando mis publicaciones', e); state.posts=[]; render(); }
    }

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

    async function togglePublication(id){
      try{
        var post = (state.posts||[]).find(function(p){ return p && p.id===id; });
        if(!post) return;
        var nextActive = !(post.status==='active');
        if(API_BASE_URL && AUTH_TOKEN){
          await fetch(API_BASE_URL + '/publicaciones/' + id, { method:'PUT', headers:{ 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json', 'Content-Type':'application/json' }, body: JSON.stringify({ estado: nextActive ? 1 : 0 }) });
        }
        post.status = nextActive ? 'active' : 'paused';
        render();
      }catch(_){ }
    }

    function newPublication(){ navigateTo('/publicar'); }

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
        '<a href="#" class="btn-primary" onclick="event.preventDefault(); newPublication();">➕ Nueva Publicación</a>'
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
          '<a href="#" class="btn-primary" onclick="event.preventDefault(); newPublication();">➕ Crear Primera Publicación</a>',
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
  parts.push('<div>🔖 Estado: <span class="font-medium text-gray-800">'+statusLabel(post.status)+'</span></div>');
        parts.push('</div>');
    parts.push('<div class="flex items-center justify-between">');
        parts.push('<div class="flex items-center gap-2">');
  parts.push('<button class="btn-secondary" onclick="goEdit('+post.id+'); return false;">✏️ Editar</button>');
        parts.push('<button class="btn-warning" onclick="event.preventDefault(); togglePublication('+post.id+');">'+(post.status==='active'?'⏸️ Pausar':'▶️ Reanudar')+'</button>');
        parts.push('</div>');
        parts.push('</div>');
        parts.push('</div>');
        return parts.join(''); }).join('');
      el.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">'+cards+'</div>';
    }

    function render(){ renderStats(); renderFilters(); renderContent(); }
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(function(){ Array.prototype.forEach.call(document.querySelectorAll('.animate-fade-in, .animate-slide-up'), function(el,i){ setTimeout(function(){ el.style.opacity='1'; el.style.transform='translateY(0)'; }, i*80); }); }, 200); fetchMyPosts(); });
  </script>
</body>
</html>`;

export default function MisPublicacionesScreen() {
  const { token, user } = useAuth();
  const webViewRef = React.useRef<WebView>(null);
  const htmlWithEnv = React.useMemo(()=>{
    const uid = user?.id ? String(user.id) : '';
    return html
      .replace('__API_BASE_URL__', API_BASE)
      .replace('__AUTH_TOKEN__', token ?? '')
      .replace('__CURRENT_USER_ID__', uid);
  }, [token, user]);

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.safe}>
        <Navbar />
        <View style={styles.iframeContainer}>
          {/* eslint-disable-next-line react/no-danger */}
          <iframe title="Mis Publicaciones" srcDoc={htmlWithEnv} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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
        source={{ html: htmlWithEnv }}
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
