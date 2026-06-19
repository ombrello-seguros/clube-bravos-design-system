import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';
import { BravosButton } from './BravosButton';

interface BravosHeroProps {
  onSignup?: () => void;
  /** WhatsApp link for the secondary CTA. */
  whatsappUrl?: string;
}

export function BravosHero({
  onSignup,
  whatsappUrl = 'https://wa.me/5521968414294?text=' +
    encodeURIComponent('Olá! Gostaria de saber mais sobre o Clube Bravos.')
}: BravosHeroProps) {
  return (
    <section id="top" className="bg-white pt-14 px-6 md:px-8 pb-20 relative overflow-hidden">
      {/* subtle watermark monogram */}
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute -right-[4%] top-[8%] w-[540px] h-[540px] opacity-[0.08]"
        style={{ fill: 'none', stroke: 'rgb(0,164,213)', strokeWidth: 6 }}
      >
        <circle cx="50" cy="50" r="44" />
        <path d="M22 64 L50 30 L78 64 Z" />
      </svg>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
        <div>
          <div className="h-1 w-16 bg-[rgb(0,164,213)] mb-7 rounded-sm" />
          <p className="text-lg font-bold text-[#1a1a1a] mb-2.5">
            Venha fazer parte do Clube Bravos
          </p>
          <h1
            className="text-5xl font-bold text-[rgb(0,164,213)] leading-[1.1] tracking-tight mb-9"
            style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
          >
            O Clube que conecta você aos benefícios com melhores custos e maiores vantagens!
          </h1>
          <div className="flex gap-3.5 items-center flex-wrap">
            <BravosButton size="lg" onClick={onSignup}>
              Quero ser Bravos
              <ArrowRight className="w-[18px] h-[18px]" />
            </BravosButton>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 text-[rgb(46,49,146)] font-semibold text-[15px]"
            >
              <span className="w-9 h-9 rounded-full bg-[rgb(37,211,102)] inline-flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-[18px] h-[18px]" />
              </span>
              ou tire dúvidas no WhatsApp
            </a>
          </div>
          <p className="mt-[18px] text-gray-500 text-[13px] flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Contratação 100% online · sem corretor · sem ligação obrigatória
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 bg-[rgba(0,164,213,0.18)] rounded-full blur-[72px]" />
          {/* ponytail: gradient placeholder mirrors the portal design — swap for a real photo when available */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[5/4]"
            style={{ background: 'linear-gradient(160deg,#a5b4fc 0%,#60a5fa 35%,#0ea5e9 70%,#0369a1 100%)' }}
          />
        </div>
      </div>
    </section>
  );
}
