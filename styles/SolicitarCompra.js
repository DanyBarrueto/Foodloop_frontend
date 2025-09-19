const SolicitarCompraCss = `
/* Página Solicitar Compra */
body.solicitar-compra-page { font-family: 'Inter', system-ui, sans-serif; background: linear-gradient(135deg, #fff7ed 0%, #f0f9ff 100%); min-height: 100vh; }

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
@keyframes bounceGentle { 0%,20%,50%,80%,100% { transform: translateY(0);} 40% { transform: translateY(-10px);} 60% { transform: translateY(-5px);} }
@keyframes pulse-ring { 0% { transform: scale(0.8); opacity: 1;} 80%,100% { transform: scale(1.2); opacity: 0;} }

.card { background: rgba(255, 255, 255, 0.95); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 1rem; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); transition: all 0.3s ease; }

.input-field, .textarea-field, .select-field { width: 100%; padding: 0.75rem 1rem; border: 2px solid rgba(251, 146, 60, 0.2); border-radius: 0.75rem; background: rgba(255, 255, 255, 0.9); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); font-size: 0.875rem; transition: all 0.3s ease; }
.input-field:focus, .textarea-field:focus, .select-field:focus { outline: none; border-color: #f97316; box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1); background: rgba(255, 255, 255, 1); }

.textarea-field { resize: vertical; min-height: 120px; }

.btn-primary { background: linear-gradient(135deg, #f97316, #ea580c); color: #fff; padding: 0.875rem 2rem; border-radius: 0.75rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3); display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4); background: linear-gradient(135deg, #ea580c, #c2410c); }

.btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border-radius: 0.75rem; border: 2px solid rgba(107,114,128,0.2); color: #374151; background: rgba(255,255,255,0.9); transition: all 0.2s ease; font-weight: 500; }
.btn-secondary:hover { background: rgba(107, 114, 128, 0.08); border-color: rgba(107, 114, 128, 0.3); }

.header-glass { background: rgba(255, 255, 255, 0.95); -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.2); }

.icon { width: 1.25rem; height: 1.25rem; stroke: currentColor; fill: none; stroke-width: 2; }
.pulse-ring { animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite; }

/* Alerts */
.success-message, .error-message { display: none; }
.success-message { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; padding: 1rem; border-radius: 0.75rem; margin-bottom: 1.5rem; animation: slideUp 0.5s ease-out; }
.error-message { background: linear-gradient(135deg, #ef4444, #dc2626); color: #fff; padding: 1rem; border-radius: 0.75rem; margin-bottom: 1.5rem; animation: slideUp 0.5s ease-out; }
.success-message.is-visible, .error-message.is-visible { display: block; }

.product-info { background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.1)); border: 2px solid rgba(249, 115, 22, 0.2); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2rem; }

/* Variantes compactas */
.product-info.text-sm { padding: 1rem; margin-bottom: 0; }
.product-info.text-sm h3 { font-size: 0.9rem; }
.product-info.text-sm p { font-size: 0.68rem; }
.card.p-6 { padding: 1.25rem; }
.card.p-4 { padding: 1rem; }
.btn-primary.text-sm, .btn-secondary.text-sm { font-size: 0.75rem; }
.select-field, .input-field { font-size: 0.7rem; padding: 0.6rem 0.8rem; }
.textarea-field { font-size: 0.7rem; }
.payment-option { padding: 0.75rem 0.5rem; }

.payment-methods { display: flex; gap: 1rem; flex-wrap: wrap; }
.payment-option { flex: 1; min-width: 120px; padding: 1rem; border: 2px solid rgba(249, 115, 22, 0.2); border-radius: 0.75rem; background: rgba(255, 255, 255, 0.9); cursor: pointer; transition: all 0.3s ease; text-align: center; position: relative; }
.payment-option:hover { border-color: #f97316; background: rgba(249, 115, 22, 0.05); }
.payment-option.selected { border-color: #f97316; background: rgba(249, 115, 22, 0.1); }
.payment-option input[type="radio"] { display: none; }
.payment-detail { margin-top: 1rem; }

/* Animaciones utilitarias */
.animate-fade-in { animation: fadeIn 0.5s ease-in-out both; }
.animate-slide-up { animation: slideUp 0.6s ease-out both; }
`;

export default SolicitarCompraCss;
