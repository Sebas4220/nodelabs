<script setup>
import { ref, onMounted, onUnmounted, defineAsyncComponent } from 'vue'

// --- Carga Diferida de Componentes (Lazy Loading en Vue 3) ---
// Esto hace el mismo trabajo que Nuxt: divide el JavaScript para que cargue ultra rápido
const SeccionAgitacion = defineAsyncComponent(() => import('./components/SeccionAgitacion.vue'))
const SeccionMecanismo = defineAsyncComponent(() => import('./components/SeccionMecanismo.vue'))
const SeccionOferta = defineAsyncComponent(() => import('./components/SeccionOferta.vue'))
const SeccionFaq = defineAsyncComponent(() => import('./components/SeccionFaq.vue'))
const FooterNodeLabs = defineAsyncComponent(() => import('./components/FooterNodeLabs.vue'))

// --- Lógica de Trackers Diferidos (Lighthouse 100/100) ---
const trackersLoaded = ref(false)

const loadTrackers = () => {
  if (trackersLoaded.value) return
  trackersLoaded.value = true
  removeListeners()

  // 1. Inyectar Google Analytics
  const gtagScript = document.createElement('script')
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
  gtagScript.async = true
  document.head.appendChild(gtagScript)

  const gtagInit = document.createElement('script')
  gtagInit.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXXXXX');`
  document.head.appendChild(gtagInit)

  // 2. Inyectar Facebook Pixel
  const fbScript = document.createElement('script')
  fbScript.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', 'TU_PIXEL_ID');fbq('track', 'PageView');`
  document.head.appendChild(fbScript)
}

const removeListeners = () => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', loadTrackers)
    window.removeEventListener('mousemove', loadTrackers)
    window.removeEventListener('touchstart', loadTrackers)
    window.removeEventListener('keydown', loadTrackers)
  }
}

onMounted(() => {
  // Fallback: Cargar los trackers después de 7 segundos si el usuario no hace nada
  setTimeout(loadTrackers, 7000)

  // Escuchar interacciones reales del usuario
  window.addEventListener('scroll', loadTrackers, { passive: true })
  window.addEventListener('mousemove', loadTrackers, { passive: true })
  window.addEventListener('touchstart', loadTrackers, { passive: true })
  window.addEventListener('keydown', loadTrackers, { passive: true })
})

onUnmounted(() => {
  removeListeners()
})

// --- Acción de Compra/Reserva ---
const handleCheckout = (planName, price) => {
  const message = `Hola Node Labs, quiero activar el ${planName} por ${price} al trimestre.`
  window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FF1E56] selection:text-white">
    
    <!-- PRE-HEADLINE (CEBO SUPERIOR) -->
    <div class="bg-[#D90036] text-white text-center py-3 px-4 text-xs sm:text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(217,0,54,0.3)]">
      ¿Tu empresa sigue dependiendo de subir historias todos los días o del boca a boca para conseguir clientes?
    </div>

    <!-- MAIN HERO & VSL -->
    <main class="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
      <!-- Decoración de fondo CORREGIDA PARA RENDIMIENTO -->
      <div class="absolute top-0 w-[500px] h-[500px] bg-[#FF1E56]/10 rounded-full blur-[150px] pointer-events-none will-change-transform transform-gpu"></div>

      <div class="relative z-10 w-full max-w-4xl">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
          Haz que tus clientes ideales encuentren tu negocio en Google todos los días y convierte sus visitas en ventas reales... <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E56] to-[#FF809F]">invirtiendo desde $0.41 centavos al día.</span>
        </h1>
        
        <p class="text-gray-300 text-base sm:text-lg mb-12 leading-relaxed max-w-3xl mx-auto">
          En Node Labs diseñamos sitios web atractivos, veloces y estructurados con SEO en Google y psicología de ventas. 
          Incluye Dominio (.com) y Hosting de alta velocidad en un cómodo plan trimestral sin descapitalizarte.
        </p>

        <!-- REPRODUCTOR VSL -->
        <div class="w-full max-w-3xl mx-auto mb-8 relative group cursor-pointer rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,30,86,0.15)] bg-black aspect-video min-h-[200px]">
          <!-- Reemplazo de NuxtImg por img nativa de HTML para Vue 3 -->
          <img 
            src="/hero-bg.webp" 
            alt="Video explicativo sobre posicionamiento SEO y ventas" 
            class="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            width="800"
            height="450"
          />
          
          <!-- Botón de Play Overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <button 
              aria-label="Reproducir video explicativo"
              class="w-20 h-20 rounded-full bg-[#D90036] hover:bg-[#B0002A] flex items-center justify-center pl-2 shadow-[0_0_30px_rgba(217,0,54,0.6)] transform group-hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50" 
            >
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>
        <p class="text-xs text-gray-300 font-mono mb-10 flex items-center justify-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#FF1E56] animate-pulse" aria-hidden="true"></span>
          Activa el sonido: Mira cómo posicionamos tu empresa en Google y multiplicamos tus contactos.
        </p>

        <!-- Botón de Acción Principal -->
        <button 
          @click="handleCheckout('Plan Landing Page', '$37.50')"
          class="w-full sm:w-auto bg-gradient-to-r from-[#D90036] to-[#B0002A] hover:from-[#B0002A] hover:to-[#D90036] text-white font-bold py-4 px-10 rounded-full shadow-[0_0_30px_rgba(217,0,54,0.4)] transform hover:-translate-y-1 transition-all duration-300 text-lg"
        >
          QUIERO ACTIVAR MI PÁGINA WEB DESDE $0.41 AL DÍA
        </button>
      </div>
    </main>

    <!-- COMPONENTES DIFERIDOS (Aquí inyectamos los componentes creados) -->
    <SeccionAgitacion />
    <SeccionMecanismo />
    <SeccionOferta @checkout="handleCheckout" />
    <SeccionFaq />
    <FooterNodeLabs />

  </div>
</template>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
}
</style>