# Clube Bravos Design System — how to build with it

A **Tailwind-first** React component library (`@clube-bravos/design-system`). No theme
provider or context is required — every component is self-contained. Just render the
components and make sure the bundled stylesheet is loaded (`_ds/<folder>/styles.css`,
which `@import`s the component CSS and the Poppins web font). Without that stylesheet the
brand fonts/tokens are missing.

## Styling idiom

Write **Tailwind utility classes** for your own layout glue, exactly like the library does.
The brand palette is applied as literal `rgb()` arbitrary values (the components use these
verbatim) — the same values are also exposed as CSS variables in the loaded stylesheet:

| Role | Tailwind arbitrary value | CSS var |
|---|---|---|
| Primary (cyan) | `bg-[rgb(0,164,213)]` `text-[rgb(0,164,213)]` | `--bravos-cyan` |
| Cyan hover/dark | `rgb(51,188,229)` / `rgb(0,131,170)` | `--bravos-cyan-light` / `--bravos-cyan-dark` |
| Purple (dark sections, titles) | `bg-[rgb(46,49,146)]` | `--bravos-purple` |
| Yellow (ratings, accents) | `text-[rgb(255,193,7)]` | `--bravos-yellow` |
| Green (WhatsApp only) | `bg-[rgb(37,211,102)]` | `--bravos-green` |
| Grays | `rgb(157,157,156)` / `rgb(230,230,230)` / `rgb(100,100,100)` | `--bravos-gray*` |

Foundation tokens also live in the stylesheet (`:root`): type scale `--text-xs … --text-6xl`,
radii `--r-xs … --r-2xl` / `--r-full`, spacing `--s-1 … --s-8`, shadows `--shadow-sm … --shadow-xl`
+ `--shadow-cyan`. Prefer Tailwind's own scale for spacing/radius; reach for the vars when you
need an exact brand value.

**Headings use Poppins**, body uses Arial. Apply Poppins explicitly on headings:
`style={{ fontFamily: 'Poppins, Arial, sans-serif' }}` (or `var(--font-heading)`). Body text
needs nothing.

## Components

Atoms: `BravosButton` (variant primary/secondary/outline/ghost · size sm/md/lg),
`BravosBadge`, `BravosInput` (label/error), `BravosCard` (default/highlight),
`BravosProductCard`, `BravosTestimonial`, `BravosContactForm`, `WhatsAppButton` (fixed FAB).
Page sections: `BravosHeader`, `BravosHero`, `BravosProductsSection`, `BravosHowItWorks`,
`BravosTestimonials` (carousel), `BravosFooter`, `BravosSignupSheet` (fixed overlay, drive
with `open`/`plan`/`onClose`), and `WaveDown` / `WaveUp` (SVG section dividers, any `color`).
Read each component's `.prompt.md` and `.d.ts` for its exact props before using it.

## Idiomatic snippet

```tsx
import { BravosButton, BravosCard } from '@clube-bravos/design-system';

export function PlanTeaser() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-[rgb(46,49,146)] mb-6"
          style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
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
