# Clube Bravos - Design System

![Clube Bravos](https://clubebravos.com.br/assets/logo.png)

Design System oficial do **Clube Bravos de Benefícios**, construído com React, TypeScript e Tailwind CSS.

## 🎯 O Que É Este Projeto?

Este repositório contém:

1. **Design System Completo** - Baseado no manual da marca do Clube Bravos
2. **Biblioteca NPM** - Pronto para ser publicado e reutilizado em outros projetos
3. **Componentes React** - 11 componentes prontos para uso
4. **Landing Page** - Exemplo completo inspirado no site oficial

## 🚀 Quick Start

### Ver o Design System

```bash
# Instalar dependências
npm install

# Iniciar dev server
npm run dev
```

Acesse http://localhost:5173 e clique em **"Ver Landing Page"** para ver a página completa.

### Publicar como Biblioteca NPM

**Em 5 minutos:**

```bash
# 1. Backup e troca de config
cp package.json package.dev.json
cp package.lib.json package.json

# 2. Build
npm run build:lib

# 3. Publicar
npm login
npm publish --access public

# 4. Restaurar
cp package.dev.json package.json
```

📚 **Guia completo**: [QUICK_START.md](./QUICK_START.md)

## 📦 Componentes Incluídos

- **BravosButton** - Botões (primary, secondary, outline, ghost)
- **BravosCard** - Cards com variantes
- **BravosInput** - Campos de entrada com validação
- **BravosBadge** - Badges/etiquetas
- **BravosProductCard** - Card de produto com imagem
- **BravosTestimonial** - Depoimentos com estrelas
- **BravosContactForm** - Formulário de contato completo
- **BravosHeader** - Cabeçalho responsivo
- **WhatsAppButton** - Botão flutuante do WhatsApp
- **WaveSection** - Seções com ondas decorativas
- **BravosLandingPage** - Landing page completa

## 🎨 Paleta de Cores

```css
/* Cores Principais */
--bravos-cyan: rgb(0, 164, 213);      /* Marca principal */
--bravos-gray: rgb(157, 157, 156);    /* Secundária */

/* Cores Complementares */
--bravos-purple: rgb(46, 49, 146);    /* Footer */
--bravos-yellow: rgb(255, 193, 7);    /* Destaques */
--bravos-green: rgb(37, 211, 102);    /* WhatsApp */
```

## 📖 Documentação

### Para Usar a Biblioteca
- **[README.npm.md](./README.npm.md)** - Como usar após publicar no NPM

### Para Publicar
- **[QUICK_START.md](./QUICK_START.md)** ⭐ - Publicar em 5 minutos
- **[PUBLICAR_NPM.md](./PUBLICAR_NPM.md)** - Guia completo de publicação
- **[RESUMO_BIBLIOTECA.md](./RESUMO_BIBLIOTECA.md)** - Resumo da configuração

### Para Desenvolver
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Documentação do design
- **[README_COMPONENTES_SITE.md](./README_COMPONENTES_SITE.md)** - Componentes do site
- **[EXEMPLOS_USO.md](./EXEMPLOS_USO.md)** - Exemplos de código
- **[ESTRUTURA_PROJETO.md](./ESTRUTURA_PROJETO.md)** - Estrutura de arquivos

## 🛠️ Estrutura do Projeto

```
clubebravos-design-system/
├── src/
│   ├── index.ts                  # Entry point da biblioteca
│   ├── app/
│   │   ├── App.tsx               # Demo/Showcase
│   │   └── components/           # Componentes exportados
│   ├── styles/                   # CSS (theme + fonts)
│   └── imports/                  # Logos e assets
│
├── dist/                         # Build da biblioteca (gerado)
│   ├── index.mjs                 # ESM bundle
│   ├── index.cjs                 # CommonJS bundle
│   ├── index.d.ts                # TypeScript types
│   ├── styles/                   # CSS copiados
│   └── assets/                   # Logos copiados
│
├── package.json                  # Configuração atual (dev)
├── package.lib.json              # Configuração para publicar
├── vite.config.ts                # Vite dev
└── vite.config.lib.ts            # Vite build biblioteca
```

## 💡 Uso

### Como Biblioteca NPM (após publicar)

```bash
npm install @clubebravos/design-system
```

```tsx
import '@clubebravos/design-system/styles';
import '@clubebravos/design-system/fonts';
import { BravosButton, BravosCard } from '@clubebravos/design-system';

function App() {
  return (
    <div>
      <BravosButton variant="primary" size="lg">
        Clique aqui
      </BravosButton>
      <BravosCard>Conteúdo do card</BravosCard>
    </div>
  );
}
```

### Como Projeto Local (desenvolvimento)

```tsx
import { BravosButton } from './components/BravosButton';

<BravosButton variant="primary">Clique</BravosButton>
```

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia dev server

# Build da biblioteca
npm run build:lib        # Build completo (ESM + CJS + Types + Assets)

# Testar antes de publicar
npm run pack:test        # Cria arquivo .tgz para testar localmente
```

## 📸 Screenshots

### Design System Showcase
![Design System](./docs/screenshot-design-system.png)

### Landing Page
![Landing Page](./docs/screenshot-landing-page.png)

## 🎨 Baseado no Site Oficial

Este design system foi criado analisando:
- **Manual da Marca** (PDF incluído em `src/imports/`)
- **Site oficial**: https://clubebravos.com.br
- **Cores oficiais**: Cyan #00A4D5 e Cinza #9D9D9C
- **Tipografia**: Poppins (títulos) e Arial (corpo)

## 🔧 Requisitos

- Node.js 18+
- npm ou pnpm
- React 18+
- TypeScript 5+

## 📄 Licença

MIT © Clube Bravos de Benefícios

## 📞 Contato

- **Website**: https://clubebravos.com.br
- **Email**: contato@clubebravos.com.br
- **WhatsApp**: (21) 96841-4294
- **Telefone**: (21) 3195-0788

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## ⭐ Features

- ✅ 11 componentes React prontos
- ✅ TypeScript com tipos completos
- ✅ Tailwind CSS v4
- ✅ Responsivo (mobile-first)
- ✅ Acessível (WCAG 2.1)
- ✅ Tree-shakeable
- ✅ ESM + CommonJS
- ✅ CSS separado (importável sob demanda)
- ✅ Assets incluídos (logos)
- ✅ Documentação completa
- ✅ Pronto para NPM

## 🗺️ Roadmap

- [ ] Testes unitários (Jest + Testing Library)
- [ ] Storybook
- [ ] Mais componentes (Modal, Dropdown, Tabs)
- [ ] Modo dark
- [ ] Tema customizável
- [ ] Animações com Framer Motion
- [ ] Exemplos com Next.js

## 📚 Links Úteis

- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

**Pronto para publicar?** Leia [QUICK_START.md](./QUICK_START.md)! 🚀

Feito com ❤️ pelo time Clube Bravos
