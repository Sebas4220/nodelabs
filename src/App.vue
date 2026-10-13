<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'

// --- Lógica del Menú Móvil ---
const isMobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// --- 1. Lógica del Cambiador de Color (Theme Picker y Auto-Ciclo Inteligente) ---
const availableHues = [0, 90, -70] // 0=Cian, 90=Morado, -70=Verde
const themeHue = ref(0) 
const isAutoMode = ref(false)
let themeInterval = null

const startAutoCycle = () => {
  isAutoMode.value = true
  let currentIndex = availableHues.indexOf(themeHue.value)
  if (currentIndex === -1) currentIndex = 0
  
  if (themeInterval) clearInterval(themeInterval)
  themeInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % availableHues.length
    themeHue.value = availableHues[currentIndex]
  }, 5000)
}

const stopAutoCycle = () => {
  isAutoMode.value = false
  if (themeInterval) {
    clearInterval(themeInterval)
    themeInterval = null
  }
}

const changeTheme = (hue, manual = false) => {
  if (manual) {
    if (themeHue.value === hue && !isAutoMode.value) {
      localStorage.removeItem('nodelabs-theme-hue') 
      startAutoCycle() 
    } else {
      themeHue.value = hue
      localStorage.setItem('nodelabs-theme-hue', hue.toString()) 
      stopAutoCycle() 
    }
  } else {
    themeHue.value = hue
  }
}

const initTheme = () => {
  const savedHue = localStorage.getItem('nodelabs-theme-hue')
  if (savedHue !== null) {
    themeHue.value = parseInt(savedHue, 10)
    isAutoMode.value = false 
  } else {
    startAutoCycle() 
  }
}

onUnmounted(() => {
  stopAutoCycle()
})

// --- 2. Lógica de Geolocalización y Precios ---
const userLocation = ref('Detectando ubicación...')
const prices = ref({
  landing: 350,
  corporate: 600,
  ecommerce: 1100,
  currency: 'USD',
  symbol: '$'
})

const detectLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    const country = data.country_code
    
    if (country === 'VE') {
      prices.value = { landing: 150, corporate: 350, ecommerce: 800, currency: 'USD', symbol: '$' }
      userLocation.value = `📍 Tarifa Nacional: Venezuela`
    } else if (['CO', 'AR', 'PE', 'EC', 'CL', 'MX'].includes(country)) {
      prices.value = { landing: 200, corporate: 450, ecommerce: 1000, currency: 'USD', symbol: '$' }
      userLocation.value = `📍 Tarifa LATAM: ${data.country_name}`
    } else if (['ES', 'FR', 'IT', 'DE', 'PT'].includes(country)) {
      prices.value = { landing: 400, corporate: 650, ecommerce: 1150, currency: 'EUR', symbol: '€' }
      userLocation.value = `📍 Tarifa Europa: ${data.country_name}`
    } else {
      prices.value = { landing: 400, corporate: 650, ecommerce: 1150, currency: 'USD', symbol: '$' }
      userLocation.value = `📍 Tarifa Global: ${data.country_name || 'US'}`
    }
  } catch (error) {
    userLocation.value = '📍 Tarifa Global'
  }
}

// --- Lógica de Scroll Effects ---
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target) 
      }
    })
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  })

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
    observer.observe(el)
  })
}

// --- Lógica del Efecto Máquina de Escribir ---
const titleLine1 = ref('')
const titleLine2 = ref('')
const isTypingLine2 = ref(false)
const showCursor = ref(true)

const initTypewriter = () => {
  const fullLine1 = "Elevamos tu Negocio con"
  const fullLine2 = "Código de Alto Rendimiento."
  let i = 0
  let j = 0
  
  setInterval(() => { showCursor.value = !showCursor.value }, 500)

  setTimeout(() => {
    const typeLine1 = setInterval(() => {
      if (i < fullLine1.length) {
        titleLine1.value += fullLine1.charAt(i)
        i++
      } else {
        clearInterval(typeLine1)
        isTypingLine2.value = true 
        
        setTimeout(() => {
          const typeLine2 = setInterval(() => {
            if (j < fullLine2.length) {
              titleLine2.value += fullLine2.charAt(j)
              j++
            } else {
              clearInterval(typeLine2)
            }
          }, 60)
        }, 300)
      }
    }, 50)
  }, 800)
}

