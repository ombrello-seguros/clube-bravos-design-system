import { BravosButton } from './BravosButton';
import { BravosProductCard } from './BravosProductCard';
import { BravosTestimonial } from './BravosTestimonial';
import { BravosContactForm } from './BravosContactForm';
import { BravosHeader } from './BravosHeader';
import { WhatsAppButton } from './WhatsAppButton';
import { Phone, Mail, Clock } from 'lucide-react';
import logoPrimary from "../../imports/Logo_Bravos_300.png";

export function BravosLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <BravosHeader />
      <WhatsAppButton />

      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                Venha fazer parte do <span className="text-[rgb(0,164,213)]">Clube Bravos</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                O Clube que conecta você aos benefícios com melhores custos e maiores vantagens!
              </p>
              <BravosButton variant="primary" size="lg">
                Quero fazer parte!
              </BravosButton>
            </div>
            <div className="relative">
              <div className="absolute -inset-8 bg-[rgb(0,164,213)]/10 rounded-full blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop"
                alt="Família feliz"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <svg className="w-full h-20 fill-[rgb(0,164,213)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 L1200,0 L1200,120 Q900,60 600,90 T0,120 Z"></path>
        </svg>
      </div>

      <section className="bg-[rgb(0,164,213)] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Nossos Produtos
          </h2>
        </div>
      </section>

      <div className="relative">
        <svg className="w-full h-20 fill-[rgb(0,164,213)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 Q300,120 600,60 T1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <BravosProductCard
              image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop"
              title="Seguro de Vida"
              description="Sua proteção e de todos os seus entes queridos em caso de morte ou invalidez."
              onLearnMore={() => console.log('Seguro de Vida')}
            />
            <BravosProductCard
              image="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop"
              title="Plano Dental"
              description="A saúde bucal de toda a sua família sem mensalidade e com a melhor cobertura."
              onLearnMore={() => console.log('Plano Dental')}
            />
            <BravosProductCard
              image="https://images.unsplash.com/photo-1563213126-a4273aed2016?w=400&h=300&fit=crop"
              title="Assistência 24h"
              description="Seu carro, residência ou pet com assistência completa inclusive auto e seguro."
              onLearnMore={() => console.log('Assistência 24h')}
            />
            <BravosProductCard
              image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop"
              title="Médico na tela"
              description="Fale com o médico a qualquer hora, em qualquer lugar por vídeo ou chat e sem família."
              onLearnMore={() => console.log('Médico na tela')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative">
              <div className="absolute -inset-4 bg-[rgb(255,193,7)] rounded-full blur-2xl opacity-20"></div>
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-8 border-[rgb(255,193,7)]">
                <img
                  src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&h=500&fit=crop"
                  alt="Família feliz"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                Como funciona <span className="text-[rgb(0,164,213)]">O Clube Bravos?</span>
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                O Clube Bravos de Benefícios é um clube diferenciado para você e toda sua família desfrutar
                diversos benefícios com custos bem mais baixos do que você pagaria se fosse contratar sozinho.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Você e sua família possuem a mais completa plataforma de benefícios.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Queremos te entregar a paz e alegria que você merece.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">Atendimento 24h por vídeo-chat para você e sua família em todo o território nacional.</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white py-16 -mx-6 px-6 rounded-2xl">
            <h3 className="text-3xl font-bold mb-12 text-center text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
              O que nossos clientes dizem
            </h3>
            <BravosTestimonial
              text="Não recusa cobertura nenhuma, as autorizações saem super rápido e nunca tenho dor de cabeça. O plano chegou na hora certa para mim. Contratei e graças a Deus é muito bom! Faço meu tratamento e indico sem medo nenhum."
              author="Charles Vinícius Brito"
              rating={5}
            />
          </div>
        </div>
      </section>

      <div className="relative">
        <svg className="w-full h-20 fill-[rgb(46,49,146)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 Q300,120 600,60 T1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <section className="bg-[rgb(46,49,146)] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                Fale com o <span className="text-[rgb(0,164,213)]">Clube Bravos</span>
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-[rgb(0,164,213)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-lg">Atendimento:</p>
                    <p className="text-white/80">2ª a 6ª das 9h às 17h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[rgb(0,164,213)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-lg">(21) 3195-0788</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-[rgb(0,164,213)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-lg">(21) 96841-4294</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-[rgb(0,164,213)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-lg">contato@clubebravos.com.br</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <BravosContactForm />
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/20 text-center">
            <img src={logoPrimary} alt="Clube Bravos" className="h-12 mx-auto mb-4 brightness-0 invert" />
            <p className="text-white/60 text-sm">
              Clube Bravos de Benefícios - Todos os direitos reservados
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
