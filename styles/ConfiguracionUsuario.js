const ConfiguracionUsuarioCss = `
/* Google Fonts handled via HTML includes */

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
@keyframes bounceGentle { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-5px);} }
@keyframes float { 0%,100% { transform: translateY(0) rotate(0deg);} 33% { transform: translateY(-10px) rotate(1deg);} 66% { transform: translateY(5px) rotate(-1deg);} }

body {
	font-family: 'Inter', system-ui, sans-serif;
	background: linear-gradient(135deg, var(--primary-50) 0%, var(--accent-100) 50%, var(--secondary-50) 100%);
	min-height: 100vh;
	margin: 0; padding: 0;
}

.auth-container {
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 1.5rem;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.input-field, .select-field {
	width: 100%; padding: 1rem 1.25rem; border: 2px solid rgba(34, 197, 94, 0.2);
	border-radius: 0.75rem; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px);
	font-size: 1rem; transition: all 0.3s ease; outline: none;
}
.input-field:focus, .select-field:focus {
	border-color: var(--primary-500);
	box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
	background: rgba(255, 255, 255, 1);
}

.btn-primary {
	background: linear-gradient(135deg, var(--primary-500), var(--primary-600)); color: white;
	padding: 1rem 2rem; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer;
	transition: all 0.3s ease; text-decoration: none; display: inline-flex; align-items: center; justify-content: center;
}
.btn-primary:hover { background: linear-gradient(135deg, var(--primary-600), var(--primary-700)); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3); }

.btn-secondary {
	background: linear-gradient(135deg, var(--accent-500), var(--accent-600)); color: white;
	padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-weight: 500; border: none; cursor: pointer;
	transition: all 0.3s ease; text-decoration: none; display: inline-flex; align-items: center; justify-content: center;
}
.btn-secondary:hover { background: linear-gradient(135deg, var(--accent-600), var(--accent-700)); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3); }

.floating-element { animation: float 6s ease-in-out infinite; position: absolute; opacity: 0.6; }

.progress-bar { height: 4px; background: linear-gradient(90deg, #ef4444, #f97316, #eab308, var(--primary-500)); border-radius: 2px; transition: width 0.3s ease; width: 0; }
.strength-weak { width: 25%; }
.strength-fair { width: 50%; }
.strength-good { width: 75%; }
.strength-strong { width: 100%; }

.animate-fade-in { animation: fadeIn 0.8s ease-in-out; }
.animate-slide-up { animation: slideUp 0.6s ease-out; }
.animate-bounce-gentle { animation: bounceGentle 2s infinite; }
.animate-float { animation: float 6s ease-in-out infinite; }

/* Minimal utilities used by the template */
.relative{position:relative}
.absolute{position:absolute}
.min-h-screen{min-height:100vh}
.flex{display:flex}
.flex-1{flex:1 1 0%}
.items-center{align-items:center}
.items-start{align-items:flex-start}
.justify-center{justify-content:center}
.justify-between{justify-content:space-between}
.gap-3{gap:.75rem}
.p-4{padding:1rem}
.p-8{padding:2rem}
.px-4{padding-left:1rem;padding-right:1rem}
.mt-1{margin-top:.25rem}
.mt-2{margin-top:.5rem}
.mb-1{margin-bottom:.25rem}
.mb-4{margin-bottom:1rem}
.mb-6{margin-bottom:1.5rem}
.top-10{top:2.5rem}
.top-20{top:5rem}
.left-10{left:2.5rem}
.left-20{left:5rem}
.right-20{right:5rem}
.bottom-20{bottom:5rem}
.z-10{z-index:10}
.overflow-hidden{overflow:hidden}
.w-full{width:100%}
.max-w-lg{max-width:32rem}
.h-16{height:4rem}
.w-16{width:4rem}
.w-8{width:2rem}
.h-8{height:2rem}
.text-center{text-align:center}
.text-right{text-align:right}
.text-2xl{font-size:1.5rem;line-height:2rem}
.text-sm{font-size:.875rem;line-height:1.25rem}
.text-xs{font-size:.75rem;line-height:1rem}
.text-4xl{font-size:2.25rem;line-height:2.5rem}
.text-5xl{font-size:3rem;line-height:1}
.text-6xl{font-size:3.75rem;line-height:1}
.font-bold{font-weight:700}
.font-semibold{font-weight:600}
.text-gray-600{color:#4b5563}
.text-gray-700{color:#374151}
.text-gray-500{color:#6b7280}
.text-red-500{color:#ef4444}
.text-red-600{color:#dc2626}
.text-yellow-500{color:#eab308}
.text-orange-500{color:#f97316}
.text-green-500{color:#22c55e}
.text-white{color:#ffffff}
.bg-gradient-to-r{background-image:linear-gradient(to right, var(--tw-gradient-stops))}
.bg-gradient-to-br{background-image:linear-gradient(to bottom right, var(--tw-gradient-stops))}
.from-primary-400{--tw-gradient-from:var(--primary-400);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to, rgba(74,222,128,0))}
.from-primary-600{--tw-gradient-from:var(--primary-600);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to, rgba(22,163,74,0))}
.to-primary-600{--tw-gradient-to:var(--primary-600)}
.to-accent-600{--tw-gradient-to:var(--accent-600)}
.bg-clip-text{-webkit-background-clip:text;background-clip:text}
.text-transparent{color:transparent}
.border-primary-300{border-color:var(--primary-300)}
.rounded{border-radius:.25rem}
.rounded-full{border-radius:9999px}
.shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)}
.space-y-5>:not([hidden])~:not([hidden]){margin-top:1.25rem}
.block{display:block}
.inline-flex{display:inline-flex}
.hover\:underline:hover{text-decoration-line:underline}
.focus\:ring-primary-500:focus{--tw-ring-color:var(--primary-500);box-shadow:0 0 0 3px var(--tw-ring-color)}
input[type="checkbox"]{appearance:none;width:1rem;height:1rem;border:2px solid var(--primary-300);border-radius:.25rem;background-color:white;cursor:pointer;position:relative}
input[type="checkbox"]:checked{background-color:var(--primary-600);border-color:var(--primary-600)}
input[type="checkbox"]:checked::after{content:'✓';position:absolute;top:-2px;left:1px;color:white;font-size:.75rem;font-weight:bold}
`;

export default ConfiguracionUsuarioCss;
