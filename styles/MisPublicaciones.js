const MisPublicacionesCss = `
/* Paleta (simula Tailwind extendido) */
:root {
  --primary-50: #f0fdf4;
  --primary-100: #dcfce7;
  --primary-200: #bbf7d0;
  --primary-300: #86efac;
  --primary-400: #4ade80;
  --primary-500: #22c55e;
  --primary-600: #16a34a;
  --primary-700: #15803d;
  --primary-800: #166534;
  --primary-900: #14532d;

  --secondary-50: #fff7ed;
  --secondary-100: #ffedd5;
  --secondary-200: #fed7aa;
  --secondary-300: #fdba74;
  --secondary-400: #fb923c;
  --secondary-500: #f97316;
  --secondary-600: #ea580c;
  --secondary-700: #c2410c;
  --secondary-800: #9a3412;
  --secondary-900: #7c2d12;

  --accent-50: #f0f9ff;
  --accent-100: #e0f2fe;
  --accent-200: #bae6fd;
  --accent-300: #7dd3fc;
  --accent-400: #38bdf8;
  --accent-500: #0ea5e9;
  --accent-600: #0284c7;
  --accent-700: #0369a1;
  --accent-800: #075985;
  --accent-900: #0c4a6e;
}

/* Animaciones */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
@keyframes float { 0%,100%{transform:translateY(0) rotate(0);} 33%{transform:translateY(-10px) rotate(1deg);} 66%{transform:translateY(5px) rotate(-1deg);} }

/* Utilidades compartidas */
.navbar { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.2); }
.floating-element { animation: float 8s ease-in-out infinite; position: absolute; opacity: 0.6; }

.stats-card { background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 1.5rem; text-align: center; }
.empty-state { background: rgba(255,255,255,0.9); backdrop-filter: blur(10px); border: 2px dashed rgba(34,197,94,0.3); border-radius: 1rem; padding: 3rem; text-align: center; }
.glass-card { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.3); border-radius: 1.5rem; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
.post-card { background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: all 0.3s ease; }
.post-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
.badge-donation { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
.badge-sale { background: linear-gradient(135deg, var(--secondary-500), var(--secondary-600)); color: #fff; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }

.btn-primary { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(34,197,94,0.3); text-decoration: none; display: inline-block; font-size: 0.875rem; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34,197,94,0.4); }
.btn-secondary { background: linear-gradient(135deg, var(--accent-500), var(--accent-600)); color: #fff; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500; border: none; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: inline-block; font-size: 0.75rem; }
.btn-secondary:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(14,165,233,0.3); }
.btn-warning { background: linear-gradient(135deg, #f59e0b, #d97706); color:#fff; padding:0.5rem 1rem; border-radius:0.5rem; font-weight:500; border:none; cursor:pointer; transition: all 0.3s ease; text-decoration:none; display:inline-block; font-size:0.75rem; }
.btn-warning:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(245,158,11,0.3); }
.btn-danger { background: linear-gradient(135deg, #ef4444, #dc2626); color:#fff; padding:0.5rem 1rem; border-radius:0.5rem; font-weight:500; border:none; cursor:pointer; transition: all 0.3s ease; text-decoration:none; display:inline-block; font-size:0.75rem; }
.btn-danger:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(239,68,68,0.3); }
.btn-logout { background: linear-gradient(135deg, #ef4444, #dc2626); color:#fff; padding:0.75rem 1.5rem; border-radius:0.5rem; font-weight:500; border:none; cursor:pointer; transition: all 0.3s ease; text-decoration:none; display:inline-block; font-size:0.875rem; }
.btn-logout:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(239,68,68,0.3); }

.filter-btn { background: rgba(255,255,255,0.9); border: 2px solid rgba(34,197,94,0.2); color:#374151; padding:0.75rem 1.5rem; border-radius:0.75rem; font-weight:500; cursor:pointer; transition: all 0.3s ease; }
.filter-btn:hover { border-color: var(--primary-500); background: rgba(34,197,94,0.1); }
.filter-btn.active { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color:#fff; border-color: var(--primary-500); box-shadow: 0 4px 15px rgba(34,197,94,0.3); }

/* scrollbars */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.1); border-radius: 10px; }
::-webkit-scrollbar-thumb { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); border-radius: 10px; box-shadow: 0 2px 6px rgba(34,197,94,0.3); }
::-webkit-scrollbar-thumb:hover { background: linear-gradient(135deg, var(--primary-600), var(--primary-700)); box-shadow: 0 4px 12px rgba(34,197,94,0.4); }
html { scrollbar-width: thin; scrollbar-color: var(--primary-500) rgba(255,255,255,0.1); }

/* Helpers */
.animate-fade-in { animation: fadeIn 0.8s ease-in-out both; }
.animate-slide-up { animation: slideUp 0.6s ease-out both; }
.line-clamp-3 { overflow: hidden; display: -webkit-box; line-clamp: 3; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
.text-primary-600 { color: var(--primary-600); }
.text-secondary-600 { color: var(--secondary-600); }
.text-accent-600 { color: var(--accent-600); }
.bg-primary-50 { background-color: var(--primary-50); }
.bg-secondary-50 { background-color: var(--secondary-50); }
.bg-accent-50 { background-color: var(--accent-50); }
`;

export default MisPublicacionesCss;
