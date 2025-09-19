// styles/PaginaPrincipal.js
// CSS completo utilizado por la pantalla PantallaPrincipal (HTML embebido)
const css = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
        
@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(50px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from { 
    opacity: 0;
    transform: translateX(-50px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from { 
    opacity: 0;
    transform: translateX(50px);
  }
  to { 
    opacity: 1;
    transform: translateX(0);
  }
}
        
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(2deg); }
  66% { transform: translateY(10px) rotate(-2deg); }
}

@keyframes bounceGentle {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

body {
  font-family: 'Inter', sans-serif;
}

.hero-gradient {
  background: linear-gradient(135deg, #22c55e 0%, #0ea5e9 50%, #f97316 100%);
  background-size: 400% 400%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.hero-stats-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.btn-primary {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  text-decoration: none;
  display: inline-block;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
  text-decoration: none;
  display: inline-block;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
}

.btn-outline {
  background: transparent;
  color: #22c55e;
  padding: 1rem 2rem;
  border: 2px solid #22c55e;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-outline:hover {
  background: #22c55e;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
}

.btn-cta-white {
  background: rgba(255, 255, 255, 0.95);
  color: #16a34a;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  text-decoration: none;
  display: inline-block;
}

.btn-cta-white:hover {
  background: white;
  color: #15803d;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.4);
}

.floating-element {
  animation: float 8s ease-in-out infinite;
  position: absolute;
  opacity: 0.7;
}

.stat-number {
  background: linear-gradient(135deg, #22c55e, #0ea5e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Extra CSS para alinear con tu PaginaPrincipal.css */
.hero-gradient .overlay-light { 
  background: rgba(0, 0, 0, 0.10); 
}
.brand-title { position: relative; right: 10px; }
.menu-toggle { padding: 0.25rem 0.5rem; }
.mobile-menu { 
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
}
.mobile-link { 
  color: #374151; 
  font-weight: 500; 
  padding: 0.5rem 0.75rem; 
  border-radius: 0.5rem; 
  display: block;
}
.mobile-link:hover { 
  color: #0ea5e9; 
  background-color: rgba(17, 24, 39, 0.05);
}
/* Posiciones de emojis flotantes */
.floating-emoji-1 { top: 5rem; left: 2.5rem; font-size: 3rem; animation-delay: 0s; }
.floating-emoji-2 { top: 8rem; right: 5rem; font-size: 2.5rem; animation-delay: 1s; }
.floating-emoji-3 { bottom: 8rem; left: 5rem; font-size: 3rem; animation-delay: 2s; }
.floating-emoji-4 { bottom: 5rem; right: 4rem; font-size: 2rem; animation-delay: 1.5s; }
.floating-emoji-5 { top: 45%; left: 8rem; font-size: 2.5rem; animation-delay: 3s; }
.floating-emoji-6 { top: 33%; right: 10rem; font-size: 1.8rem; animation-delay: 2.5s; }
html { scroll-behavior: smooth; }

.scroll-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #22c55e, #0ea5e9, #f97316);
  transform-origin: left;
  z-index: 9999;
}
`;

export default css;