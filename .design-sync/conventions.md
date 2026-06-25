# Clube Bravos — design context

Prepend this to any generation prompt (v0, Lovable, Figma Make, Claude). It is the shared
contract that keeps generated screens on-brand and consistent across tools. Reference tokens
**by name**, never by value — names are stable and impossible to mistype.

`@clube-bravos/design-system` is a **Tailwind-v4 + React** library. No theme provider: render
components and load the bundled stylesheet (`@clube-bravos/design-system/styles`). Headings use
Poppins (loaded by the app via `<link>`); body uses Arial.

## Brand authority (source of truth: manual → site → lib)

The brand manual (`src/imports/manual_da_marca_clube_bravos.pdf`) defines **only two colors**:
cyan `rgb(0,164,213)` (Pantone 312C) and gray `rgb(157,157,156)`. Everything else is off-manual:

- `bravos-purple` `#2C2879` — off-manual; source of truth is the site (prices). Used for dark sections/titles.
- `bravos-yellow` — off-manual accent (ratings). `bravos-green` — WhatsApp only (external brand).
- `bravos-cyan-light/dark`, `bravos-gray-light/dark` — derived tints of the two official colors.

Typography: the manual specifies **Geometos** (titles) + **Arial** (body). The lib substitutes **Poppins**
for Geometos (Geometos is a commercial font). Don't introduce other heading fonts.

Rule for generators: snap any near-official color to the named token; never invent a new brand color.

## Color — use the named utilities

| Role | Class |
|---|---|
| Primary | `bg-bravos-cyan` `text-bravos-cyan` `border-bravos-cyan` |
| Cyan light / dark (hover) | `bravos-cyan-light` / `bravos-cyan-dark` |
| Purple (dark sections, titles) | `bravos-purple` / `bravos-purple-dark` |
| Yellow (ratings, accents) | `bravos-yellow` |
| Green (WhatsApp only) | `bravos-green` |
| Grays | `bravos-gray` / `bravos-gray-light` / `bravos-gray-dark` |

Semantic aliases also exist: `bg-primary`, `bg-secondary`, `bg-muted`, `text-foreground`,
`border-border`, `ring-ring`. Foundation tokens live in `:root` — type `--text-xs…--text-6xl`,
radii `--r-xs…--r-2xl`/`--r-full`, spacing `--s-1…--s-8`, shadows `--shadow-sm…--shadow-xl`
+`--shadow-cyan`. For spacing/radius prefer Tailwind's own scale.

## Rules

1. Brand colors via the `bravos-*` classes above — **never** literal `bg-[rgb(...)]`.
2. Headings get Poppins: `style={{ fontFamily: 'var(--font-heading)' }}`. Body needs nothing.
3. Reuse a `Bravos*` component before generating new markup. Generate fresh only when none fits.
4. Brand cyan is the primary action color; purple is for dark/title surfaces; green is WhatsApp-only.

## Components (reuse these)

Atoms — `BravosButton` (variant primary/secondary/outline/ghost · size sm/md/lg), `BravosBadge`,
`BravosInput` (label/error), `BravosCard` (default/highlight), `BravosProductCard`,
`BravosTestimonial`, `BravosContactForm`, `WhatsAppButton` (fixed FAB).
Sections — `BravosHeader`, `BravosHero`, `BravosProductsSection`, `BravosHowItWorks`,
`BravosTestimonials` (carousel), `BravosFooter`, `BravosSignupSheet` (overlay; `open`/`plan`/`onClose`),
`WaveDown`/`WaveUp` (SVG dividers, any `color`).

For exact props, read the component's `.d.ts`.

## Idiomatic snippet

```tsx
import { BravosButton, BravosCard } from '@clube-bravos/design-system';

export function PlanTeaser() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-bravos-purple mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}>
        Seus benefícios
      </h2>
      <BravosCard>
        <p className="text-gray-700 mb-4">Tudo num clube só, com custo menor.</p>
        <BravosButton variant="primary" size="lg">Quero ser Bravos</BravosButton>
      </BravosCard>
    </section>
  );
}
```
