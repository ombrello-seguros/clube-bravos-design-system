# Clube Bravos Design System

Design System oficial do Clube Bravos de Benefícios. Publicado como `@clube-bravos/design-system` no **registry privado da Figma**.

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
├── bitbucket-pipelines.yml         # CI: commitlint em PRs, publish em tags
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

O `bitbucket-pipelines.yml` roda `commitlint` em PRs e bloqueia merge se algum commit estiver fora do padrão.

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

O push da tag dispara o `bitbucket-pipelines.yml`, que builda e publica `@clube-bravos/design-system@1.2.3` no registry da Figma.

### Fluxo manual (sem CI)

Pra hotfix/emergência sem passar pelo Bitbucket:

```bash
# Build
npm ci
npm run build:lib

# .npmrc local (LOCAL — não commitar; já está no .gitignore)
cat > .npmrc <<EOF
@clube-bravos:registry=https://registry.figma.com/npm/b16de91e-5c85-47bb-8dc8-1a87d10ef689/registry/
//registry.figma.com/npm/b16de91e-5c85-47bb-8dc8-1a87d10ef689/registry/:_authToken=SEU_TOKEN_AQUI
EOF

npm publish --ignore-scripts

rm -f .npmrc
```

## Configurar o Bitbucket Pipelines

Pra o pipeline publicar com sucesso, uma vez:

1. **Habilitar Pipelines** no repo: *Repository settings → Pipelines → Settings → Enable*.
2. **Cadastrar o token do Figma** como variável segura:
   - *Repository settings → Repository variables*
   - Nome: `FIGMA_NPM_TOKEN`
   - Valor: token `figp_...` (Figma → Settings → Account → Personal access tokens → Registry)
   - Marcar **Secured**.

Sem `FIGMA_NPM_TOKEN`, o `npm publish` no pipeline falha com 401.

### O que cada pipeline faz

| Trigger              | Job                                | Publica? |
|----------------------|------------------------------------|----------|
| PR → qualquer branch | `commitlint --from origin/<dest>`  | Não      |
| Push em `main`       | `npm ci && npm run build:lib`      | Não      |
| Push de tag `v*`     | Build + `npm publish`              | **Sim**  |

A separação entre `main` (só valida) e `tags` (publica) garante que cada versão publicada tem uma tag rastreável.

## Consumindo o pacote

Em qualquer projeto que vá usar o DS:

1. **`.npmrc`** (gitignored) na raiz do projeto consumidor:

   ```
   @clube-bravos:registry=https://registry.figma.com/npm/b16de91e-5c85-47bb-8dc8-1a87d10ef689/registry/
   //registry.figma.com/npm/b16de91e-5c85-47bb-8dc8-1a87d10ef689/registry/:_authToken=${FIGMA_NPM_TOKEN}
   ```

2. **Instalar**:

   ```bash
   FIGMA_NPM_TOKEN=figp_... npm install @clube-bravos/design-system
   ```

3. **Carregar a fonte Poppins** — adicione no `<head>` do `index.html` do app:

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link
     href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
     rel="stylesheet"
   />
   ```

   > O `fonts.css` do pacote **não** faz mais `@import` remoto da Poppins — ele só
   > declara as variáveis `--font-heading` / `--font-body`. Um `@import url()` dentro
   > de um CSS distribuído é reordenado depois de outras regras no bundle do app
   > (Vite avisa: _"@import must precede all other statements"_). Carregar via `<link>`
   > evita isso e ainda é mais rápido (sem `@import` render-blocking encadeado).

4. **Usar**:

   ```tsx
   import { BravosButton } from '@clube-bravos/design-system';
   import '@clube-bravos/design-system/styles';
   import '@clube-bravos/design-system/fonts';

   <BravosButton variant="primary">Olá</BravosButton>
   ```

## Segurança

- **`.npmrc` nunca vai pro git** — está em `.gitignore`. Tokens só ficam em:
  - Variável segura `FIGMA_NPM_TOKEN` no Bitbucket Pipelines.
  - `.npmrc` local da máquina do dev.
- Se um token vazar (commit acidental, screenshot, etc.), **revogá-lo imediatamente** em Figma → Settings → Account → Personal access tokens e emitir um novo.

## Troubleshooting

- **`npm publish` falha com 401**: token expirado ou faltando `FIGMA_NPM_TOKEN` no Bitbucket.
- **`npm publish` falha com 409 / "cannot publish over existing version"**: a versão em `package.json` já existe no registry. Bumpe via `npm run release` antes de fazer push da tag.
- **`commitlint` falhando em PR**: algum commit do PR não está no formato Conventional Commits. Rebase/edit + force push.
- **Sem `.d.ts` no `dist/`**: garanta que `tsconfig.lib.json` tem `"noEmit": false` (o `tsconfig.json` base tem `noEmit: true`, e o `lib` precisa sobrescrever).
