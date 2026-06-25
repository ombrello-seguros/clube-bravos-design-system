# Design: Clube Bravos tokens + shadcn registry (foundation)

Date: 2026-06-25
Status: approved (design)
Sub-project: 1 of 4 (see Roadmap)

## Goal

Make the Clube Bravos design system the single, tool-neutral source that all registries/codegens
consume (shadcn-primary), so future projects configure it **once** (colors, theme, primitives) and
get standardized output. This sub-project builds the foundation: a canonical token layer and a
shadcn registry, proven by migrating one slice of `cbdigital_frontend`.

## Roadmap (context — only #1 is in scope here)

1. **Tokens + shadcn registry foundation** ← this spec
2. Figma codegen plugin (`code-adapter`) — emits token-friendly code from a selected Dev Mode node
3. (folded into 1/2) token build + Figma sync automation
4. Template/preset so a new project bootstraps the whole stack

## Decisions (locked during brainstorming)

- **Token source of truth:** a neutral `tokens.json` (DTCG) generates everything (shadcn CSS vars,
  Tailwind theme, Figma Variables). Tool-neutral, best for a multi-project template.
- **Registry scope:** existing `Bravos*` components packaged **as-is** (clsx idiom kept, not rewritten
  to cn()/CVA), plus tokens/theme and the shadcn `ui/*` primitives as installable items.
- **Distribution:** pure shadcn — consumers `shadcn add` and **own** the copied source. The npm package
  stays up for now but the registry is the new path; full npm deprecation is out of scope here.
- **Approach A:** everything lives in the `clubebravos-design-system` repo; one-way generation; Figma is
  a generated target (push), not an editing surface.
- **Proof slice:** migrate only the signup **wizard navigation** (footer + buttons) in
  `cbdigital_frontend`. **Host for the proof:** local static serve.

## Architecture — five units

```
tokens/tokens.json ──▶ [token build] ──▶ src/styles/theme.css   (cssVars shadcn + @theme Tailwind)
   (DTCG, only           style-dictionary └▶ tokens.figma.json     (payload for Figma Variables)
    editable config)
                                              │
src/app/components/* ──▶ [registry build] ──▶ public/r/*.json   (theme item + each primitive + each Bravos)
src/app/components/ui/*   scripts/build-registry      │
                                              ▼
                                       [registry host]  →  static JSON served (URL)
                                              │  shadcn add
                                              ▼
                                   cbdigital_frontend (wizard nav slice) — proof
```

1. **`tokens/tokens.json`** — DTCG data; the one config. Groups: `bravos` (brand primitives with
   authority metadata in `$extensions`), `semantic` (primary/secondary/muted/foreground/border…
   aliasing primitives), `foundations` (type scale, radii, spacing, shadows). Light/dark as a mode
   dimension. Depends on nothing.
2. **token build (style-dictionary v4)** — reads tokens.json, emits `theme.css` (`:root` + `.dark` +
   `@theme inline`) and `tokens.figma.json`. Two custom formats (the `@theme inline` map is not a
   stock output). Depends on (1).
3. **registry build (`scripts/build-registry.ts`)** — reads `src/` + token output, emits
   `public/r/<name>.json` per item (`files`, `dependencies`, `registryDependencies`, and for the
   theme item `cssVars`/`tailwind`). Items are generated; `src/` stays the single source of code.
   Depends on (1,2).
4. **registry host** — serves `public/r/*.json` statically. Proof: local (`npx serve public`).
   Depends on (3).
5. **proof consumer** — the front's wizard-nav slice runs `shadcn add <url>`. Depends on (4).

**Key change:** `theme.css` stops being hand-edited and becomes a **generated artifact** of
tokens.json. The brand-authority comments move into tokens.json `$extensions` and are re-emitted.

## Token pipeline & data flow

`registry.json` uses the official shadcn schema. On a token change:

```
edit tokens.json
  → npm run build:tokens   → theme.css regenerated + tokens.figma.json
  → npm run build:registry → public/r/*.json updated
  → host redeploy          → consumers re-add (or just the theme item)
  → Figma: import tokens.figma.json via Tokens Studio (manual now; code-adapter automates in #2)
```

`build:tokens` runs as a 0th step before the existing 3-step `build:lib`. Figma sync is one-way
(push); the kit already exposes matching shadcn semantic variable names (`--primary` #00a4d5,
`--muted-foreground` #9d9d9c, `--border` #0000001a), so the import maps cleanly.

## Registry structure

Item types in `registry.json`:

- **`registry:theme`** — `clube-bravos-theme`: `cssVars` (light/dark) + `tailwind` config, generated
  from tokens. The "configure once" install. All color/theme config lives here.
- **`registry:ui`** — shadcn `ui/*` primitives as installable items (Bravos are self-contained clsx
  and barely depend on them; the wizard slice needs none).
- **`registry:component`** — the `Bravos*`, each with `files` (source copied verbatim), `dependencies`
  (lucide-react, clsx), and `registryDependencies` (e.g. `wizard-footer` → `button`; **all →
  `clube-bravos-theme`** so the `bravos-*` utilities always resolve).

Consumer flow:

```
npx shadcn add <url>/r/clube-bravos-theme.json   # tokens, once
npx shadcn add <url>/r/bravos-button.json        # pulls the theme as a dependency
```

## Proof slice (wizard navigation only)

In `cbdigital_frontend`:
1. Install `clube-bravos-theme` (tokens).
2. `shadcn add bravos-button` + `bravos-wizard-footer`.
3. Replace the wizard's nav (`CBButton` + inline bar) with the registry components.
4. Delete the `CB*` equivalents **for that flow only** (not the whole app).

## Verification

- **Lib:** `tsc` + Storybook/Chromatic (existing gates).
- **Registry:** a script validates `registry.json` against the shadcn schema and confirms every
  `public/r/*.json` resolves (files present, deps listed). This is the unit's runnable check.
- **Proof:** the front builds and the wizard nav renders with brand tokens (front has vitest/playwright).

## Out of scope

- Rewriting `Bravos*` to cn()/CVA idiom.
- Full frontend migration (only the wizard-nav slice).
- The `code-adapter` plugin (sub-project #2).
- Production registry hosting and npm deprecation.

## Open questions

None blocking. Production hosting and Figma-sync automation are deferred to later sub-projects.
