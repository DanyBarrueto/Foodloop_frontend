const EditarPublicacionCss = `
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }
@keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
@keyframes glow { from { box-shadow: 0 0 20px rgba(14, 165, 233, 0.3); } to { box-shadow: 0 0 30px rgba(14, 165, 233, 0.6); } }

.editar-publicacion-page {
	font-family: 'Inter', sans-serif;
	background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 50%, #fff7ed 100%);
	min-height: 100vh;
	position: relative;
	overflow-x: hidden;
}
.editar-publicacion-page::before {
	content: '';
	position: fixed; top:0; left:0; width:100%; height:100%;
	background: radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
						 radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.1) 0%, transparent 50%),
						 radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
	z-index: -1;
}

.glass-card {
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
	border: 1px solid rgba(0, 0, 0, 0.06);
	border-radius: 1.25rem; box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}
.editor-card {
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 2rem; box-shadow: 0 30px 60px rgba(0,0,0,0.3);
}

.input-modern, .textarea-modern {
	background: rgba(255,255,255,0.9);
	border: 2px solid rgba(14,165,233,0.2);
	border-radius: 1rem; padding: 1rem 1.25rem; font-size: .95rem;
	transition: all .3s ease; backdrop-filter: blur(10px);
}
.input-modern:focus, .textarea-modern:focus {
	outline: none; border-color: #0ea5e9; background: #fff;
	box-shadow: 0 0 0 4px rgba(14,165,233,.1); transform: translateY(-2px);
}
.textarea-modern { resize: vertical; min-height: 120px; }

.btn-gradient {
	background: linear-gradient(135deg, #0ea5e9, #3b82f6); color:#fff;
	padding: 1rem 2rem; border-radius: 1rem; font-weight: 600; border: none; cursor: pointer;
	transition: all .3s ease; box-shadow: 0 10px 25px rgba(14,165,233,.3);
	display:inline-flex; align-items:center; justify-content:center; gap:.5rem; font-size:1rem; text-decoration:none;
}
.btn-gradient:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(14,165,233,.4); background: linear-gradient(135deg, #3b82f6, #6366f1); }

.btn-success {
	background: linear-gradient(135deg, #22c55e, #16a34a); color:#fff;
	padding: 1rem 2rem; border-radius: 1rem; font-weight: 600; border: none; cursor: pointer;
	transition: all .3s ease; box-shadow: 0 10px 25px rgba(34,197,94,.3);
	display:inline-flex; align-items:center; justify-content:center; gap:.5rem; font-size:1rem;
}
.btn-success:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(34,197,94,.4); background: linear-gradient(135deg, #16a34a, #15803d); }

.btn-warning { background: linear-gradient(135deg, #f59e0b, #d97706); color:#fff; padding:1rem 2rem; border-radius:1rem; font-weight:600; border:none; cursor:pointer; transition:all .3s ease; box-shadow:0 10px 25px rgba(245,158,11,.3); display:inline-flex; align-items:center; justify-content:center; gap:.5rem; font-size:1rem; }
.btn-warning:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(245,158,11,.4); background: linear-gradient(135deg, #d97706, #b45309); }

.btn-secondary:hover { background: #f3f4f6; }

.type-card { background: rgba(255,255,255,0.9); border: 2px solid rgba(0,0,0,0.06); border-radius:1.25rem; padding:1.5rem; cursor:pointer; transition:all .25s ease; backdrop-filter: blur(10px); text-align:center; color:#111827; }
.type-card:hover { transform: translateY(-3px); background: rgba(255,255,255,0.98); border-color: rgba(14,165,233,0.5); box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
.type-card.selected { background: rgba(14,165,233,0.08); border-color: #0ea5e9; box-shadow: 0 10px 25px rgba(14,165,233,0.15); animation: glow 2s ease-in-out infinite alternate; }
.type-card.donation.selected { background: rgba(34,197,94,0.12); border-color: #22c55e; box-shadow: 0 10px 25px rgba(34,197,94,0.15); }

.status-pill { background: rgba(255,255,255,0.95); border: 1.5px solid rgba(0,0,0,0.08); border-radius:9999px; padding:.75rem 1.25rem; cursor:pointer; transition:all .2s ease; backdrop-filter: blur(8px); text-align:center; color:#111827; }
.status-pill:hover { background:#fff; transform: translateY(-1px); border-color: rgba(14,165,233,0.4); }
.status-pill.selected { background: rgba(14,165,233,0.12); border-color: #0ea5e9; box-shadow: 0 8px 20px rgba(14,165,233,0.12); }

.floating-icon { position:absolute; font-size:3rem; opacity:.1; animation: float 8s ease-in-out infinite; pointer-events:none; }
@keyframes float { 0%,100% { transform: translateY(0) rotate(0deg);} 33% { transform: translateY(-20px) rotate(5deg);} 66% { transform: translateY(10px) rotate(-5deg);} }

.animate-fade-in { animation: fadeIn .6s ease both; }
.section-divider { height:2px; background: linear-gradient(90deg, transparent, rgba(14,165,233,.5), transparent); margin:1.5rem 0; border-radius:1px; }
.header-modern { background: rgba(255,255,255,0.95); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,0.06); }

.label-modern { color:#111827; font-weight:600; font-size:.95rem; margin-bottom:.5rem; display:flex; align-items:center; gap:.5rem; }

.notification { position:fixed; top:2rem; right:2rem; z-index:1000; padding:1.5rem 2rem; border-radius:1rem; color:white; font-weight:600; backdrop-filter: blur(20px); border:1px solid rgba(255,255,255,0.2); transform: translateX(400px); transition: all .5s ease; }
.notification.show { transform: translateX(0); }
.notification.success { background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 20px 40px rgba(34,197,94,0.3); }
.notification.error { background: linear-gradient(135deg, #ef4444, #dc2626); box-shadow: 0 20px 40px rgba(239,68,68,0.3); }
`;

export default EditarPublicacionCss;
