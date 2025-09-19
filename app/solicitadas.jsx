import embeddedCss from '@/styles/PaginaPrincipal';
import SolicitadasCss from '@/styles/Solicitadas';
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
	<title>Publicaciones solicitadas</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
	<style>
		body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
		${embeddedCss}
		${SolicitadasCss}
	</style>
	<style>
		.status-badge { font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 9999px; }
		.status-requested { background: #fef9c3; color: #a16207; }
		.status-delivered { background: #dcfce7; color: #166534; }
	</style>
	</head>
<body class="solicitadas-page">
	<div class="min-h-screen relative">
		<div class="floating top-10 left-10 text-5xl">🥕</div>
		<div class="floating top-20 right-20 text-4xl">🍞</div>

		<main class="pt-24 pb-12 px-6">
			<div class="max-w-6xl mx-auto">
				<div class="flex items-center justify-between mb-6">
					<div class="flex items-center gap-3">
						<div class="h-12 w-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">🍽️</div>
						<div>
							<h1 class="text-xl font-bold">Publicaciones solicitadas</h1>
							<p class="text-sm text-gray-600">Aquí ves las solicitudes que ya fueron realizadas</p>
						</div>
					</div>
				</div>
				<div class="mb-6 flex items-center justify-between gap-4 flex-wrap">
					<div class="flex items-center gap-3">
						<input id="search" class="input-field px-4 py-2 rounded-lg border" placeholder="Buscar por título, entidad o ciudad" />
						<select id="filter" class="px-3 py-2 rounded-lg border bg-white">
							<option value="all">Todas</option>
							<option value="requested">Solicitadas</option>
							<option value="delivered">Entregadas</option>
						</select>
					</div>
					<div class="text-sm text-gray-600">Items: <span id="count">0</span></div>
				</div>

				<div id="list" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
				<div id="empty" class="mt-8 text-center text-gray-600 hidden">No hay publicaciones solicitadas.</div>
			</div>
		</main>
	</div>

	<script>
		var STORAGE_KEY = 'requested_items';
		function demoData(){ return [
			{ id: 'r1', title: 'Pan integral sobrante', entity: 'Panadería La Espiga', type: 'donation', quantity: 20, location: 'Madrid', requestedBy: 'Juan Pérez', status: 'requested' },
			{ id: 'r2', title: 'Bandeja de ensalada', entity: 'Restaurante Verde', type: 'donation', quantity: 5, location: 'Barcelona', requestedBy: 'Comedor San José', status: 'delivered' },
		]; }
		function loadRequested(){
			try{ var raw = localStorage.getItem(STORAGE_KEY); if(!raw) return demoData(); var parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed : demoData(); }catch{ return demoData(); }
		}
		function saveRequested(arr){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }catch{} }

		var items = loadRequested();

		function statusBadge(status){
			if(status==='delivered') return '<span class="status-badge status-delivered">Entregada</span>';
			if(status==='requested') return '<span class="status-badge status-requested">Solicitada</span>';
			return '<span class="status-badge" style="background:#f3f4f6;color:#374151">'+String(status||'')+'</span>';
		}

		function matches(it, q){
			if(!q) return true; q = q.toLowerCase();
			var t=(it.title||'').toLowerCase(), e=(it.entity||'').toLowerCase(), l=(it.location||'').toLowerCase();
			return t.includes(q)||e.includes(q)||l.includes(q);
		}

		function filtered(){
			var q = (document.getElementById('search').value||'').trim().toLowerCase();
			var f = (document.getElementById('filter').value||'all');
			return (items||[]).filter(function(it){
				if(f==='requested' && it.status!=='requested') return false;
				if(f==='delivered' && it.status!=='delivered') return false;
				return matches(it, q);
			});
		}

		function render(){
			var listEl = document.getElementById('list');
			var emptyEl = document.getElementById('empty');
			var arr = filtered();
			document.getElementById('count').textContent = String(arr.length);
			if(arr.length===0){ listEl.innerHTML=''; emptyEl.classList.remove('hidden'); return; } else { emptyEl.classList.add('hidden'); }
			listEl.innerHTML = arr.map(function(it){
				return [
					'<div class="glass p-4">',
						'<div class="flex justify-between items-start gap-3">',
							'<div>',
								'<h3 class="text-lg font-semibold">'+it.title+'</h3>',
								'<p class="text-sm text-gray-600">'+it.entity+' · '+it.location+'</p>',
							'</div>',
							'<div class="text-sm">', statusBadge(it.status), '</div>',
						'</div>',
						'<p class="mt-3 text-sm text-gray-700">Cantidad: <strong>'+it.quantity+'</strong></p>',
						'<p class="mt-1 text-sm text-gray-600">Solicitado por: '+(it.requestedBy||'—')+'</p>',
						'<div class="mt-4 flex gap-3 flex-wrap">',
							(it.status!=='delivered' ? '<button class="px-3 py-2 bg-green-500 text-white rounded btn-deliver" data-id="'+it.id+'">Marcar entregado</button>' : ''),
							'<button class="px-3 py-2 bg-red-500 text-white rounded btn-cancel" data-id="'+it.id+'">Cancelar</button>',
							'<button class="px-3 py-2 border rounded btn-view" data-id="'+it.id+'">Ver publicación</button>',
						'</div>',
					'</div>'
				].join('');
			}).join('');

			Array.prototype.forEach.call(document.querySelectorAll('.btn-deliver'), function(btn){
				btn.addEventListener('click', function(){ var id = btn.getAttribute('data-id'); markDelivered(id); });
			});
			Array.prototype.forEach.call(document.querySelectorAll('.btn-cancel'), function(btn){
				btn.addEventListener('click', function(){ var id = btn.getAttribute('data-id'); cancelRequest(id); });
			});
			Array.prototype.forEach.call(document.querySelectorAll('.btn-view'), function(btn){
				btn.addEventListener('click', function(){ navigate('/explorador'); });
			});
		}

		function markDelivered(id){
			items = items.map(function(x){ return x.id===id ? Object.assign({}, x, { status: 'delivered' }) : x; });
			saveRequested(items); render();
		}
		function cancelRequest(id){
			if(!confirm('¿Confirmas cancelar esta solicitud?')) return;
			items = items.filter(function(x){ return x.id!==id; });
			saveRequested(items); render();
		}

		function navigate(path){
			try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'navigate', path: path })); } catch(e) {}
			try { if (window.top !== window && window.parent) window.parent.postMessage({ type:'navigate', path: path }, '*'); } catch(e) {}
		}

		document.addEventListener('DOMContentLoaded', function(){
			document.getElementById('search').addEventListener('input', render);
			document.getElementById('filter').addEventListener('change', render);
			Array.prototype.forEach.call(document.querySelectorAll('[data-nav]'), function(btn){
				btn.addEventListener('click', function(){ var p = btn.getAttribute('data-nav'); navigate(p); });
			});
			render();
		});
	</script>
</body>
</html>`;

export default function SolicitadasScreen(){
	const webViewRef = React.useRef(null);

	if (Platform.OS === 'web') {
		React.useEffect(() => {
			function onMessage(e){
				try{
					const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
					if (data && data.type === 'navigate' && typeof data.path === 'string') {
						router.push(data.path);
					}
				}catch{}
			}
			window.addEventListener('message', onMessage);
			return () => window.removeEventListener('message', onMessage);
		}, []);

		return (
			<SafeAreaView style={styles.safe}>
				<Navbar />
				<View style={styles.iframeContainer}>
					<iframe title="Publicaciones solicitadas" srcDoc={html} style={styles.iframe} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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
							router.push(data.path);
						}
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

