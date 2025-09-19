import { router } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const html = `<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Página no encontrada</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
	<style>
		body { margin:0; padding:0; font-family:'Inter',sans-serif; }
	</style>
	</head>
<body>
	<main class="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-slate-100 flex items-center justify-center p-6">
		<div class="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
			<section class="space-y-6">
				<div>
					<h1 class="text-6xl md:text-7xl font-extrabold tracking-tight">404</h1>
					<p class="mt-2 text-xl md:text-2xl text-slate-300 font-semibold">Página no encontrada</p>
				</div>
				<p class="text-slate-400">
					Lo sentimos — parece que la página que buscas no existe o fue movida. Pero no te preocupes,
					aquí hay algunas cosas que puedes intentar para volver al camino:
				</p>
				<div class="flex flex-col sm:flex-row sm:items-center gap-3">
					<button id="homeBtn" class="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400">Volver al inicio</button>
					<button id="reloadBtn" class="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800/60 hover:bg-slate-800/40 text-slate-200 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600">Recargar</button>
				</div>
				<small class="block mt-4 text-xs text-slate-600">Si crees que esto es un error, contáctanos en soporte.</small>
			</section>
			<aside class="flex items-center justify-center">
				<div class="w-full max-w-md" aria-hidden>
					<svg viewBox="0 0 600 400" class="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<linearGradient id="g1" x1="0" x2="1">
								<stop offset="0%" stop-color="#7c3aed" stop-opacity="0.95" />
								<stop offset="100%" stop-color="#ec4899" stop-opacity="0.95" />
							</linearGradient>
							<filter id="f1" x="-20%" y="-20%" width="140%" height="140%">
								<feGaussianBlur stdDeviation="12" result="b" />
								<feBlend in="SourceGraphic" in2="b" mode="screen" />
							</filter>
						</defs>
						<rect x="0" y="0" width="600" height="400" rx="16" fill="url(#g1)" opacity="0.06" />
						<g filter="url(#f1)">
							<circle cx="180" cy="120" r="70" fill="#7c3aed" opacity="0.10" />
							<circle cx="360" cy="240" r="100" fill="#ec4899" opacity="0.08" />
						</g>
						<g>
							<path d="M120 280 C170 200, 240 180, 300 220" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-dasharray="6 8" />
							<path d="M320 140 C360 120, 420 140, 460 180" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 6" />
							<circle cx="130" cy="280" r="6" fill="#fff" opacity="0.95" />
							<circle cx="300" cy="220" r="5" fill="#fff" opacity="0.9" />
							<circle cx="460" cy="180" r="7" fill="#fff" opacity="0.95" />
							<g transform="translate(200,80)">
								<rect x="0" y="0" width="200" height="120" rx="12" fill="#0f172a" opacity="0.6" />
								<text x="100" y="70" text-anchor="middle" fill="#fff" font-size="44" font-weight="700">404</text>
							</g>
						</g>
						<g>
							<rect x="60" y="320" width="480" height="40" rx="10" fill="#0b1220" opacity="0.35" />
							<text x="300" y="345" text-anchor="middle" fill="#cbd5e1" font-size="13">Parece que te extraviaste, regresa para seguir compartiendo</text>
						</g>
					</svg>
				</div>
			</aside>
		</div>
		<div class="sr-only">404 - Not Found</div>
	</main>

	<script>
		function navigate(path){
			try { if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(JSON.stringify({ type:'navigate', path: path })); } catch(e) {}
			try { if (window.top !== window && window.parent) window.parent.postMessage({ type:'navigate', path: path }, '*'); } catch(e) {}
		}
		document.addEventListener('DOMContentLoaded', function(){
			document.getElementById('homeBtn').addEventListener('click', function(){ navigate('/explorador'); });
			document.getElementById('reloadBtn').addEventListener('click', function(){ location.reload(); });
		});
	</script>
	</body>
	</html>`;

export default function NoExisteScreen(){
	const webViewRef = React.useRef<WebView>(null);

	if (Platform.OS === 'web') {
		React.useEffect(() => {
			function onMessage(e: MessageEvent){
				try{
					const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
					if (data?.type === 'navigate' && typeof data.path === 'string') router.push(data.path as any);
				}catch{}
			}
			window.addEventListener('message', onMessage);
			return () => window.removeEventListener('message', onMessage);
		}, []);

			return (
				<SafeAreaView style={styles.safe}>
					<View style={styles.iframeContainer}>
						<iframe title="No Existe" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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
				androidLayerType={Platform.OS === 'android' ? 'software' : undefined}
				onMessage={(event)=>{
					try{
						const data = JSON.parse(event.nativeEvent.data);
						if(data?.type==='navigate' && typeof data.path==='string') router.push(data.path as any);
					}catch(e){}
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: '#0f172a' },
	webview: { flex: 1 },
	iframeContainer: { flex: 1, width: '100%' },
	iframe: { borderWidth: 0, width: '100%', height: '100%' },
});

