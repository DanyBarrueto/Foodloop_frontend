// app/(tabs)/PantallaPrincipal.tsx
import { storage } from '@/utils/storage';
import { router } from "expo-router";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import embeddedCss from "../../styles/PaginaPrincipal";

/**
 * Muestra HTML incrustado:
 * - En iOS/Android usa react-native-webview (instalar).
 * - En web usa un <iframe srcDoc=...>.
 *
 * NOTA:
 * - Si ejecutas en web: no necesitas instalar react-native-webview,
 *   pero el iframe solo funciona si las rutas de imágenes/fuentes son accesibles (https o inline).
 * - Si ejecutas en iOS/Android: instala react-native-webview:
 *     npx expo install react-native-webview
 */

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FoodLoop - Conectando Comida con Necesidad</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#f0fdf4',
                            100: '#dcfce7',
                            200: '#bbf7d0',
                            300: '#86efac',
                            400: '#4ade80',
                            500: '#22c55e',
                            600: '#16a34a',
                            700: '#15803d',
                            800: '#166534',
                            900: '#14532d',
                        },
                        secondary: {
                            50: '#fff7ed',
                            100: '#ffedd5',
                            200: '#fed7aa',
                            300: '#fdba74',
                            400: '#fb923c',
                            500: '#f97316',
                            600: '#ea580c',
                            700: '#c2410c',
                            800: '#9a3412',
                            900: '#7c2d12',
                        },
                        accent: {
                            50: '#f0f9ff',
                            100: '#e0f2fe',
                            200: '#bae6fd',
                            300: '#7dd3fc',
                            400: '#38bdf8',
                            500: '#0ea5e9',
                            600: '#0284c7',
                            700: '#0369a1',
                            800: '#075985',
                            900: '#0c4a6e',
                        }
                    },
                    fontFamily: {
                        'sans': ['Inter', 'system-ui', 'sans-serif'],
                    },
                    animation: {
                        'fade-in': 'fadeIn 1s ease-in-out',
                        'slide-up': 'slideUp 0.8s ease-out',
                        'slide-in-left': 'slideInLeft 0.8s ease-out',
                        'slide-in-right': 'slideInRight 0.8s ease-out',
                        'bounce-gentle': 'bounceGentle 3s infinite',
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-slow': 'pulse 3s infinite',
                    }
                }
            }
        }
    </script>
    <style>
        ${embeddedCss}
    </style>
