// Componentes principais
export { BravosButton } from './app/components/BravosButton';
export { BravosCard } from './app/components/BravosCard';
export { BravosInput } from './app/components/BravosInput';
export { BravosBadge } from './app/components/BravosBadge';
export { BravosProductCard } from './app/components/BravosProductCard';
export { BravosTestimonial } from './app/components/BravosTestimonial';
export { BravosContactForm } from './app/components/BravosContactForm';
export { BravosHeader } from './app/components/BravosHeader';
export { WhatsAppButton } from './app/components/WhatsAppButton';
export { WaveSection } from './app/components/WaveSection';

// Seções de página (novas — recriação do site)
export { BravosHero } from './app/components/BravosHero';
export { BravosProductsSection } from './app/components/BravosProductsSection';
export { BravosHowItWorks } from './app/components/BravosHowItWorks';
export { BravosTestimonials } from './app/components/BravosTestimonials';
export { BravosFooter } from './app/components/BravosFooter';
export { BravosSignupSheet } from './app/components/BravosSignupSheet';
export { WaveDown, WaveUp } from './app/components/Wave';

// Tipos TypeScript (se necessário)
export type { ButtonHTMLAttributes } from 'react';

// Re-exportar logos como assets
export { default as LogoBravosPrimary300 } from './imports/Logo_Bravos_300.png';
export { default as LogoBravosPrimary72 } from './imports/Logo_Bravos_72_.png';
export { default as LogoBravosSecondary300 } from './imports/Logo_Bravos_secundaria_300_.png';
export { default as LogoBravosSecondary72 } from './imports/Logo_Bravos_secundaria_72_.png';

// Estilos - usuários podem importar assim:
// import '@clubebravos/design-system/styles'
// import '@clubebravos/design-system/fonts'
