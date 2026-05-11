# 📂 Estrutura do Projeto

## Arquivos de Configuração da Biblioteca

```
clubebravos-design-system/
│
├── 📦 CONFIGURAÇÃO NPM
│   ├── package.json              # Desenvolvimento (atual)
│   ├── package.lib.json          # Biblioteca (para publicar)
│   ├── package.dev.json          # Backup (criado durante publicação)
│   ├── .npmignore                # O que NÃO incluir no pacote
│   └── LICENSE                   # Licença MIT
│
├── 🔧 CONFIGURAÇÃO BUILD
│   ├── vite.config.ts            # Vite dev (app atual)
│   ├── vite.config.lib.ts        # Vite build biblioteca
│   ├── tsconfig.json             # TypeScript dev
│   ├── tsconfig.lib.json         # TypeScript biblioteca
│   └── tsconfig.node.json        # TypeScript scripts
│
├── 📝 DOCUMENTAÇÃO
│   ├── README.md                 # README do projeto
│   ├── README.npm.md             # README da biblioteca (NPM)
│   ├── QUICK_START.md            # ⭐ Como publicar em 5 min
│   ├── PUBLICAR_NPM.md           # Guia completo de publicação
│   ├── RESUMO_BIBLIOTECA.md      # Resumo da configuração
│   ├── DESIGN_SYSTEM.md          # Documentação do design
│   ├── README_COMPONENTES_SITE.md
│   └── EXEMPLOS_USO.md
│
├── 🎨 CÓDIGO FONTE
│   └── src/
│       ├── index.ts              # ⭐ Entry point da biblioteca
│       ├── vite-env.d.ts         # Tipos para assets
│       │
│       ├── app/
│       │   ├── App.tsx           # Demo/Showcase (não exportado)
│       │   └── components/       # ⭐ Componentes exportados
│       │       ├── BravosButton.tsx
│       │       ├── BravosCard.tsx
│       │       ├── BravosInput.tsx
│       │       ├── BravosBadge.tsx
│       │       ├── BravosProductCard.tsx
│       │       ├── BravosTestimonial.tsx
│       │       ├── BravosContactForm.tsx
│       │       ├── BravosHeader.tsx
│       │       ├── WhatsAppButton.tsx
│       │       ├── WaveSection.tsx
│       │       ├── BravosLandingPage.tsx
│       │       └── LogoTest.tsx   # Teste (não exportado)
│       │
│       ├── styles/
│       │   ├── theme.css         # ⭐ Exportado como /styles
│       │   └── fonts.css         # ⭐ Exportado como /fonts
│       │
│       └── imports/
│           ├── Logo_Bravos_300.png            # ⭐ Exportado
│           ├── Logo_Bravos_72_.png            # ⭐ Exportado
│           ├── Logo_Bravos_secundaria_300_.png # ⭐ Exportado
│           ├── Logo_Bravos_secundaria_72_.png  # ⭐ Exportado
│           └── manual_da_marca_clube_bravos.pdf
│
├── 🛠️ SCRIPTS
│   └── scripts/
│       └── copy-styles.ts        # Copia CSS/assets para dist/
│
└── 📦 RESULTADO DO BUILD (após npm run build:lib)
    └── dist/
        ├── index.mjs             # ESM bundle
        ├── index.cjs             # CommonJS bundle
        ├── index.d.ts            # TypeScript types
        ├── styles/
        │   ├── theme.css
        │   └── fonts.css
        └── assets/
            ├── Logo_Bravos_300.png
            ├── Logo_Bravos_72_.png
            ├── Logo_Bravos_secundaria_300_.png
            └── Logo_Bravos_secundaria_72_.png
```

## 🎯 Arquivos Importantes

### Para Publicar
1. **QUICK_START.md** - Como publicar em 5 minutos
2. **package.lib.json** - Configuração da biblioteca
3. **vite.config.lib.ts** - Build configuration
4. **src/index.ts** - Entry point (exportações)

