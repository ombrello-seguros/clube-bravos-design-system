const BENEFITS = [
  'Acesso a plano odontológico, seguro de vida e assistência 24h por adesão para você e sua família.',
  'Contrate um ou mais planos, de acordo com a sua necessidade.',
  'Atendimento médico ilimitado por clínico geral via chat ou vídeo.',
  'Tudo isso com custos muito menores do que contratar individualmente.'
];

export function BravosHowItWorks() {
  return (
    <section id="sobre" className="bg-white py-20 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Yellow circle photo */}
        <div className="relative aspect-square">
          <div className="absolute -inset-4 bg-[rgb(255,193,7)] rounded-full blur-2xl opacity-[0.22]" />
          {/* ponytail: gradient placeholder mirrors the portal design — swap for a real photo when available */}
          <div
            className="relative w-full h-full rounded-full border-8 border-[rgb(255,193,7)] overflow-hidden"
            style={{ background: 'linear-gradient(160deg,#fcd34d 0%,#f59e0b 50%,#9a3412 100%)' }}
          />
        </div>

        <div>
          <p className="font-bold text-lg text-[#1a1a1a] mb-1.5">Como funciona</p>
          <h2
            className="text-[rgb(0,164,213)] text-[44px] font-extrabold leading-[1.05] mb-5"
            style={{ fontFamily: 'Poppins, Arial, sans-serif' }}
          >
            O Clube Bravos?
          </h2>
          <div className="h-1 w-16 bg-[rgb(0,164,213)] mb-6 rounded-sm" />

          <p className="text-gray-700 leading-relaxed mb-3.5">
            O Clube Bravos de Benefícios é um clube estruturado para proporcionar a você acesso a
            seguros e benefícios por um custo bem mais baixo do que você pagaria se fosse contratar sozinho.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            A gente conecta pessoas e empresas de todo o Brasil que querem se proteger e proteger suas
            famílias a planos de seguros e benefícios que atendem suas necessidades.
          </p>

          <p className="font-bold text-[#1a1a1a] mb-3">Ao fazer parte do Clube Bravos você:</p>
          <ul className="flex flex-col gap-2.5">
            {BENEFITS.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[rgb(0,164,213)] mt-2 shrink-0" />
                <span className="text-gray-700 leading-snug">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
