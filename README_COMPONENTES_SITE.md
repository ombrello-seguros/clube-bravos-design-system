# Componentes Inspirados no Site Oficial

Este documento descreve os componentes criados baseados no site oficial clubebravos.com.br

## 🎨 Elementos Visuais do Site

### Cores Adicionais Identificadas

Além das cores do manual da marca, o site utiliza:

- **Roxo Principal**: `rgb(46, 49, 146)` - Footer e seções de destaque
- **Amarelo**: `rgb(255, 193, 7)` - Círculos decorativos, estrelas de avaliação
- **Verde WhatsApp**: `rgb(37, 211, 102)` - Botão flutuante de contato

### Padrões de Design

1. **Ondas/Curvas entre seções**: Elementos SVG curvos para transições suaves
2. **Círculos decorativos**: Círculos amarelos atrás de imagens
3. **Gradientes**: Uso de gradientes sutis do cyan
4. **Sombras**: Shadow-lg e shadow-2xl para profundidade

## 📦 Novos Componentes

### 1. BravosHeader

Cabeçalho fixo com navegação responsiva.

**Características:**
- Logo à esquerda
- Menu de navegação centralizado
- Botão "Entrar" à direita
- Menu hamburger no mobile
- Background branco com sombra sutil

```tsx
import { BravosHeader } from './components/BravosHeader';

<BravosHeader />
```

### 2. BravosProductCard

Card de produto com imagem destacada no topo.

**Características:**
- Imagem em aspecto 16:9
- Título em negrito
- Descrição curta
- Link "Conheça" com ícone de seta
- Hover com elevação e zoom na imagem

```tsx
import { BravosProductCard } from './components/BravosProductCard';

<BravosProductCard
  image="https://exemplo.com/imagem.jpg"
  title="Plano Dental"
  description="A saúde bucal de toda a sua família sem mensalidade"
  onLearnMore={() => alert('Saiba mais')}
/>
```

**Grid Recomendado:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* 4 cards de produtos */}
</div>
```

### 3. BravosTestimonial

Card de depoimento com sistema de avaliação.

**Características:**
- Texto do depoimento centralizado
- Nome do autor
- 5 estrelas douradas
- Background branco com sombra
- Borda arredondada

```tsx
import { BravosTestimonial } from './components/BravosTestimonial';

<BravosTestimonial
  text="O plano chegou na hora certa para mim..."
  author="Charles Vinícius Brito"
  rating={5}
/>
```

**Para Carrossel:**
```tsx
// Usar com biblioteca como react-slick ou embla-carousel
import { Carousel } from 'react-slick';

<Carousel>
  <BravosTestimonial {...depoimento1} />
  <BravosTestimonial {...depoimento2} />
  <BravosTestimonial {...depoimento3} />
</Carousel>
```

### 4. BravosContactForm

Formulário de contato completo.

**Características:**
- Grid 2 colunas (nome/email, telefone/assunto)
- Textarea para mensagem
- Validação HTML5
- Botão de envio alinhado à direita
- Campos com borda cyan no foco

```tsx
import { BravosContactForm } from './components/BravosContactForm';

<BravosContactForm />
```

### 5. WhatsAppButton

Botão flutuante do WhatsApp.

**Características:**
- Fixado no canto inferior direito
- Cor verde WhatsApp oficial
- Ícone de mensagem
- Tooltip "Fale conosco" no hover
- Animação de escala no hover
- Link direto para WhatsApp Web

```tsx
import { WhatsAppButton } from './components/WhatsAppButton';

<WhatsAppButton 
  phoneNumber="5521968414294"
  message="Olá! Gostaria de saber mais sobre o Clube Bravos."
/>
```

## 🎯 Layouts de Seção

### Hero Section (Estilo Site Oficial)

```tsx
<div className="bg-white">
  <div className="container mx-auto px-6 py-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div>
        <div className="inline-block px-4 py-2 bg-[rgb(0,164,213)]/10 text-[rgb(0,164,213)] rounded-full mb-6">
          Badge
        </div>
        <h1 className="text-5xl font-bold mb-6">
          Venha fazer parte do <span className="text-[rgb(0,164,213)]">Clube Bravos</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Descrição...
        </p>
        <BravosButton variant="primary" size="lg">
          Quero fazer parte!
        </BravosButton>
      </div>
      <div>
        <img src="familia.jpg" alt="Família" className="rounded-2xl shadow-2xl" />
      </div>
    </div>
  </div>
