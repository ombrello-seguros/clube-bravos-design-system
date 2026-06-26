# Design: code-adapter — Figma Dev Mode codegen plugin

Date: 2026-06-25
Status: approved (design)
Sub-project: 2 of 4 (builds on sub-project 1, the tokens + shadcn registry foundation)
Repos: `clubebravos-design-system` (registry metadata + map generation) and `code-adapter` (the plugin)

## Goal

A Figma **Dev Mode codegen plugin** that, when a node from the Clube Bravos Design Kit is selected,
emits standardized code in the Inspect panel: Bravos component JSX + the `shadcn add` command when the
node maps to a known component, falling back to token-mapped JSX otherwise. The node→component map is
**generated from the shadcn registry** so it can't drift from the components.

## Constraints that shape the design

- A Dev Mode codegen plugin runs in Figma's sandbox with **no LLM/MCP and no network** (`networkAccess: "none"`).
  It does **deterministic** mapping from the selected node to a code string. Any LLM/MCP smarts live in the
  agent that reads Figma, not in this plugin runtime.
- No Code Connect on the team's Figma plan — node→component recognition is a committed map, not Code Connect.
- `documentAccess: "dynamic-page"` → reading `mainComponent` is async (`getMainComponentAsync()`).

## Decisions (locked during brainstorming)

- **Output:** hybrid — map to a Bravos component when the node is recognized; fall back to `bravos-*` token JSX otherwise.
- **Recognition:** a committed map keyed by the kit component name; Figma `componentProperties` → React props via rules.
- **Map source of truth:** generated from the registry. Each registry item gets a `figma` field; a build step emits
  `figma-map.json`. Single source, no drift — consistent with tokens.json → everything.
- **Approach A:** the map lives in the design-system repo; the plugin's build copies it from the sibling repo and
  bundles it (esbuild) into the single `code.js`. No new hosting/publishing.
- **v1 scope:** only `bravos-button` and `bravos-wizard-footer` get `figma` metadata; any other node uses the token fallback.

## Architecture — five units across two repos

```
DESIGN-SYSTEM repo                              CODE-ADAPTER repo (Figma plugin)
registry.json (each item gains a "figma" field)
   │ build:figma-map
   ▼
public/figma-map.json  ──── sync (prebuild) ────▶  src/figma-map.json (bundled)
                                                        │ esbuild → code.js (single file)
                                                        ▼
                          Dev Mode select node ──▶ figma.codegen.on('generate')
                                                   resolve → extractProps → emit
                                                        ▼
                               Inspect panel: [Bravos JSX] + [npx shadcn add …]  (or token fallback)
```

1. **registry `figma` metadata** (design-system) — per item: kit node name, component, import path, prop rules. Source of truth.
2. **`build:figma-map`** (design-system) — reads `registry.json`, emits `public/figma-map.json` keyed by `figma.node`, injecting `registryItem` (= item `name`). Depends on (1).
3. **`scripts/sync-map.ts`** (plugin, prebuild) — copies `../clubebravos-design-system/public/figma-map.json` → `src/figma-map.json`. Depends on (2).
4. **pure functions** (`code-adapter/src/adapter.ts`) — `resolve`, `extractProps`, `emit`, `emitFallback`. No `figma` global → unit-testable with mock nodes. Depends on (3) for the map shape.
5. **`code.ts` `generate` handler** — thin async glue: read node, call pure functions, return `CodegenResult[]`. Depends on (3,4).

**Build change in the plugin:** replace `tsc → code.js` with **esbuild** bundling (standard for Figma plugins) so the
imported JSON + adapter module inline into one `code.js`. `networkAccess` stays `"none"`.

## Registry `figma` metadata + map generation

Per-item shape in `registry.json` (button example):
```json
"figma": {
  "node": "Button",
  "component": "BravosButton",
  "import": "@/components/bravos/BravosButton",
  "props": [
    { "figma": "Variant", "prop": "variant", "kind": "variant",
      "map": { "Primary": "primary", "Secondary": "secondary", "Outline": "outline", "Ghost": "ghost" } },
    { "figma": "Size", "prop": "size", "kind": "variant", "map": { "SM": "sm", "MD": "md", "LG": "lg" } },
    { "figma": "Label", "prop": "children", "kind": "text" }
  ]
}
```
Wizard-footer (`node: "footer-bar"`, kit node 56:531): one `text` prop `Summary → summary`.

`build:figma-map` emits `public/figma-map.json` keyed by `figma.node`, each entry carrying
`component`, `import`, `registryItem`, `props`. Validation (test): every `figma.node` is unique;
the map has the expected keys and injected `registryItem`.

Prop `kind`s: `variant` (componentProperty value → `map[value]`), `text` (→ string literal / `children`),
`boolean` (→ boolean prop).

## Plugin internals

- **`resolve(map, name): Entry | null`** — name = resolved kit component name.
- **`extractProps(entry, componentProperties): Record<string,unknown>`** — Figma property names carry an id
  suffix (`"Variant#12:0"`); match by the prefix before `#`. Apply per `kind`.
- **`emit(entry, props): { code, install }`** — split `children` from attribute props; build the import + JSX
  (`<BravosButton variant="primary" size="md">Próximo step</BravosButton>`, self-closing when no children);
  `install` = `npx shadcn add <registryItem>` (the exact registry host URL is deferred to the hosting sub-project).
- **`emitFallback(node): string`** — read `node.boundVariables` (fills/text) → `bg-<name>`/`text-<name>` from the
  semantic variable names the kit binds (`primary`, `muted-foreground`, `border`); inner text; a scaffold comment.
  Shallow mapping only.

`generate` handler is async (`getMainComponentAsync()` under dynamic-page), returns two `CodegenResult` blocks
(component TYPESCRIPT + install BASH) on a hit, or one fallback block on a miss.

## Testing

- **Plugin (vitest, node — new to the repo):** pure functions with mock nodes + a sample map — `resolve` hit/miss;
  `extractProps` handles the `#id` suffix, variant `map`, and text; `emit` produces correct JSX (self-closing vs
  children, attributes, install with the item name); `emitFallback` produces the scaffold.
- **Design-system (extends registry tests):** `build:figma-map` — expected keys, unique `figma.node`, `registryItem` injected.
- **Plugin build:** esbuild produces `code.js` (smoke: builds without error).
- **Integration (manual):** the Figma sandbox can't run in CI — load the plugin in Dev Mode, select the kit `Button`
  and `footer-bar`, confirm the panel shows the expected JSX + `shadcn add`, and an arbitrary node shows the fallback.

## Out of scope

- Recursive children resolution for the wizard-footer (v1 emits `summary` + a children placeholder comment).
- The real registry host URL in the install command (hosting sub-project).
- Code Connect; additional components beyond the two; deep layout reconstruction in the fallback.

## Assumptions to verify against the real kit (before authoring the map)

The example map uses assumed kit names: button component `"Button"`, properties `"Variant"`/`"Size"`/`"Label"`
with values `"Primary"`/`"SM"`/etc. Only `footer-bar` (kit node 56:531) is confirmed. The implementer MUST read
the actual kit structure first (Figma `get_metadata`/`get_design_context` on the Button and footer-bar nodes) and
write the map keys/values to match what the kit really exposes. A wrong name = a silent map miss (falls to fallback).

## Open questions

None blocking. Hosting URL for the install command and broader component coverage are deferred.
