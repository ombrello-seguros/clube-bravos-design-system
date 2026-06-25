import { Clock, MessageCircle, Phone, Mail, Zap, ArrowRight } from 'lucide-react';
import logo from "../../imports/Logo_Bravos_secundaria_300_.png";

interface BravosFooterProps {
  onSignup?: () => void;
  whatsappUrl?: string;
}

export function BravosFooter({
  onSignup,
  whatsappUrl = 'https://wa.me/5521968414294?text=' +
    encodeURIComponent('Olá! Gostaria de saber mais sobre o Clube Bravos.')
}: BravosFooterProps) {
  return (
    <footer id="contato" className="bg-bravos-purple text-white pt-[72px] px-6 md:px-8 pb-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: contact info */}
        <div>
          <p className="mb-1.5 font-medium text-lg opacity-85">Fale com o</p>
          <h2
            className="text-bravos-cyan text-[44px] font-extrabold leading-none mb-8"
            style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
          >
            Clube Bravos
          </h2>

          <p className="text-white/85 leading-relaxed mb-7 text-[15px]">
            Estamos no <b>WhatsApp</b> — é onde respondemos mais rápido. Toda contratação é{' '}
            <b>100% online</b>, sem ligação obrigatória.
          </p>

          <ul className="flex flex-col gap-3.5">
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-bravos-cyan" />
              <span className="font-medium">Atendimento 2ª a 6ª, das 9h às 17h</span>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-bravos-cyan" />
              <span className="font-bold">(21) 96841-4294</span>
              <span className="text-xs opacity-60">WhatsApp</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-bravos-cyan" />
              <span className="font-bold">(21) 3195-0788</span>
              <span className="text-xs opacity-60">Central</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-bravos-cyan" />
              <span className="font-medium">contato@clubebravos.com.br</span>
            </li>
          </ul>
        </div>

        {/* RIGHT: WhatsApp-first action card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.18] p-8 pb-7 bg-gradient-to-b from-white/[0.06] to-white/[0.02]">
          <div className="absolute -right-7 -top-7 w-40 h-40 rounded-full bg-[rgba(37,211,102,0.16)] blur-[8px]" />

          <div className="relative flex items-center gap-3.5 mb-4">
            <span className="w-12 h-12 rounded-full bg-bravos-green inline-flex items-center justify-center shrink-0 shadow-[0_8px_18px_rgba(37,211,102,0.45)]">
              <MessageCircle className="w-6 h-6 text-white" />
            </span>
            <div>
              <p className="m-0 text-xs uppercase tracking-[0.08em] text-white/70 font-semibold">
                Nosso canal principal
              </p>
              <h3 className="mt-0.5 text-[22px] font-bold" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                Fale com a gente no WhatsApp
              </h3>
            </div>
          </div>

          <p className="text-white/80 leading-snug mb-5 text-sm relative">
            Dúvidas, atendimento e suporte são todos pelo WhatsApp — resposta real, sem robô, dentro do
            horário de atendimento.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 bg-bravos-green text-white px-6 py-3.5 rounded-lg font-bold text-base shadow-[0_8px_22px_rgba(37,211,102,0.35)] relative"
          >
            <MessageCircle className="w-[18px] h-[18px]" />
            Abrir WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="mt-5 pt-5 border-t border-white/[0.14] flex items-center gap-3.5 relative">
            <Zap className="w-5 h-5 text-bravos-yellow" />
            <div className="flex-1">
              <p className="m-0 font-bold text-sm">Quer contratar agora?</p>
              <p className="mt-0.5 text-white/70 text-[13px]">Faça você mesmo — leva 2 minutos.</p>
            </div>
            <button
              onClick={onSignup}
              className="bg-transparent text-white border-[1.5px] border-white/40 px-4 py-2.5 rounded-lg font-semibold text-sm inline-flex items-center gap-1.5"
            >
              Quero ser Bravos
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-14 pt-6 border-t border-white/[0.18] flex items-center justify-between gap-6">
        <img src={logo} alt="Clube Bravos" className="h-9 brightness-0 invert" />
        <p className="text-white/60 m-0 text-[13px]">
          © 2026 Clube Bravos de Benefícios — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
