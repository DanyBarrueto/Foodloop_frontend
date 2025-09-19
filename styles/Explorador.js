
const ExploradorCss = `
/* Overlay ligero para evitar "negro" */
.overlay-light { background: rgba(0,0,0,0.5); }

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceGentle {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes pulseSuccess {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-ring {
  0% { transform: scale(0.8); opacity: 1; }
  80%, 100% { transform: scale(1.2); opacity: 0; }
}

/* Hero gradient background */
.hero-gradient {
  background: linear-gradient(135deg, #22c55e 0%, #0ea5e9 50%, #f97316 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

/* Glass header */
.header-glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Campos de destaque */
.destaque{
    color: #000000;
    background: rgba(18, 216, 209, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    box-shadow: 0 15px 50px rgba(0,0,0,0.3);
    padding: 1rem;
    margin-bottom: 1rem;
}

/* Cards */
.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }

/* Badges */
.badge-donation {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white; padding: 0.375rem 0.875rem; border-radius: 9999px;
  font-size: 0.75rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
.badge-sale {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white; padding: 0.375rem 0.875rem; border-radius: 9999px;
  font-size: 0.75rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

/* Buttons */
.btn-request {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white; padding: 0.75rem 1.5rem; border-radius: 0.75rem;
  font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
}

.btn-request:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34,197,94,0.4);
  background: linear-gradient(135deg, #16a34a, #15803d);
}

.btn-request:active {
  transform: translateY(0);
}

.btn-request.requested {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  cursor: not-allowed;
  animation: pulseSuccess 0.6s ease-in-out;
}
.btn-request.requested:hover {
  transform: none;
  box-shadow: 0 4px 15px rgba(107,114,128,0.3);
}

/* Inputs */
.input-field {
  width: 100%; padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.input-field:focus { outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
  background: rgba(255,255,255,1);
}

.select-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-field:focus {
  outline: none;
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.1);
  background: rgba(255,255,255,1);
}

/* Icon base */
.icon { 
  width: 1.25rem;
  height: 1.25rem;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

/* Floating and pulse rings */
.floating-element { 
  animation: float 6s ease-in-out infinite;
}

.pulse-ring {
  animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
}

/* Modal */
.modal { 
  display: none;
  position: fixed;
  z-index: 1000;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
}

.modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  animation: slideUp 0.3s ease-out;
}

/* Utilities to match HTML animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out both;
}
.animate-slide-up {
  animation: slideUp 0.6s ease-out both;
}
.animate-bounce-gentle {
  animation: bounceGentle 2s infinite;
}

/* Navbar styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 1.5rem;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #22c55e;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.navbar-link {
  color: #374151;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.navbar-link:hover {
  color: #22c55e;
}

.btn-primary {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }
  
  .hero-gradient h2 {
    font-size: 3rem;
  }
  
  .hero-gradient p {
    font-size: 1.125rem;
  }
}
`;

export default ExploradorCss;