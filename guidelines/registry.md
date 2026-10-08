# Consuming the Clube Bravos registry

The components are distributed as a shadcn registry on GitHub Pages, namespaced `@clube-bravos`.

## One-time setup

Add the registry to your `components.json`:

```json
{
  "registries": {
    "@clube-bravos": "https://ombrello-seguros.github.io/clube-bravos-design-system/r/{name}.json"
  }
}
```

For a pinned version, point at a tagged snapshot instead:
`https://ombrello-seguros.github.io/clube-bravos-design-system/vX.Y.Z/r/{name}.json`

## Adding components

```bash
npx shadcn add @clube-bravos/clube-bravos-theme    # tokens/theme — install once
npx shadcn add @clube-bravos/clube-bravos-soft-bento  # tokens cb-* (Soft Bento) — install once
npx shadcn add @clube-bravos/bravos-button
npx shadcn add @clube-bravos/bravos-wizard-footer  # pulls button + theme automatically
```

`registryDependencies` resolve through the same `@clube-bravos` config — no manual URLs.

### Soft Bento (`cb-*`) tokens

`bravos-button`, `bravos-badge`, `bravos-card`, `bravos-input` and `bravos-wizard-footer` are styled with
the `cb-*` tokens (`bg-cb-primary`, `rounded-cb-control`, `font-cb-body`, `shadow-cb-card`, …). They pull
`clube-bravos-soft-bento`, which writes `src/styles/soft-bento.css` (`:root` vars + `@theme inline` +
`@utility`). shadcn does not wire the import for you — import it in your Tailwind entry CSS **after**
`theme.tokens.css`:

```css
@import 'tailwindcss';
@import './theme.tokens.css';
@import './soft-bento.css';
```

Fonts (`DM Sans`, `Bricolage Grotesque`, `Instrument Sans`, `IBM Plex Mono`) are referenced by name with
system fallbacks; load them in the app (`<link>` / `@font-face`).
