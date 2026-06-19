import { useState } from 'react';
import { BravosHeader } from './BravosHeader';
import { BravosHero } from './BravosHero';
import { BravosProductsSection } from './BravosProductsSection';
import { BravosHowItWorks } from './BravosHowItWorks';
import { BravosTestimonials } from './BravosTestimonials';
import { BravosFooter } from './BravosFooter';
import { BravosSignupSheet } from './BravosSignupSheet';
import { WhatsAppButton } from './WhatsAppButton';
import { WaveDown, WaveUp } from './Wave';

export function BravosLandingPage() {
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupPlan, setSignupPlan] = useState<string | null>(null);

  const openSignup = (plan?: string) => {
    setSignupPlan(plan ?? null);
    setSignupOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <BravosHeader onSignup={() => openSignup()} />
      <BravosHero onSignup={() => openSignup()} />

      <WaveDown color="rgb(0,164,213)" />
      <BravosProductsSection onSignup={openSignup} />
      <WaveUp color="rgb(0,164,213)" />

      <BravosHowItWorks />
      <BravosTestimonials />

      <WaveUp color="rgb(46,49,146)" />
      <BravosFooter onSignup={() => openSignup()} />

      <WhatsAppButton />

      <BravosSignupSheet open={signupOpen} plan={signupPlan} onClose={() => setSignupOpen(false)} />
    </div>
  );
}
