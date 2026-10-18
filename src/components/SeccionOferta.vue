<script setup>
// Permite emitir la acción al archivo principal
defineEmits(['checkout'])
</script>

<template>
  <section class="py-20 px-4 bg-white/[0.02] border-t border-white/5">
    <div class="max-w-5xl mx-auto text-center">
      <h2 class="text-3xl md:text-[2rem] font-bold mb-4">
        Pon a trabajar tu sitio web hoy mismo <br class="hidden md:block"/> 
        por menos de lo que cuesta un <span class="text-[#FF1E56]">café diario</span>.
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto text-left">
        
        <div class="bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 hover:border-[#FF1E56]/50 transition-colors duration-300 relative">
          <h3 class="text-[1.25rem] font-bold mb-2">Plan Landing Page de Ventas</h3>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-[3rem] font-bold text-[#FF1E56]">$0.41</span>
            <span class="text-gray-300 text-[0.9rem]">USD / al día</span>
          </div>
          <p class="text-[0.73rem] text-gray-400 font-mono mb-6 pb-6 border-b border-white/10">Facturado trimestralmente ($37.50 USD cada 3 meses)</p>
          
          <ul class="space-y-4 text-[0.75rem] text-gray-300 mb-10">
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Ideal para:</strong> Vender un servicio estrella o captar leads rápidos con campañas o tráfico directo.</li>
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Página única de alta conversión con estructura persuasiva.</li>
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Indexación y optimización SEO inicial en Google.</li>
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Botón flotante y conexión directa a WhatsApp.</li>
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Incluye:</strong> Dominio (.com) + Hosting veloz activo.</li>
          </ul>

          <button 
            @click="$emit('checkout', 'Plan Landing Page', '$37.50')"
            class="text-[0.745rem] w-full bg-[#1A1A1A] hover:bg-[#D90036] border border-[#333333] hover:border-[#D90036] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300"
          >
            EMPEZAR POR $37.50 AL TRIMESTRE
          </button>
        </div>

        <div class="bg-gradient-to-b from-[#110A0C] to-[#0A0A0A] border-2 border-[#FF1E56] rounded-3xl p-8 relative shadow-[0_0_30px_rgba(255,30,86,0.15)] transform md:scale-105">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D90036] text-white px-4 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider shadow-md">
            ★ Más Completo
          </div>
          
          <h3 class="text-[1.25rem] font-bold mb-2">Plan Web Corporativa SEO</h3>
          <div class="flex items-baseline gap-2 mb-2">
            <span class="text-[3rem] font-bold text-[#FF1E56]">$0.82</span>
            <span class="text-gray-300 text-[0.9rem] ">USD / al día</span>
          </div>
          <p class="text-[0.73rem] text-red-400 font-mono mb-6 pb-6 border-b border-white/10">Facturado trimestralmente ($75.00 USD cada 3 meses)</p>
          
          <ul class="space-y-4 text-[0.75rem] text-gray-300 mb-10">
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Ideal para:</strong> Empresas que buscan máxima autoridad, presencia sólida en Google y múltiples servicios.</li>
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Hasta 5 secciones (Inicio, Nosotros, Servicios, Casos, Contacto).</li>
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Estructura SEO avanzada para posicionar servicios en Google.</li>
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Arquitectura optimizada para cierre de ventas B2B / B2C.</li>
            <li class="flex items-start gap-3"><svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <strong>Incluye:</strong> Dominio (.com) + Hosting + Correos corporativos.</li>
          </ul>

          <button 
            @click="$emit('checkout', 'Plan Web Corporativa SEO', '$75.00')"
            class="text-[0.745rem] w-full bg-[#D90036] hover:bg-[#B0002A] text-white font-bold py-4 px-6 rounded-xl shadow-[0_0_15px_rgba(217,0,54,0.4)] transform hover:-translate-y-1 transition-all duration-300"
          >
            EMPEZAR POR $75.00 AL TRIMESTRE
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
}
</style>