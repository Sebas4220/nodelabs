// src/analytics.js

export function initAnalytics() {
  // 1. Apagado en desarrollo para no arruinar tus métricas
  if (import.meta.env.MODE !== 'production') {
    console.log('Modo Desarrollo: Analíticas de Google y Meta desactivadas.');
    return;
  }

  // REEMPLAZA ESTOS IDs CON TUS CÓDIGOS REALES CUANDO LOS TENGAS
  const GTM_ID = 'G-XXXXXXXXXX'; 
  const PIXEL_ID = 'XXXXXXXXXXXXXXXX'; 

  // ==========================================
  // INYECCIÓN DE GOOGLE ANALYTICS (GA4)
  // ==========================================
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag; 
  
  gtag('js', new Date());
  gtag('config', GTM_ID);

  // ==========================================
  // INYECCIÓN DE META PIXEL
  // ==========================================
  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  
  window.fbq = fbq; 
  fbq('init', PIXEL_ID);
  
  // Rastrea la visita inicial
  fbq('track', 'PageView'); 
}