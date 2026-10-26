import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, 
  Wallet, 
  SearchX, 
  TrendingUp, 
  MousePointerClick, 
  MonitorSmartphone, 
  CalendarCheck, 
  CheckCircle2, 
  Star,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const phrase1 = "Posiciona tu negocio en Google y transforma tus visitas en ";
  const phrase2 = "clientes reales...";

  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  useEffect(() => {
    let timeout;
    if (text1.length < phrase1.length) {
      timeout = setTimeout(() => {
        setText1(phrase1.slice(0, text1.length + 1));
      }, 25);
    } else if (text2.length < phrase2.length) {
      timeout = setTimeout(() => {
        setText2(phrase2.slice(0, text2.length + 1));
      }, 70);
    }
    return () => clearTimeout(timeout);
  }, [text1, text2]);

  return (
    <div className="min-h-screen font-sans bg-[#ffffff] selection:bg-[#06f7be]/30 selection:text-[#242a36] overflow-hidden">
      
      {/* =========================================
          BLOQUE OSCURO TOP (Inspirado en la ref) 
          ========================================= */}
      <div className="relative bg-[#242a36] text-white">
        {/* Brillo Ambiental de Fondo (Aura Azul) */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#3f6299] rounded-full blur-[150px] opacity-50 pointer-events-none"></div>

        {/* HEADER SEMÁNTICO */}
        <header className="relative z-10 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="cursor-pointer hover:scale-105 transition-transform duration-300 block">
            <img 
              src="/logo.png" 
              alt="Logo Typos" 
              className="h-10 md:h-15 w-auto" 
            />
          </a>

          {/* Menú de navegación (Desktop) */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#problema" className="text-[0.75rem] font-bold uppercase tracking-widest text-white hover:text-[#06f7be] transition-colors">
              El Problema
            </a>
            <a href="#solucion" className="text-[0.75rem] font-bold uppercase tracking-widest text-white hover:text-[#06f7be] transition-colors">
              La Solución
            </a>
            <a href="#planes" className="text-[0.75rem] font-bold uppercase tracking-widest text-white hover:text-[#06f7be] transition-colors">
              Planes
            </a>
          </nav>

          {/* Botón CTA secundario (Oculto en móviles muy pequeños) */}
          <div className="hidden sm:block">
            <a 
              href="#planes" 
              className="inline-flex items-center justify-center px-6 py-2.5 text-[0.7rem] font-black tracking-widest text-[#242a36] uppercase bg-[#06f7be] rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(6,247,190,0.4)] transition-all duration-300"
            >
              Cotizar ahora
            </a>
          </div>
        </header>

        {/* SECCIÓN 1: HERO (Above the Fold) */}
        <section className="max-w-8xl pt-5 mx-auto flex justify-center">
          {/* Pre-Headline / Cebo (Estilo Tag de la imagen de referencia) */}
          <div className="z-1000 px-4 py-2 uppercase text-[0.65rem] md:text-[0.6rem] font-bold tracking-widest text-[#000000] border border-[#ffffff] bg-[#ffffff] rounded-full">
            Para empresas que quieren aparecer en Google y cerrar más ventas sin pagar miles de dólares ni mensualidades eternas
          </div>
        </section>
        <section className="relative z-10 pt-5 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* COLUMNA IZQUIERDA: Textos y Botón */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

              {/* H1 Principal (Tipografía Black y Uppercase parcial) con Efecto Typewriter */}
              <h1 className="text-[2rem] md:text-[2.2rem] font-black tracking-tight text-white mb-6 leading-[1.1] uppercase min-h-[140px] md:min-h-[110px]">
                {text1}
                {text1.length < phrase1.length && (
                  <span className="animate-pulse font-light text-[#06f7be]">|</span>
                )}
                {text1.length === phrase1.length && (
                  <span className="bg-[#ffffff] text-[#242a36] px-2 rounded-lg inline-block mt-1">
                    {text2}
                    <span className="animate-pulse font-light text-[#06f7be] ml-1">|</span>
                  </span>
                )}
              </h1>

              {/* Subtítulo */}
              <p className="text-[0.9rem] md:text-[0.9rem] text-[#ffffff]/80 mb-10 max-w-xl leading-relaxed font-medium">
                Por un único pago anual desde $150. En Typos creamos tu página web atractiva, rápida y con estructura SEO lista para facturar. Incluye 1 año completo de Hosting y Dominio (.com) sin cobros sorpresa.
              </p>

              {/* Botón de Acción Hero (Forma de píldora, estilo de la referencia) */}
              <a 
                href="#planes" 
                className="inline-flex items-center justify-center px-8 py-5 text-[0.8rem] sm:text-[1rem] font-black tracking-wide text-[#242a36] uppercase transition-all duration-300 bg-[#06f7be] rounded-full shadow-[0_0_30px_rgba(6,247,190,0.3)] hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 focus:outline-none"
                aria-label="Ver planes de pago único"
              >
                VER PLANES DE PAGO ÚNICO ($150 Y $300)
                <ChevronRight className="w-5 h-5 ml-2" />
              </a>
            </div>

            {/* COLUMNA DERECHA: Reproductor VSL */}
            <div className="w-full max-w-xl mx-auto lg:max-w-none relative group">
              {/* Sombra decorativa trasera */}
              <div className="absolute inset-0 bg-[#06f7be] rounded-[2rem] transform translate-x-4 translate-y-4 opacity-20 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
              
              <div className="relative w-full overflow-hidden bg-[#242a36] rounded-[2rem] shadow-2xl aspect-video cursor-pointer border border-white/10 z-10">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#3f6299]/60 to-[#242a36]/90 transition-opacity duration-500 group-hover:opacity-80"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <div className="bg-[#06f7be] p-4 rounded-full shadow-[0_0_30px_rgba(6,247,190,0.5)]">
                    <PlayCircle className="w-12 h-12 text-[#242a36] fill-[#06f7be]" />
                  </div>
                </div>
              </div>
              <p className="mt-6 font-medium text-white uppercase text-[0.6rem] ps-5 pb-4 sm:text-[0.5rem] text-center max-w-xl mx-auto">
                <span className="z-1000 text-[#ffffff] font-bold">🔊 Activa el sonido:</span> Descubre por qué nuestras webs sí posicionan en Google y cómo tener la tuya llave en mano.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================
          CONTENIDO CLARO (Con orbes de fondo) 
          ========================================= */}
      <main className="relative z-10">
        {/* Brillos Ambientales Fondo Blanco */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#3f6299] rounded-full blur-[150px] opacity-[0.07] pointer-events-none"></div>
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#149674] rounded-full blur-[150px] opacity-[0.05] pointer-events-none"></div>

        {/* SECCIÓN 2: AGITACIÓN DEL PROBLEMA */}
        <section id="problema" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Título alineado a la izquierda (Estilo Editorial) */}
              <div className="lg:col-span-5 text-left">
                <h2 className="text-[2.2rem] md:text-[2.5rem] font-black text-[#242a36] mb-6 leading-[1.1] uppercase">
                  ¿Por qué la mayoría de las empresas <span className="text-[#3f6299]">tiran su dinero</span> cuando contratan una página web?
                </h2>
                <p className="text-[0.9rem] md:text-[0.8rem] text-[#242a36]/70 leading-relaxed font-medium">
                  Cuando un negocio decide digitalizarse de forma profesional, suele chocar con dos grandes obstáculos:
                </p>
              </div>

              {/* Tarjetas a la derecha */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                {/* Tarjeta Problema 1 */}
                <div className="bg-[#ffffff] p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(36,42,54,0.06)] border border-[#242a36]/5 animate-[float_6s_ease-in-out_infinite] hover:shadow-[0_30px_60px_rgba(36,42,54,0.12)] transition-shadow duration-300">
                  <div className="w-16 h-16 bg-[#149674]/10 rounded-2xl flex items-center justify-center mb-8">
                    <Wallet className="w-8 h-8 text-[#149674]" />
                  </div>
                  <h3 className="text-[1rem] font-black text-[#242a36] mb-4 uppercase">Presupuestos inflados y cobros ocultos</h3>
                  <p className="text-[#242a36]/70 leading-relaxed text-[0.8rem]">
                    Las agencias tradicionales te piden entre $600 y $1,200 dólares solo por el diseño, y luego te obligan a pagar aparte el servidor, el dominio y la configuración básica en Google.
                  </p>
                </div>

                {/* Tarjeta Problema 2 */}
                <div className="bg-[#ffffff] p-10 rounded-[2rem] shadow-[0_20px_50px_rgba(36,42,54,0.06)] border border-[#242a36]/5 sm:mt-12 animate-[float_7s_ease-in-out_infinite] hover:shadow-[0_30px_60px_rgba(36,42,54,0.12)] transition-shadow duration-300">
                  <div className="w-16 h-16 bg-[#3f6299]/10 rounded-2xl flex items-center justify-center mb-8">
                    <SearchX className="w-8 h-8 text-[#3f6299]" />
                  </div>
                  <h3 className="text-[1rem] font-black text-[#242a36] mb-4 uppercase">Páginas estáticas que nadie encuentra</h3>
                  <p className="text-[#242a36]/70 leading-relaxed text-[0.8rem]">
                    Te entregan un sitio que parece un folleto digital sin estructura SEO (no aparece cuando alguien busca tus servicios en Google) y sin psicología de ventas para llevar clientes a tu WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3 Y 4: MECANISMO DE RESULTADOS */}
        <section id="solucion" className="pt-20 pb-30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h2 className="text-[2.2rem] md:text-[2.5rem] font-black text-[#242a36] leading-[1.1] uppercase">
                Un sistema digital diseñado con un solo propósito: <br/><span className="text-[#149674]">generar alcance en Google y ventas.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="relative flex flex-col items-start p-8 bg-[#ffffff] rounded-[2rem] shadow-[0_10px_30px_rgba(36,42,54,0.03)] border border-[#242a36]/5 hover:shadow-[0_20px_50px_rgba(63,98,153,0.12)] hover:-translate-y-2 transition-all duration-300 group cursor-default overflow-hidden">
                {/* Brillo interior decorativo (Aparece al hacer hover) */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06f7be]/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3f6299]/10 mb-6 group-hover:bg-[#3f6299] transition-colors duration-300">
                  <TrendingUp className="w-8 h-8 text-[#3f6299] group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="relative z-10 text-[1rem] font-black text-[#242a36] mb-3 uppercase tracking-wide group-hover:text-[#3f6299] transition-colors duration-300">
                  1. Alcance Real SEO
                </h3>
                <p className="relative z-10 text-[#242a36]/70 leading-relaxed text-[0.85rem]">
                  Optimizamos títulos, metadescripciones, estructura de encabezados y velocidad de carga para que Google indexe tu empresa y tus clientes potenciales te encuentren.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="relative flex flex-col items-start p-8 bg-[#ffffff] rounded-[2rem] shadow-[0_10px_30px_rgba(36,42,54,0.03)] border border-[#242a36]/5 hover:shadow-[0_20px_50px_rgba(63,98,153,0.12)] hover:-translate-y-2 transition-all duration-300 group cursor-default overflow-hidden">
                {/* Brillo interior decorativo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06f7be]/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3f6299]/10 mb-6 group-hover:bg-[#3f6299] transition-colors duration-300">
                  <MousePointerClick className="w-8 h-8 text-[#3f6299] group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="relative z-10 text-[1rem] font-black text-[#242a36] mb-3 uppercase tracking-wide group-hover:text-[#3f6299] transition-colors duration-300">
                  2. Arq. de Conversión
                </h3>
                <p className="relative z-10 text-[#242a36]/70 leading-relaxed text-[0.85rem]">
                  Cada sección está escrita y ordenada para derribar objeciones, generar autoridad inmediata y guiar el visitante directo a tocar el botón de contacto o WhatsApp.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="relative flex flex-col items-start p-8 bg-[#ffffff] rounded-[2rem] shadow-[0_10px_30px_rgba(36,42,54,0.03)] border border-[#242a36]/5 hover:shadow-[0_20px_50px_rgba(63,98,153,0.12)] hover:-translate-y-2 transition-all duration-300 group cursor-default overflow-hidden">
                {/* Brillo interior decorativo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06f7be]/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3f6299]/10 mb-6 group-hover:bg-[#3f6299] transition-colors duration-300">
                  <MonitorSmartphone className="w-8 h-8 text-[#3f6299] group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="relative z-10 text-[1rem] font-black text-[#242a36] mb-3 uppercase tracking-wide group-hover:text-[#3f6299] transition-colors duration-300">
                  3. Estética Adaptable
                </h3>
                <p className="relative z-10 text-[#242a36]/70 leading-relaxed text-[0.85rem]">
                  Diseño visual limpio, atractivo y 100% adaptable a celulares, tablets y computadoras. Tu empresa proyectará solidez y confianza desde el primer segundo.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="relative flex flex-col items-start p-8 bg-[#ffffff] rounded-[2rem] shadow-[0_10px_30px_rgba(36,42,54,0.03)] border border-[#242a36]/5 hover:shadow-[0_20px_50px_rgba(63,98,153,0.12)] hover:-translate-y-2 transition-all duration-300 group cursor-default overflow-hidden">
                {/* Brillo interior decorativo */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#06f7be]/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3f6299]/10 mb-6 group-hover:bg-[#3f6299] transition-colors duration-300">
                  <CalendarCheck className="w-8 h-8 text-[#3f6299] group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
                <h3 className="relative z-10 text-[1rem] font-black text-[#242a36] mb-3 uppercase tracking-wide group-hover:text-[#3f6299] transition-colors duration-300">
                  4. Todo Incluido
                </h3>
                <p className="relative z-10 text-[#242a36]/70 leading-relaxed text-[0.85rem]">
                  Olvidate de lidiar con proveedores técnicos. Tu pago único incluye el registro de tu dominio (.com), certificado de seguridad SSL y alojamiento web de alta velocidad por 1 año.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 5: TABLA DE INVERSIÓN (PAGO ÚNICO) */}
        <section id="planes" className="py-32 bg-[#242a36] relative overflow-hidden">
          {/* Brillo gigante central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#3f6299] rounded-full blur-[200px] opacity-40 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-5xl mx-auto mb-20">
              <h2 className="text-[2rem] md:text-[2.5rem] font-black text-[#ffffff] leading-[1.1] uppercase">
                Sin letras pequeñas ni mensualidades.<br /> <span className="text-[#06f7be]">Haz un solo pago y sé dueño de tu web.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
              
              {/* Plan 1: Landing Page */}
              <div className="bg-[#ffffff] rounded-[2.5rem] p-10 shadow-xl border border-transparent">
                <div className="mb-8 border-b border-[#242a36]/10 pb-8">
                  <h3 className="text-[1rem] font-black text-[#3f6299] uppercase tracking-widest mb-4">LANDING PAGE DE VENTAS</h3>
                  <div className=" flex items-baseline text-[3rem] md:text-[4.5rem] font-black text-[#242a36] leading-none">
                    $150 <span className="ml-2 text-[1rem] font-bold text-[#242a36]/50">USD</span>
                  </div>
                  <p className="text-[0.7rem] md:text-[0.8rem] text-[#242a36]/50 font-bold uppercase tracking-widest mt-2">/ Pago Único</p>
                  <div className="mt-6 inline-block px-4 py-2 bg-[#242a36]/5 rounded-lg border border-[#242a36]/10">
                    <p className="text-[#242a36] font-bold text-[0.7rem] md:text-[0.8rem] uppercase">
                      Todo incluido por 1 año (365 días)
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-5 mb-10" aria-label="Características del plan Landing Page">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#149674] mr-4 shrink-0" />
                    <span className="text-[#242a36]/80 text-[0.9rem] leading-relaxed"><strong>Enfoque:</strong> Captación masiva de prospectos y venta directa de un servicio o producto principal.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#149674] mr-4 shrink-0" />
                    <span className="text-[#242a36]/80 text-[0.9rem] leading-relaxed">Diseño de 1 página larga estructurada como embudo de ventas.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#149674] mr-4 shrink-0" />
                    <span className="text-[#242a36]/80 text-[0.9rem] leading-relaxed">Configuración SEO base para aparecer en Google.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#149674] mr-4 shrink-0" />
                    <span className="text-[#242a36]/80 text-[0.9rem] leading-relaxed">Integración directa a WhatsApp y redes sociales.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#149674] mr-4 shrink-0" />
                    <span className="text-[#242a36]/80 text-[0.9rem] leading-relaxed"><strong>Incluye:</strong> Dominio (.com) + Hosting por 12 meses.</span>
                  </li>
                </ul>

                <button 
                  className="w-full py-5 px-6 rounded-full font-black tracking-wide uppercase text-[#ffffff] bg-[#242a36] hover:bg-[#3f6299] transition-colors duration-300"
                  aria-label="Contratar Landing Page por 150 dólares"
                >
                  CONTRATAR POR $150
                </button>
              </div>

              {/* Plan 2: Web Corporativa SEO (Destacado) */}
              <div className="bg-[#3f6299] rounded-[2.5rem] p-10 shadow-2xl relative border border-[#3f6299] transform md:scale-105">
                
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <span className="bg-[#06f7be] text-[#242a36] text-[0.6rem] md:text-[0.7rem] font-black uppercase tracking-widest py-2 px-6 rounded-full shadow-[0_0_20px_rgba(6,247,190,0.5)] flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" /> MÁS POPULAR
                  </span>
                </div>

                <div className="mb-8 border-b border-white/20 pb-8 mt-2">
                  <h3 className="text-[1rem] font-black text-[#06f7be] uppercase tracking-widest mb-4">
                    WEB CORPORATIVA SEO
                  </h3>
                  <div className="flex items-baseline text-[3rem] md:text-[4.5rem] font-black text-[#ffffff] leading-none">
                    $300 <span className="ml-2 text-[1rem] font-bold text-[#ffffff]/50">USD</span>
                  </div>
                  <p className="text-[0.7rem] md:text-[0.8rem] text-[#ffffff]/50 font-bold uppercase tracking-widest mt-2">/ Pago Único</p>
                  <div className="mt-6 inline-block px-4 py-2 bg-[#06f7be]/20 rounded-lg border border-[#06f7be]/30">
                    <p className="text-[#ffffff] font-bold text-[0.7rem] md:text-[0.8rem] uppercase">
                      Todo incluido por 1 año (365 días)
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-5 mb-10" aria-label="Características del plan Web Corporativa">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#06f7be] mr-4 shrink-0" />
                    <span className="text-[#ffffff]/90 text-[0.9rem] leading-relaxed"><strong>Enfoque:</strong> Empresas que buscan posicionarse en Google con múltiples servicios y alta autoridad.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#06f7be] mr-4 shrink-0" />
                    <span className="text-[#ffffff]/90 text-[0.9rem] leading-relaxed">Sitio multipágina completo (Inicio, Nosotros, Servicios, Proyectos, Contacto).</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#06f7be] mr-4 shrink-0" />
                    <span className="text-[#ffffff]/90 text-[0.9rem] leading-relaxed">Optimización SEO avanzada en cada sección para mayor alcance.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#06f7be] mr-4 shrink-0" />
                    <span className="text-[#ffffff]/90 text-[0.9rem] leading-relaxed">Diseño persuasivo enfocado en cerrar clientes empresariales.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#06f7be] mr-4 shrink-0" />
                    <span className="text-[#ffffff]/90 text-[0.9rem] leading-relaxed"><strong>Incluye:</strong> Dominio (.com) + Hosting + Correos por 12 meses.</span>
                  </li>
                </ul>

                <button 
                  className="w-full py-5 px-6 rounded-full font-black tracking-wide uppercase text-[#242a36] bg-[#06f7be] hover:bg-white shadow-[0_0_20px_rgba(6,247,190,0.3)] transition-all duration-300"
                  aria-label="Contratar Web Corporativa por 300 dólares"
                >
                  CONTRATAR POR $300
                </button>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SEMÁNTICO */}
      <footer className="py-12 bg-[#242a36] text-center border-t border-[#ffffff]/5">
        <a href="/" className="inline-block cursor-pointer">
          <img 
            src="/logo.png" 
            alt="Logo Typos" 
            className="h-10 md:h-15 w-auto mx-auto mb-6 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300" 
          />
        </a>
        <p className="text-[#ffffff]/40 text-[0.8rem] uppercase font-bold tracking-widest mt-4">
          © {new Date().getFullYear()} Typos. Todos los derechos reservados. <br className="md:hidden" /> Pago único sin compromisos a largo plazo.
        </p>
      </footer>

      {/* Estilos globales para la animación de brillo (Shimmer) y flotación */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}} />
    </div>
  );
}