<script setup>
import { ref } from 'vue'

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
</script>

<template>
  <section class="py-16 px-4 max-w-3xl mx-auto">
    <h2 class="text-[2rem] font-bold mb-8 text-center">Respuestas a tus dudas antes de empezar</h2>
    <div class="space-y-4">
      <div v-for="(faq, index) in faqs" :key="index" class="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden transition-all duration-300">
        <button @click="toggleFaq(index)" class="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-[#FF1E56]" :aria-expanded="faq.isOpen">
          <span class="font-semibold text-[1rem] text-gray-200">{{ faq.question }}</span>
          <svg class="w-5 h-5 text-[#FF1E56] transform transition-transform duration-300" :class="{'rotate-180': faq.isOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
        <!-- CAMBIO: v-show reemplazado por v-if para evitar carga de DOM innecesaria -->
        <div v-if="faq.isOpen" class="px-6 pb-5 text-gray-300 text-[0.75rem] leading-relaxed border-t border-white/5 pt-4">
          {{ faq.answer }}
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