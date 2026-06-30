# design-sync notes — @clube-bravos/design-system

Shape: **storybook**. Project: `ca6f7933-55f0-4a17-961f-9151e294e240` (Clube Bravos Design System).
Entry: `dist/index.mjs` (DS's own source repo — no `node_modules/<pkg>`, hence `--entry`).
Build before converter: `npm run build:lib`. Reference storybook: `.design-sync/sb-reference`.

## General learnings

- [GENERAL] Story titles are grouped `Components/<Leaf>` and `Sections/<Leaf>` (ASCII so the portal card group isn't a mangled slug), but exports are `Bravos<Name>`. `cfg.titleMap` maps each whitespace-stripped leaf → export. `Foundations` is mapped to `null` (doc-only stories, no component export — excluded).
- [GENERAL] `[CSS_FROM_STORYBOOK]` — the package ships no standalone component CSS sidecar (Tailwind is compiled per-app), so the converter scrapes the compiled CSS out of `sb-reference`. This is expected and is the source of `_ds_bundle.css`.
- [GENERAL] `[TOKENS_MISSING]` lists `--radix-*`, `--sidebar-width`, `--skeleton-width` etc. — runtime vars set by the bundled shadcn `ui/*` primitives at render time. Expected/absent by design; not used by the Bravos components' stories.
- [GENERAL] `[FONT_REMOTE]` Poppins — loaded via a remote `@import`/`<link>` at runtime (the repo deliberately does NOT bundle Poppins; see commit 9658d59). `.storybook/preview-head.html` adds the Google Fonts link so the reference renders with the real font.

## Per-component

- **BravosButton**, **BravosCard** → `cardMode: "column"` (stories render wider than a grid cell).
- **WhatsAppButton** → `cardMode: "single"` (fixed FAB). Its story has an `h-[320px]` decorator giving the card height, so it captures fine.
- **BravosSignupSheet** → `cardMode: "single"` + `viewport: "1200x760"` **and an owned preview** (`.design-sync/previews/BravosSignupSheet.tsx`). The component renders ONLY `position:fixed` elements (backdrop + aside), so the default card collapses to height 0 and captured blank. The owned preview wraps it in a sized `transform: translateZ(0)` container that establishes a containing block for the fixed children. The shipped component in `_ds_bundle.js` is unchanged.
- **WaveDown** → `[RENDER_THIN]` is expected: it's a decorative SVG wave divider with no text. Renders the correct cyan shape; accepted.

## Re-sync risks (watch-list)

- **Owned preview `BravosSignupSheet.tsx`** is tied to the component's API (`open`/`plan`/`onClose`). If those props change, update the owned preview or it silently mis-renders. **It was accidentally deleted in commit `14c8221` (color-scheme update) and restored in the 2026-06-30 sync** — without it the component captures blank (`[RENDER_BLANK]`). It is gitignored-adjacent only by being uncommitted; keep it committed so the next sync has it.
- **Conventions header is empty.** `readmeHeader` → `.design-sync/conventions.md` → symlink → `guidelines/Guidelines.md`, which is a 0-byte file. The uploaded README therefore carries only the auto-generated body (no hand-authored design-agent conventions). Fill `guidelines/Guidelines.md` and re-sync to ship a real header.
- **Gradient placeholders**: `BravosHero`, `BravosHowItWorks`, and `BravosProductsSection` ship CSS-gradient placeholders where photos will eventually go (mirrors the portal design). Graded `match` against the same placeholders in storybook — when real images land, re-verify.
- **Poppins is remote** — if the font host is unreachable at build time the reference still renders (fallback), but `[FONT_MISSING]` would not catch a wrong font since both sides fall back the same. Keep the `preview-head.html` link current.
- **Storybook upgraded to v10.4.6** mid-setup; `addon-essentials` was replaced by `@storybook/addon-docs` (core). A future toolchain bump may move this again.
- Story caps: every component has ≤6 stories, so nothing was capped — all stories were captured and graded.
