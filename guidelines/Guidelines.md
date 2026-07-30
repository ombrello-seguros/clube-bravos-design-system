# Clube Bravos — building with these components

This project ships exactly the components published in the `@clube-bravos` shadcn
registry (installed via `npx shadcn add @clube-bravos/<item>`) — no more, no less.
There are no page-level "sections" (hero, footer, header) here; compose screens
yourself from these primitives.

## Setup

No provider or root wrapper needed. Every component is a plain function — import
and use directly, no context to satisfy. `styles.css` already carries the brand
tokens, the shadcn base tokens, and a remote `@import` for the Poppins font
(used for headings via `font-heading` / `--font-heading`) — never inline a
second Poppins `<link>`, it's already loaded.

Every component accepts `className`, merged last via `clsx` — extend the
built-in variants instead of overriding them with `!important`-style overrides.

## Styling idiom

Tailwind utility classes. Two token layers, both real and compiled:

| Purpose | Classes |
|---|---|
| Brand primary (CTAs, links, focus) | `bg-bravos-cyan`, `bg-bravos-cyan-dark` (hover), `text-bravos-cyan`, `border-bravos-cyan` |
| Brand accents | `bg-bravos-purple`, `bg-bravos-yellow`, `bg-bravos-green` (WhatsApp only) |
| Brand neutrals | `bg-bravos-gray`, `bg-bravos-gray-light`, `bg-bravos-gray-dark` |
| shadcn semantic tokens | `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border` |
| Plain Tailwind grays | `border-gray-200`, `hover:border-gray-300` — used as-is for card/input borders; don't invent a `bravos-` token for these |

Corner radius defaults to `rounded-lg`/`rounded-xl` (`--radius: 0.5rem`). Don't
hardcode hex — every brand color above resolves through a CSS var
(`--bravos-cyan`, etc.) so it repaints with a future rebrand.

## Components shipped

- `BravosButton` — `variant`: primary/secondary/outline/ghost/neutral, `size`: sm/md/lg.
- `BravosCard` — `variant`: default/highlight (highlight = cyan gradient, white text).
- `BravosBadge` — `variant`: primary/secondary/gray.
- `BravosInput` — `label`, `error` (renders a red border + message under the field).
- `BravosWizardFooter` — bottom bar for multi-step forms: `summary` (progress
  text, left) + `children` (action buttons, right — compose with `BravosButton`).
- `WhatsAppButton` — fixed-position floating action button, `phoneNumber` +
  `message` props. Self-positions `fixed bottom-6 right-6`; don't wrap it in a
  layout container that clips overflow.

## Where the truth lives

Read `styles.css` (and its `@import` closure, `_ds_bundle.css`) before styling
anything by hand — it's the actual compiled CSS, not a summary of it. Each
component's `components/<group>/<Name>/<Name>.prompt.md` and `.d.ts` document
its exact prop surface; read those before composing a new usage.

## Example

```tsx
<BravosCard className="max-w-md">
  <BravosBadge variant="primary">Novo</BravosBadge>
  <h3 className="font-heading text-lg mt-2">Plano Essencial</h3>
  <BravosInput label="E-mail" placeholder="voce@email.com" />
  <BravosWizardFooter summary="v1 · 1 seção · 3 campos">
    <BravosButton variant="outline">Voltar</BravosButton>
    <BravosButton variant="primary">Próximo</BravosButton>
  </BravosWizardFooter>
</BravosCard>
```
