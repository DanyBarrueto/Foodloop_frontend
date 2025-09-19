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
						<button class="admin-tab-btn" data-tab="productos">📦 Productos</button>
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
					<div id="content">
						<div class="admin-table-container animate-slide-up">
							<div class="flex items-center justify-between p-4">
								<h2 class="text-lg font-semibold text-gray-800">👥 Gestión de Usuarios</h2>
								<button class="admin-btn-primary" onclick="openEdit('usuarios', null)">Nuevo Usuario</button>
							</div>
							<div class="overflow-x-auto">
								<table class="admin-table">
									<thead>
										<tr>
											<th>ID</th>
											<th>Nombre</th>
											<th>Correo</th>
											<th>Rol</th>
											<th>Estado</th>
											<th>Fecha Registro</th>
											<th>Acciones</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>1</td>
											<td>Juan Pérez</td>
											<td>juan@email.com</td>
											<td><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Restaurante</span></td>
											<td><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">activo</span></td>
											<td>14/1/2024</td>
											<td class="flex flex-wrap gap-2">
												<button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">✏️</button>
												<button class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">⏸️</button>
												<button class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">🗑️</button>
											</td>
										</tr>
										<tr>
											<td>2</td>
											<td>María García</td>
											<td>maria@email.com</td>
											<td><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">ONG</span></td>
											<td><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">activo</span></td>
											<td>15/1/2024</td>
											<td class="flex flex-wrap gap-2">
												<button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">✏️</button>
												<button class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">⏸️</button>
												<button class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">🗑️</button>
											</td>
										</tr>
										<tr>
											<td>3</td>
											<td>Carlos López</td>
											<td>carlos@email.com</td>
											<td><span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Supermercado</span></td>
											<td><span class="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Inactivo</span></td>
											<td>13/1/2024</td>
											<td class="flex flex-wrap gap-2">
												<button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">✏️</button>
												<button class="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">▶️</button>
												<button class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">🗑️</button>
											</td>
										</tr>
										<tr>
											<td>4</td>
											<td>Ana Martín</td>
											<td>ana@email.com</td>
											<td><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Comprador</span></td>
											<td><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">activo</span></td>
											<td>16/1/2024</td>
											<td class="flex flex-wrap gap-2">
												<button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">✏️</button>
												<button class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">⏸️</button>
												<button class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">🗑️</button>
											</td>
										</tr>
										<tr>
											<td>5</td>
											<td>Admin Sistema</td>
											<td>admin@foodloop.com</td>
											<td><span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Administrador</span></td>
											<td><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">activo</span></td>
											<td>31/12/2023</td>
											<td class="flex flex-wrap gap-2">
												<button class="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">✏️</button>
												<button class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600">⏸️</button>
												<button class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">🗑️</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>

			<!-- Modal Edición -->
			<div id="modalOverlay" class="admin-modal-overlay">
				<div class="admin-modal-content">
					<button class="admin-btn-close" id="btnCloseEdit">✖</button>
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
			const TABS = ['usuarios','productos','categorias','publicaciones','transacciones','reportes'];
			const state = { activeTab: 'usuarios', edit: { open:false, tipo:'', id:null }, del: { open:false, tipo:'', id:null }, data: {
				usuarios: [ { id:1, nombre:'Ana López', email:'ana@example.com', rol:'admin', estado:'active' }, { id:2, nombre:'Luis Pérez', email:'luis@example.com', rol:'user', estado:'inactive' }, { id:3, nombre:'María Gómez', email:'maria@example.com', rol:'user', estado:'active' } ],
				productos: [ { id:1, nombre:'Pan artesanal', categoria:'Panadería', stock:40, precio:1.5 }, { id:2, nombre:'Leche entera', categoria:'Lácteos', stock:25, precio:0.9 } ],
				categorias: [ { id:1, nombre:'Frutas y Verduras', productos:120 }, { id:2, nombre:'Panadería', productos:45 }, { id:3, nombre:'Lácteos', productos:60 } ],
				publicaciones: [ { id:1, titulo:'Excedente de verduras frescas', tipo:'donación', estado:'active', fecha:'2025-09-01' }, { id:2, titulo:'Pan del día anterior', tipo:'venta', estado:'paused', fecha:'2025-09-10' }, { id:3, titulo:'Lácteos por vencer', tipo:'venta', estado:'expired', fecha:'2025-08-27' } ],
				transacciones: [ { id:1001, usuario:'Ana López', monto:12.5, estado:'pending', fecha:'2025-09-12' }, { id:1002, usuario:'Luis Pérez', monto:4.0, estado:'completed', fecha:'2025-09-13' } ],
				reportes: [ { id:501, reportante:'Usuario 23', asunto:'Publicación duplicada', estado:'pending', fecha:'2025-09-09' }, { id:502, reportante:'Usuario 17', asunto:'Contenido inapropiado', estado:'resolved', fecha:'2025-09-11' } ]
			}};

			function formatDate(iso){ try { return new Date(iso).toLocaleDateString('es-ES'); } catch(e){ return iso; } }

			function renderStats(){
				const d = state.data;
				const usuariosTotales = d.usuarios.length;
				const publicacionesActivas = d.publicaciones.filter(p=>p.estado==='active').length;
				const transacciones = d.transacciones.length;
				const reportesPendientes = d.reportes.filter(r=>r.estado==='pending').length;
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
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">👥 Gestión de Usuarios</h2><button class="admin-btn-primary" onclick="openEdit(\'usuarios\', null)">➕ Nuevo Usuario</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>'+
					state.data.usuarios.map(u=>'<tr><td>'+u.id+'</td><td>'+u.nombre+'</td><td>'+u.email+'</td><td>'+u.rol+'</td><td>'+(u.estado==='active'?'<span class="admin-badge-active">Activo</span>':'<span class="admin-badge-inactive">Inactivo</span>')+'</td><td class="flex flex-wrap gap-2"><button class="admin-btn-secondary" onclick="openEdit(\'usuarios\', '+u.id+')">✏️ Editar</button><button class="admin-btn-warning" onclick="toggleUserStatus('+u.id+')">'+(u.estado==='active'?'⏸️ Desactivar':'▶️ Activar')+'</button><button class="admin-btn-danger" onclick="openDelete(\'¿Eliminar el usuario '+u.nombre+'?\', \'usuarios\', '+u.id+')">🗑️ Eliminar</button></td></tr>').join('')+
					'</tbody></table></div></div>';
				} else if(state.activeTab==='productos'){
					html = '<div class="admin-table-container">'+
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">📦 Gestión de Productos</h2><button class="admin-btn-primary" onclick="openEdit(\'productos\', null)">➕ Nuevo Producto</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Stock</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>'+
					state.data.productos.map(p=>'<tr><td>'+p.id+'</td><td>'+p.nombre+'</td><td>'+p.categoria+'</td><td>'+p.stock+'</td><td>€ '+Number(p.precio).toFixed(2)+'</td><td class="flex flex-wrap gap-2"><button class="admin-btn-secondary" onclick="openEdit(\'productos\', '+p.id+')">✏️ Editar</button><button class="admin-btn-danger" onclick="openDelete(\'¿Eliminar el producto '+p.nombre+'?\', \'productos\', '+p.id+')">🗑️ Eliminar</button></td></tr>').join('')+
					'</tbody></table></div></div>';
				} else if(state.activeTab==='categorias'){
					html = '<div class="admin-table-container">'+
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">🏷️ Gestión de Categorías</h2><button class="admin-btn-primary" onclick="openEdit(\'categorias\', null)">➕ Nueva Categoría</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>ID</th><th>Nombre</th><th># Productos</th><th>Acciones</th></tr></thead><tbody>'+
					state.data.categorias.map(g=>'<tr><td>'+g.id+'</td><td>'+g.nombre+'</td><td>'+g.productos+'</td><td class="flex flex-wrap gap-2"><button class="admin-btn-secondary" onclick="openEdit(\'categorias\', '+g.id+')">✏️ Editar</button><button class="admin-btn-danger" onclick="openDelete(\'¿Eliminar la categoría '+g.nombre+'?\', \'categorias\', '+g.id+')">🗑️ Eliminar</button></td></tr>').join('')+
					'</tbody></table></div></div>';
				} else if(state.activeTab==='publicaciones'){
					html = '<div class="admin-table-container">'+
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">📰 Gestión de Publicaciones</h2><button class="admin-btn-primary" onclick="openEdit(\'publicaciones\', null)">➕ Nueva Publicación</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>ID</th><th>Título</th><th>Tipo</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody>'+
					state.data.publicaciones.map(p=>'<tr><td>'+p.id+'</td><td>'+p.titulo+'</td><td>'+p.tipo+'</td><td>'+badgeEstado(p.estado)+'</td><td>'+formatDate(p.fecha)+'</td><td class="flex flex-wrap gap-2"><button class="admin-btn-secondary" onclick="openEdit(\'publicaciones\', '+p.id+')">✏️ Editar</button><button class="admin-btn-warning" onclick="togglePublicationStatus('+p.id+')"'+(p.estado==='expired'?' disabled':'')+'>'+(p.estado==='paused'?'▶️ Reanudar':'⏸️ Pausar')+'</button><button class="admin-btn-danger" onclick="openDelete(\'¿Eliminar la publicación '+p.titulo+'?\', \'publicaciones\', '+p.id+')">🗑️ Eliminar</button></td></tr>').join('')+
					'</tbody></table></div></div>';
				} else if(state.activeTab==='transacciones'){
					html = '<div class="admin-table-container">'+
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">💳 Gestión de Transacciones</h2><button class="admin-btn-primary" onclick="openEdit(\'transacciones\', null)">➕ Nueva Transacción</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>ID</th><th>Usuario</th><th>Monto</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody>'+
					state.data.transacciones.map(t=>'<tr><td>'+t.id+'</td><td>'+t.usuario+'</td><td>€ '+Number(t.monto).toFixed(2)+'</td><td>'+(t.estado==='pending'?'<span class="admin-badge-pending">Pendiente</span>':(t.estado==='completed'?'<span class="admin-badge-resolved">Completada</span>':'<span class="admin-badge-expired">Fallida</span>'))+'</td><td>'+formatDate(t.fecha)+'</td><td class="flex flex-wrap gap-2"><button class="admin-btn-secondary" onclick="openEdit(\'transacciones\', '+t.id+')">✏️ Editar</button><button class="admin-btn-danger" onclick="openDelete(\'¿Eliminar la transacción #'+t.id+'?\', \'transacciones\', '+t.id+')">🗑️ Eliminar</button></td></tr>').join('')+
					'</tbody></table></div></div>';
				} else if(state.activeTab==='reportes'){
					html = '<div class="admin-table-container">'+
					'<div class="flex items-center justify-between p-4"><h2 class="text-lg font-semibold text-gray-800">📝 Gestión de Reportes</h2><button class="admin-btn-primary" onclick="openEdit(\'reportes\', null)">➕ Nuevo Reporte</button></div>'+
					'<div class="overflow-x-auto"><table class="admin-table"><thead><tr><th>ID</th><th>Reportante</th><th>Asunto</th><th>Estado</th><th>Fecha</th><th>Acciones</th></tr></thead><tbody>'+
					state.data.reportes.map(r=>'<tr><td>'+r.id+'</td><td>'+r.reportante+'</td><td>'+r.asunto+'</td><td>'+(r.estado==='pending'?'<span class="admin-badge-pending">Pendiente</span>':'<span class="admin-badge-resolved">Resuelto</span>')+'</td><td>'+formatDate(r.fecha)+'</td><td class="flex flex-wrap gap-2"><button class="admin-btn-secondary" onclick="openEdit(\'reportes\', '+r.id+')">✏️ Editar</button><button class="admin-btn-danger" onclick="openDelete(\'¿Eliminar el reporte #'+r.id+'?\', \'reportes\', '+r.id+')">🗑️ Eliminar</button></td></tr>').join('')+
					'</tbody></table></div></div>';
				}
				 c.innerHTML = html;
			}

			function nextId(arr){ return arr.length ? Math.max.apply(null, arr.map(x=>x.id)) + 1 : 1; }

			function openEdit(tipo, id){
				state.edit = { open:true, tipo:tipo, id:id };
				document.getElementById('modalOverlay').classList.add('show');
				renderEditModal();
			}

			function closeEdit(){ state.edit.open=false; document.getElementById('modalOverlay').classList.remove('show'); }

			function renderEditModal(){
				const t = state.edit.tipo; const id = state.edit.id; const data = state.data;
				document.getElementById('modalTitle').textContent = (id? 'Editar ' : 'Agregar ') + t;
				let fields = '';
				if(t==='usuarios'){
					const u = id? data.usuarios.find(x=>x.id===id) : { nombre:'', email:'', rol:'user', estado:'active' };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Nombre</label><input id="f_nombre" class="admin-form-input" value="'+(u.nombre||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Email</label><input id="f_email" class="admin-form-input" value="'+(u.email||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Rol</label><select id="f_rol" class="admin-form-select"><option '+(u.rol==='admin'?'selected':'')+'>admin</option><option '+(u.rol==='user'?'selected':'')+'>user</option></select></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Estado</label><select id="f_estado" class="admin-form-select"><option '+(u.estado==='active'?'selected':'')+'>active</option><option '+(u.estado!=='active'?'selected':'')+'>inactive</option></select></div>';
				} else if(t==='productos'){
					const p = id? data.productos.find(x=>x.id===id) : { nombre:'', categoria:'', stock:0, precio:0 };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Nombre</label><input id="f_nombre" class="admin-form-input" value="'+(p.nombre||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Categoría</label><input id="f_categoria" class="admin-form-input" value="'+(p.categoria||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Stock</label><input id="f_stock" type="number" class="admin-form-input" value="'+(p.stock||0)+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Precio (€)</label><input id="f_precio" type="number" step="0.01" class="admin-form-input" value="'+(p.precio||0)+'" /></div>';
				} else if(t==='categorias'){
					const g = id? data.categorias.find(x=>x.id===id) : { nombre:'', productos:0 };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Nombre</label><input id="f_nombre" class="admin-form-input" value="'+(g.nombre||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label"># Productos</label><input id="f_productos" type="number" class="admin-form-input" value="'+(g.productos||0)+'" /></div>';
				} else if(t==='publicaciones'){
					const p = id? data.publicaciones.find(x=>x.id===id) : { titulo:'', tipo:'donación', estado:'active', fecha: new Date().toISOString().slice(0,10) };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Título</label><input id="f_titulo" class="admin-form-input" value="'+(p.titulo||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Tipo</label><select id="f_tipo" class="admin-form-select"><option '+(p.tipo==='donación'?'selected':'')+'>donación</option><option '+(p.tipo==='venta'?'selected':'')+'>venta</option></select></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Estado</label><select id="f_estado" class="admin-form-select"><option '+(p.estado==='active'?'selected':'')+'>active</option><option '+(p.estado==='paused'?'selected':'')+'>paused</option><option '+(p.estado==='expired'?'selected':'')+'>expired</option></select></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Fecha</label><input id="f_fecha" type="date" class="admin-form-input" value="'+(p.fecha||'')+'" /></div>';
				} else if(t==='transacciones'){
					const tnx = id? data.transacciones.find(x=>x.id===id) : { usuario:'', monto:0, estado:'pending', fecha: new Date().toISOString().slice(0,10) };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Usuario</label><input id="f_usuario" class="admin-form-input" value="'+(tnx.usuario||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Monto (€)</label><input id="f_monto" type="number" step="0.01" class="admin-form-input" value="'+(tnx.monto||0)+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Estado</label><select id="f_estado" class="admin-form-select"><option '+(tnx.estado==='pending'?'selected':'')+'>pending</option><option '+(tnx.estado==='completed'?'selected':'')+'>completed</option><option '+(tnx.estado==='failed'?'selected':'')+'>failed</option></select></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Fecha</label><input id="f_fecha" type="date" class="admin-form-input" value="'+(tnx.fecha||'')+'" /></div>';
				} else if(t==='reportes'){
					const r = id? data.reportes.find(x=>x.id===id) : { reportante:'', asunto:'', estado:'pending', fecha: new Date().toISOString().slice(0,10) };
					fields = '<div class="admin-form-group"><label class="admin-form-label">Reportante</label><input id="f_reportante" class="admin-form-input" value="'+(r.reportante||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Asunto</label><input id="f_asunto" class="admin-form-input" value="'+(r.asunto||'')+'" /></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Estado</label><select id="f_estado" class="admin-form-select"><option '+(r.estado==='pending'?'selected':'')+'>pending</option><option '+(r.estado==='resolved'?'selected':'')+'>resolved</option></select></div>'+
					         '<div class="admin-form-group"><label class="admin-form-label">Fecha</label><input id="f_fecha" type="date" class="admin-form-input" value="'+(r.fecha||'')+'" /></div>';
				}
				document.getElementById('modalFields').innerHTML = fields;
			}

			function saveEdit(e){ e && e.preventDefault && e.preventDefault(); const t=state.edit.tipo; const id=state.edit.id; const d=state.data;
				if(t==='usuarios'){
					const v = { nombre:qs('f_nombre').value, email:qs('f_email').value, rol:qs('f_rol').value, estado:qs('f_estado').value };
					if(id){ const i=d.usuarios.findIndex(x=>x.id===id); d.usuarios[i]={ ...d.usuarios[i], ...v }; } else { d.usuarios.push({ id: nextId(d.usuarios), ...v }); }
				}
				else if(t==='productos'){
					const v = { nombre:qs('f_nombre').value, categoria:qs('f_categoria').value, stock:Number(qs('f_stock').value||0), precio:Number(qs('f_precio').value||0) };
					if(id){ const i=d.productos.findIndex(x=>x.id===id); d.productos[i]={ ...d.productos[i], ...v }; } else { d.productos.push({ id: nextId(d.productos), ...v }); }
				}
				else if(t==='categorias'){
					const v = { nombre:qs('f_nombre').value, productos:Number(qs('f_productos').value||0) };
					if(id){ const i=d.categorias.findIndex(x=>x.id===id); d.categorias[i]={ ...d.categorias[i], ...v }; } else { d.categorias.push({ id: nextId(d.categorias), ...v }); }
				}
				else if(t==='publicaciones'){
					const v = { titulo:qs('f_titulo').value, tipo:qs('f_tipo').value, estado:qs('f_estado').value, fecha:qs('f_fecha').value };
					if(id){ const i=d.publicaciones.findIndex(x=>x.id===id); d.publicaciones[i]={ ...d.publicaciones[i], ...v }; } else { d.publicaciones.push({ id: nextId(d.publicaciones), ...v }); }
				}
				else if(t==='transacciones'){
					const v = { usuario:qs('f_usuario').value, monto:Number(qs('f_monto').value||0), estado:qs('f_estado').value, fecha:qs('f_fecha').value };
					if(id){ const i=d.transacciones.findIndex(x=>x.id===id); d.transacciones[i]={ ...d.transacciones[i], ...v }; } else { d.transacciones.push({ id: nextId(d.transacciones), ...v }); }
				}
				else if(t==='reportes'){
					const v = { reportante:qs('f_reportante').value, asunto:qs('f_asunto').value, estado:qs('f_estado').value, fecha:qs('f_fecha').value };
					if(id){ const i=d.reportes.findIndex(x=>x.id===id); d.reportes[i]={ ...d.reportes[i], ...v }; } else { d.reportes.push({ id: nextId(d.reportes), ...v }); }
				}
				closeEdit(); updateStats(); renderContent();
			}

			function openDelete(mensaje, tipo, id){ state.del={ open:true, tipo:tipo, id:id }; document.getElementById('deleteMessage').textContent = mensaje; document.getElementById('deleteOverlay').classList.add('show'); }
			function closeDelete(){ state.del.open=false; document.getElementById('deleteOverlay').classList.remove('show'); }
			function confirmDelete(){ const d=state.data; const del=state.del; if(!del.id){ closeDelete(); return;} const t=del.tipo; if(t==='usuarios'){ d.usuarios = d.usuarios.filter(x=>x.id!==del.id); }
				else if(t==='productos'){ d.productos = d.productos.filter(x=>x.id!==del.id); }
				else if(t==='categorias'){ d.categorias = d.categorias.filter(x=>x.id!==del.id); }
				else if(t==='publicaciones'){ d.publicaciones = d.publicaciones.filter(x=>x.id!==del.id); }
				else if(t==='transacciones'){ d.transacciones = d.transacciones.filter(x=>x.id!==del.id); }
				else if(t==='reportes'){ d.reportes = d.reportes.filter(x=>x.id!==del.id); }
				closeDelete(); updateStats(); renderContent(); }

			function toggleUserStatus(id){ const u = state.data.usuarios.find(x=>x.id===id); if(!u) return; u.estado = (u.estado==='active') ? 'inactive' : 'active'; updateStats(); renderContent(); }
			function togglePublicationStatus(id){ const p = state.data.publicaciones.find(x=>x.id===id); if(!p || p.estado==='expired') return; p.estado = (p.estado==='paused') ? 'active' : 'paused'; updateStats(); renderContent(); }

			function updateStats(){
				const d = state.data;
				const usuariosTotales = d.usuarios.length;
				const publicacionesActivas = d.publicaciones.filter(p=>p.estado==='active').length;
				const transacciones = d.transacciones.length;
				const reportesPendientes = d.reportes.filter(r=>r.estado==='pending').length;
				document.querySelector('#stats .admin-stats-card:nth-child(1) .text-3xl').textContent = usuariosTotales;
				document.querySelector('#stats .admin-stats-card:nth-child(2) .text-3xl').textContent = publicacionesActivas;
				document.querySelector('#stats .admin-stats-card:nth-child(3) .text-3xl').textContent = transacciones;
				document.querySelector('#stats .admin-stats-card:nth-child(4) .text-3xl').textContent = reportesPendientes;
			}

			function qs(id){ return document.getElementById(id); }

			// Exponer funciones usadas por onclick al objeto global (iframe)
			window.openEdit = openEdit;
			window.openDelete = openDelete;
			window.toggleUserStatus = toggleUserStatus;
			window.togglePublicationStatus = togglePublicationStatus;

			function setActiveTab(tab){ state.activeTab = tab; document.querySelectorAll('.admin-tab-btn').forEach(b=>b.classList.toggle('active', b.getAttribute('data-tab')===tab)); renderContent(); }

			function init(){
				document.querySelectorAll('[data-tab]').forEach(b=>{ b.addEventListener('click', function(){ setActiveTab(b.getAttribute('data-tab')); }); });
				renderContent(); // Mostrar contenido inicial
				qs('btnCloseEdit').addEventListener('click', closeEdit);
				qs('btnCancelEdit').addEventListener('click', closeEdit);
				qs('editForm').addEventListener('submit', saveEdit);
				qs('btnCloseDelete').addEventListener('click', closeDelete);
				qs('btnCancelDelete').addEventListener('click', closeDelete);
				qs('btnConfirmDelete').addEventListener('click', confirmDelete);
				// Cerrar modales al clicar fuera
				document.getElementById('modalOverlay').addEventListener('click', function(e){ if(e.target===this) closeEdit(); });
				document.getElementById('deleteOverlay').addEventListener('click', function(e){ if(e.target===this) closeDelete(); });
				document.addEventListener('keydown', function(ev){ if(ev.key==='Escape'){ if(state.edit.open) closeEdit(); if(state.del.open) closeDelete(); } });
			}

			// Exponer init global para onload y fallback
			window.init = function(){ try { 
				document.querySelectorAll('[data-tab]').forEach(b=>{ b.addEventListener('click', function(){ setActiveTab(b.getAttribute('data-tab')); }); });
				renderContent(); // Mostrar contenido inicial
				qs('btnCloseEdit').addEventListener('click', closeEdit);
				qs('btnCancelEdit').addEventListener('click', closeEdit);
				qs('editForm').addEventListener('submit', saveEdit);
				qs('btnCloseDelete').addEventListener('click', closeDelete);
				qs('btnCancelDelete').addEventListener('click', closeDelete);
				qs('btnConfirmDelete').addEventListener('click', confirmDelete);
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
	const webViewRef = React.useRef<WebView>(null);

	if (Platform.OS === 'web') {
		return (
			<SafeAreaView style={styles.safe}>
				<Navbar />
				<View style={styles.iframeContainer}>
					<iframe title="Admin" srcDoc={html} style={styles.iframe as any} sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation" />
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

