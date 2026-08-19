# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`@clube-bravos/design-system` — React + Tailwind component library, distributed as a **shadcn registry** (`@clube-bravos`, hosted on GitHub Pages) rather than an npm package — consumers run `npx shadcn add @clube-bravos/<item>`, see `guidelines/registry.md`. An **npm-workspaces monorepo**: the design-system at the repo root, plus `packages/code-adapter` (the Figma Dev Mode codegen plugin). `packages/*` are `private`.

## Commands

```bash
npm run dev            # Storybook on :6006 (the dev surface — there is no app)
npm run build:lib      # Build dist/: vite (js) + tsc (.d.ts) + copy-styles (css/assets)
npm run build-storybook
npm run release        # Bump version + CHANGELOG + tag from conventional commits. Does NOT publish.
npm run chromatic      # Visual regression
```

Quality gates: **vitest** unit tests (`npm test` → `vitest run --project unit`, run in CI on main push), **commitlint** (commit-msg hook + PR CI), and **Chromatic** (visual regression). No lint script.

## Architecture

**Published surface is `src/index.ts` only.** It exports the `Bravos*` components and page sections + logo assets. Everything else in `src/app/components/ui/` (~48 shadcn/Radix primitives) and `figma/` is **dev-only base material** from the Figma Make import — not exported, not shipped. Don't add `ui/*` to the public API without a deliberate reason.

**Two component idioms, don't mix them up:**
- `Bravos*` components — hand-authored brand components, plain `clsx`, brand colors as **literal `rgb()` Tailwind arbitrary values** (e.g. `bg-[rgb(0,164,213)]`). These literals are the source of truth; matching CSS vars (`--bravos-cyan`, etc.) live in `src/styles/theme.css`.
- `ui/*` — shadcn primitives using `cn()` (`ui/utils.ts` = `twMerge(clsx(...))`).

Styling is **Tailwind v4** (`@tailwindcss/vite`, no `tailwind.config`). No theme provider/context — components are self-contained. Headings use Poppins applied explicitly (`fontFamily: 'Poppins, Arial, sans-serif'`); the shipped `fonts.css` only declares vars and does **not** `@import` Poppins (consumers load it via `<link>`). See `.design-sync/conventions.md` for the full color/token table.

**Build (`build:lib`) has three steps** because no single tool does it all: vite (`vite.config.lib.ts`) bundles ES+CJS with react/lucide/clsx/tailwind-merge externalized; `tsc --project tsconfig.lib.json` emits `.d.ts` (base `tsconfig.json` is `noEmit: true` — lib overrides it); `scripts/copy-styles.ts` copies `theme.css`/`fonts.css` + logos into `dist/`.

**Dependency split is intentional:** `dependencies` = runtime only (`clsx`, `lucide-react`, `tailwind-merge`); the large `devDependencies` (MUI, all Radix, etc.) back the dev/preview surface and never reach consumers. `files: ["dist", ...]` restricts what `npm pack` includes — kept for local packing/testing (`pack:test`), though nothing publishes this tarball to a registry anymore; shadcn-registry consumers get raw `src/` files copied in via `npx shadcn add`, not `dist/`.

## Release & publish

Conventional Commits enforced (`feat`→minor, `fix`→patch, `feat!`/`BREAKING CHANGE`→major). `release.sh` only prepares the bump+tag locally. **The shadcn registry publishes in CI on push to `main` or `v*` tag push** → `git push origin main && git push origin vX.Y.Z`. CI is GitHub Actions: `.github/workflows/ci.yml` runs commitlint (PRs) + build/test (main push); `.github/workflows/registry-pages.yml` builds `registry.json` → `public/r/*.json` and publishes to the `gh-pages` branch (tags land in a versioned `vX.Y.Z/` subdir). No secrets beyond the default `GITHUB_TOKEN` are required. There is no npm publish step — the Figma npm registry this project used to publish to is discontinued; `package.json` still builds `dist/` (`build:lib`) for local packing/testing, but nothing ships it to a registry. Full consumer/troubleshooting details are in `README.md` and `guidelines/registry.md`.

## design-sync

`.ds-sync/` and `ds-bundle/` are gitignored working state for the claude.ai/design sync tooling; `.design-sync/` holds the committed config + conventions. These are generated/tooling artifacts — don't hand-edit them as if they were source.
