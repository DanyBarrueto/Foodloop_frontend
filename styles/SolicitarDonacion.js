const SolicitarDonacionCss = `
/* Página Solicitar Donación */
body.solicitar-donacion-page { background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%); min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; }

.card { background: rgba(255, 255, 255, 0.95); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 1rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; }

.input-field, .textarea-field, .select-field { width: 100%; padding: 0.75rem 1rem; border: 2px solid rgba(34, 197, 94, 0.2); border-radius: 0.75rem; background: rgba(255, 255, 255, 0.9); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); font-size: 0.875rem; transition: all 0.3s ease; }
.input-field:focus, .textarea-field:focus, .select-field:focus { outline: none; border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1); background: rgba(255, 255, 255, 1); }
.textarea-field { resize: vertical; min-height: 120px; }

.btn-primary { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 0.7rem 1.4rem; border-radius: 0.7rem; font-weight: 600; font-size: 0.95rem; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4); background: linear-gradient(135deg, #16a34a, #15803d); }

.btn-cancelar { background: rgba(255, 0, 0, 0.9); color: #ffffff; padding: 0.7rem 1.25rem; border-radius: 0.7rem; font-weight: 600; font-size: 0.95rem; border: 2px solid rgba(107, 114, 128, 0.2); cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 0.5rem; text-decoration: none; }

/* Override local para el botón de volver en esta pantalla */
.btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; border-radius: 0.7rem; border: 2px solid rgba(107,114,128,0.2); color: #374151; background: rgba(255,255,255,0.9); transition: all 0.2s ease; font-weight: 500; font-size: 0.9rem; text-decoration: none; }
.btn-secondary:hover { background: rgba(107, 114, 128, 0.08); border-color: rgba(107, 114, 128, 0.3); }

.header-glass { background: rgba(255,255,255,0.95); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.2); }
.icon { width: 1.25rem; height: 1.25rem; stroke: currentColor; fill: none; stroke-width: 2; }

@keyframes pulse-ring { 0% { transform: scale(0.8); opacity:1;} 80%,100% { transform: scale(1.2); opacity:0;} }
.pulse-ring { animation: pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite; }

.success-message, .error-message { padding:1rem; border-radius:0.75rem; margin-bottom:1.5rem; }
.success-message { background: linear-gradient(135deg,#22c55e,#16a34a); color:#fff; }
.error-message { background: linear-gradient(135deg,#ef4444,#dc2626); color:#fff; }

.product-info { background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(22,163,74,0.1)); border:2px solid rgba(34,197,94,0.2); border-radius:1rem; padding:1.5rem; margin-bottom:2rem; }

/* Badges utilitarias */
.badge { display:inline-block; padding:0.25rem 0.5rem; border-radius:9999px; font-size:0.65rem; font-weight:500; line-height:1; }
.badge-green { background:#dcfce7; color:#166534; }
.badge-accent { background:#e0f2fe; color:#075985; }

/* Animaciones utilitarias */
.animate-fade-in { animation: fadeIn 0.5s ease-in-out both; }
.animate-slide-up { animation: slideUp 0.6s ease-out both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
`;

export default SolicitarDonacionCss;