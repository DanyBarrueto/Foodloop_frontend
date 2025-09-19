
// styles/Login.js
const loginCss = `
/* Estilos para animaciones de los emojis flotantes en la página de Login */
.login-emoji-1 { animation-delay: 0s; }
.login-emoji-2 { animation-delay: 1s; }
.login-emoji-3 { animation-delay: 2s; }
.login-emoji-4 { animation-delay: 1.5s; }
.login-emoji-5 { animation-delay: 3s; }
.login-emoji-6 { animation-delay: 2.5s; }

/* Contenedor principal del auth (similar a glass-card) */
.auth-container {
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(20px);
	border: 1px solid rgba(255, 255, 255, 0.3);
	border-radius: 1.5rem;
	box-shadow: 0 10px 30px rgba(2, 6, 23, 0.08), 0 20px 40px rgba(2, 6, 23, 0.08);
}

/* Campos de entrada del login (igual que en Login.css web) */
.input-field{
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 0.375rem;
	font-size: 1rem;
	transition: border-color 0.3s, box-shadow 0.3s;
}

/* Mensaje de error */
.error-text {
	color: #dc2626; /* red-600 */
	font-size: 0.875rem;
}

/* Botón naranja principal del login */
.btn-login-primary {
	background: linear-gradient(135deg, #f97316, #ea580c); /* secondary 500 -> 600 */
	color: #fff;
	padding: 0.75rem 1rem;
	border: none;
	border-radius: 0.5rem;
	font-weight: 600;
	box-shadow: 0 10px 20px rgba(249, 115, 22, 0.25);
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-login-primary:hover { transform: translateY(-1px); box-shadow: 0 12px 22px rgba(249, 115, 22, 0.3); }
.btn-login-primary:active { transform: translateY(0); }
`;

export default loginCss;

