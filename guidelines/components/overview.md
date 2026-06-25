# Components

Reuse these before generating new markup. Import from `@clube-bravos/design-system`. For exact
props, read each component's `.d.ts`. Per-component guideline files follow the template in
[button.md](button.md); add one when a component needs more than a catalog line.

## Atoms

| Component | Use for |
|---|---|
| `BravosButton` | actions — variant `primary`/`secondary`/`outline`/`ghost`, size `sm`/`md`/`lg`. See [button.md](button.md) |
| `BravosBadge` | small status/category labels |
| `BravosInput` | text fields with label/error |
| `BravosCard` | content container — `default`/`highlight` |
| `BravosProductCard` | product/plan offering |
| `BravosTestimonial` | a single quote + rating |
| `WhatsAppButton` | fixed WhatsApp FAB |

## Sections

| Component | Use for |
|---|---|
| `BravosHeader` | top nav |
| `BravosHero` | landing hero |
| `BravosProductsSection` | grid of `BravosProductCard` |
| `BravosHowItWorks` | step explainer |
| `BravosTestimonials` | testimonial carousel |
| `BravosContactForm` | contact form (on dark/purple surface) |
| `BravosFooter` | marketing footer (contact + WhatsApp) |
| `BravosSignupSheet` | fixed signup overlay — `open`/`plan`/`onClose` |
| `BravosWizardFooter` | multi-step form nav bar — `summary` + composed action buttons as children |
| `WaveDown` / `WaveUp` / `WaveSection` | SVG section dividers, any `color` |

## Decision: footer

```
Need a footer?
├─ Marketing page (contact, social, WhatsApp) → BravosFooter
└─ Multi-step form / wizard nav (back/next + progress) → BravosWizardFooter
```
