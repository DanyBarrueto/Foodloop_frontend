const PublicarCss = `
/* Estilos para Crear Publicación (Publicar) */

/* Variables CSS */
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
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1, transform: translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-10px) rotate(1deg); } 66% { transform: translateY(5px) rotate(-1deg); } }

/* Utilidades generales */
.floating-element { animation: float 8s ease-in-out infinite; position: absolute; opacity: 0.6; pointer-events: none; }
.navbar { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.2); }

/* Contenedores */
.form-container { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 1.5rem; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); }
/* Preview panel width responsive instead of fixed 16vw */
.form-vista-previa { width: 100%; max-width: clamp(280px, 26vw, 420px); }
.preview-card { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 1rem; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); padding: 1rem; }
/* Avoid text selection highlighting inside preview */
.preview-card * { -webkit-user-select: none; -ms-user-select: none; user-select: none; }
/* Ensure long words don’t wrap awkwardly */
.preview-card { word-wrap: break-word; overflow-wrap: anywhere; }

/* Campos de formulario */
.input-field { width: 100%; padding: 1rem 1.25rem; border: 2px solid rgba(34, 197, 94, 0.2); border-radius: 0.75rem; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); font-size: 1rem; transition: all 0.3s ease; }
.input-field:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); background: #fff; }
.textarea-field { width: 100%; padding: 1rem 1.25rem; border: 2px solid rgba(34, 197, 94, 0.2); border-radius: 0.75rem; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); font-size: 1rem; resize: vertical; min-height: 120px; transition: all 0.3s ease; }
.textarea-field:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); background: #fff; }
.select-field { width: 100%; padding: 1rem 1.25rem; border: 2px solid rgba(34, 197, 94, 0.2); border-radius: 0.75rem; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); font-size: 1rem; cursor: pointer; transition: all 0.3s ease; }
.select-field:focus { outline: none; border-color: var(--primary-500); box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); background: #fff; }

/* Badges */
.badge-donation { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); display: inline-flex; align-items: center; white-space: nowrap; }
.badge-sale { background: linear-gradient(135deg, var(--secondary-500), var(--secondary-600)); color: #fff; padding: 0.375rem 0.875rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); display: inline-flex; align-items: center; white-space: nowrap; }

/* Botones */
.btn-primary { background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: #fff; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); text-decoration: none; display: inline-block; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4); }
.btn-secondary { background: linear-gradient(135deg, var(--accent-500), var(--accent-600)); color: #fff; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3); text-decoration: none; display: inline-block; }
.btn-secondary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4); }
.btn-cancel { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3); text-decoration: none; display: inline-block; }
.btn-cancel:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4); }

/* Selector de tipo */
.type-selector { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
.type-option { padding: 1.5rem; border: 2px solid rgba(34, 197, 94, 0.2); border-radius: 1rem; background: rgba(255, 255, 255, 0.9); cursor: pointer; transition: all 0.3s ease; text-align: center; }
.type-option:hover { border-color: var(--primary-500); transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34, 197, 94, 0.15); }
.type-option.selected { border-color: var(--primary-500); background: rgba(34, 197, 94, 0.1); box-shadow: 0 8px 25px rgba(34, 197, 94, 0.2); }
.type-option.donation.selected { border-color: var(--primary-500); background: rgba(34, 197, 94, 0.1); }
.type-option.sale.selected { border-color: var(--secondary-500); background: rgba(249, 115, 22, 0.1); }

/* Upload de archivos */
.file-upload { border: 2px dashed rgba(34, 197, 94, 0.3); border-radius: 0.75rem; padding: 2rem; text-align: center; background: rgba(34, 197, 94, 0.05); transition: all 0.3s ease; cursor: pointer; }
.file-upload:hover { border-color: var(--primary-500); background: rgba(34, 197, 94, 0.1); }
.file-upload.dragover { border-color: var(--primary-500); background: rgba(34, 197, 94, 0.15); transform: scale(1.02); }
.remove-image { position: absolute; top: -0.5rem; right: -0.5rem; width: 1.5rem; height: 1.5rem; background: #ef4444; color: #fff; border-radius: 9999px; font-size: 0.875rem; line-height: 1.5rem; text-align: center; }

/* Helpers de animación */
.animate-slide-up { animation: slideUp 0.6s ease-out both; }
.animate-fade-in { animation: fadeIn 0.8s ease-in-out both; }

/* Extras usados por otros estilos del proyecto */
.text-primary-500 { color: var(--primary-500); }
.text-primary-600 { color: var(--primary-600); }
.text-secondary-600 { color: var(--secondary-600); }
.bg-primary-50 { background-color: var(--primary-50); }
.bg-secondary-50 { background-color: var(--secondary-50); }
`;

export default PublicarCss;
