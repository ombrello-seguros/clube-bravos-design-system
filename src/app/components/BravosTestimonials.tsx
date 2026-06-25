import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialItem {
  heading: string;
  text: string;
  author: string;
  rating?: number;
}

const DEFAULT_ITEMS: TestimonialItem[] = [
  {
    heading: 'O plano odontológico funciona super bem!',
    text: 'Não recusa cobertura nenhuma, as autorizações saem super rápido e nunca tenho dor de cabeça. O plano chegou na hora certa para mim. Contratei e graças a Deus é muito bom! Faço meu tratamento e indico sem medo nenhum.',
    author: 'Charles Vinícius Brito',
    rating: 5
  },
  {
    heading: 'Atendimento médico que resolve',
    text: 'Já usei o Médico na tela três vezes — em todas, em menos de 15 minutos estava com um clínico no celular. Recebi receita por e-mail e fui direto à farmácia. Vale cada centavo.',
    author: 'Renata Oliveira',
    rating: 5
  },
  {
    heading: 'Cobertura completa, sem surpresa',
    text: 'Contratei o seguro de vida e a assistência 24h juntos. Quando precisei chamar um reboque foi rápido e cordial. Recomendo para qualquer família que queira tranquilidade.',
    author: 'Marcos Andrade',
    rating: 5
  }
];

interface BravosTestimonialsProps {
  items?: TestimonialItem[];
}

export function BravosTestimonials({ items = DEFAULT_ITEMS }: BravosTestimonialsProps) {
  const [idx, setIdx] = useState(0);
  const t = items[idx];
  const go = (d: number) => setIdx((idx + d + items.length) % items.length);

  return (
    <section id="depoimentos" className="py-20 pb-24 px-6 md:px-8 bg-gradient-to-b from-[#fafafa] to-white">
      <div className="max-w-[980px] mx-auto relative text-center">
        <div className="h-1 w-16 bg-bravos-cyan mx-auto mb-6 rounded-sm" />
        <h2
          className="text-[#1a1a1a] text-[22px] font-bold mb-7"
          style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
        >
          {t.heading}
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="w-10 h-10 rounded-full text-gray-500 flex items-center justify-center shrink-0 hover:bg-black/5"
          >
            <ChevronLeft className="w-[22px] h-[22px]" />
          </button>

          <p className="flex-1 text-base leading-relaxed text-gray-600">{t.text}</p>

          <button
            onClick={() => go(1)}
            aria-label="Próximo"
            className="w-10 h-10 rounded-full text-gray-500 flex items-center justify-center shrink-0 hover:bg-black/5"
          >
            <ChevronRight className="w-[22px] h-[22px]" />
          </button>
        </div>

        <div className="mt-6 font-bold text-[#1a1a1a]" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
          {t.author}
        </div>
        <div className="flex gap-1 justify-center mt-2.5">
          {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-bravos-yellow text-bravos-yellow" />
          ))}
        </div>

        <div className="flex gap-2 justify-center mt-[22px]">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Depoimento ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === idx ? 'bg-bravos-cyan' : 'bg-bravos-gray-light'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
