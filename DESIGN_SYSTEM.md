# Design System - Clube Bravos de Benefícios

Este design system foi criado baseado no Manual da Marca oficial do Clube Bravos.

## 🎨 Cores da Marca

### Primária
- **Cyan Bravos**: `rgb(0, 164, 213)` / `#00A4D5`
  - CMYK: 75, 10, 5, 5
  - Pantone: 312 C
  - Uso: Marca principal, CTAs, destaques

### Secundária
- **Cinza Bravos**: `rgb(157, 157, 156)` / `#9D9D9C`
  - CMYK: 0, 0, 0, 50
  - Uso: Textos secundários, bordas, fundos neutros

### Auxiliares
- **Cyan Claro**: `rgb(51, 188, 229)` - Variação para hover/destaque
- **Cyan Escuro**: `rgb(0, 131, 170)` - Variação para estados ativos
- **Cinza Claro**: `rgb(230, 230, 230)` - Backgrounds
- **Cinza Escuro**: `rgb(100, 100, 100)` - Textos
- **Roxo Bravos**: `rgb(46, 49, 146)` - Footer, seções especiais
- **Roxo Escuro**: `rgb(35, 38, 120)` - Variação do roxo
- **Amarelo**: `rgb(255, 193, 7)` - Destaques, estrelas
- **Verde WhatsApp**: `rgb(37, 211, 102)` - Botão WhatsApp
- **Branco**: `#ffffff`
- **Preto**: `#000000`

## 📝 Tipografia

### Família Principal (Títulos)
- **Poppins** (alternativa ao Geometos original)
- Pesos: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Uso: Títulos, headings, destaques

### Família Secundária (Corpo)
- **Arial**
- Variações: Regular, Italic, Bold, Bold Italic
- Uso: Texto corrido, parágrafos, labels

## 🧩 Componentes

### BravosButton
Botão com as cores e estilos da marca.

**Variantes:**
- `primary` - Fundo cyan, texto branco
- `secondary` - Fundo cinza claro, texto escuro
- `outline` - Borda cyan, fundo transparente
- `ghost` - Apenas texto cyan

**Tamanhos:**
- `sm` - Pequeno (px-3 py-1.5)
- `md` - Médio (px-6 py-3)
- `lg` - Grande (px-8 py-4)

```tsx
<BravosButton variant="primary" size="md">
  Clique aqui
</BravosButton>
```

### BravosCard
Card com sombra e bordas arredondadas.

**Variantes:**
- `default` - Fundo branco, borda cinza
- `highlight` - Gradiente cyan

```tsx
<BravosCard variant="default">
  Conteúdo do card
</BravosCard>
```

### BravosInput
Campo de entrada com label e validação.

```tsx
<BravosInput 
  label="Nome" 
  placeholder="Digite seu nome"
  error="Campo obrigatório"
/>
```

### BravosBadge
Badge/etiqueta para destacar informações.

**Variantes:**
- `primary` - Cyan
- `secondary` - Cyan claro
- `gray` - Cinza claro

```tsx
<BravosBadge variant="primary">Novo</BravosBadge>
```

### BravosProductCard
Card de produto com imagem, título, descrição e botão de ação.

```tsx
<BravosProductCard
  image="url-da-imagem"
  title="Plano Dental"
  description="A saúde bucal de toda a sua família..."
  onLearnMore={() => console.log('clicked')}
/>
```

### BravosTestimonial
Card de depoimento com avaliação por estrelas.

```tsx
<BravosTestimonial
  text="Depoimento do cliente..."
  author="Nome do Cliente"
  rating={5}
/>
```

### BravosContactForm
Formulário de contato completo com validação.

```tsx
<BravosContactForm />
```

### BravosHeader
Cabeçalho com navegação e menu responsivo.

```tsx
<BravosHeader />
```

### WhatsAppButton
Botão flutuante do WhatsApp no canto inferior direito.

```tsx
<WhatsAppButton 
  phoneNumber="5521968414294"
  message="Olá! Gostaria de mais informações."
/>
```

## 📏 Espaçamento

Sistema de espaçamento baseado em múltiplos de 4px:
- 4px, 8px, 16px, 24px, 32px, 48px, 64px

## 🔲 Grid System

Sistema de 12 colunas responsivo usando Tailwind CSS Grid.

## 🖼️ Logos

### Versões Disponíveis
1. **Logo Principal** (Vertical) - `Logo_Bravos_300.png`
2. **Logo Secundária** (Horizontal) - `Logo_Bravos_secundaria_300_.png`
3. Versões em 72px também disponíveis para web

### Regras de Uso
- ✅ Manter proporções originais
- ✅ Respeitar área de proteção (tamanho da letra "O")
- ✅ Tamanho mínimo: 1cm de altura para impressos
- ❌ Nunca deformar
- ❌ Nunca modificar elementos
- ❌ Nunca alterar cores

## 🎯 Diretrizes de Marca

### Fazer
- Usar cores oficiais da marca
- Manter hierarquia tipográfica
- Respeitar espaçamentos consistentes
- Usar componentes do design system

### Não Fazer
- Modificar proporções do logo
- Usar cores não aprovadas
- Criar variações não autorizadas
- Ignorar área de proteção da marca

## 🚀 Como Usar

Importe os componentes necessários:

```tsx
import { BravosButton } from './components/BravosButton';
import { BravosCard } from './components/BravosCard';
import { BravosInput } from './components/BravosInput';
import { BravosBadge } from './components/BravosBadge';
```

Use as cores CSS customizadas:

```css
/* Via CSS variables */
background-color: var(--bravos-cyan);
color: var(--bravos-gray);

/* Via Tailwind */
className="bg-[rgb(0,164,213)] text-white"
```

## 📱 Responsividade

Todos os componentes são responsivos e seguem breakpoints do Tailwind:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 📄 Referência

Baseado no **Manual da Marca - Clube Bravos de Benefícios**.

Para mais informações sobre a aplicação da marca, consulte o PDF original:
`src/imports/manual_da_marca_clube_bravos.pdf`