### Para Desenvolver
1. **package.json** - Configuração atual (dev)
2. **vite.config.ts** - Dev server
3. **src/app/App.tsx** - Aplicação demo

## 🔄 Workflow de Publicação

```
┌─────────────────────────────────────┐
│ 1. Desenvolver componentes          │
│    src/app/components/*.tsx          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 2. Exportar em src/index.ts         │
│    export { Component } from '...'   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 3. Configurar package.lib.json      │
│    - Nome do pacote                  │
│    - Versão                          │
│    - Dependencies                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 4. Trocar package.json               │
│    cp package.lib.json package.json  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 5. Build da biblioteca               │
│    npm run build:lib                 │
│    ├── Vite build (ESM + CJS)       │
│    ├── TypeScript (tipos)            │
│    └── Copy styles/assets            │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 6. Publicar no NPM                   │
│    npm publish --access public       │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 7. Restaurar package.json dev        │
│    cp package.dev.json package.json  │
└─────────────────────────────────────┘
```

## 📤 O Que É Publicado

Apenas a pasta `dist/` e arquivos essenciais:

```
@clubebravos/design-system@1.0.0
├── dist/
│   ├── index.mjs
│   ├── index.cjs
│   ├── index.d.ts
│   ├── styles/
│   └── assets/
├── package.json
├── README.md
└── LICENSE
```

## 🚫 O Que NÃO É Publicado

Definido em `.npmignore`:

- `src/` - Código fonte (apenas dist/ é publicado)
- `node_modules/`
- Arquivos de configuração (.env, vite.config.ts)
- Arquivos de desenvolvimento (DESIGN_SYSTEM.md, etc.)
- Testes
- App.tsx (demo)

## 🎨 Como Usuários Usam

```tsx
// 1. Instalar
npm install @clubebravos/design-system

// 2. Importar estilos
import '@clubebravos/design-system/styles';
import '@clubebravos/design-system/fonts';

// 3. Importar componentes
import { 
  BravosButton, 
  BravosCard,
  LogoBravosPrimary300 
} from '@clubebravos/design-system';

// 4. Usar
function App() {
  return (
    <>
      <img src={LogoBravosPrimary300} alt="Logo" />
      <BravosButton variant="primary">Clique</BravosButton>
      <BravosCard>Conteúdo</BravosCard>
    </>
  );
}
```

## ⚙️ Configurações Especiais

### package.lib.json

```json
{
  "name": "@clubebravos/design-system",
  "main": "./dist/index.cjs",        // CommonJS
  "module": "./dist/index.mjs",      // ESM
  "types": "./dist/index.d.ts",      // TypeScript
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    },
    "./styles": "./dist/styles/theme.css",
    "./fonts": "./dist/styles/fonts.css"
  }
}
```

### vite.config.lib.ts

```ts
{
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom']  // Não incluir no bundle
    }
  }
}
```

## 📊 Tamanho Estimado

```
Total bundle (sem React): ~50-100KB
├── Components: ~40KB
├── CSS: ~10KB
└── Assets: ~50KB (logos)
```

## 🔍 Comandos Úteis

```bash
# Ver estrutura do pacote antes de publicar
npm pack --dry-run

# Ver tamanho do bundle
npm run build:lib && du -sh dist/

# Testar imports localmente
npm link
# Em outro projeto:
npm link @clubebravos/design-system

# Limpar build
rm -rf dist/
```

## ✅ Próximos Passos

1. ⭐ Leia **QUICK_START.md** para publicar
2. 📚 Leia **PUBLICAR_NPM.md** para detalhes
3. 🎨 Customize **package.lib.json** com seu nome
4. 🚀 Execute `npm run build:lib`
5. 📦 Publique com `npm publish --access public`

---

**Dúvidas?** Veja os guias na pasta raiz do projeto!
