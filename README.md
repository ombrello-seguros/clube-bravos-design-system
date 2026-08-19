# Clube Bravos Design System

Design System oficial do Clube Bravos de Benefícios. Distribuído como um **registry shadcn** (`@clube-bravos`), hospedado no GitHub Pages — consumidores instalam componente por componente via `npx shadcn add`. Ver `guidelines/registry.md` para o guia de consumo.

## Estrutura do repositório

```
.
├── src/                            # Componentes, estilos, assets
│   ├── index.ts                    # Entry point da lib (o que é exportado)
│   ├── app/components/             # Componentes Bravos* (publicados)
│   ├── imports/                    # Assets (logos, imagens)
│   └── styles/                     # CSS (theme.css, fonts.css, etc.)
├── scripts/
│   ├── copy-styles.ts              # Pós-build: copia CSS + assets pro dist/
│   └── release.sh                  # Bump semver + changelog + tag
├── .husky/commit-msg               # Hook que valida msg via commitlint
├── commitlint.config.cjs           # Conventional Commits
├── .github/workflows/ci.yml        # CI: commitlint em PRs, build em main
├── .github/workflows/registry-pages.yml  # Builda + publica o registry shadcn no GitHub Pages
├── registry.json                   # Manifesto fonte do registry shadcn
├── vite.config.ts                  # Preview do Figma Make (dev)
├── vite.config.lib.ts              # Build da lib (gera dist/)
├── tsconfig.json                   # tsconfig base (noEmit: true — dev)
├── tsconfig.lib.json               # Override: emit declarations (.d.ts)
└── package.json                    # Único package.json: dev + lib + tooling
```

Existe **um único `package.json`**:
- `dependencies` — só o que a lib carrega em runtime (`clsx`, `lucide-react`, `tailwind-merge`).
- `devDependencies` — preview do Figma Make (MUI, Radix, etc.), build tools (Vite, TS, Tailwind), tooling de release (husky, commitlint, conventional-*).
- `peerDependencies` — `react` e `react-dom` ^18.
- `files: ["dist", "README.md", "LICENSE"]` — restringe o que vai pro registry.

Consumidor instalando o pacote recebe apenas `dependencies` + `peerDependencies`. As deps pesadas do preview ficam só no dev local/CI.

## Setup local

```bash
npm install     # instala tudo + ativa husky (commit-msg hook)
npm run dev     # preview Figma Make em :5173
```

A primeira `npm install` ativa o hook `commit-msg` via husky — a partir daí todo commit passa pelo `commitlint`.

## Convenção de commits

Conventional Commits. Exemplos:

```
feat(button): adiciona variante ghost
fix(card): corrige padding no mobile
chore(deps): atualiza lucide-react
docs: melhora exemplo no README
```

Tipos comuns: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, `perf`, `style`, `build`, `ci`.

- `feat:` → bump **minor**
- `fix:` → bump **patch**
- `BREAKING CHANGE:` no corpo ou `feat!:` → bump **major**

O `.github/workflows/ci.yml` roda `commitlint` em PRs e bloqueia merge se algum commit estiver fora do padrão.

## Como liberar uma nova versão

### Fluxo automatizado (recomendado)

Estando na `main` com tudo commitado:

```bash
# Detecta o bump pelos commits desde a última tag
npm run release

# Ou força o bump
npm run release:patch
npm run release:minor
npm run release:major
```

O `scripts/release.sh`:

1. Lê commits convencionais desde a última tag e calcula o bump.
2. Bumpa `version` em `package.json`.
3. Atualiza `CHANGELOG.md`.
4. Commita `chore(release): vX.Y.Z` e cria a tag `vX.Y.Z`.
5. **Não publica** — só prepara.

Depois:

```bash
git push origin main
git push origin v1.2.3
```

O push da tag dispara o `.github/workflows/registry-pages.yml`, que builda e publica o registry shadcn (`public/r/*.json`) no GitHub Pages, sob `vX.Y.Z/r/`. Não requer nenhum secret além do `GITHUB_TOKEN` padrão do Actions.

### O que cada workflow faz

| Trigger                    | Workflow             | O que roda                                         |
|-----------------------------|----------------------|-----------------------------------------------------|
| PR → qualquer branch        | `ci.yml`              | `commitlint --from origin/<dest>`                    |
| Push em `main`              | `ci.yml`              | `npm ci && npm run build:lib && npm test`            |
| Push em `main` ou tag `v*`  | `registry-pages.yml`  | Builda o registry e publica em `gh-pages` (raiz para `main`, `vX.Y.Z/` para tags) |

## Consumindo o Design System

O DS é distribuído como um **registry shadcn** (`@clube-bravos`), hospedado no GitHub Pages — não como pacote npm. Guia completo em `guidelines/registry.md`. Resumo:

1. **Registrar a fonte** no `components.json` do projeto consumidor:

   ```json
   {
     "registries": {
       "@clube-bravos": "https://ombrello-seguros.github.io/clube-bravos-design-system/r/{name}.json"
     }
   }
   ```

   Pra fixar numa versão, aponte pro snapshot com tag: `.../v1.2.3/r/{name}.json`.

2. **Instalar componentes**:

   ```bash
   npx shadcn add @clube-bravos/clube-bravos-theme    # tokens/theme — instalar uma vez
   npx shadcn add @clube-bravos/bravos-button
   npx shadcn add @clube-bravos/bravos-wizard-footer  # traz button + theme junto
   ```

   `registryDependencies` resolvem sozinhas pelo mesmo `@clube-bravos` — sem URLs manuais.

3. **Carregar a fonte Poppins** — adicione no `<head>` do `index.html` do app:

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link
     href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
     rel="stylesheet"
   />
   ```

   > O tema instalado (`clube-bravos-theme`) só declara as variáveis `--font-heading` /
   > `--font-body` — não faz `@import` remoto da Poppins. Carregar via `<link>` evita
   > problemas de ordenação de `@import` no bundle do app e é mais rápido.

4. **Usar** — cada `npx shadcn add` copia o componente pra dentro do projeto consumidor (ex. `components/bravos/BravosButton.tsx`), então o import é local:

   ```tsx
   import { BravosButton } from '@/components/bravos/BravosButton';

   <BravosButton variant="primary">Olá</BravosButton>
   ```

## Troubleshooting

- **`npx shadcn add @clube-bravos/...` falha ao resolver**: confirme que `components.json` tem a entrada `registries.@clube-bravos` apontando pro GitHub Pages (passo 1 acima), e que o item existe em `public/r/` no branch/tag consultado.
- **Componente instalado desatualizado**: o registry versiona por tag (`vX.Y.Z/r/`); sem versão fixada, `{name}.json` sem prefixo resolve pra raiz (`main`, sempre a mais recente).
- **`commitlint` falhando em PR**: algum commit do PR não está no formato Conventional Commits. Rebase/edit + force push.
- **Sem `.d.ts` no `dist/`**: garanta que `tsconfig.lib.json` tem `"noEmit": false` (o `tsconfig.json` base tem `noEmit: true`, e o `lib` precisa sobrescrever).
