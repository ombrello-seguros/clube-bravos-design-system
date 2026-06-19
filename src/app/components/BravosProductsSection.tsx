import { useState } from 'react';
import { Shield, Smile, Car, Video, X, LucideIcon } from 'lucide-react';
import { BravosProductCard } from './BravosProductCard';

interface Product {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  icon: LucideIcon;
  detail: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'vida',
    title: 'Seguro de Vida',
    price: 'R$ 19,90/mês',
    description: 'Você protegido em vida, e sua família tranquila em qualquer situação.',
    image: 'linear-gradient(135deg,#fde68a 0%,#f59e0b 60%,#92400e 100%)',
    icon: Shield,
    detail: 'Cobertura por morte, invalidez por acidente e doenças graves. Contratação 100% online, sem carência.'
  },
  {
    id: 'dental',
    title: 'Plano Dental',
    price: 'R$ 29,90/mês',
    description: 'Três pacotes de coberturas sob medida para garantir o sorriso de toda a família.',
    image: 'linear-gradient(135deg,#bae6fd 0%,#0ea5e9 60%,#075985 100%)',
    icon: Smile,
    detail: 'Limpeza, restaurações, ortodontia e mais — rede credenciada em todo o Brasil.'
  },
  {
    id: 'assist',
    title: 'Assistências 24h',
    price: 'R$ 24,90/mês',
    description: 'Assistência residencial, reboque e assistência funeral familiar incluindo pais e sogros.',
    image: 'linear-gradient(135deg,#e9d5ff 0%,#a78bfa 60%,#4c1d95 100%)',
    icon: Car,
    detail: 'Chaveiro, encanador, eletricista, reboque, transporte e mais. Atendimento 24h em todo o território nacional.'
  },
  {
    id: 'medico',
    title: 'Médico na tela',
    price: 'R$ 14,90/mês',
    description: 'Atendimento médico ilimitado por clínico geral, por chat ou vídeo, 24h por dia.',
    image: 'linear-gradient(135deg,#bbf7d0 0%,#22c55e 60%,#14532d 100%)',
    icon: Video,
    detail: 'Sem agendamento, sem espera. Receita e atestado emitidos digitalmente.'
  }
];

interface BravosProductsSectionProps {
  onSignup?: (planId: string) => void;
}

export function BravosProductsSection({ onSignup }: BravosProductsSectionProps) {
  const [active, setActive] = useState<number | null>(null);
  const ActiveIcon = active !== null ? PRODUCTS[active].icon : null;

  return (
    <section id="produtos" className="bg-[rgb(0,164,213)] relative pt-2 px-6 md:px-8 pb-20">
      <h2
        className="text-center text-white text-[40px] font-bold mb-3"
        style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
      >
        Nossos Produtos
      </h2>
      <div className="h-1 w-16 bg-white mx-auto mb-10 rounded-sm" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PRODUCTS.map((p, i) => (
          <BravosProductCard
            key={p.id}
            imageBackground={p.image}
            title={p.title}
            price={p.price}
            description={p.description}
            active={active === i}
            onLearnMore={() => setActive(active === i ? null : i)}
            onSignup={() => onSignup?.(p.id)}
          />
        ))}
      </div>

      {active !== null && ActiveIcon && (
        <div className="max-w-[1200px] mx-auto mt-6 bg-white/10 border border-white/25 backdrop-blur-md rounded-xl px-6 py-5 text-white flex gap-4 items-start">
          <ActiveIcon className="w-7 h-7 text-white shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="mb-1.5 text-xl font-bold" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
              {PRODUCTS[active].title}
            </h4>
            <p className="text-white/90 text-sm leading-relaxed">{PRODUCTS[active].detail}</p>
          </div>
          <button onClick={() => setActive(null)} aria-label="Fechar" className="text-white p-1">
            <X className="w-[18px] h-[18px]" />
          </button>
        </div>
      )}
    </section>
  );
}
