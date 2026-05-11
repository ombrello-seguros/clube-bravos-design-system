import { BravosButton } from './components/BravosButton';
import { BravosCard } from './components/BravosCard';
import { BravosInput } from './components/BravosInput';
import { BravosBadge } from './components/BravosBadge';
import { BravosProductCard } from './components/BravosProductCard';
import { BravosTestimonial } from './components/BravosTestimonial';
import { BravosContactForm } from './components/BravosContactForm';
import { BravosHeader } from './components/BravosHeader';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BravosLandingPage } from './components/BravosLandingPage';
import { LogoTest } from './components/LogoTest';
import { Phone, Mail, Clock, Eye } from 'lucide-react';
import { useState } from 'react';
import logoPrimary from "../imports/Logo_Bravos_300.png";
import logoSecondary from "../imports/Logo_Bravos_secundaria_300_.png";

export default function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);

  if (showLandingPage) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowLandingPage(false)}
          className="fixed top-4 right-4 z-[60] bg-white text-gray-900 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
        >
          <Eye className="w-4 h-4" />
          Ver Design System
        </button>
        <BravosLandingPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <BravosHeader />
      <WhatsAppButton />

      <button
        onClick={() => setShowLandingPage(true)}
        className="fixed top-20 right-6 z-50 bg-[rgb(0,164,213)] text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium hover:scale-105"
      >
        <Eye className="w-4 h-4" />
        Ver Landing Page
      </button>

      <div className="relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-[rgb(0,164,213)]/10 text-[rgb(0,164,213)] rounded-full mb-6 text-sm font-medium">
                Design System
              </div>
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
      </div>

      <div className="relative">
        <svg className="w-full h-20 fill-[rgb(0,164,213)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 L1200,0 L1200,120 Q900,60 600,90 T0,120 Z"></path>
        </svg>
      </div>

      <div className="bg-[rgb(0,164,213)] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-12" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Nossos Produtos
          </h2>
        </div>
      </div>

      <div className="relative">
        <svg className="w-full h-20 fill-[rgb(0,164,213)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 Q300,120 600,60 T1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-16">
        <LogoTest />

        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Paleta de Cores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BravosCard>
              <div className="space-y-4">
                <div className="w-full h-32 rounded-lg bg-[rgb(0,164,213)] shadow-inner"></div>
                <div>
                  <h3 className="font-bold mb-2">Cyan Principal</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">RGB:</span> 0, 164, 213</p>
                    <p><span className="font-medium">CMYK:</span> 75, 10, 5, 5</p>
                    <p><span className="font-medium">Pantone:</span> 312 C</p>
                  </div>
                </div>
              </div>
            </BravosCard>

            <BravosCard>
              <div className="space-y-4">
                <div className="w-full h-32 rounded-lg bg-[rgb(157,157,156)] shadow-inner"></div>
                <div>
                  <h3 className="font-bold mb-2">Cinza Secundário</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">RGB:</span> 157, 157, 156</p>
                    <p><span className="font-medium">CMYK:</span> 0, 0, 0, 50</p>
                  </div>
                </div>
              </div>
            </BravosCard>

            <BravosCard>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-14 rounded bg-white border-2 border-gray-200"></div>
                  <div className="h-14 rounded bg-black"></div>
                  <div className="h-14 rounded bg-[rgb(51,188,229)]"></div>
                  <div className="h-14 rounded bg-[rgb(230,230,230)]"></div>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Cores Auxiliares</h3>
                  <p className="text-sm text-gray-600">
                    Branco, preto e variações do cyan e cinza para aplicações diversas
                  </p>
                </div>
              </div>
            </BravosCard>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Tipografia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BravosCard>
              <h3 className="font-bold mb-4">Poppins (Títulos)</h3>
              <div className="space-y-3">
                <p className="text-4xl" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>BRAVOS</p>
                <p className="text-2xl" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>DE BENEFÍCIOS</p>
                <p className="text-sm text-gray-600">
                  Fonte geométrica moderna, ideal para títulos e destaques
                </p>
              </div>
            </BravosCard>

            <BravosCard>
              <h3 className="font-bold mb-4">Arial (Corpo de Texto)</h3>
              <div className="space-y-3">
                <p className="text-base" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Regular, Italic, <strong>Bold</strong>, <strong><em>Bold Italic</em></strong>
                </p>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fonte corporativa para textos corridos, garantindo legibilidade em todas as aplicações.
                </p>
              </div>
            </BravosCard>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Logotipos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BravosCard>
              <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
                <img src={logoPrimary} alt="Logo Principal" className="h-32 mb-4" />
                <p className="text-sm text-gray-600">Logo Principal - Versão Vertical</p>
              </div>
            </BravosCard>

            <BravosCard>
              <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-lg">
                <img src={logoSecondary} alt="Logo Secundária" className="h-32 mb-4" />
                <p className="text-sm text-gray-600">Logo Secundária - Versão Horizontal</p>
              </div>
            </BravosCard>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Componentes
          </h2>

          <BravosCard className="mb-6">
            <h3 className="font-bold mb-6">Botões</h3>
            <div className="flex flex-wrap gap-4">
              <BravosButton variant="primary">Primário</BravosButton>
              <BravosButton variant="secondary">Secundário</BravosButton>
              <BravosButton variant="outline">Outline</BravosButton>
              <BravosButton variant="ghost">Ghost</BravosButton>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <BravosButton variant="primary" size="sm">Pequeno</BravosButton>
              <BravosButton variant="primary" size="md">Médio</BravosButton>
              <BravosButton variant="primary" size="lg">Grande</BravosButton>
            </div>
          </BravosCard>

          <BravosCard className="mb-6">
            <h3 className="font-bold mb-6">Campos de Entrada</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BravosInput label="Nome Completo" placeholder="Digite seu nome" />
              <BravosInput label="Email" type="email" placeholder="seu@email.com" />
              <BravosInput label="Telefone" placeholder="(00) 00000-0000" />
              <BravosInput label="Erro" error="Este campo é obrigatório" placeholder="Campo com erro" />
            </div>
          </BravosCard>

          <BravosCard className="mb-6">
            <h3 className="font-bold mb-6">Badges</h3>
            <div className="flex flex-wrap gap-3">
              <BravosBadge variant="primary">Novo</BravosBadge>
              <BravosBadge variant="secondary">Destaque</BravosBadge>
              <BravosBadge variant="gray">Informação</BravosBadge>
              <BravosBadge variant="primary">Benefício Premium</BravosBadge>
            </div>
          </BravosCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BravosCard>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[rgb(0,164,213)]/10 rounded-lg">
                  <svg className="w-8 h-8 text-[rgb(0,164,213)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-2">Card Padrão</h4>
                  <p className="text-sm text-gray-600">
                    Exemplo de card com ícone e conteúdo alinhado à esquerda
                  </p>
                </div>
              </div>
            </BravosCard>

            <BravosCard variant="highlight">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-2">Card Destaque</h4>
                  <p className="text-sm text-white/90">
                    Card com gradiente cyan para destacar conteúdo importante
                  </p>
                </div>
              </div>
            </BravosCard>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Sistema de Grid
          </h2>
          <BravosCard>
            <div className="grid grid-cols-12 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gradient-to-br from-[rgb(0,164,213)] to-[rgb(51,188,229)] rounded flex items-center justify-center text-white font-bold"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Sistema de 12 colunas responsivo com gaps consistentes
            </p>
          </BravosCard>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Espaçamento
          </h2>
          <BravosCard>
            <div className="space-y-4">
              {[4, 8, 16, 24, 32, 48, 64].map((space) => (
                <div key={space} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium text-gray-600">{space}px</div>
                  <div
                    className="h-8 bg-gradient-to-r from-[rgb(0,164,213)] to-[rgb(51,188,229)] rounded"
                    style={{ width: `${space}px` }}
                  ></div>
                </div>
              ))}
            </div>
          </BravosCard>
        </section>

        <section id="produtos" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Componentes do Site Oficial
          </h2>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
              Cards de Produtos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <BravosProductCard
                image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop"
                title="Seguro de Vida"
                description="Seu proteção e de todos os seus entes queridos em caso de morte ou invalidez."
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
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
              Como Funciona
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
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
                <h4 className="text-2xl font-bold mb-4 text-[rgb(0,164,213)]" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                  O Clube Bravos?
                </h4>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  O Clube Bravos de Benefícios é um clube diferenciado para você e toda sua família desfrutar diversos benefícios com custos bem mais baixos do que você pagaria se fosse contratar sozinho.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Você e sua família possuem a mais completa plataforma de benefícios.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Queremos te entregar a paz e alegria.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Atendimento 24h por vídeo-chat para você e sua família em todo o território nacional.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12 bg-gradient-to-br from-gray-50 to-white py-12 -mx-6 px-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
              Depoimentos
            </h3>
            <BravosTestimonial
              text="Não recusa cobertura nenhuma, as autorizações saem super rápido e nunca tenho dor de cabeça. O plano chegou na hora certa para mim. Contratei e graças a Deus é muito bom! Faço meu tratamento e indico sem medo nenhum."
              author="Charles Vinícius Brito"
              rating={5}
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
            Diretrizes de Uso
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BravosCard>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2 text-green-700">Fazer</h4>
                <p className="text-sm text-gray-600">
                  Manter proporções originais da marca e respeitar área de proteção
                </p>
              </div>
            </BravosCard>

            <BravosCard>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2 text-red-700">Não Fazer</h4>
                <p className="text-sm text-gray-600">
                  Nunca deformar, modificar elementos ou alterar cores da marca
                </p>
              </div>
            </BravosCard>

            <BravosCard>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[rgb(0,164,213)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="font-bold mb-2 text-[rgb(0,164,213)]">Tamanho Mínimo</h4>
                <p className="text-sm text-gray-600">
                  1cm de altura mínima para impressos
                </p>
              </div>
            </BravosCard>
          </div>
        </section>
      </div>

      <div className="relative">
        <svg className="w-full h-20 fill-[rgb(46,49,146)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 Q300,120 600,60 T1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="bg-[rgb(46,49,146)] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
                Fale com o <span className="text-[rgb(0,164,213)]">Clube Bravos</span>
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[rgb(0,164,213)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Atendimento:</p>
                    <p className="text-white/80">2ª a 6ª das 9h às 17h</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[rgb(0,164,213)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">(21) 3195-0788</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[rgb(0,164,213)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">(21) 96841-4294</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[rgb(0,164,213)] flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">contato@clubebravos.com.br</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <BravosContactForm />
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20 text-center">
            <img src={logoPrimary} alt="Clube Bravos" className="h-12 mx-auto mb-4 brightness-0 invert" />
            <p className="text-white/60 text-sm">
              Design System - Clube Bravos de Benefícios
            </p>
            <p className="text-white/40 text-xs mt-2">
              Manual da Marca © 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}