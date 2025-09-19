const AdminCss = `
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

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0) rotate(0); } 33% { transform: translateY(-10px) rotate(1deg); } 66% { transform: translateY(5px) rotate(-1deg); } }

.admin-page { background: linear-gradient(135deg, var(--primary-50) 0%, var(--accent-100) 50%, var(--secondary-50) 100%); min-height: 100vh; }
.admin-navbar { background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.2); }
.admin-floating-element { animation: float 8s ease-in-out infinite; position: absolute; opacity: .6; }

.admin-stats-card {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  padding: 1rem;
  text-align: center;
}

.admin-table-container {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  overflow: hidden;
}

.admin-table { width: 100%; border-collapse: collapse; }
.admin-table th { background: rgba(34,197,94,0.1); padding: 1rem; text-align: left; font-weight: 600; color: #374151; border-bottom: 1px solid rgba(34,197,94,0.2); }
.admin-table td { padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
.admin-table tr:hover { background: rgba(34,197,94,0.05); }

.admin-badge-active { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; padding: .25rem .75rem; border-radius: 9999px; font-size: .75rem; font-weight: 600; }
.admin-badge-inactive { background: linear-gradient(135deg, #6b7280, #4b5563); color: #fff; padding: .25rem .75rem; border-radius: 9999px; font-size: .75rem; font-weight: 600; }
.admin-badge-pending { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; padding: .25rem .75rem; border-radius: 9999px; font-size: .75rem; font-weight: 600; }
.admin-badge-resolved { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; padding: .25rem .75rem; border-radius: 9999px; font-size: .75rem; font-weight: 600; }
.admin-badge-expired { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; padding: .25rem .75rem; border-radius: 9999px; font-size: .75rem; font-weight: 600; }

.admin-btn-primary { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; padding: .75rem 1.5rem; border-radius: .5rem; font-weight: 600; border: none; cursor: pointer; transition: all .3s ease; box-shadow: 0 4px 15px rgba(34,197,94,.3); text-decoration: none; display: inline-block; font-size: .875rem; }
.admin-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34,197,94,.4); }

.admin-btn-secondary { background: linear-gradient(135deg, var(--accent-500), var(--accent-600)); color: #fff; padding: .5rem 1rem; border-radius: .5rem; font-weight: 500; border: none; cursor: pointer; transition: all .3s ease; text-decoration: none; display: inline-block; font-size: .75rem; }
.admin-btn-secondary:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(14,165,233,.3); }

.admin-btn-warning { background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; padding: .5rem 1rem; border-radius: .5rem; font-weight: 500; border: none; cursor: pointer; transition: all .3s ease; text-decoration: none; display: inline-block; font-size: .75rem; }
.admin-btn-warning:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(245,158,11,.3); }

.admin-btn-danger { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; padding: .5rem 1rem; border-radius: .5rem; font-weight: 500; border: none; cursor: pointer; transition: all .3s ease; text-decoration: none; display: inline-block; font-size: .75rem; }
.admin-btn-danger:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(239,68,68,.3); }

.admin-btn-logout { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; padding: .75rem 1.5rem; border-radius: .5rem; font-weight: 500; border: none; cursor: pointer; transition: all .3s ease; text-decoration: none; display: inline-block; font-size: .875rem; }
.admin-btn-logout:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(239,68,68,.3); }

.admin-tab-btn { background: rgba(255,255,255,0.9); border: 2px solid rgba(34,197,94,0.2); color: #374151; padding: .75rem 1.5rem; border-radius: .75rem; font-weight: 500; cursor: pointer; transition: all .3s ease; }
.admin-tab-btn:hover { border-color: var(--primary-500); background: rgba(34,197,94,0.1); }
.admin-tab-btn.active { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; border-color: var(--primary-500); box-shadow: 0 4px 15px rgba(34,197,94,.3); }

.admin-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); backdrop-filter: blur(5px); z-index: 1000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: all .3s ease; }
.admin-modal-overlay.show { opacity: 1; pointer-events: auto; }
.admin-modal-content { position: relative; background: rgba(255,255,255,.95); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,.3); border-radius: 1.5rem; box-shadow: 0 25px 50px rgba(0,0,0,.3); padding: 2rem; width: 90%; max-width: 920px; max-height: 80vh; overflow-y: auto; transform: scale(.98); transition: all .3s ease; }
.admin-modal-buttons { display: flex; gap: 1rem; justify-content: flex-end; }
.admin-btn-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6b7280; transition: color .3s ease; }
.admin-btn-close:hover { color: #374151; }
.admin-btn-cancel { background: #fff; border: 1px solid #e5e7eb; color: #374151; padding: .5rem 1rem; border-radius: .5rem; }
.admin-btn-save { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; padding: .5rem 1rem; border-radius: .5rem; }

.admin-form-group { margin-bottom: 1rem; }
.admin-form-label { display: block; font-weight: 600; color: #374151; margin-bottom: .5rem; }
.admin-form-input { width: 100%; background: rgba(255,255,255,.9); border: 2px solid rgba(34,197,94,.2); border-radius: .5rem; padding: .75rem 1rem; font-size: .95rem; transition: all .3s ease; }
.admin-form-input:focus { outline: none; border-color: var(--primary-500); background: #fff; box-shadow: 0 0 0 4px rgba(34,197,94,.1); }
.admin-form-select { width: 100%; background: rgba(255,255,255,.9); border: 2px solid rgba(34,197,94,.2); border-radius: .5rem; padding: .75rem 1rem; font-size: .95rem; transition: all .3s ease; cursor: pointer; }
.admin-form-select:focus { outline: none; border-color: var(--primary-500); background: #fff; box-shadow: 0 0 0 4px rgba(34,197,94,.1); }
.admin-form-textarea { width: 100%; background: rgba(255,255,255,.9); border: 2px solid rgba(34,197,94,.2); border-radius: .5rem; padding: .75rem 1rem; font-size: .95rem; transition: all .3s ease; resize: vertical; min-height: 100px; }
.admin-form-textarea:focus { outline: none; border-color: var(--primary-500); background: #fff; box-shadow: 0 0 0 4px rgba(34,197,94,.1); }

.animate-fade-in { animation: fadeIn .8s ease-in-out both; }
.animate-slide-up { animation: slideUp .6s ease-out both; }

.text-primary-600 { color: var(--primary-600); }
.text-secondary-600 { color: var(--secondary-600); }
.text-accent-600 { color: var(--accent-600); }
.bg-primary-50 { background-color: var(--primary-50); }
.bg-secondary-50 { background-color: var(--secondary-50); }
.bg-accent-50 { background-color: var(--accent-50); }
`;

export default AdminCss;
