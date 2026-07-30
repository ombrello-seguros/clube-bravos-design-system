# design-sync notes — @clube-bravos/design-system

Shape: **storybook**. Project: `ca6f7933-55f0-4a17-961f-9151e294e240` (Clube Bravos Design System).
Entry: `dist/index.mjs` (DS's own source repo — no `node_modules/<pkg>`, hence `--entry`).
Build before converter: `npm run build:lib`. Reference storybook: `.design-sync/sb-reference`.

**Scope (2026-07-30): registry-only.** cbdigital_frontend consumes this DS exclusively via
`npx shadcn add @clube-bravos/<item>` (copy-in, see its own AGENTS.md) — it never imports the
`Sections` compositions (Hero, Header, Footer, ProductsSection, HowItWorks, Testimonials,
SignupSheet, ProductCard, Testimonial, ContactForm, WaveDown). `titleMap` nulls all of those out
so the Claude Design project shows only what's actually installable: `BravosButton`, `BravosCard`,
`BravosBadge`, `BravosInput`, `BravosWizardFooter`, `WhatsAppButton` (mirrors `registry.json`'s
`registry:component` items). If Sections are ever needed here again, `git log -p .design-sync/config.json`
has the prior full titleMap to restore.

## General learnings

- [GENERAL] Story titles are grouped `Components/<Leaf>` and `Sections/<Leaf>` (ASCII so the portal card group isn't a mangled slug), but exports are `Bravos<Name>`. `cfg.titleMap` maps each whitespace-stripped leaf → export. `Foundations` is mapped to `null` (doc-only stories, no component export — excluded).
- [GENERAL] **Don't assume `leaf === export` needs no mapping — verify it.** `BravosWizardFooter`'s story title is `WizardFooter`, which doesn't match its `Bravos`-prefixed export, exactly like Button/Card/Badge/Input — but it was missing from `titleMap` since the very first sync and silently never made it into the Claude Design project (`[TITLE_UNMAPPED] … dropped: WizardFooter`) even though it's a real registry item. `WhatsAppButton` genuinely doesn't need a mapping (its export has no `Bravos` prefix), which is what made the gap easy to miss. When adding a new registry component, check its story title against its export name explicitly instead of assuming it'll be picked up.
- [GENERAL] `[CSS_FROM_STORYBOOK]` — the package ships no standalone component CSS sidecar (Tailwind is compiled per-app), so the converter scrapes the compiled CSS out of `sb-reference`. This is expected and is the source of `_ds_bundle.css`.
- [GENERAL] `[TOKENS_MISSING]` lists `--radix-*`, `--sidebar-width`, `--skeleton-width` etc. — runtime vars set by the bundled shadcn `ui/*` primitives at render time. Expected/absent by design; not used by the synced components' stories.
- [GENERAL] `[FONT_REMOTE]` Poppins — loaded via a remote `@import`/`<link>` at runtime (the repo deliberately does NOT bundle Poppins; see commit 9658d59). `.storybook/preview-head.html` adds the Google Fonts link so the reference renders with the real font.
- [GENERAL] `dist/` isn't rebuilt automatically before a re-sync — check it against source mtimes. Found `dist/` stale by a day (missing `BravosButton`'s new `neutral` variant, commit `397d890`) during the 2026-07-30 re-sync; had it shipped unrebuilt, the Claude Design bundle would've been missing a real variant with no warning. Always `npm run build:lib` + rebuild `sb-reference` before trusting a re-sync driver run when any component source may have changed.

## Per-component (current scope)

- **BravosButton**, **BravosCard** → `cardMode: "column"` (stories render wider than a grid cell).
- **BravosWizardFooter** → `cardMode: "column"` (added 2026-07-30 — `[GRID_OVERFLOW] wide`, its stories are a full-width bottom bar).
- **WhatsAppButton** → `cardMode: "single"` (fixed FAB). Its story has an `h-[320px]` decorator giving the card height, so it captures fine.

## Excluded from current scope (Sections — kept for history, not synced)

- **BravosSignupSheet** → `cardMode: "single"` + `viewport: "1200x760"` **and an owned preview** (`.design-sync/previews/BravosSignupSheet.tsx`). The component renders ONLY `position:fixed` elements (backdrop + aside), so the default card collapses to height 0 and captured blank. The owned preview wraps it in a sized `transform: translateZ(0)` container that establishes a containing block for the fixed children. If Sections are re-scoped in, restore its `overrides` entry (see git history) — the owned preview file itself was left in place.
- **WaveDown** → `[RENDER_THIN]` is expected: it's a decorative SVG wave divider with no text. Renders the correct cyan shape; accepted.
- **Gradient placeholders**: `BravosHero`, `BravosHowItWorks`, and `BravosProductsSection` ship CSS-gradient placeholders where photos will eventually go. Graded `match` against the same placeholders in storybook — when real images land, re-verify (if re-scoped in).

## Re-sync risks (watch-list)

- **Conventions header authored 2026-07-30** (`guidelines/Guidelines.md`, symlinked from `.design-sync/conventions.md`) — was empty since setup. Covers: no provider needed, the `bravos-*` Tailwind utility vocabulary vs. plain Tailwind grays vs. shadcn semantic tokens, and the 6 shipped components' prop surfaces. Keep it in sync when a component's props change — it's hand-authored and never auto-regenerated.
- **Poppins is remote** — if the font host is unreachable at build time the reference still renders (fallback), but `[FONT_MISSING]` would not catch a wrong font since both sides fall back the same. Keep the `preview-head.html` link current.
- **Storybook upgraded to v10.4.6** mid-setup; `addon-essentials` was replaced by `@storybook/addon-docs` (core). A future toolchain bump may move this again.
- Story caps: every in-scope component has ≤6 stories, so nothing was capped — all stories were captured and graded.
- **`dist/` staleness** (see general learning above) — re-check before every re-sync, not just when a component visibly regresses.
