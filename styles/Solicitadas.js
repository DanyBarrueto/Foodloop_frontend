const SolicitadasCss = `
/* Fondo global para la página de solicitadas */
.solicitadas-page {
	font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
	background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 50%, #fff7ed 100%);
	min-height: 100vh;
}

/* Tarjeta estilo glass */
.glass {
	background: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border-radius: 1rem;
	border: 1px solid rgba(255, 255, 255, 0.3);
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
}

/* Emoticonos flotantes */
.floating {
	position: absolute;
	animation: float 6s ease-in-out infinite;
	opacity: 0.6;
}

@keyframes float {
	0%, 100% { transform: translateY(0); }
	50% { transform: translateY(-8px); }
}

/* Inputs */
.input-field {
	padding: 0.5rem 0.75rem;
	border: 1px solid rgba(0, 0, 0, 0.08);
	border-radius: 0.5rem;
	width: 100%;
}
`;

export default SolicitadasCss;
