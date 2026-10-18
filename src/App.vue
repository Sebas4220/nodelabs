<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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

// --- Lógica del FAQ ---
const faqs = ref([
  {
    question: '¿Qué incluye exactamente la suscripción trimestral?',
    answer: 'Cubrimos absolutamente todo para que no tengas dolores de cabeza técnicos: Diseño, programación, servidor de alta velocidad (Hosting), renovación de tu Dominio (.com) y mantenimiento mientras tu plan esté activo.',
    isOpen: false
  },
  {
    question: '¿Hay algún costo oculto o pago de instalación?',
    answer: 'No. El modelo está diseñado para evitar descapitalizarte. Solo pagas la fracción trimestral ($37.50 o $75.00) y nosotros nos encargamos del despliegue completo.',
    isOpen: false
  },
  {
    question: '¿Qué pasa si en el futuro quiero cancelar mi suscripción?',
    answer: 'No hay contratos de permanencia forzada. Si decides cancelar, el servicio web se da de baja al finalizar tu trimestre actual sin ninguna penalidad.',
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value.forEach((faq, i) => {
    if (i !== index) faq.isOpen = false
  })
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}

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
    <!-- Decoración de fondo -->
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
          <!-- Uso de NuxtImg para generar tamaños responsivos automáticamente -->
          <NuxtImg 
            src="/hero-bg.webp" 
            alt="Video explicativo sobre posicionamiento SEO y ventas" 
            class="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
            sizes="sm:400px md:800px lg:1200px"
            format="webp"
            width="800"
            height="450"
            preload
            fetchpriority="high"
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

    <!-- SECCIÓN DE AGITACIÓN DEL PROBLEMA -->
    <section class="py-20 px-4 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl md:text-4xl font-bold mb-4">
          Tener una página web "bonita" no sirve de nada si nadie entra <span class="text-[#FF1E56]">(y si los que entran no te compran).</span>
        </h2>
        <p class="text-gray-300 text-lg mb-12">
          Hoy en día, el 90% de las empresas pierden ventas todos los días por cometer uno de estos dos errores críticos:
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-12">
          <!-- Error 1 -->
          <div class="bg-[#0A0A0A] border border-[#FF1E56]/30 rounded-2xl p-8 shadow-lg">
            <div class="w-12 h-12 rounded-xl bg-[#FF1E56]/10 flex items-center justify-center mb-6" aria-hidden="true">
              <svg class="w-6 h-6 text-[#FF1E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">1. Son invisibles en Google</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Cuando un comprador con dinero en mano busca en su ciudad el servicio o producto que tú ofreces, Google le muestra a tu competencia directa porque tú solo tienes perfiles en redes sociales.
            </p>
          </div>
          <!-- Error 2 -->
          <div class="bg-[#0A0A0A] border border-[#FF1E56]/30 rounded-2xl p-8 shadow-lg">
            <div class="w-12 h-12 rounded-xl bg-[#FF1E56]/10 flex items-center justify-center mb-6" aria-hidden="true">
              <svg class="w-6 h-6 text-[#FF1E56]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 class="text-xl font-bold text-white mb-3">2. Tienen una "web adorno" que no vende</h3>
            <p class="text-gray-300 text-sm leading-relaxed">
              Pagaron cientos de dólares por un sitio lento, sin estructura persuasiva y sin posicionamiento SEO que nadie visita y que jamás genera un solo mensaje de WhatsApp.
            </p>
          </div>
        </div>

        <!-- El Secreto -->
        <div class="bg-gradient-to-r from-transparent via-[#FF1E56]/10 to-transparent border-y border-[#FF1E56]/20 py-6 px-4">
          <p class="text-white text-base md:text-lg font-medium max-w-3xl mx-auto">
            <strong class="text-[#FF1E56]">El verdadero secreto:</strong> No necesitas un gasto de $800 dólares de golpe. Necesitas un sistema digital con Alcance en Google (SEO) y Optimización de Conversión pagando apenas una fracción trimestral.
          </p>
        </div>
      </div>
    </section>

    <!-- SECCIÓN DE MECANISMO DE RESULTADOS -->
    <section class="py-24 px-4 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold">
          En Node Labs no vendemos "diseño web", <br class="hidden md:block"/> 
          instalamos un motor de captación de clientes <span class="text-[#FF1E56]">24/7</span>.
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="flex gap-5 items-start">
          <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E56] font-bold text-xl shrink-0" aria-hidden="true">1</div>
          <div>
            <h3 class="font-bold text-xl mb-2">Posicionamiento SEO en Google</h3>
            <p class="text-gray-300 text-sm leading-relaxed">Configuramos la arquitectura técnica, palabras clave de intención de compra, etiquetas meta y velocidad para que tu empresa gane alcance orgánico y te encuentren en Google.</p>
          </div>
        </div>
        <div class="flex gap-5 items-start">
          <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E56] font-bold text-xl shrink-0" aria-hidden="true">2</div>
          <div>
            <h3 class="font-bold text-xl mb-2">Optimizada 100% para Ventas</h3>
            <p class="text-gray-300 text-sm leading-relaxed">Aplicamos copywriting directo, llamados a la acción estratégicos y embudos directos a tu WhatsApp o formulario para transformar curiosos en prospectos listos para pagar.</p>
          </div>
        </div>
        <div class="flex gap-5 items-start">
          <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E56] font-bold text-xl shrink-0" aria-hidden="true">3</div>
          <div>
            <h3 class="font-bold text-xl mb-2">Diseño Atractivo y Mobile-First</h3>
            <p class="text-gray-300 text-sm leading-relaxed">Más del 80% de tu tráfico vendrá desde teléfonos móviles. Tu web tendrá una estética corporativa de alto valor, ultra rápida y adaptable a cualquier pantalla.</p>
          </div>
        </div>
        <div class="flex gap-5 items-start">
          <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E56] font-bold text-xl shrink-0" aria-hidden="true">4</div>
          <div>
            <h3 class="font-bold text-xl mb-2">Hosting + Dominio Incluido</h3>
            <p class="text-gray-300 text-sm leading-relaxed">Cero dolores de cabeza técnicos. Mientras tu suscripción trimestral esté activa, nosotros cubrimos tu dominio (.com), certificado SSL de seguridad y servidor veloz.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- OFERTA: MODELO DE SUSCRIPCIÓN -->
    <section class="py-20 px-4 bg-white/[0.02] border-t border-white/5">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Pon a trabajar tu sitio web hoy mismo <br class="hidden md:block"/> 
          por menos de lo que cuesta un <span class="text-[#FF1E56]">café diario</span>.
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto text-left">
          
          <!-- PLAN 1: LANDING PAGE -->
          <div class="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 hover:border-[#FF1E56]/50 transition-colors duration-300 relative">
            <h3 class="text-2xl font-bold mb-2">Plan Landing Page de Ventas</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-5xl font-bold text-[#FF1E56]">$0.41</span>
              <span class="text-gray-300">USD / al día</span>
            </div>
            <p class="text-sm text-gray-400 font-mono mb-6 pb-6 border-b border-white/10">Facturado trimestralmente ($37.50 USD cada 3 meses)</p>
            
            <ul class="space-y-4 text-sm text-gray-300 mb-10">
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Ideal para:</strong> Vender un servicio estrella o captar leads rápidos con campañas o tráfico directo.</li>
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Página única de alta conversión con estructura persuasiva.</li>
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Indexación y optimización SEO inicial en Google.</li>
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Botón flotante y conexión directa a WhatsApp.</li>
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Incluye:</strong> Dominio (.com) + Hosting veloz activo.</li>
            </ul>

            <button 
              @click="handleCheckout('Plan Landing Page', '$37.50')"
              class="w-full bg-[#1A1A1A] hover:bg-[#D90036] border border-[#333333] hover:border-[#D90036] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
            >
              EMPEZAR POR $37.50 AL TRIMESTRE
            </button>
          </div>

          <!-- PLAN 2: WEB CORPORATIVA -->
          <div class="bg-gradient-to-b from-[#110A0C] to-[#0A0A0A] border-2 border-[#FF1E56] rounded-3xl p-8 relative shadow-[0_0_30px_rgba(255,30,86,0.15)] transform md:scale-105">
            <!-- Etiqueta ajustada a #D90036 -->
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D90036] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
              ★ Más Completo
            </div>
            
            <h3 class="text-2xl font-bold mb-2">Plan Web Corporativa SEO</h3>
            <div class="flex items-baseline gap-2 mb-2">
              <span class="text-5xl font-bold text-[#FF1E56]">$0.82</span>
              <span class="text-gray-300">USD / al día</span>
            </div>
            <p class="text-sm text-red-400 font-mono mb-6 pb-6 border-b border-white/10">Facturado trimestralmente ($75.00 USD cada 3 meses)</p>
            
            <ul class="space-y-4 text-sm text-gray-300 mb-10">
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Ideal para:</strong> Empresas que buscan máxima autoridad, presencia sólida en Google y múltiples servicios.</li>
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Hasta 5 secciones (Inicio, Nosotros, Servicios, Casos, Contacto).</li>
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Estructura SEO avanzada para posicionar servicios en Google.</li>
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Arquitectura optimizada para cierre de ventas B2B / B2C.</li>
              <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Incluye:</strong> Dominio (.com) + Hosting + Correos corporativos.</li>
            </ul>

            <!-- Botón ajustado a #D90036 -->
            <button 
              @click="handleCheckout('Plan Web Corporativa SEO', '$75.00')"
              class="w-full bg-[#D90036] hover:bg-[#B0002A] text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(217,0,54,0.4)] transform hover:-translate-y-1 transition-all duration-300"
            >
              EMPEZAR POR $75.00 AL TRIMESTRE
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- FAQ (Manejo de Objeciones) -->
    <section class="py-16 px-4 max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold mb-8 text-center">Respuestas a tus dudas antes de empezar</h2>
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden transition-all duration-300">
          <button @click="toggleFaq(index)" class="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#FF1E56]" :aria-expanded="faq.isOpen">
            <span class="font-semibold text-sm sm:text-base text-gray-200">{{ faq.question }}</span>
            <svg class="w-5 h-5 text-[#FF1E56] transform transition-transform duration-300" :class="{'rotate-180': faq.isOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div v-if="faq.isOpen" class="px-6 pb-5 text-gray-300 text-sm leading-relaxed border-t border-white/5 pt-4">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER MINIMALISTA -->
    <footer class="py-10 text-center text-xs text-gray-400 border-t border-white/5">
      <p>Node Labs - Desarrollo, SEO y Arquitectura de Software &copy; 2026.</p>
      <div class="flex justify-center gap-4 mt-3">
        <a href="#" class="hover:text-gray-200 transition-colors underline decoration-gray-600 underline-offset-2">Términos de la Suscripción</a>
        <a href="#" class="hover:text-gray-200 transition-colors underline decoration-gray-600 underline-offset-2">Políticas de Privacidad</a>
      </div>
    </footer>

  </div>
</template>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
}
</style>