</div>
```

### Seção Cyan com Título

```tsx
<div className="bg-[rgb(0,164,213)] py-16">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-white">
      Nossos Produtos
    </h2>
  </div>
</div>
```

### Seção "Como Funciona" com Círculo Amarelo

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
  {/* Imagem com círculo decorativo */}
  <div className="relative">
    <div className="absolute -inset-4 bg-[rgb(255,193,7)] rounded-full blur-2xl opacity-20"></div>
    <div className="relative w-full aspect-square rounded-full overflow-hidden border-8 border-[rgb(255,193,7)]">
      <img src="imagem.jpg" className="w-full h-full object-cover" />
    </div>
  </div>

  {/* Conteúdo */}
  <div>
    <h4 className="text-2xl font-bold mb-4 text-[rgb(0,164,213)]">
      O Clube Bravos?
    </h4>
    <p className="text-gray-700 mb-4">Descrição...</p>
    <ul className="space-y-3">
      <li className="flex items-start gap-3">
        <div className="w-2 h-2 bg-[rgb(0,164,213)] rounded-full mt-2"></div>
        <p className="text-gray-700">Benefício 1</p>
      </li>
    </ul>
  </div>
</div>
```

### Footer Roxo com Formulário

```tsx
<div className="bg-[rgb(46,49,146)] text-white py-16">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Informações de contato */}
      <div>
        <h3 className="text-3xl font-bold mb-6">
          Fale com o <span className="text-[rgb(0,164,213)]">Clube Bravos</span>
        </h3>
        {/* Ícones com horário, telefone, email */}
      </div>

      {/* Formulário */}
      <div>
        <BravosContactForm />
      </div>
    </div>
  </div>
</div>
```

## 🌊 Elementos SVG de Onda

### Onda Descendente (de branco para cyan)

```tsx
<svg className="w-full h-20 fill-[rgb(0,164,213)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
  <path d="M0,0 L1200,0 L1200,120 Q900,60 600,90 T0,120 Z"></path>
</svg>
```

### Onda Ascendente (de cyan para branco)

```tsx
<svg className="w-full h-20 fill-[rgb(0,164,213)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
  <path d="M0,0 Q300,120 600,60 T1200,0 L1200,120 L0,120 Z"></path>
</svg>
```

### Onda para Roxo

```tsx
<svg className="w-full h-20 fill-[rgb(46,49,146)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
  <path d="M0,0 Q300,120 600,60 T1200,0 L1200,120 L0,120 Z"></path>
</svg>
```

## 🎨 Paleta Completa de Cores

```css
/* Cores Principais (Manual da Marca) */
--bravos-cyan: rgb(0, 164, 213);
--bravos-gray: rgb(157, 157, 156);

/* Variações Cyan */
--bravos-cyan-light: rgb(51, 188, 229);
--bravos-cyan-dark: rgb(0, 131, 170);

/* Variações Cinza */
--bravos-gray-light: rgb(230, 230, 230);
--bravos-gray-dark: rgb(100, 100, 100);

/* Cores Complementares (Site) */
--bravos-purple: rgb(46, 49, 146);
--bravos-purple-dark: rgb(35, 38, 120);
--bravos-yellow: rgb(255, 193, 7);
--bravos-green: rgb(37, 211, 102);
```

## 📱 Responsividade

Todos os componentes são responsivos usando breakpoints do Tailwind:

- **Mobile**: até 767px - Stack vertical, menu hamburger
- **Tablet**: 768px - 1023px - Grid 2 colunas
- **Desktop**: 1024px+ - Grid 4 colunas, menu horizontal

## ✅ Checklist de Implementação

- [x] Header com navegação responsiva
- [x] Hero section com CTA
- [x] Cards de produtos (4 colunas)
- [x] Seção "Como Funciona" com círculo amarelo
- [x] Carrossel de depoimentos
- [x] Footer roxo com formulário
- [x] Botão flutuante WhatsApp
- [x] Ondas SVG entre seções
- [x] Sistema de cores completo

## 🚀 Próximos Passos

1. Integrar com backend para envio de formulário
2. Adicionar analytics
3. Implementar carrossel automático nos depoimentos
4. Adicionar mais animações com Framer Motion
5. Criar versão dark mode (opcional)

## 📞 Informações de Contato (do Site)

- **Telefone**: (21) 3195-0788
- **WhatsApp**: (21) 96841-4294
- **Email**: contato@clubebravos.com.br
- **Horário**: 2ª a 6ª das 9h às 17h
