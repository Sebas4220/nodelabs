import { createApp } from 'vue'
import './style.css' // <-- Esta línea conecta Tailwind con tu app
import App from './App.vue'

// 1. Importamos la función de analíticas
import { initAnalytics } from './analytics.js'

// 2. Ejecutamos la inyección antes de montar la app
initAnalytics()

createApp(App).mount('#app')