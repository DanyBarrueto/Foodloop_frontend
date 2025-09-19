// styles/Register.js
// CSS específico para la pantalla de Registro (basado en Register.css adjunto)
const registerCss = `
/* Tipografías y layout base para la página de Registro */
.register-page {
	font-family: Inter, system-ui, sans-serif;
	min-height: 100vh;
	background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 50%, #fff7ed 100%);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	position: relative;
	overflow: hidden;
}

/* Animaciones */
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 33% { transform: translateY(-10px) rotate(1deg); } 66% { transform: translateY(5px) rotate(-1deg); } }
.animate-fade-in { animation: fadeIn 0.8s ease-in-out; }
.animate-slide-up { animation: slideUp 0.6s ease-out; }

/* Contenedor principal */
.auth-container { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 1.5rem; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1); }

/* Inputs y selects */
.input-field, .select-field { width: 100%; padding: 1rem 1.25rem; border: 2px solid rgba(34, 197, 94, 0.2); border-radius: 0.75rem; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); font-size: 1rem; transition: all 0.3s ease; }
.input-field:focus, .select-field:focus { outline: none; border-color: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); background: rgba(255, 255, 255, 1); }

/* Botones (verde y azul) */
.btn-primary { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4); }
.btn-secondary { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 500; border: none; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: inline-block; }
.btn-secondary:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3); }

/* Elementos flotantes decorativos */
.floating-element { animation: float 6s ease-in-out infinite; position: absolute; opacity: 0.6; }
.register-emoji-1 { animation-delay: 0s; }
.register-emoji-2 { animation-delay: 1s; }
.register-emoji-3 { animation-delay: 2s; }
.register-emoji-4 { animation-delay: 1.5s; }
.register-emoji-5 { animation-delay: 3s; }
.register-emoji-6 { animation-delay: 2.5s; }

/* Icono */
.icon { width: 1.25rem; height: 1.25rem; stroke: currentColor; fill: none; stroke-width: 2; }

/* Barra de fuerza de contraseña */
.progress-bar { display:block; height: 4px; background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e); border-radius: 2px; transition: width 0.3s ease; }
.bar-weak { background: linear-gradient(90deg, #ef4444, #f97316); }
.bar-fair { background: linear-gradient(90deg, #f97316, #eab308); }
.bar-good { background: linear-gradient(90deg, #eab308, #22c55e); }
.bar-strong { background: linear-gradient(90deg, #16a34a, #22c55e); }
.strength-none { width: 8%; }
.strength-weak { width: 25%; }
.strength-fair { width: 50%; }
.strength-good { width: 75%; }
.strength-strong { width: 100%; }

/* Utilidades mínimas (por si faltan) */
.text-center { text-align: center; }
.text-gray-600 { color: #4b5563; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.w-full { width: 100%; }
.max-w-lg { max-width: 32rem; }
.p-8 { padding: 2rem; }
.relative { position: relative; }
.z-10 { z-index: 10; }
.flex { display: flex; }
.justify-center { justify-content: center; }
.items-center { align-items: center; }
.min-h-screen { min-height: 100vh; }
.rounded-full { border-radius: 9999px; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1); }
.bg-gradient-primary { background: linear-gradient(135deg, #4ade80, #16a34a); color: white; }
.bg-gradient-secondary { background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; }

/* Gradiente de texto */
.text-gradient { background: linear-gradient(90deg, #16a34a, #0ea5e9); -webkit-background-clip: text; background-clip: text; color: transparent; }
`;

export default registerCss;
