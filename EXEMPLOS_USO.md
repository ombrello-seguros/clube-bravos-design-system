# Exemplos de Uso - Design System Clube Bravos

## 🚀 Início Rápido

### Modo 1: Ver Design System Completo

O aplicativo mostra por padrão todos os componentes do design system com exemplos visuais.

### Modo 2: Ver Landing Page (Estilo Site Oficial)

Clique no botão **"Ver Landing Page"** no canto superior direito para visualizar uma página completa inspirada no site clubebravos.com.br

## 📋 Exemplos de Componentes

### 1. Botões

```tsx
import { BravosButton } from './components/BravosButton';

// Botão primário (cyan)
<BravosButton variant="primary" size="md">
  Clique aqui
</BravosButton>

// Botão secundário (cinza claro)
<BravosButton variant="secondary" size="lg">
  Saiba mais
</BravosButton>

// Botão outline (borda cyan)
<BravosButton variant="outline">
  Cancelar
</BravosButton>

// Botão ghost (apenas texto)
<BravosButton variant="ghost" size="sm">
  Voltar
</BravosButton>
```

### 2. Cards de Produto

```tsx
import { BravosProductCard } from './components/BravosProductCard';

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <BravosProductCard
    image="url-da-imagem"
    title="Seguro de Vida"
    description="Sua proteção completa"
    onLearnMore={() => router.push('/produtos/seguro-vida')}
  />
</div>
```

### 3. Formulário de Contato

```tsx
import { BravosContactForm } from './components/BravosContactForm';

// Formulário completo pronto para usar
<BravosContactForm />

// Personalizar submit
<BravosContactForm onSubmit={(data) => {
  // Enviar para API
  fetch('/api/contato', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}} />
```

### 4. Depoimentos

```tsx
import { BravosTestimonial } from './components/BravosTestimonial';

<BravosTestimonial
  text="Excelente serviço!"
  author="João Silva"
  rating={5}
/>

// Com carrossel
import { Carousel } from 'react-slick';

const depoimentos = [
  { text: "...", author: "João", rating: 5 },
  { text: "...", author: "Maria", rating: 5 },
];

<Carousel autoplay>
  {depoimentos.map((dep, i) => (
    <BravosTestimonial key={i} {...dep} />
  ))}
</Carousel>
```

### 5. Header com Navegação

```tsx
import { BravosHeader } from './components/BravosHeader';

// Header fixo no topo
<BravosHeader />

// Customizar links (editar o componente)
const navItems = [
  { label: 'Início', href: '#home' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Contato', href: '#contato' }
];
```

### 6. WhatsApp Flutuante

```tsx
import { WhatsAppButton } from './components/WhatsAppButton';

// Padrão (usa número do Clube Bravos)
<WhatsAppButton />

// Customizado
<WhatsAppButton 
  phoneNumber="5521999999999"
  message="Olá! Vi seu site e gostaria de mais informações."
/>
```

### 7. Campos de Entrada

```tsx
import { BravosInput } from './components/BravosInput';

<BravosInput 
  label="Nome Completo"
  placeholder="Digite seu nome"
  required
/>

<BravosInput 
  label="Email"
  type="email"
  error="Email inválido"
/>
```

### 8. Badges

```tsx
import { BravosBadge } from './components/BravosBadge';

<BravosBadge variant="primary">Novo</BravosBadge>
<BravosBadge variant="secondary">Destaque</BravosBadge>
<BravosBadge variant="gray">Em breve</BravosBadge>
```

### 9. Seção com Ondas SVG

```tsx
import { WaveSection } from './components/WaveSection';

<WaveSection
  backgroundColor="rgb(0, 164, 213)"
  waveColor="rgb(0, 164, 213)"
  wavePosition="both"
>
  <div className="container mx-auto px-6">
    <h2 className="text-white text-center">Nossos Produtos</h2>
  </div>
</WaveSection>
```

## 🎨 Layouts Completos

### Layout Hero Section

```tsx
<section className="bg-white py-16">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Conteúdo */}
      <div>
        <div className="inline-block px-4 py-2 bg-[rgb(0,164,213)]/10 text-[rgb(0,164,213)] rounded-full mb-6">
          Novidade
        </div>
        <h1 className="text-5xl font-bold mb-6">
          Título <span className="text-[rgb(0,164,213)]">Destaque</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Descrição do produto ou serviço
        </p>
        <BravosButton variant="primary" size="lg">
          Call to Action
        </BravosButton>
      </div>

      {/* Imagem */}
      <div className="relative">
        <div className="absolute -inset-8 bg-[rgb(0,164,213)]/10 rounded-full blur-3xl"></div>
        <img
          src="imagem.jpg"
          alt="Hero"
          className="relative rounded-2xl shadow-2xl w-full"
        />
      </div>
    </div>
  </div>
</section>
```

### Layout Grade de Produtos

```tsx
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-12">
      Nossos Produtos
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {produtos.map((produto) => (
        <BravosProductCard
          key={produto.id}
          image={produto.imagem}
          title={produto.titulo}
          description={produto.descricao}
          onLearnMore={() => navigate(`/produto/${produto.id}`)}
        />
      ))}
    </div>
  </div>
</section>
```

### Layout "Como Funciona" com Círculo Decorativo

