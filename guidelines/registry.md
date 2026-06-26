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
npx shadcn add @clube-bravos/bravos-button
npx shadcn add @clube-bravos/bravos-wizard-footer  # pulls button + theme automatically
```

`registryDependencies` resolve through the same `@clube-bravos` config — no manual URLs.
