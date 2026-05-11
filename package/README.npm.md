# Clube Bravos Design System

![Clube Bravos](https://clubebravos.com.br/logo.png)

Sistema de design oficial do Clube Bravos de Benefícios, construído com React, TypeScript e Tailwind CSS.

## 📦 Instalação

```bash
npm install @clubebravos/design-system
# ou
yarn add @clubebravos/design-system
# ou
pnpm add @clubebravos/design-system
```

## 🚀 Uso Rápido

### 1. Importar os estilos

No seu arquivo principal (App.tsx ou _app.tsx):

```tsx
import '@clubebravos/design-system/styles';
import '@clubebravos/design-system/fonts';
```

### 2. Usar os componentes

```tsx
import { BravosButton, BravosCard, BravosProductCard } from '@clubebravos/design-system';

function App() {
  return (
    <div>
      <BravosButton variant="primary" size="lg">
        Clique aqui
      </BravosButton>
      
      <BravosCard variant="default">
        <h3>Meu Card</h3>
        <p>Conteúdo do card...</p>
      </BravosCard>
    </div>
  );
}
```

## 📚 Componentes Disponíveis

### Botões
- **BravosButton** - Botão com variantes: primary, secondary, outline, ghost

```tsx
<BravosButton variant="primary" size="md" onClick={() => alert('Clicou!')}>
  Enviar
</BravosButton>
```

### Cards
- **BravosCard** - Card básico com variantes
- **BravosProductCard** - Card de produto com imagem

```tsx
<BravosProductCard
  image="/produto.jpg"
  title="Plano Dental"
  description="Cobertura completa para toda família"
  onLearnMore={() => console.log('Saiba mais')}
/>
```

### Formulários
- **BravosInput** - Campo de entrada com label e validação
- **BravosContactForm** - Formulário de contato completo

```tsx
<BravosInput 
  label="Nome"
  placeholder="Digite seu nome"
  error="Campo obrigatório"
/>

<BravosContactForm />
```

### Navegação
- **BravosHeader** - Cabeçalho com navegação responsiva
- **WhatsAppButton** - Botão flutuante do WhatsApp

```tsx
<BravosHeader />
<WhatsAppButton phoneNumber="5521999999999" />
```

### Depoimentos
- **BravosTestimonial** - Card de depoimento com estrelas

```tsx
<BravosTestimonial
  text="Excelente serviço!"
  author="João Silva"
  rating={5}
/>
```

### Outros
- **BravosBadge** - Etiquetas/badges
- **WaveSection** - Seções com ondas decorativas
- **BravosLandingPage** - Landing page completa

## 🎨 Customização com Tailwind

Este design system usa Tailwind CSS. Configure seu `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@clubebravos/design-system/dist/**/*.{js,mjs}'
  ],
  theme: {
    extend: {
      colors: {
        'bravos-cyan': 'rgb(0, 164, 213)',
        'bravos-purple': 'rgb(46, 49, 146)',
        'bravos-yellow': 'rgb(255, 193, 7)',
        'bravos-green': 'rgb(37, 211, 102)',
      },
      fontFamily: {
        heading: ['Poppins', 'Arial', 'sans-serif'],
        body: ['Arial', 'sans-serif'],
      }
    }
  }
}
```

## 🖼️ Assets (Logos)

```tsx
import { 
  LogoBravosPrimary300,
  LogoBravosSecondary300 
} from '@clubebravos/design-system';

function Header() {
  return <img src={LogoBravosPrimary300} alt="Clube Bravos" />;
}
```

## 🎨 Paleta de Cores

```css
--bravos-cyan: rgb(0, 164, 213);       /* Cor principal */
--bravos-cyan-light: rgb(51, 188, 229);
--bravos-cyan-dark: rgb(0, 131, 170);

--bravos-gray: rgb(157, 157, 156);     /* Cor secundária */
--bravos-gray-light: rgb(230, 230, 230);
--bravos-gray-dark: rgb(100, 100, 100);

--bravos-purple: rgb(46, 49, 146);     /* Footer */
--bravos-yellow: rgb(255, 193, 7);     /* Destaques */
--bravos-green: rgb(37, 211, 102);     /* WhatsApp */
```

## 📖 Tipografia

- **Títulos**: Poppins (ou Arial como fallback)
- **Corpo**: Arial

```tsx
<h1 style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
  Título Principal
</h1>
```

## 🔧 Configuração Completa do Projeto

### Next.js

```tsx
// _app.tsx
import '@clubebravos/design-system/styles';
import '@clubebravos/design-system/fonts';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Vite + React

```tsx
// main.tsx
import '@clubebravos/design-system/styles';
import '@clubebravos/design-system/fonts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 📱 Responsividade

Todos os componentes são responsivos por padrão usando breakpoints do Tailwind:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT © Clube Bravos de Benefícios

## 📞 Suporte

- **Website**: https://clubebravos.com.br
- **Email**: contato@clubebravos.com.br
- **WhatsApp**: (21) 96841-4294
- **Telefone**: (21) 3195-0788

## 🔗 Links Úteis

- [Documentação Completa](https://github.com/clubebravos/design-system)
- [Manual da Marca](https://clubebravos.com.br/manual-da-marca.pdf)
- [Exemplos ao Vivo](https://design-system.clubebravos.com.br)

---

Feito com ❤️ pelo time Clube Bravos
