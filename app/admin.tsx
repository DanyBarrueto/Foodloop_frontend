import { useAuth } from '@/context/AuthContext';
import AdminCss from '@/styles/Admin';
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
	<title>Panel de Administración</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
	<style>
		body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
		${embeddedCss}
		${AdminCss}
	</style>
	</head>
	<body onload="try{init()}catch(e){}">
		<div class="admin-page min-h-screen relative">
			<div class="admin-floating-element top-12 left-10 text-6xl" style="animation-delay:0s">🥕</div>
			<div class="admin-floating-element top-24 right-20 text-4xl" style="animation-delay:1s">🍞</div>
			<div class="admin-floating-element bottom-28 left-16 text-5xl" style="animation-delay:2s">🍅</div>

			<main class="pt-24 pb-12 px-4 relative z-10">
				<div class="max-w-7xl mx-auto">
					<div class="text-center mb-10 animate-fade-in">
						<h1 class="text-4xl md:text-5xl font-bold mb-2">🔧 <span class="text-primary-600">Panel de Administración</span></h1>
						<p class="text-gray-600">Gestiona usuarios, productos, categorías, publicaciones, transacciones y reportes</p>
					</div>

					<div class="flex flex-wrap gap-3 justify-center mb-8">
						<button class="admin-tab-btn active" data-tab="usuarios">👥 Usuarios</button>
						<button class="admin-tab-btn" data-tab="categorias">🏷️ Categorías</button>
						<button class="admin-tab-btn" data-tab="publicaciones">📰 Publicaciones</button>
						<button class="admin-tab-btn" data-tab="transacciones">💳 Transacciones</button>
						<button class="admin-tab-btn" data-tab="reportes">📝 Reportes</button>
					</div>

					<div id="stats" class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
						<div class="admin-stats-card">
							<div class="text-3xl font-bold text-green-600">245</div>
							<div class="text-gray-600">Usuarios Totales</div>
						</div>
						<div class="admin-stats-card">
							<div class="text-3xl font-bold text-orange-600">89</div>
							<div class="text-gray-600">Publicaciones Activas</div>
						</div>
						<div class="admin-stats-card">
							<div class="text-3xl font-bold text-blue-600">156</div>
							<div class="text-gray-600">Transacciones</div>
						</div>
						<div class="admin-stats-card">
							<div class="text-3xl font-bold text-red-600">12</div>
							<div class="text-gray-600">Reportes Pendientes</div>
						</div>
					</div>
					<div id="content"></div>
				</div>
			</main>
		</div>

			<!-- Modal Edición -->
			<!-- Popup simple para mostrar mensajes -->
			<div id="appPopup" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50">
				<div class="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6">
					<div class="flex items-start gap-3">
						<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">⚠️</div>
						<div class="flex-1">
							<h3 class="text-lg font-semibold text-gray-900">Aviso</h3>
							<p id="appPopupMessage" class="mt-2 text-sm text-gray-700">Ocurrió un error.</p>
						</div>
					</div>
					<div class="mt-6 flex justify-end">
						<button id="appPopupClose" class="admin-btn-primary">Entendido</button>
					</div>
				</div>
			</div>
			<div id="modalOverlay" class="admin-modal-overlay">
				<div class="admin-modal-content">
					<button type="button" class="admin-btn-close" id="btnCloseEdit">✖</button>
					<h3 id="modalTitle" class="text-2xl font-bold mb-4 text-gray-800">Editar</h3>
					<form id="editForm" class="space-y-4">
						<div id="modalFields"></div>
						<div class="admin-modal-buttons">
							<button type="button" class="admin-btn-cancel" id="btnCancelEdit">Cancelar</button>
							<button type="submit" class="admin-btn-save">Guardar</button>
						</div>
					</form>
				</div>
			</div>

			<!-- Modal Eliminación -->
			<div id="deleteOverlay" class="admin-modal-overlay">
				<div class="admin-modal-content">
					<button class="admin-btn-close" id="btnCloseDelete">✖</button>
					<h3 class="text-2xl font-bold mb-4 text-gray-800">Confirmar acción</h3>
					<p id="deleteMessage" class="text-gray-700 mb-6"></p>
					<div class="admin-modal-buttons">
						<button type="button" class="admin-btn-cancel" id="btnCancelDelete">Cancelar</button>
						<button type="button" class="admin-btn-danger" id="btnConfirmDelete">Eliminar</button>
					</div>
				</div>
			</div>

		<script>
			function showPopup(msg){ try{ var p=document.getElementById('appPopup'); var m=document.getElementById('appPopupMessage'); if(m) m.textContent=String(msg||'Ocurrió un error.'); if(p){ p.style.display='flex'; p.classList.remove('hidden'); } }catch(_){} }
			function hidePopup(){ try{ var p=document.getElementById('appPopup'); if(p){ p.style.display='none'; p.classList.add('hidden'); } }catch(_){} }
			// Variables inyectadas desde React (placeholders reemplazados en runtime)
			const API_BASE_URL = '__API_BASE_URL__';
			const AUTH_TOKEN = '__AUTH_TOKEN__';
			const TABS = ['usuarios','categorias','publicaciones','transacciones','reportes'];
			const state = { activeTab: 'usuarios', edit: { open:false, tipo:'', id:null }, del: { open:false, tipo:'', id:null }, statsOverride: {}, data: {
				usuarios: [ { id:1, nombre:'Ana López', email:'ana@example.com', rol:'admin', estado:'active' }, { id:2, nombre:'Luis Pérez', email:'luis@example.com', rol:'user', estado:'inactive' }, { id:3, nombre:'María Gómez', email:'maria@example.com', rol:'user', estado:'active' } ],
				categorias: [ { id:1, nombre:'Frutas y Verduras', descripcion:'', estado:'active' }, { id:2, nombre:'Panadería', descripcion:'', estado:'active' }, { id:3, nombre:'Lácteos', descripcion:'', estado:'inactive' } ],
				publicaciones: [ { id:1, titulo:'Excedente de verduras frescas', tipo:'donación', estado:'active', fecha:'2025-09-01' }, { id:2, titulo:'Pan del día anterior', tipo:'venta', estado:'paused', fecha:'2025-09-10' }, { id:3, titulo:'Lácteos por vencer', tipo:'venta', estado:'expired', fecha:'2025-08-27' } ],
				transacciones: [ { id:1001, usuario:'Ana López', monto:12.5, estado:'pending', fecha:'2025-09-12' }, { id:1002, usuario:'Luis Pérez', monto:4.0, estado:'completed', fecha:'2025-09-13' } ],
				reportes: [ { id:501, reportante:'Usuario 23', asunto:'Publicación duplicada', estado:'pending', fecha:'2025-09-09' }, { id:502, reportante:'Usuario 17', asunto:'Contenido inapropiado', estado:'resolved', fecha:'2025-09-11' } ]
			}};

			function formatDate(val){
				try{
					if(!val) return '';
					var s = String(val);
					// Si inicia con YYYY-MM-DD (con o sin hora/zona), formatear sin crear Date para evitar desfases por zona horaria
					var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
					if(m){ return m[3]+'/'+m[2]+'/'+m[1]; }
					var d = new Date(s);
					if(!isNaN(d.getTime())){ return d.toLocaleDateString('es-ES'); }
					return s;
				} catch(e){ return String(val||''); }
			}

			// Escapar caracteres peligrosos al inyectar en HTML
			function escapeHtml(str){
				try{
					return String(str||'')
						.replace(/&/g,'&amp;')
						.replace(/</g,'&lt;')
						.replace(/>/g,'&gt;')
						.replace(/"/g,'&quot;')
						.replace(/'/g,'&#039;');
				}catch(_){ return ''; }
			}

			// Validación simple de email
			function isValidEmail(email){
				try{
					if(!email || typeof email !== 'string') return false;
					var re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
					return re.test(String(email).trim());
				}catch(_){ return false; }
			}

			function renderStats(){
				const d = state.data;
				const usuariosTotales = (state.statsOverride && typeof state.statsOverride.usuariosTotales === 'number') ? state.statsOverride.usuariosTotales : d.usuarios.length;
				const publicacionesActivas = (state.statsOverride && typeof state.statsOverride.publicacionesActivas === 'number') ? state.statsOverride.publicacionesActivas : d.publicaciones.filter(p=>p.estado==='active').length;
				const transacciones = (state.statsOverride && typeof state.statsOverride.transacciones === 'number') ? state.statsOverride.transacciones : d.transacciones.length;
				const reportesPendientes = (state.statsOverride && typeof state.statsOverride.reportesPendientes === 'number') ? state.statsOverride.reportesPendientes : d.reportes.filter(r=>r.estado==='pending').length;
				const html =
					'<div class="admin-stats-card"><div class="text-3xl font-extrabold text-primary-600">'+usuariosTotales+'</div><div class="text-gray-600">Usuarios Totales</div></div>'+
					'<div class="admin-stats-card"><div class="text-3xl font-extrabold text-accent-600">'+publicacionesActivas+'</div><div class="text-gray-600">Publicaciones Activas</div></div>'+
					'<div class="admin-stats-card"><div class="text-3xl font-extrabold text-secondary-600">'+transacciones+'</div><div class="text-gray-600">Transacciones</div></div>'+
					'<div class="admin-stats-card"><div class="text-3xl font-extrabold text-red-500">'+reportesPendientes+'</div><div class="text-gray-600">Reportes Pendientes</div></div>';
				document.getElementById('stats').innerHTML = html;
			}

			function badgeEstado(estado){
				if(estado==='active') return '<span class="admin-badge-active">Activa</span>';
				if(estado==='paused') return '<span class="admin-badge-pending">Pausada</span>';
				if(estado==='expired') return '<span class="admin-badge-expired">Vencida</span>';
				return '<span class="admin-badge-inactive">Inactivo</span>';
			}

			function renderContent(){
				const c = document.getElementById('content');
				let html = '';
				if(state.activeTab==='usuarios'){
					html = '<div class="admin-table-container">'+
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">👥 Gestión de Usuarios</h2><button class="admin-btn-primary" data-action="open-new" data-tipo="usuarios">➕ Nuevo Usuario</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table w-full text-sm md:text-base"><thead><tr>'+ 
					'<th class="px-3 py-2">ID</th>'+ 
					'<th class="px-3 py-2">Nombre</th>'+ 
					'<th class="px-3 py-2 hidden sm:table-cell">Tipo Entidad</th>'+ 
					'<th class="px-3 py-2 hidden md:table-cell">Email</th>'+ 
					'<th class="px-3 py-2 hidden md:table-cell">Rol</th>'+ 
					'<th class="px-3 py-2">Estado</th>'+ 
					'<th class="px-3 py-2">Acciones</th>'+ 
					'</tr></thead><tbody>'+
					state.data.usuarios.map(u=>'<tr>'+ 
					'<td class="px-3 py-2">'+u.id+'</td>'+ 
					'<td class="px-3 py-2">'+u.nombre+'</td>'+ 
					'<td class="px-3 py-2 hidden sm:table-cell">'+(u.tipoEntidad||'')+'</td>'+ 
					'<td class="px-3 py-2 hidden md:table-cell">'+u.email+'</td>'+ 
					'<td class="px-3 py-2 hidden md:table-cell">'+u.rol+'</td>'+ 
					'<td class="px-3 py-2">'+(u.estado==='active'?'<span class="admin-badge-active">Activo</span>':'<span class="admin-badge-inactive">Inactivo</span>')+'</td>'+ 
					'<td class="px-3 py-2"><div class="flex flex-wrap gap-2">'+
					'<button class="admin-btn-secondary" data-action="edit" data-tipo="usuarios" data-id="'+u.id+'">✏️ Editar</button>'+
					'<button class="admin-btn-warning" data-action="toggle-user" data-id="'+u.id+'">'+(u.estado==='active'?'⏸️ Desactivar':'▶️ Activar')+'</button>'+
					'</div></td></tr>').join('')+
					'</tbody></table></div></div>';
				} else if(state.activeTab==='categorias'){
					html = '<div class="admin-table-container">'+
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">🏷️ Gestión de Categorías</h2><button class="admin-btn-primary" data-action="open-new" data-tipo="categorias">➕ Nueva Categoría</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table w-full text-sm md:text-base"><thead><tr>'+
					'<th class="px-3 py-2">ID</th>'+
					'<th class="px-3 py-2">Nombre</th>'+
					'<th class="px-3 py-2 hidden sm:table-cell">Descripción</th>'+
					'<th class="px-3 py-2">Estado</th>'+
					'<th class="px-3 py-2">Acciones</th>'+
					'</tr></thead><tbody>'+
					state.data.categorias.map(function(g){ return '<tr>'+
					'<td class="px-3 py-2">'+g.id+'</td>'+
					'<td class="px-3 py-2">'+(g.nombre||'')+'</td>'+
					'<td class="px-3 py-2 hidden sm:table-cell">'+(g.descripcion||'')+'</td>'+
					'<td class="px-3 py-2">'+(g.estado==='active'?'<span class="admin-badge-active">Activo</span>':'<span class="admin-badge-inactive">Inactivo</span>')+'</td>'+
					'<td class="px-3 py-2"><div class="flex flex-wrap gap-2">'+
					'<button class="admin-btn-secondary" data-action="edit" data-tipo="categorias" data-id="'+g.id+'">✏️ Editar</button>'+
					'<button class="admin-btn-warning" data-action="toggle-category" data-id="'+g.id+'">'+(g.estado==='active'?'⏸️ Desactivar':'▶️ Activar')+'</button>'+
					'</div></td>'+
					'</tr>'; }).join('')+
					'</tbody></table></div></div>';
				} else if(state.activeTab==='publicaciones'){
					html = '<div class="admin-table-container">'+
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">📰 Gestión de Publicaciones</h2><button class="admin-btn-primary" data-action="open-new" data-tipo="publicaciones">➕ Nueva Publicación</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table w-full text-sm md:text-base"><thead><tr>'+
					'<th class="px-3 py-2">ID</th>'+
					'<th class="px-3 py-2">Título</th>'+
					'<th class="px-3 py-2 hidden sm:table-cell">Categoría</th>'+
					'<th class="px-3 py-2">Tipo</th>'+
					'<th class="px-3 py-2">Cantidad</th>'+
					'<th class="px-3 py-2">Fecha</th>'+
					'<th class="px-3 py-2">Estado</th>'+
					'<th class="px-3 py-2">Acciones</th>'+
					'</tr></thead><tbody>'+
					state.data.publicaciones.map(function(p){ return '<tr>'+
					'<td class="px-3 py-2">'+p.id+'</td>'+
					'<td class="px-3 py-2">'+(p.titulo||'')+'</td>'+
					'<td class="px-3 py-2 hidden sm:table-cell">'+(p.categoriaNombre||'')+'</td>'+
					'<td class="px-3 py-2">'+(p.tipo||'')+'</td>'+
					'<td class="px-3 py-2">'+(p.cantidad!=null?p.cantidad:'')+'</td>'+
						'<td class="px-3 py-2">'+(p.fecha ? String(p.fecha).slice(0,10) : '')+'</td>'+            
					'<td class="px-3 py-2">'+(p.estado==='active'?'<span class="admin-badge-active">Activo</span>':'<span class="admin-badge-inactive">Inactivo</span>')+'</td>'+
					'<td class="px-3 py-2"><div class="flex flex-wrap gap-2">'+
					'<button class="admin-btn-secondary" data-action="edit" data-tipo="publicaciones" data-id="'+p.id+'">✏️ Editar</button>'+
					'<button class="admin-btn-warning" data-action="toggle-publication" data-id="'+p.id+'">'+(p.estado==='active'?'⏸️ Desactivar':'▶️ Activar')+'</button>'+
					'</div></td>'+
					'</tr>'; }).join('')+
					'</tbody></table></div></div>';
												} else if(state.activeTab==='transacciones'){
										html = '<div class="admin-table-container">'+
										'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">💳 Gestión de Transacciones</h2><button class="admin-btn-primary" data-action="open-new" data-tipo="transacciones">➕ Nueva Transacción</button></div>'+
														'<div class="overflow-x-auto"><table class="admin-table w-full text-sm md:text-base"><thead><tr>'+
														'<th class="px-3 py-2">ID</th>'+ // id_transaccion
														'<th class="px-3 py-2">Publicación</th>'+ // título
														'<th class="px-3 py-2">Donante/Vendedor</th>'+ // nombre donante/vendedor
														'<th class="px-3 py-2">Beneficiario/Comprador</th>'+ // nombre beneficiario/comprador
														'<th class="px-3 py-2">Precio</th>'+ // precio de la publicación
														'<th class="px-3 py-2">Estado</th>'+ // 0 inactivo / 1 activo
														'<th class="px-3 py-2">Fecha</th>'+ 
														'<th class="px-3 py-2">Acciones</th>'+ 
										'</tr></thead><tbody>'+
										(state.data.transacciones||[]).map(function(t){
												var id = t.id;
												var titulo = t.publicacionTitulo || '';
												var precio = (t.publicacionPrecio!=null ? Number(t.publicacionPrecio) : 0);
																var donanteNombre = t.donanteNombre || '';
																var beneficiarioNombre = t.beneficiarioNombre || '';
												var estNum = Number(t.estado);
												var estBadge = (estNum===1) ? '<span class="admin-badge-active">Activo</span>' : '<span class="admin-badge-inactive">Inactivo</span>';
												var fecha = t.fecha ? String(t.fecha).slice(0,10) : '';
												return '<tr>'+
													'<td class="px-3 py-2">'+id+'</td>'+
													'<td class="px-3 py-2">'+titulo+'</td>'+
																	'<td class="px-3 py-2">'+donanteNombre+'</td>'+
																	'<td class="px-3 py-2">'+beneficiarioNombre+'</td>'+
													'<td class="px-3 py-2">€ '+precio.toFixed(2)+'</td>'+
													'<td class="px-3 py-2">'+estBadge+'</td>'+
													'<td class="px-3 py-2">'+fecha+'</td>'+
													'<td class="px-3 py-2"><div class="flex flex-wrap gap-2">'+
														'<button class="admin-btn-secondary" data-action="edit" data-tipo="transacciones" data-id="'+id+'">✏️ Editar</button>'+
														'<button class="admin-btn-warning" data-action="toggle-transaction" data-id="'+id+'">'+(estNum===1?'⏸️ Desactivar':'▶️ Activar')+'</button>'+
													'</div></td>'+
												'</tr>';
										}).join('')+
										'</tbody></table></div></div>';
								} else if(state.activeTab==='reportes'){
									html = '<div class="admin-table-container">'+
									'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">📝 Gestión de Reportes</h2></div>'+
									'<div class="overflow-x-auto"><table class="admin-table w-full text-sm md:text-base"><thead><tr>'+ 
									'<th class="px-3 py-2">ID</th>'+ 
									'<th class="px-3 py-2">Reportante</th>'+ 
									'<th class="px-3 py-2">Publicación</th>'+ 
									'<th class="px-3 py-2">Descripción</th>'+ 
									'<th class="px-3 py-2">Estado</th>'+ 
									'<th class="px-3 py-2">Fecha</th>'+ 
									'<th class="px-3 py-2">Acciones</th>'+ 
									'</tr></thead><tbody>'+
									(state.data.reportes||[]).map(function(r){
										var id = r.id;
										var reportante = r.reportanteNombre || '';
										var publicacion = r.publicacionTitulo || '';
										var desc = r.descripcion || '';
										var estNum = Number(r.estado);
										var estBadge = (estNum===1) ? '<span class="admin-badge-active">Activo</span>' : '<span class="admin-badge-inactive">Inactivo</span>';
										var fecha = r.fecha ? String(r.fecha).slice(0,10) : '';
										return '<tr>'+ 
										'<td class="px-3 py-2">'+id+'</td>'+ 
										'<td class="px-3 py-2">'+reportante+'</td>'+ 
										'<td class="px-3 py-2">'+publicacion+'</td>'+ 
										'<td class="px-3 py-2">'+desc+'</td>'+ 
										'<td class="px-3 py-2">'+estBadge+'</td>'+ 
										'<td class="px-3 py-2">'+fecha+'</td>'+ 
										'<td class="px-3 py-2"><div class="flex flex-wrap gap-2">'+
											'<button class="admin-btn-secondary" data-action="edit" data-tipo="reportes" data-id="'+id+'">✏️ Editar</button>'+ 
											'<button class="admin-btn-warning" data-action="toggle-reporte" data-id="'+id+'">'+(estNum===1?'⏸️ Desactivar':'▶️ Activar')+'</button>'+ 
										'</div></td>'+ 
										'</tr>';
									}).join('')+
									'</tbody></table></div></div>';
				}
				 c.innerHTML = html;
			}

			function nextId(arr){ return arr.length ? Math.max.apply(null, arr.map(x=>x.id)) + 1 : 1; }

			async function openEdit(tipo, id){
				state.edit = { open:true, tipo:tipo, id:id };
				// Pre-cargar datos necesarios para selects
				try{
					if(tipo==='publicaciones'){
						await fetchCategoriesList();
						await fetchUsersList();
						// Intentar obtener el detalle ANTES de abrir para prellenar descripción
						try{
							if (id!=null && AUTH_TOKEN) {
								const res = await fetch(API_BASE_URL + '/publicaciones/' + id, { headers: { 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json' } });
								if (res.ok) {
									const data = await res.json();
									if (data) {
										const arr = state.data.publicaciones || [];
										const idx = arr.findIndex(function(x){ return x && x.id===id; });
										const mapped = {
											id: (data.id_publicacion || data.id),
											titulo: data.titulo || '',
											descripcion: data.descripcion || '',
											tipo: data.tipo || '',
											cantidad: (data.cantidad!=null? data.cantidad : ''),
											precio: (data.precio!=null? data.precio : 0),
											fecha: (data.fecha_caducidad || data.fechaCaducidad || ''),
											categoriaId: (data.categoria_id || data.categoriaId || null)
										};
										if (idx>-1) { arr[idx] = { ...arr[idx], ...mapped }; }
									}
								}
							}
						} catch(_){ /* noop */ }
					} else if (tipo==='transacciones') {
						await fetchUsersList();
						await fetchPublicacionesList();
						// Intentar obtener el detalle de la transacción antes de abrir
						try{
							if (id!=null && AUTH_TOKEN) {
								const resT = await fetch(API_BASE_URL + '/transacciones/' + id, { headers: { 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json' } });
								if (resT.ok) {
									const dataT = await resT.json();
									if (dataT) {
										const arrT = state.data.transacciones || [];
										const idxT = arrT.findIndex(function(x){ return x && x.id===id; });
										var pubId = (dataT.publicacion_id || dataT.publicacionId || (dataT.publicacion && (dataT.publicacion.id || dataT.publicacion.id_publicacion)) || null);
										var donId = (dataT.donante_vendedor_id || dataT.donanteVendedorId || (dataT.donante && (dataT.donante.id || dataT.donante.id_usuario)) || null);
										var benId = (dataT.beneficiario_comprador_id || dataT.beneficiarioCompradorId || (dataT.beneficiario && (dataT.beneficiario.id || dataT.beneficiario.id_usuario)) || null);
										var fechaRaw = (dataT.fecha_transaccion || dataT.fecha || dataT.fechaTransaccion || '') || '';
										var fecha = '';
										try{
											if(fechaRaw){
												var s = String(fechaRaw);
												var m = /^(\d{4}-\d{2}-\d{2})/.exec(s);
												if(m){ fecha = m[1]; }
												else { var _d=new Date(fechaRaw); if(!isNaN(_d.getTime())){ fecha=_d.toISOString().slice(0,10); } }
											}
										} catch(_){ }
										const mappedT = { id: (dataT.id_transaccion||dataT.id), publicacionId: pubId, donanteId: donId, beneficiarioId: benId, fecha: fecha, estado: Number(dataT.estado) };
										if (idxT>-1) { arrT[idxT] = { ...arrT[idxT], ...mappedT }; }
									}
								}
							}
						} catch(_){ /* noop */ }
					} else if (tipo==='reportes') {
						await fetchUsersList();
						await fetchPublicacionesList();
						try{
							if (id!=null && AUTH_TOKEN) {
								const resR = await fetch(API_BASE_URL + '/reportes/' + id, { headers: { 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json' } });
								if (resR.ok) {
									const dataR = await resR.json();
									if (dataR) {
										const arrR = state.data.reportes || [];
										const idxR = arrR.findIndex(function(x){ return x && x.id===id; });
										var repId = (dataR.reportante_id || dataR.reportanteId || (dataR.reportante && (dataR.reportante.id || dataR.reportante.id_usuario)) || null);
										var pubId = (dataR.publicacion_id || dataR.publicacionId || (dataR.publicacion && (dataR.publicacion.id || dataR.publicacion.id_publicacion)) || null);
										var desc = (dataR.descripcion || '');
										var est = Number(dataR && dataR.estado);
										var fechaRaw = (dataR.fecha_reporte || dataR.fechaReporte || dataR.fecha || '') || '';
										var fecha = '';
										try{
											if(fechaRaw){
												var s = String(fechaRaw);
												var m = /^(\d{4}-\d{2}-\d{2})/.exec(s);
												if(m){ fecha = m[1]; }
												else { var _d=new Date(fechaRaw); if(!isNaN(_d.getTime())){ fecha=_d.toISOString().slice(0,10); } }
											}
										} catch(_){ }
										const mappedR = { id: (dataR.id_reporte||dataR.id), reportanteId: repId, publicacionId: pubId, descripcion: desc, estado: est, fecha: fecha };
										if (idxR>-1) { arrR[idxR] = { ...arrR[idxR], ...mappedR }; }
									}
								}
							}
						} catch(_){ /* noop */ }
					}
				}catch(_){ }
				document.getElementById('modalOverlay').classList.add('show');
				renderEditModal();
				// Refuerzo: cargar la publicación individual para completar campos como descripción
				try{
					if (tipo==='publicaciones' && id!=null && AUTH_TOKEN) {
						const res = await fetch(API_BASE_URL + '/publicaciones/' + id, { headers: { 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json' } });
						if (res.ok) {
							const data = await res.json();
							if (data) {
								// Actualizar el item en la lista local si existe
								try {
									const arr = state.data.publicaciones || [];
									const idx = arr.findIndex(function(x){ return x && x.id===id; });
									const mapped = {
										id: (data.id_publicacion || data.id),
										titulo: data.titulo || '',
										descripcion: data.descripcion || '',
										tipo: data.tipo || '',
										cantidad: (data.cantidad!=null? data.cantidad : ''),
										precio: (data.precio!=null? data.precio : 0),
										fecha: (data.fecha_caducidad || data.fechaCaducidad || ''),
										categoriaId: (data.categoria_id || data.categoriaId || null),
										usuarioId: (data.usuario_id || data.usuarioId || (data.usuario && (data.usuario.id || data.usuario.id_usuario)) || null)
									};
									if (idx>-1) { arr[idx] = { ...arr[idx], ...mapped }; }
								}catch(_){ }
								// Re-render para que aparezca la descripción
								renderEditModal();
								// Además, setear el textarea directamente para mayor seguridad
								try {
									var desc = (data && (data.descripcion != null ? data.descripcion : data.description)) || '';
									var textarea = document.getElementById('f_descripcion');
									if (textarea && typeof textarea.value !== 'undefined') { textarea.value = String(desc); }
									// Setear selects de usuario y categoría a los valores reales
									var uid = (data && (data.usuario_id || data.usuarioId || (data.usuario && (data.usuario.id || data.usuario.id_usuario))));
									var cid = (data && (data.categoria_id || data.categoriaId));
									var selU = document.getElementById('f_usuarioId');
									var selC = document.getElementById('f_categoriaId');
									if (selU && uid!=null) {
										try {
											selU.value = String(uid);
											// Si no existe la opción, crearla y seleccionarla
											if (selU.value !== String(uid)) {
												var optU = document.createElement('option');
												optU.value = String(uid);
												optU.textContent = 'Usuario #' + uid;
												selU.appendChild(optU);
												selU.value = String(uid);
											}
										} catch(_){}
									}
									if (selC && cid!=null) {
										try {
											selC.value = String(cid);
											if (selC.value !== String(cid)) {
												var optC = document.createElement('option');
												optC.value = String(cid);
												optC.textContent = 'Categoría #' + cid;
												selC.appendChild(optC);
												selC.value = String(cid);
											}
										} catch(_){}
									}
								} catch(_){ /* noop */ }
							}
						}
					}
				} catch(_){ /* noop */ }
			}

			function closeEdit(){ state.edit.open=false; document.getElementById('modalOverlay').classList.remove('show'); }

			function renderEditModal(){
				const t = state.edit.tipo; const id = state.edit.id; const data = state.data;
				document.getElementById('modalTitle').textContent = (id? 'Editar ' : 'Agregar ') + t;
				let fields = '';
				if(t==='usuarios'){
					const u = id? data.usuarios.find(x=>x.id===id) : { nombre:'', tipoEntidad:'', email:'', telefono:'', direccion:'', ubicacion:'', rol:'user', estado:'active' };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Nombre</label><input id="f_nombre" class="admin-form-input" value="'+(u.nombre||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Tipo Entidad</label>'+ 
					         '<select id="f_tipoEntidad" class="admin-form-select">'+
					           '<option value="">Selecciona tu tipo de entidad</option>'+
					           '<option '+(u.tipoEntidad==='Restaurante'?'selected':'')+' value="Restaurante">🍽️ Restaurante</option>'+
					           '<option '+(u.tipoEntidad==='Panadería'?'selected':'')+' value="Panadería">🥖 Panadería</option>'+
					           '<option '+(u.tipoEntidad==='Supermercado'?'selected':'')+' value="Supermercado">🛒 Supermercado</option>'+
					           '<option '+(u.tipoEntidad==='ONG'?'selected':'')+' value="ONG">🤝 ONG / Comedor Social</option>'+
					           '<option '+(u.tipoEntidad==='Particular'?'selected':'')+' value="Particular">👤 Particular</option>'+
					           '<option '+(u.tipoEntidad==='Otro'?'selected':'')+' value="Otro">🏪 Otro</option>'+
					         '</select></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Email</label><input id="f_email" class="admin-form-input" value="'+(u.email||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Teléfono</label><input id="f_telefono" class="admin-form-input" value="'+(u.telefono||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Dirección</label><input id="f_direccion" class="admin-form-input" value="'+(u.direccion||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Ubicación</label><input id="f_ubicacion" class="admin-form-input" value="'+(u.ubicacion||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Rol</label><select id="f_rol" class="admin-form-select"><option '+(u.rol==='admin'?'selected':'')+'>admin</option><option '+(u.rol==='user'?'selected':'')+'>user</option></select></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Estado</label><select id="f_estado" class="admin-form-select"><option '+(u.estado==='active'?'selected':'')+'>active</option><option '+(u.estado!=='active'?'selected':'')+'>inactive</option></select></div>';
				} else if(t==='productos'){
					const p = id? data.productos.find(x=>x.id===id) : { nombre:'', categoria:'', stock:0, precio:0 };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Nombre</label><input id="f_nombre" class="admin-form-input" value="'+(p.nombre||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Categoría</label><input id="f_categoria" class="admin-form-input" value="'+(p.categoria||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Stock</label><input id="f_stock" type="number" class="admin-form-input" value="'+(p.stock||0)+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Precio (€)</label><input id="f_precio" type="number" step="0.01" class="admin-form-input" value="'+(p.precio||0)+'" /></div>';
				} else if(t==='categorias'){
					const g = id? data.categorias.find(x=>x.id===id) : { nombre:'', descripcion:'', estado:'active' };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Nombre</label><input id="f_nombre" class="admin-form-input" value="'+(g.nombre||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Descripción</label><textarea id="f_descripcion" class="admin-form-textarea">'+(g.descripcion||'')+'</textarea></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Estado</label><select id="f_estado" class="admin-form-select"><option '+(g.estado==='active'?'selected':'')+'>active</option><option '+(g.estado!=='active'?'selected':'')+'>inactive</option></select></div>';
				} else if(t==='publicaciones'){
					const p = id? data.publicaciones.find(x=>x.id===id) : { usuarioId:null, categoriaId:null, titulo:'', descripcion:'', tipo:'donacion', cantidad:'', precio:0, fecha: new Date().toISOString().slice(0,10) };
					var tipoVal = (p && p.tipo) ? String(p.tipo).toLowerCase() : 'donacion';
					var fechaVal = (p && p.fecha) ? String(p.fecha).slice(0,10) : new Date().toISOString().slice(0,10);
					fields = ''+
					'<div class="admin-form-group"><label class="admin-form-label">Usuario</label>'+
					'<select id="f_usuarioId" class="admin-form-select">'+
					(data.usuarios||[]).map(function(u){ return '<option value="'+u.id+'" '+(p.usuarioId===u.id?'selected':'')+'>'+(u.nombre||('Usuario #'+u.id))+'</option>'; }).join('')+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Categoría</label>'+
					'<select id="f_categoriaId" class="admin-form-select">'+
					(data.categorias||[]).map(function(c){ return '<option value="'+c.id+'" '+(p.categoriaId===c.id?'selected':'')+'>'+(c.nombre||('Categoría #'+c.id))+'</option>'; }).join('')+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Título</label><input id="f_titulo" class="admin-form-input" value="'+escapeHtml(p.titulo||'')+'" /></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Descripción</label><textarea id="f_descripcion" class="admin-form-textarea">'+escapeHtml(p.descripcion||'')+'</textarea></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Tipo</label><select id="f_tipo" class="admin-form-select">'+
					'<option value="donacion" '+(tipoVal.indexOf('don')===0?'selected':'')+'>Donación</option>'+
					'<option value="venta" '+(tipoVal==='venta'?'selected':'')+'>Venta</option>'+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Cantidad</label><input id="f_cantidad" class="admin-form-input" value="'+escapeHtml(p.cantidad!=null?p.cantidad:'')+'" /></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Precio (€)</label><input id="f_precio" type="number" step="0.01" class="admin-form-input" value="'+(p.precio!=null?p.precio:0)+'" /></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Fecha de caducidad</label><input id="f_fecha" type="date" class="admin-form-input" value="'+fechaVal+'" /></div>';
				} else if(t==='transacciones'){
					const tnx = id? data.transacciones.find(function(x){ return x.id===id; }) : { publicacionId:null, donanteId:null, beneficiarioId:null, fecha: new Date().toISOString().slice(0,10) };
					var fechaVal = (tnx && tnx.fecha) ? String(tnx.fecha).slice(0,10) : new Date().toISOString().slice(0,10);
					fields = ''+
					'<div class="admin-form-group"><label class="admin-form-label">Publicación</label>'+
					'<select id="f_publicacionId" class="admin-form-select">'+
					(data.publicaciones||[]).map(function(p){ return '<option value="'+p.id+'" '+((tnx && tnx.publicacionId===p.id)?'selected':'')+'>'+(p.titulo||('Publicación #'+p.id))+'</option>'; }).join('')+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Donante/Vendedor</label>'+
					'<select id="f_donanteId" class="admin-form-select">'+
					(data.usuarios||[]).map(function(u){ return '<option value="'+u.id+'" '+((tnx && tnx.donanteId===u.id)?'selected':'')+'>'+(u.nombre||('Usuario #'+u.id))+'</option>'; }).join('')+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Beneficiario/Comprador</label>'+
					'<select id="f_beneficiarioId" class="admin-form-select">'+
					(data.usuarios||[]).map(function(u){ return '<option value="'+u.id+'" '+((tnx && tnx.beneficiarioId===u.id)?'selected':'')+'>'+(u.nombre||('Usuario #'+u.id))+'</option>'; }).join('')+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Fecha</label><input id="f_fecha" type="date" class="admin-form-input" value="'+fechaVal+'" /></div>';
				} else if(t==='reportes'){
					const r = id? data.reportes.find(function(x){ return x.id===id; }) : { reportanteId:null, publicacionId:null, descripcion:'', estado:1, fecha: new Date().toISOString().slice(0,10) };
					var fechaVal = (r && r.fecha) ? String(r.fecha).slice(0,10) : new Date().toISOString().slice(0,10);
					fields = ''+
					'<div class="admin-form-group"><label class="admin-form-label">Reportante</label>'+
					'<select id="f_reportanteId" class="admin-form-select">'+
					(data.usuarios||[]).map(function(u){ return '<option value="'+u.id+'" '+((r && r.reportanteId===u.id)?'selected':'')+'>'+(u.nombre||('Usuario #'+u.id))+'</option>'; }).join('')+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Publicación</label>'+
					'<select id="f_publicacionId" class="admin-form-select">'+
					(data.publicaciones||[]).map(function(p){ return '<option value="'+p.id+'" '+((r && r.publicacionId===p.id)?'selected':'')+'>'+(p.titulo||('Publicación #'+p.id))+'</option>'; }).join('')+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Descripción</label><textarea id="f_descripcion" class="admin-form-textarea">'+(r.descripcion||'')+'</textarea></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Estado</label><select id="f_estado" class="admin-form-select">'+
					'<option value="1" '+(Number(r.estado)===1?'selected':'')+'>Activo</option>'+
					'<option value="0" '+(Number(r.estado)!==1?'selected':'')+'>Inactivo</option>'+
					'</select></div>'+
					'<div class="admin-form-group"><label class="admin-form-label">Fecha de reporte</label><input id="f_fecha" type="date" class="admin-form-input" value="'+fechaVal+'" /></div>';
				}
				document.getElementById('modalFields').innerHTML = fields;
				// Enfocar el primer campo para evitar que el botón de cerrar capture la primera pulsación
				try{
					var container = document.getElementById('modalFields');
					var firstField = container && container.querySelector('input, select, textarea');
					if(firstField && typeof firstField.focus==='function') { firstField.focus(); }
				}catch(_){ }
			}

			async function saveEdit(e){ e && e.preventDefault && e.preventDefault(); const t=state.edit.tipo; const id=state.edit.id; const d=state.data;
				if(t==='usuarios'){
					// Leer y normalizar valores
					const v = {
						nombre: String(qs('f_nombre').value || '').trim(),
						tipoEntidad: String(qs('f_tipoEntidad').value || '').trim(),
						email: String(qs('f_email').value || '').trim(),
						telefono: String((qs('f_telefono') && qs('f_telefono').value) || '').trim(),
						direccion: String((qs('f_direccion') && qs('f_direccion').value) || '').trim(),
						ubicacion: String((qs('f_ubicacion') && qs('f_ubicacion').value) || '').trim(),
						rol: String(qs('f_rol').value || '').trim(),
						estado: String(qs('f_estado').value || '').trim()
					};
					// Validaciones cliente
					if(!v.nombre){ showPopup('El nombre es obligatorio.'); return; }
					if(!v.email){ showPopup('El correo es obligatorio.'); return; }
					if(!isValidEmail(v.email)){ showPopup('El correo no tiene un formato válido.'); return; }
					// Duplicado local (ignora el usuario que se está editando)
					try{
						var existsLocal = (Array.isArray(d.usuarios) ? d.usuarios : []).some(function(u){ return u && u.email && u.email.toLowerCase()===v.email.toLowerCase() && u.id!==id; });
						if(existsLocal){ showPopup('Ese correo ya existe en la lista. Prueba con otro.'); return; }
					}catch(_){ /* noop */ }
					try{
						if(AUTH_TOKEN){
							if(id){
								// Mapear a payload backend: nombreEntidad, correo, estado (0=inactivo, 1=usuario activo, 2=admin activo)
								var estadoNum = 0;
								if(v.estado==='active') { estadoNum = (v.rol==='admin') ? 2 : 1; } else { estadoNum = 0; }
								const payload = { nombreEntidad: v.nombre, tipoEntidad: v.tipoEntidad, correo: v.email, estado: estadoNum, telefono: v.telefono, direccion: v.direccion, ubicacion: v.ubicacion };
								const res = await fetch(API_BASE_URL + '/users/' + id, {
									method: 'PUT',
									headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + AUTH_TOKEN },
									body: JSON.stringify(payload)
								});
								if(!res.ok){
									let msg = '';
									try{ const j = await res.json(); msg = j && (j.message||j.error||'') || ''; }catch(_){ }
									if(res.status === 409){ showPopup(msg || 'El correo ya está en uso, por favor usa otro correo.'); return; }
									showPopup(msg || 'No se pudo guardar los cambios.'); return;
								}
								// Éxito: refrescar y cerrar modal
								fetchUsersList();
								closeEdit(); updateStats(); renderContent();
								return;
							} else {
								// Crear nuevo usuario (opcional): usar /register
								const payloadNew = { nombreEntidad: v.nombre, correo: v.email, password: 'Temporal123', tipoEntidad: v.tipoEntidad || (v.rol==='admin' ? 'admin' : 'usuario'), telefono: v.telefono, direccion: v.direccion, ubicacion: v.ubicacion };
								const resNew = await fetch(API_BASE_URL + '/register', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
									body: JSON.stringify(payloadNew)
								});
								if(!resNew.ok){
									let msg2=''; try{ const j2=await resNew.json(); msg2=j2 && (j2.message||j2.error||'') || ''; }catch(_){ }
									if(resNew.status===409){ showPopup(msg2 || 'Ese email ya está en uso'); return; }
									showPopup(msg2 || 'No se pudo crear el usuario.'); return;
								}
								// éxito
								fetchUsersList();
								closeEdit(); updateStats(); renderContent();
								return;
							}
						}
					} catch(err){ showPopup('Ocurrió un error al guardar. Inténtalo de nuevo.'); return; }
					// Si no hay token, solo actualizar localmente (modo demo)
					if(id){ const i=d.usuarios.findIndex(function(x){ return x.id===id; }); if(i>-1){ d.usuarios[i] = { ...d.usuarios[i], ...v }; } }
					else { d.usuarios.push({ id: nextId(d.usuarios), ...v }); }
					// Mantener usuarios ordenados por ID ascendente
					d.usuarios.sort(function(a,b){ return (a.id||0) - (b.id||0); });
					closeEdit(); updateStats(); renderContent();
					return;
				}
				else if(t==='productos'){
					const v = { nombre:qs('f_nombre').value, categoria:qs('f_categoria').value, stock:Number(qs('f_stock').value||0), precio:Number(qs('f_precio').value||0) };
					if(id){ const i=d.productos.findIndex(x=>x.id===id); d.productos[i]={ ...d.productos[i], ...v }; } else { d.productos.push({ id: nextId(d.productos), ...v }); }
				}
				else if(t==='categorias'){
					const v = { nombre:String(qs('f_nombre').value||'').trim(), descripcion:String((qs('f_descripcion')&&qs('f_descripcion').value)||'').trim(), estado:String(qs('f_estado').value||'').trim() };
					if(!v.nombre){ showPopup('El nombre de la categoría es obligatorio.'); return; }
					try{
						if(AUTH_TOKEN){
							if(id){
								const payload = { nombre: v.nombre, descripcion: v.descripcion, estado: (v.estado==='active'?1:0) };
								const res = await fetch(API_BASE_URL + '/categorias/' + id, { method:'PUT', headers:{ 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json', 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
								if(!res.ok){ let msg=''; try{ const j=await res.json(); msg=j && (j.message||j.error)||''; }catch(_){ } showPopup(msg||'No se pudo guardar la categoría'); return; }
								fetchCategoriesList(); closeEdit(); renderContent(); return;
							} else {
								const payloadNew = { nombre: v.nombre, descripcion: v.descripcion };
								const resNew = await fetch(API_BASE_URL + '/categorias', { method:'POST', headers:{ 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json', 'Content-Type':'application/json' }, body: JSON.stringify(payloadNew) });
								if(!resNew.ok){ let msg2=''; try{ const j2=await resNew.json(); msg2=j2 && (j2.message||j2.error)||''; }catch(_){ } showPopup(msg2||'No se pudo crear la categoría'); return; }
								fetchCategoriesList(); closeEdit(); renderContent(); return;
							}
						}
					}catch(_){ showPopup('Ocurrió un error al guardar categoría'); return; }
					// Sin token: actualizar localmente (demo)
					if(id){ const i=d.categorias.findIndex(function(x){ return x.id===id; }); if(i>-1){ d.categorias[i] = { ...d.categorias[i], ...v }; } }
					else { d.categorias.push({ id: nextId(d.categorias), ...v }); }
				}
				else if(t==='publicaciones'){
					const v = {
						usuarioId: Number((qs('f_usuarioId') && qs('f_usuarioId').value) || 0),
						categoriaId: Number((qs('f_categoriaId') && qs('f_categoriaId').value) || 0),
						titulo: String(qs('f_titulo').value||'').trim(),
						descripcion: String((qs('f_descripcion')&&qs('f_descripcion').value)||'').trim(),
						tipo: String(qs('f_tipo').value||'').trim(),
						cantidad: String((qs('f_cantidad')&&qs('f_cantidad').value)||''),
						precio: Number((qs('f_precio')&&qs('f_precio').value)||0),
						fechaCaducidad: String(qs('f_fecha').value||'').slice(0,10)
					};
					if(!v.titulo){ showPopup('El título es obligatorio.'); return; }
					try{
						if(AUTH_TOKEN){
							if(id){
								const payload = { ...v, fechaActualizacion: new Date().toISOString() };
								const res = await fetch(API_BASE_URL + '/publicaciones/' + id, { method:'PUT', headers:{ 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json', 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
								if(!res.ok){ let msg=''; try{ const j=await res.json(); msg=j && (j.message||j.error)||''; }catch(_){ } showPopup(msg||'No se pudo guardar la publicación'); return; }
								fetchPublicacionesList(); closeEdit(); renderContent(); return;
							} else {
								const payloadNew = { usuarioId: v.usuarioId, categoriaId: v.categoriaId, titulo: v.titulo, descripcion: v.descripcion, tipo: v.tipo, cantidad: v.cantidad, precio: v.precio, fechaCaducidad: v.fechaCaducidad };
								const resNew = await fetch(API_BASE_URL + '/publicaciones', { method:'POST', headers:{ 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json', 'Content-Type':'application/json' }, body: JSON.stringify(payloadNew) });
								if(!resNew.ok){ let msg2=''; try{ const j2=await resNew.json(); msg2=j2 && (j2.message||j2.error)||''; }catch(_){ } showPopup(msg2||'No se pudo crear la publicación'); return; }
								fetchPublicacionesList(); closeEdit(); renderContent(); return;
							}
						}
					}catch(_){ showPopup('Ocurrió un error al guardar publicación'); return; }
					// sin token, actualiza local
					if(id){ const i=d.publicaciones.findIndex(function(x){ return x.id===id; }); if(i>-1){ d.publicaciones[i] = { ...d.publicaciones[i], ...v, fecha: v.fechaCaducidad }; } }
					else { d.publicaciones.push({ id: nextId(d.publicaciones), ...v, fecha: v.fechaCaducidad }); }
				}
				else if(t==='transacciones'){
					// Leer valores del formulario
					const v = {
						publicacionId: Number((qs('f_publicacionId') && qs('f_publicacionId').value) || 0),
						donanteVendedorId: Number((qs('f_donanteId') && qs('f_donanteId').value) || 0),
						beneficiarioCompradorId: Number((qs('f_beneficiarioId') && qs('f_beneficiarioId').value) || 0),
						fechaTransaccion: String(qs('f_fecha').value||'').slice(0,10)
					};
					// Validaciones mínimas
					if(!v.publicacionId){ showPopup('Selecciona una publicación.'); return; }
					if(!v.donanteVendedorId){ showPopup('Selecciona el donante/vendedor.'); return; }
					if(!v.beneficiarioCompradorId){ showPopup('Selecciona el beneficiario/comprador.'); return; }
					try{
						if(AUTH_TOKEN && id){
							const payload = { publicacionId: v.publicacionId, donanteVendedorId: v.donanteVendedorId, beneficiarioCompradorId: v.beneficiarioCompradorId, fechaTransaccion: (v.fechaTransaccion || undefined) };
							const res = await fetch(API_BASE_URL + '/transacciones/' + id, { method:'PUT', headers:{ 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json', 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
							if(!res.ok){ let msg=''; try{ const j=await res.json(); msg=j && (j.message||j.error)||''; }catch(_){ } showPopup(msg||'No se pudo guardar la transacción'); return; }
							// refrescar
							await fetchTransaccionesList();
							closeEdit(); renderContent(); return;
						}
					}catch(_){ showPopup('Ocurrió un error al guardar transacción'); return; }
					// Sin token o sin id, actualizar localmente (modo demo)
					if(id){ const i=d.transacciones.findIndex(function(x){ return x.id===id; }); if(i>-1){ d.transacciones[i] = { ...d.transacciones[i], publicacionId: v.publicacionId, donanteId: v.donanteVendedorId, beneficiarioId: v.beneficiarioCompradorId, fecha: v.fechaTransaccion }; } }
					else { d.transacciones.push({ id: nextId(d.transacciones), publicacionId: v.publicacionId, donanteId: v.donanteVendedorId, beneficiarioId: v.beneficiarioCompradorId, fecha: v.fechaTransaccion }); }
				}
				else if(t==='reportes'){
					// Leer valores del formulario acorde a la tabla
					const v = {
						reportanteId: Number((qs('f_reportanteId') && qs('f_reportanteId').value) || 0),
						publicacionId: Number((qs('f_publicacionId') && qs('f_publicacionId').value) || 0),
						descripcion: String((qs('f_descripcion') && qs('f_descripcion').value) || '').trim(),
						estado: Number((qs('f_estado') && qs('f_estado').value) || 1),
						fechaReporte: String(qs('f_fecha').value||'').slice(0,10)
					};
					if(!v.reportanteId){ showPopup('Selecciona el reportante.'); return; }
					if(!v.publicacionId){ showPopup('Selecciona la publicación.'); return; }
					if(!v.descripcion){ showPopup('La descripción es obligatoria.'); return; }
					try{
						if(AUTH_TOKEN && id){
							// Enviar con hora 12:00 para evitar desfaces por zona horaria al serializar a UTC
							const payload = { reportanteId: v.reportanteId, publicacionId: v.publicacionId, descripcion: v.descripcion, estado: v.estado, fechaReporte: (v.fechaReporte || undefined) };
							const res = await fetch(API_BASE_URL + '/reportes/' + id, { method:'PUT', headers:{ 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json', 'Content-Type':'application/json' }, body: JSON.stringify(payload) });
							if(!res.ok){ let msg=''; try{ const j=await res.json(); msg=j && (j.message||j.error)||''; }catch(_){ } showPopup(msg||'No se pudo guardar el reporte'); return; }
							await fetchReportesList();
							await fetchReportesPendientes();
							closeEdit(); renderContent(); return;
						}
					}catch(_){ showPopup('Ocurrió un error al guardar reporte'); return; }
					// Sin token, actualiza localmente (demo)
					if(id){ const i=d.reportes.findIndex(function(x){ return x.id===id; }); if(i>-1){ d.reportes[i] = { ...d.reportes[i], reportanteId: v.reportanteId, publicacionId: v.publicacionId, descripcion: v.descripcion, estado: v.estado, fecha: v.fechaReporte }; } }
					else { d.reportes.push({ id: nextId(d.reportes), reportanteId: v.reportanteId, publicacionId: v.publicacionId, descripcion: v.descripcion, estado: v.estado, fecha: v.fechaReporte }); }
				}
				closeEdit(); updateStats(); renderContent();
			}

			function openDelete(mensaje, tipo, id){ state.del={ open:true, tipo:tipo, id:id }; document.getElementById('deleteMessage').textContent = mensaje; document.getElementById('deleteOverlay').classList.add('show'); }
			function closeDelete(){ state.del.open=false; document.getElementById('deleteOverlay').classList.remove('show'); }
			function confirmDelete(){ const d=state.data; const del=state.del; if(!del.id){ closeDelete(); return;} const t=del.tipo; if(t==='usuarios'){ d.usuarios = d.usuarios.filter(x=>x.id!==del.id); }
				else if(t==='categorias'){ d.categorias = d.categorias.filter(x=>x.id!==del.id); }
				else if(t==='publicaciones'){ d.publicaciones = d.publicaciones.filter(x=>x.id!==del.id); }
				else if(t==='transacciones'){ d.transacciones = d.transacciones.filter(x=>x.id!==del.id); }
				else if(t==='reportes'){ d.reportes = d.reportes.filter(x=>x.id!==del.id); }
				closeDelete(); updateStats(); renderContent(); }

			async function toggleUserStatus(id){
				const u = state.data.usuarios.find(x=>x.id===id);
				if(!u) return;
				const isActive = (u.estado==='active');
				// Determinar nuevo estado numérico: desactivar => 0, activar => 1 (user) o 2 (admin)
				let nextNum = 0;
				if(!isActive){ nextNum = (u.rol==='admin') ? 2 : 1; } else { nextNum = 0; }
				try{
					if(AUTH_TOKEN){
						await fetch(API_BASE_URL + '/users/' + id, {
							method: 'PUT',
							headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + AUTH_TOKEN },
							body: JSON.stringify({ estado: nextNum })
						});
					}
				} catch(_){ /* noop */ }
				// Actualizar UI localmente
				u.estado = isActive ? 'inactive' : 'active';
				updateStats(); renderContent();
				// Refrescar desde backend para asegurar consistencia
				fetchUsersList();
			}
			async function togglePublicationStatus(id){
				const p = state.data.publicaciones.find(function(x){ return x.id===id; });
				if(!p) return;
				const isActive = (p.estado==='active');
				try{
					if(AUTH_TOKEN){
						await fetch(API_BASE_URL + '/publicaciones/' + id, {
							method: 'PUT',
							headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + AUTH_TOKEN },
							body: JSON.stringify({ estado: isActive ? 0 : 1 })
						});
					}
				} catch(_){ /* noop */ }
				// Actualiza UI local y refresca desde backend
				p.estado = isActive ? 'inactive' : 'active';
				renderContent();
				fetchPublicacionesList();
			}

			async function toggleTransactionStatus(id){
				const t = state.data.transacciones.find(function(x){ return x.id===id; });
				if(!t) return;
				const isActive = (Number(t.estado)===1);
				try{
					if(AUTH_TOKEN){
						await fetch(API_BASE_URL + '/transacciones/' + id, {
							method: 'PUT',
							headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + AUTH_TOKEN },
							body: JSON.stringify({ estado: isActive ? 0 : 1 })
						});
					}
				} catch(_){ /* noop */ }
				// Actualiza UI local y refresca desde backend
				t.estado = isActive ? 0 : 1;
				renderContent();
				fetchTransaccionesList();
			}

			function updateStats(){
				const d = state.data;
				const usuariosTotales = (state.statsOverride && typeof state.statsOverride.usuariosTotales === 'number') ? state.statsOverride.usuariosTotales : d.usuarios.length;
				const publicacionesActivas = (state.statsOverride && typeof state.statsOverride.publicacionesActivas === 'number') ? state.statsOverride.publicacionesActivas : d.publicaciones.filter(p=>p.estado==='active').length;
				const transacciones = (state.statsOverride && typeof state.statsOverride.transacciones === 'number') ? state.statsOverride.transacciones : d.transacciones.length;
				const reportesPendientes = (state.statsOverride && typeof state.statsOverride.reportesPendientes === 'number') ? state.statsOverride.reportesPendientes : d.reportes.filter(r=>r.estado==='pending').length;
				document.querySelector('#stats .admin-stats-card:nth-child(1) .text-3xl').textContent = usuariosTotales;
				document.querySelector('#stats .admin-stats-card:nth-child(2) .text-3xl').textContent = publicacionesActivas;
				document.querySelector('#stats .admin-stats-card:nth-child(3) .text-3xl').textContent = transacciones;
				document.querySelector('#stats .admin-stats-card:nth-child(4) .text-3xl').textContent = reportesPendientes;
			}

			async function fetchReportesPendientes(){
				try{
					if(!AUTH_TOKEN){ return; }
					const res = await fetch(API_BASE_URL + '/reportes', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } });
					if(!res.ok) { return; }
					const data = await res.json();
					// estado: 1 => pendiente/activo; 0 => eliminado/resuelto (no contar)
					const pending = Array.isArray(data) ? data.filter(function(r){ return Number(r && r.estado) === 1; }).length : 0;
					state.statsOverride = state.statsOverride || {};
					state.statsOverride.reportesPendientes = pending;
					// Actualiza inmediatamente el DOM del stat card de reportes (4to card)
					const el = document.querySelector('#stats .admin-stats-card:nth-child(4) .text-3xl');
					if(el) el.textContent = String(pending);
				} catch(e){ /* noop */ }
			}

			async function toggleReporteStatus(id){
				const r = (state.data.reportes||[]).find(function(x){ return x.id===id; });
				if(!r) return;
				const isActive = (Number(r.estado)===1);
				try{
					if(AUTH_TOKEN){
						await fetch(API_BASE_URL + '/reportes/' + id, {
							method: 'PUT',
							headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + AUTH_TOKEN },
							body: JSON.stringify({ estado: isActive ? 0 : 1 })
						});
					}
				} catch(_){ /* noop */ }
				// Actualiza UI local y refresca
				r.estado = isActive ? 0 : 1;
				renderContent();
				fetchReportesList();
				fetchReportesPendientes();
			}

			// Lista de reportes mapeada a UI: id, reportanteNombre, publicacionTitulo, descripcion, estado, fecha
			async function fetchReportesList(){
				try{
					if(!AUTH_TOKEN){ return; }
					const [rRes, uRes, pRes] = await Promise.all([
						fetch(API_BASE_URL + '/reportes', { headers: { 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json' } }),
						fetch(API_BASE_URL + '/users', { headers: { 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json' } }),
						fetch(API_BASE_URL + '/publicaciones', { headers: { 'Authorization':'Bearer '+AUTH_TOKEN, 'Accept':'application/json' } })
					]);
					if(!rRes.ok){ return; }
					const rData = await rRes.json();
					const uData = uRes.ok ? await uRes.json() : [];
					const pData = pRes.ok ? await pRes.json() : [];
					var userMap = {}; try{ (uData||[]).forEach(function(u){ var id=(u && (u.id_usuario||u.id)); if(id!=null){ userMap[id] = (u.nombre_entidad || u.nombreEntidad || u.nombre || ('Usuario #'+id)); } }); }catch(_){ }
					var pubMap = {}; try{ (pData||[]).forEach(function(p){ var id=(p && (p.id_publicacion||p.id)); if(id!=null){ pubMap[id] = (p.titulo || ('Publicación #'+id)); } }); }catch(_){ }
					if(Array.isArray(rData)){
						state.data.reportes = rData.map(function(r){
							var id = (r && (r.id_reporte || r.id)) || 0;
							var repId = (r && (r.reportante_id || r.reportanteId || (r.reportante && (r.reportante.id || r.reportante.id_usuario))));
							var pubId = (r && (r.publicacion_id || r.publicacionId || (r.publicacion && (r.publicacion.id || r.publicacion.id_publicacion))));
							var nombre = (repId!=null && userMap[repId]) ? userMap[repId] : ((r && r.reportante && (r.reportante.nombre_entidad || r.reportante.nombreEntidad)) || '');
							var titulo = (pubId!=null && pubMap[pubId]) ? pubMap[pubId] : ((r && r.publicacion && r.publicacion.titulo) || '');
							var desc = (r && r.descripcion) || '';
							var est = Number(r && r.estado);
							var fechaRaw = (r && (r.fecha_reporte || r.fecha || r.fechaReporte)) || '';
							var fecha = '';
							try{
								if(fechaRaw){
									// Si viene como 'YYYY-MM-DD...' quedarnos sólo con la parte de fecha
									var s = String(fechaRaw);
									var m = /^(\d{4}-\d{2}-\d{2})/.exec(s);
									if(m){ fecha = m[1]; }
									else { var _d=new Date(fechaRaw); if(!isNaN(_d.getTime())){ fecha=_d.toISOString().slice(0,10); } }
								}
							} catch(_){ }
							return { id: id, reportanteNombre: nombre, publicacionTitulo: titulo, descripcion: desc, estado: est, fecha: fecha };
						}).sort(function(a,b){ return (a.id||0)-(b.id||0); });
						if(state.activeTab==='reportes'){ renderContent(); }
					}
				}catch(_){ }
			}

			async function fetchTransaccionesCount(){
				try{
					if(!AUTH_TOKEN){ return; }
					const res = await fetch(API_BASE_URL + '/transacciones', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } });
					if(!res.ok) { return; }
					const data = await res.json();
					const count = Array.isArray(data) ? data.length : (typeof data?.total === 'number' ? data.total : 0);
					state.statsOverride = state.statsOverride || {};
					state.statsOverride.transacciones = count;
					// Actualiza inmediatamente el DOM del stat card de transacciones (3er card)
					const el = document.querySelector('#stats .admin-stats-card:nth-child(3) .text-3xl');
					if(el) el.textContent = String(count);
				} catch(e){ /* noop */ }
			}

			// Carga y enriquece transacciones con título y precio de la publicación
			async function fetchTransaccionesList(){
				try{
					if(!AUTH_TOKEN){ return; }
					const [tRes, pRes, uRes] = await Promise.all([
						fetch(API_BASE_URL + '/transacciones', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } }),
						fetch(API_BASE_URL + '/publicaciones', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } }),
						fetch(API_BASE_URL + '/users', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } })
					]);
					if(!tRes.ok){ return; }
					const tData = await tRes.json();
					const pData = pRes.ok ? await pRes.json() : [];
					const uData = uRes.ok ? await uRes.json() : [];
					var pubMap = {};
					try{
						(pData || []).forEach(function(p){ var id=(p && (p.id_publicacion||p.id)); if(id!=null){ pubMap[id] = { titulo: p.titulo||'', precio: (p.precio!=null?p.precio:0) }; } });
					}catch(_){ }
					var userMap = {};
					try{
						(uData || []).forEach(function(u){ var id=(u && (u.id_usuario||u.id)); if(id!=null){ userMap[id] = (u.nombre_entidad || u.nombreEntidad || u.nombre || ('Usuario #'+id)); } });
					}catch(_){ }
					if(Array.isArray(tData)){
						state.data.transacciones = tData.map(function(t){
							var id = (t && (t.id_transaccion || t.id)) || 0;
							var pubId = (t && (t.publicacion_id || t.publicacionId || (t.publicacion && (t.publicacion.id || t.publicacion.id_publicacion)))) || null;
							var pubInfo = (pubId!=null && pubMap[pubId]) ? pubMap[pubId] : { titulo: (t && t.publicacion && t.publicacion.titulo) || '', precio: (t && t.publicacion && t.publicacion.precio) || 0 };
							var estado = Number(t && t.estado);
							var donId = (t && (t.donante_vendedor_id || t.donanteVendedorId || (t.donante && (t.donante.id || t.donante.id_usuario))));
							var benId = (t && (t.beneficiario_comprador_id || t.beneficiarioCompradorId || (t.beneficiario && (t.beneficiario.id || t.beneficiario.id_usuario))));
							var donName = (donId!=null && userMap[donId]) ? userMap[donId] : ((t && t.donante && (t.donante.nombre_entidad || t.donante.nombreEntidad)) || '');
							var benName = (benId!=null && userMap[benId]) ? userMap[benId] : ((t && t.beneficiario && (t.beneficiario.nombre_entidad || t.beneficiario.nombreEntidad)) || '');
							var fechaRaw = (t && (t.fecha_transaccion || t.fecha || t.fechaTransaccion)) || '';
							var fecha = '';
							try{
								if(fechaRaw){
									var s = String(fechaRaw);
									var m = /^(\d{4}-\d{2}-\d{2})/.exec(s);
									if(m){ fecha = m[1]; }
									else { var _d=new Date(fechaRaw); if(!isNaN(_d.getTime())){ fecha=_d.toISOString().slice(0,10); } }
								}
							} catch(_){ }
							return { id: id, publicacionId: pubId, publicacionTitulo: pubInfo.titulo, publicacionPrecio: pubInfo.precio, estado: estado, fecha: fecha, donanteNombre: donName, beneficiarioNombre: benName };
						}).sort(function(a,b){ return (a.id||0)-(b.id||0); });
						if(state.activeTab==='transacciones'){ renderContent(); }
					}
				}catch(_){ }
			}

			async function fetchPublicacionesActivas(){
				try{
					if(!AUTH_TOKEN){ return; }
					const res = await fetch(API_BASE_URL + '/publicaciones', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } });
					if(!res.ok) { return; }
					const data = await res.json();
					// Backend usa estado:number (1 activo, 0 dado de baja). Contamos estado===1 como activas
					const actives = Array.isArray(data) ? data.filter(function(p){ return Number(p && p.estado) === 1; }).length : 0;
					state.statsOverride = state.statsOverride || {};
					state.statsOverride.publicacionesActivas = actives;
					// Actualiza inmediatamente el DOM del stat card de publicaciones (2do card)
					const el = document.querySelector('#stats .admin-stats-card:nth-child(2) .text-3xl');
					if(el) el.textContent = String(actives);
				} catch(e){ /* noop */ }
			}

			async function fetchUsersCount(){
				try{
					if(!AUTH_TOKEN){ return; }
					const res = await fetch(API_BASE_URL + '/users', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } });
					if(!res.ok) { return; }
					const data = await res.json();
					const count = Array.isArray(data) ? data.length : (typeof data?.total === 'number' ? data.total : 0);
					state.statsOverride = state.statsOverride || {};
					state.statsOverride.usuariosTotales = count;
					// Actualiza inmediatamente el DOM del stat card
					const n = document.querySelector('#stats .admin-stats-card:nth-child(1) .text-3xl');
					if(n) n.textContent = String(count);
				} catch(e){ /* noop */ }
			}

			// Trae publicaciones y las mapea a la UI
			async function fetchPublicacionesList(){
				try{
					if(!AUTH_TOKEN){ return; }
					const res = await fetch(API_BASE_URL + '/publicaciones', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } });
					if(!res.ok){ return; }
					const data = await res.json();
					if(!Array.isArray(data)){ return; }
					// Mapa de categorías actuales id -> nombre
					var catMap = {};
					try{
						(state.data.categorias || []).forEach(function(c){ if(c && c.id!=null){ catMap[c.id] = c.nombre || ''; } });
					}catch(_){ }
					const mapped = data.map(function(p){
						var id = (p && (p.id_publicacion || p.id)) || 0;
						var titulo = (p && p.titulo) || '';
						var descripcion = (p && p.descripcion) || '';
						var tipo = (p && p.tipo) || '';
						var cantidad = (p && (p.cantidad!=null ? p.cantidad : p.stock)) || '';
						var fecha = (p && (p.fecha_caducidad || p.fechaCaducidad || p.fecha)) || '';
						var categoriaId = (p && (p.categoria_id || p.categoriaId || p.categoria)) || null;
						var usuarioId = (p && (p.usuario_id || p.usuarioId || (p.usuario && (p.usuario.id || p.usuario.id_usuario)))) || null;
						var categoriaNombre = (categoriaId!=null && catMap[categoriaId]) ? catMap[categoriaId] : '';
						var est = Number(p && p.estado);
						var uiEstado = (est === 1) ? 'active' : 'inactive';
						return { id: id, titulo: titulo, descripcion: descripcion, tipo: tipo, cantidad: cantidad, fecha: fecha, categoriaId: categoriaId, categoriaNombre: categoriaNombre, usuarioId: usuarioId, estado: uiEstado };
					}).sort(function(a,b){ return (a.id||0) - (b.id||0); });
					state.data.publicaciones = mapped;
					if(state.activeTab==='publicaciones'){ renderContent(); }
				}catch(_){ }
			}

			// Trae lista de usuarios y mapea campos para la tabla
			async function fetchUsersList(){
				try{
					if(!AUTH_TOKEN){ return; }
					const res = await fetch(API_BASE_URL + '/users', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } });
					if(!res.ok) { return; }
					const data = await res.json();
					if(!Array.isArray(data)) { return; }
					// Mapear a la forma usada por la UI: { id, nombre, tipoEntidad, email, rol, estado }
					const mapped = data.map(function(u){
						var id = (u && (u.id_usuario || u.id)) || 0;
						var tipoEntidad = (u && (u.tipo_entidad || u.tipoEntidad)) || '';
						var nombreEntidad = (u && (u.nombre_entidad || u.nombreEntidad)) || '';
						var correo = (u && u.correo) || '';
						var telefono = (u && u.telefono) || '';
						var direccion = (u && u.direccion) || '';
						var ubicacion = (u && u.ubicacion) || '';
						var est = Number(u && u.estado);
						var rol = (est === 2) ? 'admin' : 'user';
						// estado en la UI: 'active' si estado === 1 o 2, 'inactive' si estado === 0
						var uiEstado = (est === 0) ? 'inactive' : 'active';
						return { id: id, nombre: nombreEntidad, tipoEntidad: tipoEntidad, email: correo, telefono: telefono, direccion: direccion, ubicacion: ubicacion, rol: rol, estado: uiEstado };
					});
					state.data = state.data || {}; state.data.usuarios = mapped.sort(function(a,b){ return (a.id||0) - (b.id||0); });
					// Actualizar stats override y DOM del primer card
					state.statsOverride = state.statsOverride || {};
					state.statsOverride.usuariosTotales = mapped.length;
					var n = document.querySelector('#stats .admin-stats-card:nth-child(1) .text-3xl');
					if(n) n.textContent = String(mapped.length);
					// Si estamos en la pestaña usuarios, re-renderizar la tabla
					if(state.activeTab === 'usuarios') { renderContent(); }
				} catch(e){ /* noop */ }
			}

			// Trae lista de categorías desde backend y mapea a la UI (ID ordenado ascendente)
			async function fetchCategoriesList(){
				try{
					if(!AUTH_TOKEN){ return; }
					const res = await fetch(API_BASE_URL + '/categorias', { headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } });
					if(!res.ok){ return; }
					const data = await res.json();
					if(!Array.isArray(data)){ return; }
					const mapped = data.map(function(c){
						var id = (c && (c.id_categoria || c.id)) || 0;
						var nombre = (c && c.nombre) || '';
						var descripcion = (c && c.descripcion) || '';
						var est = Number(c && c.estado);
						var uiEstado = (est === 1) ? 'active' : 'inactive';
						return { id: id, nombre: nombre, descripcion: descripcion, estado: uiEstado };
					}).sort(function(a,b){ return (a.id||0) - (b.id||0); });
					state.data.categorias = mapped;
					if(state.activeTab==='categorias'){ renderContent(); }
				}catch(_){ }
			}

			function qs(id){ return document.getElementById(id); }

			// Exponer funciones usadas por onclick al objeto global (iframe)
			window.openEdit = openEdit;
			window.openDelete = openDelete;
			window.toggleUserStatus = toggleUserStatus;
			window.togglePublicationStatus = togglePublicationStatus;
			// No se expone toggle de categoría por ahora

			async function toggleCategoryStatus(id){
				const c = state.data.categorias.find(function(x){ return x.id===id; });
				if(!c) return;
				const isActive = (c.estado==='active');
				try{
					if(AUTH_TOKEN){
						if(isActive){
							await fetch(API_BASE_URL + '/categorias/delete/' + id, { method: 'PUT', headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json' } });
						} else {
							await fetch(API_BASE_URL + '/categorias/' + id, { method: 'PUT', headers: { 'Authorization': 'Bearer ' + AUTH_TOKEN, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ estado: 1 }) });
						}
					}
				}catch(_){ }
				c.estado = isActive ? 'inactive' : 'active';
				renderContent();
				fetchCategoriesList();
			}

			function setActiveTab(tab){
				state.activeTab = tab;
				document.querySelectorAll('.admin-tab-btn').forEach(b=>b.classList.toggle('active', b.getAttribute('data-tab')===tab));
				renderContent();
				if(tab==='categorias'){ fetchCategoriesList(); }
				if(tab==='publicaciones'){ fetchCategoriesList(); fetchPublicacionesList(); }
				if(tab==='transacciones'){ fetchTransaccionesList(); }
				if(tab==='reportes'){ fetchReportesList(); }
			}

			function init(){
				document.querySelectorAll('[data-tab]').forEach(b=>{ b.addEventListener('click', function(){ setActiveTab(b.getAttribute('data-tab')); }); });
				renderStats();
				renderContent(); // Mostrar contenido inicial
				fetchUsersList();
				fetchPublicacionesActivas();
				fetchPublicacionesList();
				fetchTransaccionesCount();
				fetchTransaccionesList();
				fetchReportesPendientes();
				fetchReportesList();
				fetchCategoriesList();
				qs('btnCloseEdit').addEventListener('click', closeEdit);
				qs('btnCancelEdit').addEventListener('click', closeEdit);
				qs('editForm').addEventListener('submit', saveEdit);
				var _pclose = document.getElementById('appPopupClose'); if(_pclose){ _pclose.addEventListener('click', hidePopup); }
				qs('btnCloseDelete').addEventListener('click', closeDelete);
				qs('btnCancelDelete').addEventListener('click', closeDelete);
				qs('btnConfirmDelete').addEventListener('click', confirmDelete);
				// Delegación de eventos para acciones en tablas
				document.getElementById('content').addEventListener('click', function(ev){
					var el = ev.target;
					while(el && el.nodeType===1 && el.tagName!=='BUTTON'){ el = el.parentElement; }
					var btn = (el && el.tagName==='BUTTON') ? el : null;
					if(!btn) return;
					const action = btn.getAttribute('data-action');
					if(!action) return;
					const tipo = btn.getAttribute('data-tipo');
					const idAttr = btn.getAttribute('data-id');
					const id = idAttr ? parseInt(idAttr, 10) : null;
						switch(action){
						case 'open-new': if(tipo) openEdit(tipo, null); break;
						case 'edit': if(tipo && id!=null) openEdit(tipo, id); break;
						case 'toggle-user': if(id!=null) toggleUserStatus(id); break;
						case 'toggle-publication': if(id!=null) togglePublicationStatus(id); break;
						case 'toggle-transaction': if(id!=null) toggleTransactionStatus(id); break;
						case 'toggle-reporte': if(id!=null) toggleReporteStatus(id); break;
							case 'toggle-category': if(id!=null) toggleCategoryStatus(id); break;
						case 'delete':
							if(!tipo || id==null) break;
							let mensaje = '';
							if(tipo==='usuarios'){
								const u = state.data.usuarios.find(x=>x.id===id);
								mensaje = '¿Eliminar el usuario '+(u? u.nombre : ('#'+id))+'?';
							} else if(tipo==='categorias'){
								const g = state.data.categorias.find(x=>x.id===id);
								mensaje = '¿Eliminar la categoría '+(g? g.nombre : ('#'+id))+'?';
							} else if(tipo==='publicaciones'){
								const p = state.data.publicaciones.find(x=>x.id===id);
								mensaje = '¿Eliminar la publicación '+(p? p.titulo : ('#'+id))+'?';
							} else if(tipo==='transacciones'){
								mensaje = '¿Eliminar la transacción #'+id+'?';
							} else if(tipo==='reportes'){
								mensaje = '¿Eliminar el reporte #'+id+'?';
							}
							openDelete(mensaje, tipo, id);
							break;
					}
				});
				// Cerrar modales al clicar fuera
				document.getElementById('modalOverlay').addEventListener('click', function(e){ if(e.target===this) closeEdit(); });
				document.getElementById('deleteOverlay').addEventListener('click', function(e){ if(e.target===this) closeDelete(); });
				document.addEventListener('keydown', function(ev){ if(ev.key==='Escape'){ if(state.edit.open) closeEdit(); if(state.del.open) closeDelete(); } });
			}

			// Exponer init global para onload y fallback
			window.init = function(){ try { 
				document.querySelectorAll('[data-tab]').forEach(b=>{ b.addEventListener('click', function(){ setActiveTab(b.getAttribute('data-tab')); }); });
				renderStats();
				renderContent(); // Mostrar contenido inicial
				fetchUsersList();
				fetchPublicacionesActivas();
				fetchPublicacionesList();
				fetchTransaccionesCount();
				fetchReportesPendientes();
				fetchCategoriesList();
				qs('btnCloseEdit').addEventListener('click', closeEdit);
				qs('btnCancelEdit').addEventListener('click', closeEdit);
				qs('editForm').addEventListener('submit', saveEdit);
				var _pclose2 = document.getElementById('appPopupClose'); if(_pclose2){ _pclose2.addEventListener('click', hidePopup); }
				qs('btnCloseDelete').addEventListener('click', closeDelete);
				qs('btnCancelDelete').addEventListener('click', closeDelete);
				qs('btnConfirmDelete').addEventListener('click', confirmDelete);
				document.getElementById('content').addEventListener('click', function(ev){
					var el = ev.target;
					while(el && el.nodeType===1 && el.tagName!=='BUTTON'){ el = el.parentElement; }
					var btn = (el && el.tagName==='BUTTON') ? el : null;
					if(!btn) return;
					const action = btn.getAttribute('data-action');
					if(!action) return;
					const tipo = btn.getAttribute('data-tipo');
					const idAttr = btn.getAttribute('data-id');
					const id = idAttr ? parseInt(idAttr, 10) : null;
					switch(action){
						case 'open-new': if(tipo) openEdit(tipo, null); break;
						case 'edit': if(tipo && id!=null) openEdit(tipo, id); break;
						case 'toggle-user': if(id!=null) toggleUserStatus(id); break;
						case 'toggle-publication': if(id!=null) togglePublicationStatus(id); break;
							case 'toggle-transaction': if(id!=null) toggleTransactionStatus(id); break;
							case 'toggle-reporte': if(id!=null) toggleReporteStatus(id); break;
						case 'toggle-category': if(id!=null) toggleCategoryStatus(id); break;
						case 'delete':
							if(!tipo || id==null) break;
							let mensaje = '';
							if(tipo==='usuarios'){
								const u = state.data.usuarios.find(x=>x.id===id);
								mensaje = '¿Eliminar el usuario '+(u? u.nombre : ('#'+id))+'?';
							} else if(tipo==='productos'){
								const p = state.data.productos.find(x=>x.id===id);
								mensaje = '¿Eliminar el producto '+(p? p.nombre : ('#'+id))+'?';
							} else if(tipo==='categorias'){
								const g = state.data.categorias.find(x=>x.id===id);
								mensaje = '¿Eliminar la categoría '+(g? g.nombre : ('#'+id))+'?';
							} else if(tipo==='publicaciones'){
								const p = state.data.publicaciones.find(x=>x.id===id);
								mensaje = '¿Eliminar la publicación '+(p? p.titulo : ('#'+id))+'?';
							} else if(tipo==='transacciones'){
								mensaje = '¿Eliminar la transacción #'+id+'?';
							} else if(tipo==='reportes'){
								mensaje = '¿Eliminar el reporte #'+id+'?';
							}
							openDelete(mensaje, tipo, id);
							break;
					}
				});
				document.getElementById('modalOverlay').addEventListener('click', function(e){ if(e.target===this) closeEdit(); });
				document.getElementById('deleteOverlay').addEventListener('click', function(e){ if(e.target===this) closeDelete(); });
				document.addEventListener('keydown', function(ev){ if(ev.key==='Escape'){ if(state.edit.open) closeEdit(); if(state.del.open) closeDelete(); } });
			} catch(err) { console.error('init error', err); }}

			try{
				if (document.readyState === 'loading') {
					document.addEventListener('DOMContentLoaded', init);
				} else {
					init();
				}
			}catch(e){ setTimeout(()=>{ try{ init(); }catch(_){} },0); }
		</script>
	</body>
	</html>`;

export default function AdminScreen(){
	const { token } = useAuth();
	const webViewRef = React.useRef<WebView>(null);

	// El backend expone las rutas bajo /foodloop en el puerto 4001
	const apiBase = 'http://localhost:4001/foodloop';
	const htmlWithEnv = React.useMemo(()=>{
		return html
		  .replace('__API_BASE_URL__', apiBase)
		  .replace('__AUTH_TOKEN__', token ?? '');
	}, [token]);

	if (Platform.OS === 'web') {
		return (
			<SafeAreaView style={styles.safe}>
				<Navbar />
				<View style={styles.iframeContainer}>
					<iframe title="Admin" srcDoc={htmlWithEnv} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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
						if(data?.type==='navigate' && typeof data.path==='string') router.push(data.path as any);
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