```tsx
<section className="py-16 bg-white">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Imagem com círculo amarelo */}
      <div className="relative order-2 md:order-1">
        <div className="absolute -inset-4 bg-[rgb(255,193,7)] rounded-full blur-2xl opacity-20"></div>
        <div className="relative w-full aspect-square rounded-full overflow-hidden border-8 border-[rgb(255,193,7)]">
          <img
            src="familia.jpg"
            alt="Como funciona"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="order-1 md:order-2">
        <h3 className="text-3xl font-bold mb-4">
          Como funciona <span className="text-[rgb(0,164,213)]">o Clube?</span>
        </h3>
        <p className="text-gray-700 mb-6">
          Descrição completa do funcionamento...
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">Benefício 1</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">Benefício 2</p>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-gray-700">Benefício 3</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

### Layout Footer Roxo com Formulário

```tsx
<footer className="bg-[rgb(46,49,146)] text-white py-16">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Informações */}
      <div>
        <h3 className="text-3xl font-bold mb-8">
          Fale com o <span className="text-[rgb(0,164,213)]">Clube Bravos</span>
        </h3>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-[rgb(0,164,213)]" />
            <div>
              <p className="font-medium">Atendimento:</p>
              <p className="text-white/80">2ª a 6ª das 9h às 17h</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-[rgb(0,164,213)]" />
            <p className="font-medium">(21) 3195-0788</p>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-[rgb(0,164,213)]" />
            <p className="font-medium">contato@clubebravos.com.br</p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div>
        <BravosContactForm />
      </div>
    </div>

    {/* Copyright */}
    <div className="mt-16 pt-8 border-t border-white/20 text-center">
      <p className="text-white/60 text-sm">
        © 2024 Clube Bravos - Todos os direitos reservados
      </p>
    </div>
  </div>
</footer>
```

## 🎯 Padrões de Uso

### Cores nos Componentes

```tsx
// Usar cores da marca via className
className="bg-[rgb(0,164,213)] text-white"
className="bg-[rgb(46,49,146)] text-white"
className="text-[rgb(0,164,213)]"

// Usar cores via CSS variables
style={{ backgroundColor: 'var(--bravos-cyan)' }}
```

### Tipografia

```tsx
// Títulos (Poppins)
<h1 style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
  Título Principal
</h1>

// Texto corrido (Arial - padrão)
<p className="text-gray-700">
  Parágrafo de texto...
</p>
```

### Espaçamento Consistente

```tsx
// Container padrão
<div className="container mx-auto px-6 py-16">

// Gap entre elementos
<div className="space-y-4">  {/* Vertical */}
<div className="flex gap-4">  {/* Horizontal */}

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Responsividade

```tsx
// Mobile-first approach
<div className="
  grid
  grid-cols-1       /* Mobile: 1 coluna */
  md:grid-cols-2    /* Tablet: 2 colunas */
  lg:grid-cols-4    /* Desktop: 4 colunas */
  gap-6
">
```

## 🔧 Integrações

### Com React Router

```tsx
import { BravosButton } from './components/BravosButton';
import { useNavigate } from 'react-router-dom';

function MeuComponente() {
  const navigate = useNavigate();

  return (
    <BravosButton onClick={() => navigate('/produtos')}>
      Ver Produtos
    </BravosButton>
  );
}
```

### Com Formulários (React Hook Form)

```tsx
import { useForm } from 'react-hook-form';
import { BravosInput } from './components/BravosInput';

function FormularioCustomizado() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BravosInput
        label="Nome"
        {...register('nome', { required: true })}
        error={errors.nome && 'Nome é obrigatório'}
      />
    </form>
  );
}
```

### Com API

```tsx
import { BravosProductCard } from './components/BravosProductCard';
import { useState, useEffect } from 'react';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('/api/produtos')
      .then(res => res.json())
      .then(setProdutos);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6">
      {produtos.map(produto => (
        <BravosProductCard
          key={produto.id}
          image={produto.imagem}
          title={produto.nome}
          description={produto.descricao}
        />
      ))}
    </div>
  );
}
```

## 📱 PWA / Mobile

```tsx
// Adicionar meta tags no HTML
<meta name="theme-color" content="rgb(0, 164, 213)" />
<meta name="apple-mobile-web-app-status-bar-style" content="rgb(0, 164, 213)" />

// Ícones
<link rel="icon" href="/logo-bravos.png" />
<link rel="apple-touch-icon" href="/logo-bravos.png" />
```

## 🎨 Customização Avançada

### Criar Variante de Botão

```tsx
// Editar BravosButton.tsx
const variants = {
  primary: '...',
  secondary: '...',
  purple: 'bg-[rgb(46,49,146)] text-white hover:bg-[rgb(35,38,120)]',
};
```

### Estender Cards

```tsx
import { BravosCard } from './components/BravosCard';

function CardPersonalizado({ children }) {
  return (
    <BravosCard className="hover:scale-105 transition-transform">
      <div className="flex items-center gap-4">
        {children}
      </div>
    </BravosCard>
  );
}
```

## 📊 Performance

```tsx
// Lazy loading de imagens
<img
  src={produto.imagem}
  loading="lazy"
  alt={produto.titulo}
/>

// Lazy loading de componentes
const BravosLandingPage = lazy(() => import('./components/BravosLandingPage'));
```

## ✅ Checklist Final

- [ ] Header fixo instalado
- [ ] WhatsApp button adicionado
- [ ] Cores da marca aplicadas
- [ ] Tipografia correta (Poppins + Arial)
- [ ] Componentes responsivos
- [ ] Formulário de contato funcional
- [ ] Ondas SVG entre seções
- [ ] Footer com informações de contato
- [ ] Meta tags configuradas
- [ ] Favicon atualizado