onMounted(() => {
  nextTick(() => {
    initTheme()
    initScrollAnimations()
    initTypewriter()
    detectLocation()
  })
})
</script>

<template>
  <div class="relative bg-[#050505] min-h-screen text-white overflow-x-hidden selection:bg-node-cyan selection:text-[#050505] font-body">
    
    <!-- FONDOS Y LUCES AMBIENTALES -->
    <div class="fixed inset-0 z-0 pointer-events-none transition-all duration-[1500ms] ease-in-out" :style="{ filter: 'hue-rotate(' + themeHue + 'deg)' }">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-node-cyan/10 rounded-full blur-[120px]"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
    </div>

    <!-- NAVBAR -->
    <header class="fixed top-0 w-full px-4 sm:px-6 lg:px-20 py-4 md:py-5 z-50 animate-fade-in-down border-b border-white/5 bg-[#050505]/80 backdrop-blur-md transition-all duration-[1500ms] ease-in-out" :style="{ filter: 'hue-rotate(' + themeHue + 'deg)' }">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        
        <div class="flex items-center group cursor-pointer">
          <img src="/logo.png" alt="Node Labs Logotipo" class="h-6 sm:h-8 md:h-9 object-contain transition-transform duration-500 group-hover:opacity-80" fetchpriority="high" decoding="sync" />
        </div>

        <button aria-label="Abrir menú móvil" @click="toggleMobileMenu" class="md:hidden relative z-50 text-white p-2 focus:outline-none">
          <div class="w-6 h-5 flex flex-col justify-between transition-all duration-300">
            <span class="w-full h-0.5 bg-current rounded-full transition-all duration-300" :class="{'rotate-45 translate-y-2.5': isMobileMenuOpen}"></span>
            <span class="w-full h-0.5 bg-current rounded-full transition-all duration-300" :class="{'opacity-0': isMobileMenuOpen}"></span>
            <span class="w-full h-0.5 bg-current rounded-full transition-all duration-300" :class="{'-rotate-45 -translate-y-2': isMobileMenuOpen}"></span>
          </div>
        </button>

        <nav class="hidden md:flex gap-8 text-sm text-gray-400 font-medium items-center">
          <a href="#servicios" class="hover:text-white transition-colors duration-300">Servicios</a>
          <a href="#portafolio" class="hover:text-white transition-colors duration-300">Portafolio</a>
          <a href="#planes" class="hover:text-white transition-colors duration-300">Planes</a>
          
          <div class="flex gap-3 ml-2 pl-6 border-l border-white/10 items-center">
            <button aria-label="Tema Cian" @click="changeTheme(0, true)" class="w-3.5 h-3.5 rounded-full bg-[#00D8FF] transition-all duration-300" :class="themeHue === 0 ? 'scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-[#050505] shadow-[0_0_10px_#00D8FF]' : 'opacity-60 hover:opacity-100 hover:scale-110'" title="Cian"></button>
            <button aria-label="Tema Morado" @click="changeTheme(90, true)" class="w-3.5 h-3.5 rounded-full bg-[#A855F7] transition-all duration-300" :class="themeHue === 90 ? 'scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-[#050505] shadow-[0_0_10px_#A855F7]' : 'opacity-60 hover:opacity-100 hover:scale-110'" title="Morado"></button>
            <button aria-label="Tema Verde" @click="changeTheme(-70, true)" class="w-3.5 h-3.5 rounded-full bg-[#10B981] transition-all duration-300" :class="themeHue === -70 ? 'scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-[#050505] shadow-[0_0_10px_#10B981]' : 'opacity-60 hover:opacity-100 hover:scale-110'" title="Verde"></button>
          </div>
        </nav>

        <div class="hidden md:flex items-center gap-4">
          <button aria-label="Botón de contacto" class="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Contactar
          </button>
        </div>
      </div>
    </header>

    <!-- MENU MÓVIL Y SELECTOR -->
    <div :class="isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'" class="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden flex flex-col justify-center items-center" :style="{ filter: 'hue-rotate(' + themeHue + 'deg)' }">
      <nav class="flex flex-col gap-8 text-xl text-gray-300 items-center text-center font-display">
        <a href="#servicios" @click="closeMobileMenu" class="hover:text-white transition-colors">Servicios</a>
        <a href="#portafolio" @click="closeMobileMenu" class="hover:text-white transition-colors">Portafolio</a>
        <a href="#planes" @click="closeMobileMenu" class="hover:text-white transition-colors">Planes</a>
        
        <div class="flex gap-6 mt-4">
          <button aria-label="Tema Cian" @click="changeTheme(0, true)" class="w-5 h-5 rounded-full bg-[#00D8FF] transition-all duration-300" :class="themeHue === 0 ? 'scale-125 ring-2 ring-white/50 ring-offset-4 ring-offset-[#050505] shadow-[0_0_15px_#00D8FF]' : 'opacity-60'"></button>
          <button aria-label="Tema Morado" @click="changeTheme(90, true)" class="w-5 h-5 rounded-full bg-[#A855F7] transition-all duration-300" :class="themeHue === 90 ? 'scale-125 ring-2 ring-white/50 ring-offset-4 ring-offset-[#050505] shadow-[0_0_15px_#A855F7]' : 'opacity-60'"></button>
          <button aria-label="Tema Verde" @click="changeTheme(-70, true)" class="w-5 h-5 rounded-full bg-[#10B981] transition-all duration-300" :class="themeHue === -70 ? 'scale-125 ring-2 ring-white/50 ring-offset-4 ring-offset-[#050505] shadow-[0_0_15px_#10B981]' : 'opacity-60'"></button>
        </div>

        <button aria-label="Botón de contacto móvil" @click="closeMobileMenu" class="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold">
          Contactar
        </button>
      </nav>
    </div>

    <!-- WRAPPER GLOBAL DEL CONTENIDO -->
    <div class="relative z-10 transition-all duration-[1500ms] ease-in-out" :style="{ filter: 'hue-rotate(' + themeHue + 'deg)' }">
      
      <!-- ==================== MAIN HERO ==================== -->
      <main class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-20 relative pt-32 pb-10">
        <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-20">
          
          <div class="text-left">
            <div class="mb-8 inline-block animate-fade-in-up delay-100">
              <div class="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs sm:text-sm text-gray-300 font-medium shadow-[0_0_20px_rgba(0,216,255,0.05)]">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-node-cyan opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-node-cyan"></span>
                </span>
                Agencia de Arquitectura Digital
              </div>
            </div>

            <h1 class="font-display text-4xl sm:text-5xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight animate-fade-in-up delay-200 min-h-[90px] sm:min-h-[110px] md:min-h-[120px]">
              {{ titleLine1 }}
              <span v-if="!isTypingLine2" class="inline-block w-2 sm:w-2.5 h-8 sm:h-10 md:h-12 ml-1 align-middle transition-opacity duration-75" :class="{'opacity-0': !showCursor}"></span>
              <br/>
              <span class="block mt-2">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-node-cyan via-blue-400 to-blue-600">
                  {{ titleLine2 }}
                </span>
                <span v-if="isTypingLine2" class="inline-block w-2 sm:w-2.5 h-8 sm:h-10 md:h-12 ml-1 align-middle transition-opacity duration-75" :class="{'opacity-0': !showCursor}"></span>
              </span>
            </h1>

            <p class="text-gray-400 max-w-lg mb-10 text-sm sm:text-base md:text-lg leading-relaxed animate-fade-in-up delay-300">
              Construimos infraestructuras web robustas y aplicaciones a medida. 
              Un desarrollo técnico impecable diseñado para proyectar autoridad y convertir visitantes en clientes de alto valor.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 items-center sm:items-start animate-fade-in-up delay-400 w-full sm:w-auto">
              <button aria-label="Agendar auditoría técnica" class="w-full sm:w-auto bg-node-cyan text-[#050505] font-semibold py-3.5 px-8 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,216,255,0.3)]">
                Agendar Auditoría
              </button>
              <button aria-label="Explorar nuestros servicios" class="w-full sm:w-auto px-8 py-3.5 font-semibold text-white rounded-full border border-white/20 hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm">
                Explorar Servicios
              </button>
            </div>
          </div>

          <div class="w-full relative animate-fade-in-up delay-400 group perspective-[2000px] lg:pl-8">
            <div class="absolute inset-0 bg-node-cyan/15 blur-[100px] rounded-full scale-90 group-hover:bg-node-cyan/25 transition-colors duration-700 pointer-events-none"></div>
            <div class="relative rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md overflow-hidden transform-gpu transition-transform duration-700 group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg] animate-float shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div class="h-8 md:h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                <div class="ml-4 text-[10px] text-gray-500 font-mono tracking-widest hidden sm:block">nodelabs_infrastructure_dashboard</div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Dashboard analítico de infraestructura web Node Labs" 
                class="w-full h-auto object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-[1500ms] aspect-video"
                :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }"
                fetchpriority="high" 
                decoding="sync"
              />
            </div>
          </div>
        </div>
      </main>

      <!-- ==================== SECCIÓN: SERVICIOS ==================== -->
      <section id="servicios" class="w-full px-4 sm:px-6 lg:px-20 py-24 bg-[#050505]">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-20 md:mb-28 reveal-up">
            <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Ecosistemas <span class="text-gray-500">Digitales</span>
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Diseñamos e implementamos arquitecturas precisas para cada modelo de negocio.
            </p>
          </div>

          <div class="space-y-24 md:space-y-32">
            <!-- Servicio 1 -->
            <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 reveal-up">
              <div class="w-full lg:w-1/2 order-2 lg:order-1 relative group perspective-[2000px]">
                <div class="absolute inset-0 bg-node-cyan/10 blur-[80px] rounded-full scale-90 group-hover:bg-node-cyan/20 transition-colors duration-700"></div>
                <div class="relative rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md overflow-hidden transform-gpu transition-transform duration-700 group-hover:rotate-y-[5deg] group-hover:rotate-x-[2deg] shadow-2xl">
                  <div class="h-8 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                    <div class="w-2 h-2 rounded-full bg-red-500/80"></div><div class="w-2 h-2 rounded-full bg-yellow-500/80"></div><div class="w-2 h-2 rounded-full bg-green-500/80"></div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" alt="Estructura de diseño Landing Page y analíticas" class="w-full h-auto aspect-video object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-[1500ms]" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
                </div>
              </div>
              <div class="w-full lg:w-1/2 order-1 lg:order-2">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-node-cyan/30 bg-node-cyan/5 text-[10px] sm:text-xs text-node-cyan font-mono mb-6">
                  01 // VISIBILIDAD RÁPIDA
                </div>
                <h3 class="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Landing Pages</h3>
                <p class="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                  Sistemas de aterrizaje ultra-rápidos diseñados específicamente para la conversión. Combinamos copywriting persuasivo con arquitecturas Single-Page para maximizar el ROI de tus campañas en Meta Ads o Google Ads.
                </p>
                <ul class="space-y-3 text-sm text-gray-300">
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Embudos de captación de leads automáticos.</li>
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Integración profunda de Píxeles de seguimiento.</li>
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Enrutamiento instantáneo a WhatsApp o CRMs.</li>
                </ul>
              </div>
            </div>

            <!-- Servicio 2 -->
            <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 reveal-up">
              <div class="w-full lg:w-1/2">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-node-cyan/30 bg-node-cyan/5 text-[10px] sm:text-xs text-node-cyan font-mono mb-6">
                  02 // AUTORIDAD DIGITAL
                </div>
                <h3 class="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Web Corporativa</h3>
                <p class="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                  Tu sede principal en internet. Construimos sitios web robustos y multi-página que proyectan confianza absoluta a clientes corporativos (B2B). Estructurados a medida para dominar el SEO en tu sector.
                </p>
                <ul class="space-y-3 text-sm text-gray-300">
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Diseño UI/UX exclusivo y adaptativo.</li>
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Paneles autoadministrables (CMS) a medida.</li>
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Arquitecturas escalables preparadas para alto tráfico.</li>
                </ul>
              </div>
              <div class="w-full lg:w-1/2 relative group perspective-[2000px]">
                <div class="absolute inset-0 bg-node-cyan/10 blur-[80px] rounded-full scale-90 group-hover:bg-node-cyan/20 transition-colors duration-700"></div>
                <div class="relative rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md overflow-hidden transform-gpu transition-transform duration-700 group-hover:rotate-y-[-5deg] group-hover:rotate-x-[2deg] shadow-2xl">
                  <div class="h-8 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                    <div class="w-2 h-2 rounded-full bg-red-500/80"></div><div class="w-2 h-2 rounded-full bg-yellow-500/80"></div><div class="w-2 h-2 rounded-full bg-green-500/80"></div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" alt="Desarrollo de Software B2B Corporativo" class="w-full h-auto aspect-video object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-[1500ms]" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>

            <!-- Servicio 3 -->
            <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 reveal-up">
              <div class="w-full lg:w-1/2 order-2 lg:order-1 relative group perspective-[2000px]">
                <div class="absolute inset-0 bg-node-cyan/10 blur-[80px] rounded-full scale-90 group-hover:bg-node-cyan/20 transition-colors duration-700"></div>
                <div class="relative rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md overflow-hidden transform-gpu transition-transform duration-700 group-hover:rotate-y-[5deg] group-hover:rotate-x-[2deg] shadow-2xl">
                  <div class="h-8 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
                    <div class="w-2 h-2 rounded-full bg-red-500/80"></div><div class="w-2 h-2 rounded-full bg-yellow-500/80"></div><div class="w-2 h-2 rounded-full bg-green-500/80"></div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop" alt="Plataforma transaccional eCommerce con panel de control" class="w-full h-auto aspect-video object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-[1500ms]" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
                </div>
              </div>
              <div class="w-full lg:w-1/2 order-1 lg:order-2">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-node-cyan/30 bg-node-cyan/5 text-[10px] sm:text-xs text-node-cyan font-mono mb-6">
                  03 // VENTAS AUTOMATIZADAS
                </div>
                <h3 class="font-display text-3xl sm:text-4xl font-bold text-white mb-4">eCommerce Transaccional</h3>
                <p class="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                  Sistemas de ventas online capaces de operar en piloto automático. Desarrollamos tiendas virtuales avanzadas con sincronización de inventarios, precios en tiempo real y pasarelas de pago globales.
                </p>
                <ul class="space-y-3 text-sm text-gray-300">
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Sincronización de Precios vía APIs (Ej: USDT).</li>
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Checkouts optimizados para reducir carritos abandonados.</li>
                  <li class="flex items-center gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Paneles integrales de gestión logística y de pedidos.</li>
                </ul>
              </div>
            </div>

          </div>

          <!-- STACK TÉCNICO -->
          <div id="tecnologias" class="mt-24 md:mt-32 flex flex-col items-center reveal-up">
            <p class="text-xs tracking-widest text-gray-500 uppercase font-semibold mb-8">Tecnologías Base</p>
            <div class="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl">
              <span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:border-node-cyan transition-colors">Vue.js</span>
              <span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:border-node-cyan transition-colors">Nuxt 3</span>
              <span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:border-node-cyan transition-colors">React</span>
              <span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:border-node-cyan transition-colors">Tailwind CSS</span>
              <span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:border-node-cyan transition-colors">Node.js</span>
              <span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:border-node-cyan transition-colors">Express</span>
              <span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:border-node-cyan transition-colors">MySQL</span>
              <span class="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-medium hover:border-node-cyan transition-colors">Arquitecturas REST</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== SECCIÓN: PORTAFOLIO ==================== -->
      <section id="portafolio" class="w-full px-4 sm:px-6 lg:px-20 py-24 border-t border-white/5 bg-[#050505]">
        <div class="max-w-7xl mx-auto">
          
          <div class="text-center mb-10 reveal-up">
            <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Proyectos <span class="text-gray-500">Destacados</span>
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              Explora nuestro directorio de arquitecturas y soluciones operando en producción.
            </p>
          </div>

          <div class="flex flex-col md:flex-row gap-4 mb-12 reveal-up transition-delay-100">
            <div class="relative flex-grow md:max-w-xs">
              <input aria-label="Búsqueda de proyectos" type="text" placeholder="Buscar proyectos..." class="w-full bg-transparent border border-white/10 rounded-md py-2.5 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-node-cyan transition-colors">
              <svg class="w-4 h-4 absolute left-3 top-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <div class="flex gap-4 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
              <select aria-label="Filtro de Categorías de proyectos" class="bg-transparent border border-white/10 rounded-md py-2.5 px-4 text-sm text-gray-300 appearance-none focus:outline-none focus:border-node-cyan cursor-pointer min-w-[150px]">
                <option value="">Todas las Categorías</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="saas">SaaS / CRM</option>
                <option value="corporate">Corporativo</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            <!-- Portafolio 1 -->
            <div class="group cursor-pointer reveal-up transition-delay-100">
              <div class="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10 bg-[#0A0A0A] relative">
                <div class="absolute inset-0 bg-node-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" alt="Proyecto E-Commerce Tienda Konex" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] opacity-90" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
              </div>
              <h3 class="text-white text-center font-display font-semibold text-sm lg:text-sm group-hover:text-node-cyan transition-colors">Tienda Konex (Tech Shop)</h3>
            </div>

            <!-- Portafolio 2 -->
            <div class="group cursor-pointer reveal-up transition-delay-200">
              <div class="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10 bg-[#0A0A0A] relative">
                <div class="absolute inset-0 bg-node-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop" alt="Proyecto Logistics Marketplace Dashboard" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] opacity-90" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
              </div>
              <h3 class="text-white text-center font-display font-semibold text-sm lg:text-sm group-hover:text-node-cyan transition-colors">Logistics Marketplace</h3>
            </div>

            <!-- Portafolio 3 -->
            <div class="group cursor-pointer reveal-up transition-delay-300">
              <div class="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10 bg-[#0A0A0A] relative">
                <div class="absolute inset-0 bg-node-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" alt="Proyecto SaaS B2B Courier CRM" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] opacity-90" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
              </div>
              <h3 class="text-white text-center font-display font-semibold text-sm lg:text-sm group-hover:text-node-cyan transition-colors">SaaS B2B & Courier CRM</h3>
            </div>

            <!-- Portafolio 4 -->
            <div class="group cursor-pointer reveal-up transition-delay-100">
              <div class="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10 bg-[#0A0A0A] relative">
                <div class="absolute inset-0 bg-node-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <img src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2070&auto=format&fit=crop" alt="Proyecto Web Corporativa de Clínica Estética" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] opacity-90" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
              </div>
              <h3 class="text-white text-center font-display font-semibold text-sm lg:text-sm group-hover:text-node-cyan transition-colors">Skin & Hair Clinic</h3>
            </div>

            <!-- Portafolio 5 -->
            <div class="group cursor-pointer reveal-up transition-delay-200">
              <div class="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10 bg-[#0A0A0A] relative">
                <div class="absolute inset-0 bg-node-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop" alt="Proyecto Sitio Institucional Home Services Firm" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] opacity-90" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
              </div>
              <h3 class="text-white text-center font-display font-semibold text-sm lg:text-sm group-hover:text-node-cyan transition-colors">Home Services Firm</h3>
            </div>

            <!-- Portafolio 6 -->
            <div class="group cursor-pointer reveal-up transition-delay-300">
              <div class="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-white/10 bg-[#0A0A0A] relative">
                <div class="absolute inset-0 bg-node-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Proyecto Panel de Inteligencia Artificial Corporativo" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1500ms] opacity-90" :style="{ filter: 'hue-rotate(' + (-themeHue) + 'deg)' }" loading="lazy" decoding="async" />
              </div>
              <h3 class="text-white text-center font-display font-semibold text-sm lg:text-sm group-hover:text-node-cyan transition-colors">Corporate AI Dashboard</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================== SECCIÓN: PLANES DE DESPLIEGUE ==================== -->
      <section id="planes" class="w-full px-4 sm:px-6 lg:px-20 py-24">
        <div class="max-w-7xl mx-auto">
          
          <div class="text-center mb-16 md:mb-20 reveal-up flex flex-col items-center">
            <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Planes de <span class="text-transparent bg-clip-text bg-gradient-to-r from-node-cyan to-blue-500">Desarrollo</span>
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base mb-6">
              Soluciones escalables diseñadas para cada etapa de tu empresa.
            </p>
            
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-node-cyan font-mono shadow-[0_0_15px_rgba(0,216,255,0.1)]">
              <span class="w-2 h-2 rounded-full bg-node-cyan animate-pulse"></span>
              {{ userLocation }}
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <!-- Plan 1 -->
            <div class="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-gray-500 transition-all duration-300 reveal-up transition-delay-100 relative group overflow-hidden mt-0 lg:mt-6">
              <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-node-cyan group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 class="text-white text-2xl font-display font-bold mb-2">Landing Page</h3>
              <p class="text-gray-400 text-sm mb-6 h-10">Validación rápida y captación masiva de leads para tus campañas.</p>
              
              <div class="mb-6 flex items-baseline gap-2 transition-all duration-500">
                <span class="text-gray-400 text-sm">Desde</span>
                <span class="text-white text-4xl font-display font-bold">{{ prices.symbol }}{{ prices.landing }}</span>
                <span class="text-gray-400 text-sm">{{ prices.currency }}</span>
              </div>

              <div class="inline-block px-3 py-1 mb-6 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">
                Tiempo est: 1 - 2 Semanas
              </div>

              <div class="border-t border-white/10 pt-6 mb-8">
                <ul class="space-y-4 text-sm text-gray-300">
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Diseño UI/UX Custom</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copywriting Persuasivo</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Integración de Pixel / Analytics</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Formularios y botón WhatsApp</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Optimización de Velocidad (90+)</li>
                </ul>
              </div>
              <button aria-label="Cotizar proyecto de Landing Page" class="w-full py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">Cotizar Proyecto</button>
            </div>

            <!-- Plan 2 -->
            <div class="relative bg-gradient-to-b from-[#0A0A0A] to-white/5 border-2 border-node-cyan/50 shadow-[0_0_30px_rgba(0,216,255,0.15)] rounded-3xl p-8 reveal-up transition-delay-200 transform lg:scale-105 z-10 group overflow-hidden">
              <div class="absolute inset-0 bg-node-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <div class="absolute top-0 right-8 bg-node-cyan text-[#050505] text-[10px] font-bold px-4 py-1.5 rounded-b-lg shadow-[0_0_15px_rgba(0,216,255,0.4)] whitespace-nowrap tracking-wide uppercase">
                El más elegido
              </div>
              <div class="w-12 h-12 rounded-xl bg-node-cyan/10 flex items-center justify-center mb-6 text-node-cyan group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,216,255,0.2)]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>

              <h3 class="text-white text-2xl font-display font-bold mb-2">Web Corporativa</h3>
              <p class="text-gray-400 text-sm mb-6 h-10">Presencia institucional premium para escalar y dominar tu sector B2B.</p>
              
              <div class="mb-6 flex items-baseline gap-2 transition-all duration-500">
                <span class="text-gray-400 text-sm">Desde</span>
                <span class="text-white text-4xl font-display font-bold">{{ prices.symbol }}{{ prices.corporate }}</span>
                <span class="text-gray-400 text-sm">{{ prices.currency }}</span>
              </div>

              <div class="inline-block px-3 py-1 mb-6 rounded-md bg-white/5 border border-node-cyan/30 text-[10px] text-node-cyan font-mono">
                Tiempo est: 3 - 4 Semanas
              </div>

              <div class="border-t border-white/10 pt-6 mb-8">
                <ul class="space-y-4 text-sm text-gray-300">
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Todo lo del plan Landing Page</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Hasta 5 páginas internas</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Panel Autoadministrable (CMS)</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Optimización SEO Técnica</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Integración con Email Marketing</li>
                </ul>
              </div>
              <button aria-label="Agendar Asesoría Web Corporativa" class="w-full py-4 rounded-full bg-node-cyan text-[#050505] font-bold hover:bg-white transition-colors shadow-[0_4px_15px_rgba(0,216,255,0.3)]">Agendar Asesoría</button>
            </div>

            <!-- Plan 3 -->
            <div class="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-gray-500 transition-all duration-300 reveal-up transition-delay-300 group overflow-hidden mt-0 lg:mt-6">
              <div class="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-node-cyan group-hover:scale-110 transition-transform">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              
              <h3 class="text-white text-2xl font-display font-bold mb-2">eCommerce</h3>
              <p class="text-gray-400 text-sm mb-6 h-10">Plataforma transaccional para vender en piloto automático a nivel global.</p>
              
              <div class="mb-6 flex items-baseline gap-2 transition-all duration-500">
                <span class="text-gray-400 text-sm">Desde</span>
                <span class="text-white text-4xl font-display font-bold">{{ prices.symbol }}{{ prices.ecommerce }}</span>
                <span class="text-gray-400 text-sm">{{ prices.currency }}</span>
              </div>

              <div class="inline-block px-3 py-1 mb-6 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">
                Tiempo est: 4 - 6 Semanas
              </div>

              <div class="border-t border-white/10 pt-6 mb-8">
                <ul class="space-y-4 text-sm text-gray-300">
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Todo lo del plan Corporativo</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Catálogo de productos avanzado</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Pasarelas de Pago Integradas</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Sync API Binance P2P (USDT a VES)</li>
                  <li class="flex items-start gap-3"><svg class="w-5 h-5 text-node-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Checkout Optimizado (Alta Conv.)</li>
                </ul>
              </div>
              <button aria-label="Evaluar Proyecto de eCommerce" class="w-full py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">Evaluar Proyecto</button>
            </div>

          </div>
        </div>
      </section>

      <!-- ==================== FINAL CTA ==================== -->
      <section class="w-full px-4 sm:px-6 lg:px-20 py-20">
        <div class="max-w-4xl mx-auto text-center bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 sm:p-12 md:p-16 rounded-3xl reveal-scale">
          <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">¿Listo para escalar tu negocio?</h2>
          <p class="text-gray-400 max-w-2xl mx-auto mb-10 text-sm sm:text-base leading-relaxed">
            Agenda una sesión estratégica gratuita de 30 minutos. Analizaremos tu presencia digital actual y trazaremos un mapa de ruta arquitectónico para tus próximos objetivos.
          </p>
          <button aria-label="Iniciar conversación por WhatsApp" class="bg-white text-[#050505] font-bold py-4 px-10 rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)]">Iniciar Conversación</button>
        </div>
      </section>

      <!-- ==================== FOOTER ==================== -->
      <footer class="w-full bg-[#050505] pt-12 pb-8 px-4 sm:px-6 lg:px-20 text-sm">
        <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div class="col-span-1 sm:col-span-2">
            <img src="/logo.png" alt="Logotipo Node Labs en el pie de página" class="h-6 sm:h-8 mb-6 opacity-90" loading="lazy" decoding="async" />
            <p class="text-gray-400 text-xs sm:text-sm mb-6 max-w-sm leading-relaxed">
              Arquitectura digital premium para empresas que buscan liderar su sector a través de tecnología de alto rendimiento.
            </p>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-4">Empresa</h3>
            <ul class="space-y-3 text-gray-400 text-sm">
              <li><a href="#servicios" class="hover:text-white transition-colors">Servicios</a></li>
              <li><a href="#portafolio" class="hover:text-white transition-colors">Portafolio</a></li>
              <li><a href="#planes" class="hover:text-white transition-colors">Planes de Desarrollo</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-white font-semibold mb-4">Contacto</h3>
            <ul class="space-y-3 text-gray-400 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Agendar Llamada</a></li>
              <li><a href="#" class="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="mailto:hello@nodelabs.dev" class="hover:text-white transition-colors">hello@nodelabs.dev</a></li>
            </ul>
          </div>
        </div>
        
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 pt-8 border-t border-white/5">
          <p>&copy; 2026 Node Labs. Todos los derechos reservados.</p>
          <div class="flex gap-4">
            <a href="#" class="hover:text-white transition-colors">Términos</a>
            <a href="#" class="hover:text-white transition-colors">Privacidad</a>
          </div>
        </div>
      </footer>

    </div> 
  </div>
</template>

<style scoped>
/* Animaciones Iniciales */
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }

.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
.animate-fade-in-down { animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.animate-float { animation: float 6s ease-in-out infinite; }

.perspective-\[2000px\] { perspective: 2000px; }
.group-hover\:rotate-y-\[-5deg\]:hover { transform: rotateY(-5deg); }
.group-hover\:rotate-x-\[2deg\]:hover { transform: rotateX(2deg); }

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
.delay-400 { animation-delay: 0.4s; }

.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Intersection Observer Classes */
.reveal-up, .reveal-left, .reveal-right, .reveal-scale { opacity: 0; transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); will-change: opacity, transform; }
.reveal-up { transform: translateY(50px); }
.reveal-left { transform: translateX(-40px); }
.reveal-right { transform: translateX(40px); }
.reveal-scale { transform: scale(0.95); }
.is-visible { opacity: 1 !important; transform: translateY(0) translateX(0) scale(1) !important; }

.transition-delay-100 { transition-delay: 100ms; }
.transition-delay-200 { transition-delay: 200ms; }
.transition-delay-300 { transition-delay: 300ms; }
</style>