</head>
<body class="bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50">
    
    <!-- Scroll Progress Indicator -->
    <div class="scroll-indicator" id="scrollIndicator"></div>

    <!-- Navigation -->
    <nav class="navbar fixed top-0 w-full z-50 px-6 py-4">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white shadow-lg">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <div>
                    <h1 class="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent brand-title">
                        FoodLoop
                    </h1>
                </div>
            </div>
            <div class="hidden md:flex items-center gap-6">
                <a href="#inicio" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">Inicio</a>
                <a href="#nosotros" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">Nosotros</a>
                <a href="#como-funciona" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">Cómo Funciona</a>
                <a href="#impacto" class="text-gray-700 hover:text-primary-600 font-medium transition-colors">Impacto</a>
                <a href="/login" class="text-gray-700 hover:text-accent-600 font-semibold transition-colors" onclick="try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:'/login'}));event.preventDefault();}catch(e){}">🔑 Ingresar</a>
            </div>
            <div class="md:hidden">
                <button id="menuToggle" class="text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- Mobile Menu -->
    <div id="mobileMenu" class="md:hidden hidden px-6 py-4 mobile-menu">
        <div class="max-w-7xl mx-auto flex flex-col gap-3">
            <a href="#inicio" class="mobile-link">Inicio</a>
            <a href="#nosotros" class="mobile-link">Nosotros</a>
            <a href="#como-funciona" class="mobile-link">Cómo Funciona</a>
            <a href="#impacto" class="mobile-link">Impacto</a>
            <a href="/login" class="mobile-link" onclick="try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:'/login'}));event.preventDefault();}catch(e){}">🔑 Ingresar</a>
        </div>
    </div>

    <!-- Hero Section -->
    <section id="inicio" class="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div class="absolute inset-0 overlay-light"></div>
        
        <!-- Floating Food Elements -->
        <div class="floating-element floating-emoji-1">🥕</div>
        <div class="floating-element floating-emoji-2">🍞</div>
        <div class="floating-element floating-emoji-3">🍅</div>
        <div class="floating-element floating-emoji-4">🥬</div>
        <div class="floating-element floating-emoji-5">🍎</div>
        <div class="floating-element floating-emoji-6">🥐</div>

        <div class="relative z-10 text-center text-white px-6 max-w-6xl mx-auto">
            <h1 class="text-6xl md:text-8xl font-bold mb-8 animate-slide-up">
                🌟 FoodLoop
            </h1>
            <p class="text-2xl md:text-4xl mb-8 opacity-90 animate-slide-up" style="animation-delay: 0.2s;">
                Conectando comida con necesidad
            </p>
            <p class="text-lg md:text-xl mb-12 opacity-80 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.4s;">
                La plataforma que une a donantes de alimentos, vendedores con productos próximos a vencer 
                y personas que necesitan comida. Juntos reducimos el desperdicio alimentario y ayudamos a nuestra comunidad.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style="animation-delay: 0.6s;">
                <a href="/register" class="btn-primary text-lg px-8 py-4" onclick="try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:'/register'}));event.preventDefault();}catch(e){}">
                    🚀 Únete Ahora
                </a>
                <a href="/login" class="btn-secondary text-lg px-8 py-4" onclick="try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:'/login'}));event.preventDefault();}catch(e){}">
                    🔑 Iniciar Sesión
                </a>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up" style="animation-delay: 0.8s;">
                <div class="hero-stats-card p-6">
                    <div class="text-4xl font-bold text-white mb-2">1000+</div>
                    <div class="text-white opacity-90 font-medium">Kilos Donados</div>
                </div>
                <div class="hero-stats-card p-6">
                    <div class="text-4xl font-bold text-white mb-2">500+</div>
                    <div class="text-white opacity-90 font-medium">Familias Ayudadas</div>
                </div>
                <div class="hero-stats-card p-6">
                    <div class="text-4xl font-bold text-white mb-2">50+</div>
                    <div class="text-white opacity-90 font-medium">Entidades Activas</div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="nosotros" class="py-20 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6 animate-slide-up">
                    🤝 Nuestra Misión
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
                    En FoodLoop creemos que ningún alimento debería desperdiciarse mientras hay personas que lo necesitan. 
                    Somos el puente que conecta la abundancia con la necesidad.
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="animate-slide-in-left">
                    <h3 class="text-3xl font-bold text-gray-800 mb-6">
                        💡 ¿Por qué FoodLoop?
                    </h3>
                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 font-bold text-lg">
                                🌍
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Impacto Ambiental</h4>
                                <p class="text-gray-600">Reducimos las emisiones de CO₂ y el desperdicio alimentario que afecta nuestro planeta.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 font-bold text-lg">
                                🤝
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Solidaridad</h4>
                                <p class="text-gray-600">Conectamos a quienes tienen excedentes con quienes más lo necesitan en sus comunidades.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-4">
                            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-600 font-bold text-lg">
                                💰
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 mb-2">Economía Circular</h4>
                                <p class="text-gray-600">Creamos valor de productos que antes se consideraban desperdicio.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="animate-slide-in-right">
                    <div class="glass-card p-8">
                        <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
                            📊 Estadísticas de Impacto
                        </h3>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-primary-600 mb-2">15</div>
                                <div class="text-sm text-gray-600">Toneladas Rescatadas</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-secondary-600 mb-2">2,500</div>
                                <div class="text-sm text-gray-600">Personas Beneficiadas</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-accent-600 mb-2">85%</div>
                                <div class="text-sm text-gray-600">Reducción Desperdicio</div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-primary-600 mb-2">120</div>
                                <div class="text-sm text-gray-600">Entidades Activas</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- How It Works Section -->
    <section id="como-funciona" class="py-20 px-6 bg-gradient-to-r from-primary-50 to-accent-50">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6 animate-slide-up">
                    ⚡ Cómo Funciona
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
                    Un proceso simple y efectivo para conectar donantes, vendedores y beneficiarios
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Step 1 -->
                <div class="feature-card p-8 text-center animate-slide-up" style="animation-delay: 0.2s;">
                    <div class="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-3xl text-white">📝</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">1. Regístrate</h3>
                    <p class="text-gray-600 mb-6">
                        Crea tu cuenta como donante, vendedor o beneficiario. El proceso es rápido y gratuito.
                    </p>
                    <div class="bg-primary-50 rounded-lg p-4">
                        <div class="text-sm text-primary-700 font-medium">
                            ✓ Registro gratuito<br>
                            ✓ Verificación rápida<br>
                            ✓ Perfil personalizado
                        </div>
                    </div>
                </div>

                <!-- Step 2 -->
                <div class="feature-card p-8 text-center animate-slide-up" style="animation-delay: 0.4s;">
                    <div class="w-20 h-20 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-3xl text-white">📱</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">2. Publica o Busca</h3>
                    <p class="text-gray-600 mb-6">
                        Publica tus donaciones/ventas o busca alimentos disponibles en tu zona.
                    </p>
                    <div class="bg-secondary-50 rounded-lg p-4">
                        <div class="text-sm text-secondary-700 font-medium">
                            ✓ Publicación fácil<br>
                            ✓ Búsqueda por ubicación<br>
                            ✓ Filtros inteligentes
                        </div>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="feature-card p-8 text-center animate-slide-up" style="animation-delay: 0.6s;">
                    <div class="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span class="text-3xl text-white">🤝</span>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">3. Conecta</h3>
                    <p class="text-gray-600 mb-6">
                        Contacta directamente y coordina la entrega. ¡Así de simple!
                    </p>
                    <div class="bg-accent-50 rounded-lg p-4">
                        <div class="text-sm text-accent-700 font-medium">
                            ✓ Contacto directo<br>
                            ✓ Coordinación flexible<br>
                            ✓ Impacto inmediato
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Impact Section -->
    <section id="impacto" class="py-20 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-6 animate-slide-up">
                    🌟 Nuestro Impacto
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up" style="animation-delay: 0.2s;">
                    Cada conexión cuenta. Mira cómo estamos transformando comunidades y cuidando el planeta.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <div class="glass-card p-6 text-center animate-slide-up" style="animation-delay: 0.2s;">
                    <div class="text-4xl mb-4">🍎</div>
                    <div class="text-3xl font-bold stat-number mb-2">25,000</div>
                    <div class="text-gray-600 font-medium">Kilos de Comida Rescatada</div>
                </div>
                <div class="glass-card p-6 text-center animate-slide-up" style="animation-delay: 0.4s;">
                    <div class="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                    <div class="text-3xl font-bold stat-number mb-2">5,200</div>
                    <div class="text-gray-600 font-medium">Personas Beneficiadas</div>
                </div>
                <div class="glass-card p-6 text-center animate-slide-up" style="animation-delay: 0.6s;">
                    <div class="text-4xl mb-4">🏪</div>
                    <div class="text-3xl font-bold stat-number mb-2">180</div>
                    <div class="text-gray-600 font-medium">Entidades Participantes</div>
                </div>
                <div class="glass-card p-6 text-center animate-slide-up" style="animation-delay: 0.8s;">
                    <div class="text-4xl mb-4">🌍</div>
                    <div class="text-3xl font-bold stat-number mb-2">15</div>
                    <div class="text-gray-600 font-medium">Ciudades Conectadas</div>
                </div>
            </div>

            <!-- Testimonials -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="glass-card p-8 animate-slide-in-left">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl">
                            👨‍🍳
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800">Carlos Mendoza</h4>
                            <p class="text-gray-600">Restaurante El Buen Sabor</p>
                        </div>
                    </div>
                    <p class="text-gray-700 italic">
                        "FoodLoop nos ha permitido dar una segunda vida a nuestros excedentes. 
                        Es increíble saber que nuestra comida llega a familias que la necesitan."
                    </p>
                </div>

                <div class="glass-card p-8 animate-slide-in-right">
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-16 h-16 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white text-2xl">
                            👩‍💼
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-800">María González</h4>
                            <p class="text-gray-600">Fundación Ayuda Social</p>
                        </div>
                    </div>
                    <p class="text-gray-700 italic">
                        "Gracias a FoodLoop podemos alimentar a más familias cada semana. 
                        La plataforma es fácil de usar y el impacto es inmediato."
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-6 hero-gradient relative overflow-hidden">
        <div class="absolute inset-0 overlay-light"></div>
    <div class="relative z-10 max-w-4xl mx-auto text-center text-white">
            <h2 class="text-5xl font-bold mb-8 animate-slide-up">
                🚀 ¡Únete a la Revolución Alimentaria!
            </h2>
            <p class="text-xl mb-12 opacity-90 animate-slide-up" style="animation-delay: 0.2s;">
                Sé parte del cambio. Cada acción cuenta para construir un mundo sin desperdicio alimentario.
            </p>
            <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style="animation-delay: 0.4s;">
                <a href="/register" class="btn-cta-white text-lg px-8 py-4" onclick="try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:'/register'}));event.preventDefault();}catch(e){}">
                    🌟 Crear Cuenta Gratis
                </a>
                <a href="/login" class="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600" onclick="try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:'/login'}));event.preventDefault();}catch(e){}">
                    🔑 Ya tengo cuenta
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-16 px-6">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div>
                    <div class="flex items-center gap-3 mb-6">
                        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white">
                            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5"/>
                                <path d="M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold">FoodLoop</h3>
                    </div>
                    <p class="text-gray-400 mb-6">
                        Conectando comida con necesidad para un mundo más sostenible y solidario.
                    </p>
                    <div class="flex gap-4">
                        <a href="#" class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors">📘</a>
                        <a href="#" class="w-10 h-10 bg-accent-600 rounded-full flex items-center justify-center text-white hover:bg-accent-700 transition-colors">🐦</a>
                        <a href="#" class="w-10 h-10 bg-secondary-600 rounded-full flex items-center justify-center text-white hover:bg-secondary-700 transition-colors">📷</a>
                        <a href="#" class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors">💼</a>
                    </div>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
                    <ul class="space-y-3 text-gray-400">
                        <li><a href="#inicio" class="hover:text-white transition-colors">Inicio</a></li>
                        <li><a href="#nosotros" class="hover:text-white transition-colors">Nosotros</a></li>
                        <li><a href="#como-funciona" class="hover:text-white transition-colors">Cómo Funciona</a></li>
                        <li><a href="/" class="hover:text-white transition-colors">Explorar</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 class="text-lg font-semibold mb-6">Contacto</h4>
                    <ul class="space-y-3 text-gray-400">
                        <li class="flex items-center gap-2">
                            <span>📧</span>
                            <span>info@foodloop.com</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>📱</span>
                            <span>+57 321 3110414</span>
                        </li>
                        <li class="flex items-center gap-2">
                            <span>📍</span>
                            <span>Bogotá, Colombia</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
                <p>&copy; <span id="year"></span> FoodLoop. Todos los derechos reservados. Hecho con ❤️ para un mundo mejor.</p>
            </div>
        </div>
    </footer>

        <script>
                // Interceptar clics en enlaces /login y /register para navegación nativa
                (function(){
                    const isExpoWeb = typeof window !== 'undefined' && window.parent !== window;
                    document.addEventListener('click', function(e){
                        const a = e.target.closest('a[href]');
                        if(!a) return;
                        const href = a.getAttribute('href');
                        if(href === '/login' || href === '/register'){
                            try {
                                if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                                    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'navigate', path: href }));
                                    e.preventDefault();
                                    return;
                                }
                            } catch {}
                            if (isExpoWeb) {
                                // En web dentro de iframe: abrir arriba
                                a.setAttribute('target','_top');
                            }
                        }
                    }, true);
                })();
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll progress indicator
        window.addEventListener('scroll', () => {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scrollIndicator').style.transform = \`scaleX(\${scrolled / 100})\`;
        });

        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobileMenu');
        document.getElementById('menuToggle').addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-slide-up, .animate-slide-in-left, .animate-slide-in-right').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });

        // Counter animation for stats
        function animateCounter(element, target) {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 20);
        }

        // Animate counters when they come into view
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const number = entry.target.textContent.replace(/,/g, '');
                    if (!isNaN(number)) {
                        animateCounter(entry.target, parseInt(number));
                        statsObserver.unobserve(entry.target);
                    }
                }
            });
        });

        document.querySelectorAll('.stat-number').forEach(stat => {
            statsObserver.observe(stat);
        });

        // Set dynamic year in footer
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    </script>
</body>
</html>`;

/* Si no tienes react-native-webview instalado y SOLO quieres ver en web,
   comenta la importación anterior y la rama correspondiente. */

export default function PantallaPrincipal() {
  // Plataforma web: usar iframe (srcDoc)
  if (Platform.OS === "web") {
    return (
      <SafeAreaView style={styles.safe}>
        {/* En web renderizamos un iframe con srcDoc para que tu HTML se vea idéntico */}
        <View style={styles.iframeContainer}>
          {/* eslint-disable-next-line react/no-danger */}
                    <iframe
            title="FoodLoop HTML"
            srcDoc={htmlContent}
            style={styles.iframe}
                                    sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation-by-user-activation"
          />
        </View>
      </SafeAreaView>
    );
  }

  // iOS / Android: usar WebView nativo
  return (
    <SafeAreaView style={styles.safe}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
                setSupportMultipleWindows={false}
                injectedJavaScriptBeforeContentLoaded={`
                    (function(){
                        document.addEventListener('click', function(e){
                            const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
                            if(!a) return;
                            const href = a.getAttribute('href');
                            if(href === '/login' || href === '/register'){
                                try{window.ReactNativeWebView.postMessage(JSON.stringify({type:'navigate',path:href}));}catch(e){}
                                e.preventDefault();
                            }
                        }, true);
                    })();
                `}
                                onShouldStartLoadWithRequest={(request) => {
                    try {
                        const url = request?.url || '';
                        // Intercepta intentos de navegación a login/register desde el contenido
                                                if (url.endsWith('/login') || url.includes('/login') || url.endsWith('/register') || url.includes('/register')) {
                                                        const isRegister = url.includes('/register');
                                                        if (isRegister) {
                                                            router.push('/register');
                                                        } else {
                                                            // Si ya hay sesión, redirigir a destino según rol
                                                            (async () => {
                                                                const token = await storage.getToken();
                                                                if (token) {
                                                                    const user = await storage.getUserData();
                                                                    const target = user?.estado === 2 ? '/admin' : '/explorador';
                                                                    router.replace(target as any);
                                                                } else {
                                                                    router.push('/login');
                                                                }
                                                            })();
                                                        }
                            return false; // cancelar carga en el WebView
                        }
                    } catch {}
                    return true;
                }}
                onMessage={(event) => {
                    try {
                        const data = JSON.parse(event.nativeEvent.data);
                                                if (data?.type === 'navigate' && typeof data.path === 'string') {
                                                        if (data.path === '/login') {
                                                            (async () => {
                                                                const token = await storage.getToken();
                                                                if (token) {
                                                                    const user = await storage.getUserData();
                                                                    const target = user?.estado === 2 ? '/admin' : '/explorador';
                                                                    router.replace(target as any);
                                                                } else {
                                                                    router.push('/login');
                                                                }
                                                            })();
                                                        } else {
                                                            router.push(data.path);
                                                        }
                        }
                    } catch {}
                }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  webview: { flex: 1 },
  iframeContainer: { flex: 1, width: "100%", height: "100%" },
  iframe: {
    borderWidth: 0,
    width: "100%",
    height: "100vh", // para que ocupe toda la ventana en web
  } as any,
});
