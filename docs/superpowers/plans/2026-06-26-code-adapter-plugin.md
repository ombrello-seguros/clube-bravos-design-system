# code-adapter Figma Codegen Plugin — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Figma Dev Mode codegen plugin that emits Bravos component JSX + `shadcn add` for recognized Design Kit nodes (token-JSX fallback otherwise), driven by a map generated from the shadcn registry.

**Architecture:** The design-system repo adds a `figma` field to registry items and a `build:figma-map` step emitting `public/figma-map.json`. The `code-adapter` plugin syncs that file at prebuild, bundles it with esbuild into `code.js`, and its `generate` handler resolves the selected node against the map, extracts props from Figma `componentProperties`, and emits code via pure functions.

**Tech Stack:** TypeScript, style-dictionary/shadcn registry (existing, sub-project 1), esbuild (plugin bundler), tsx, vitest (node), Figma Plugin API (`@figma/plugin-typings`, dynamic-page, codegen).

## Global Constraints

- Two repos: `clubebravos-design-system` (Tasks 1; branch `design/code-adapter-plugin`, already checked out) and `code-adapter` (Tasks 2-4; sibling dir `../code-adapter`, work on branch `feat/codegen-adapter`).
- The plugin runtime has NO network (`manifest.networkAccess: "none"`) and NO LLM/MCP — deterministic mapping only. The map MUST be bundled, not fetched.
- `documentAccess: "dynamic-page"` → `mainComponent` is read via `await node.getMainComponentAsync()`.
- Map source of truth = the registry's `figma` metadata; `figma-map.json` is generated, never hand-edited.
- v1 covers only `bravos-button` + `bravos-wizard-footer`; every other node uses the token fallback.
- Kit names (`"Button"`, property names/values) are ASSUMPTIONS — verify against the real Figma kit before authoring the map. The footer node is named `footer-bar` (confirmed, kit node 56:531).
- `Bravos*` components ship as-is (clsx); the plugin emits references to them, doesn't reimplement them.

---

## File Structure

**design-system repo:**
- `registry.json` — add a `figma` field to the two component items.
- `scripts/build-figma-map.ts` — Create. Reads `registry.json`, emits `public/figma-map.json`.
- `public/figma-map.json` — Generated.
- `tests/figma-map.test.ts` — Create.
- `package.json` — add `build:figma-map` script; chain it into `build:lib`.

**code-adapter repo (`../code-adapter`):**
- `esbuild.config.mjs` — Create. Bundles `src/code.ts` → `code.js`.
- `scripts/sync-map.ts` — Create. Copies the generated map into `src/figma-map.json`.
- `src/figma-map.json` — Synced artifact (gitignored).
- `src/adapter.ts` — Create. Pure functions: `resolve`, `extractProps`, `emit`, `emitFallback` + types.
- `src/code.ts` — Modify. Async `generate` handler using the map + adapter.
- `tests/adapter.test.ts` — Create.
- `manifest.json` — Modify `codegenLanguages`.
- `package.json` — add esbuild/tsx/vitest, `build`/`prebuild`/`test` scripts.

---

### Task 1: registry `figma` metadata + `build:figma-map` (design-system repo)

**Files:**
- Modify: `registry.json` (add `figma` to `bravos-button` + `bravos-wizard-footer`)
- Create: `scripts/build-figma-map.ts`
- Create: `tests/figma-map.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `npm run build:figma-map` → `public/figma-map.json`, an object keyed by `figma.node`, each value `{ component: string, import: string, registryItem: string, props: PropRule[] }` where `PropRule = { figma: string, prop: string, kind: 'variant'|'text'|'boolean', map?: Record<string,string> }`. This is the exact shape the plugin (Task 3) consumes.

- [ ] **Step 1: Verify the real kit names**

Work from `/Users/danilo/Work/Ombrello/ClubeBravos/clubebravos-design-system`. Use the Figma MCP (via ToolSearch: `mcp__claude_ai_Figma__get_metadata` / `get_design_context`) on file `1p9gqZyVRDiVrtOzvicDis` to find the Button component's exact name and its component-property names + values (e.g. is the variant property "Variant"? are values "Primary"/"Secondary"?), and confirm the footer node name `footer-bar`. Record the real names — the map keys/values in Step 2 MUST match them. If the Button component cannot be located, use the node name shown in Dev Mode and report the assumption.

- [ ] **Step 2: Add `figma` to the two items in `registry.json`**

On `bravos-button` (use the REAL names from Step 1 in place of the assumed ones):
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
On `bravos-wizard-footer`:
```json
"figma": {
  "node": "footer-bar",
  "component": "BravosWizardFooter",
  "import": "@/components/bravos/BravosWizardFooter",
  "props": [ { "figma": "Summary", "prop": "summary", "kind": "text" } ]
}
```

- [ ] **Step 3: Write `scripts/build-figma-map.ts`**

```ts
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

type PropRule = { figma: string; prop: string; kind: 'variant' | 'text' | 'boolean'; map?: Record<string, string> };
type FigmaMeta = { node: string; component: string; import: string; props?: PropRule[] };
type Item = { name: string; figma?: FigmaMeta };

const manifest = JSON.parse(readFileSync('registry.json', 'utf8')) as { items: Item[] };
const map: Record<string, { component: string; import: string; registryItem: string; props: PropRule[] }> = {};
const seen = new Set<string>();

for (const item of manifest.items) {
  if (!item.figma) continue;
  const { node, component, import: imp, props = [] } = item.figma;
  if (seen.has(node)) throw new Error(`[build-figma-map] duplicate figma.node "${node}"`);
  seen.add(node);
  map[node] = { component, import: imp, registryItem: item.name, props };
}

const dest = 'public/figma-map.json';
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, JSON.stringify(map, null, 2) + '\n');
console.log(`wrote ${dest} (${Object.keys(map).length} entries)`);
```

- [ ] **Step 4: Add the script + chain into build:lib (`package.json`)**

Add to `scripts`: `"build:figma-map": "tsx scripts/build-figma-map.ts"`.
Change `build:lib` so its generation prefix becomes `npm run build:tokens && npm run build:registry && npm run build:figma-map && <rest unchanged>`.

- [ ] **Step 5: Generate the map**

Run: `npm run build:registry && npm run build:figma-map`
Expected: `public/figma-map.json` written with 2 entries.

- [ ] **Step 6: Write `tests/figma-map.test.ts`** (robust to the verified node names — assert by `registryItem`, not by kit key)

```ts
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const map = JSON.parse(readFileSync(new URL('../public/figma-map.json', import.meta.url), 'utf8')) as Record<string, any>;
const entries = Object.values(map);

describe('figma-map', () => {
  it('contains the two v1 components by registryItem', () => {
    const items = entries.map((e) => e.registryItem);
    expect(items).toContain('bravos-button');
    expect(items).toContain('bravos-wizard-footer');
  });
  it('every entry has component, import, registryItem, props[]', () => {
    for (const e of entries) {
      expect(typeof e.component).toBe('string');
      expect(typeof e.import).toBe('string');
      expect(typeof e.registryItem).toBe('string');
      expect(Array.isArray(e.props)).toBe(true);
    }
  });
  it('the button entry maps a variant prop', () => {
    const btn = entries.find((e) => e.registryItem === 'bravos-button');
    const rule = btn.props.find((p: any) => p.prop === 'variant');
    expect(rule.kind).toBe('variant');
    expect(rule.map).toBeTruthy();
  });
});
```

- [ ] **Step 7: Run the test**

Run: `npx vitest run --project unit tests/figma-map.test.ts`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add registry.json scripts/build-figma-map.ts public/ package.json tests/figma-map.test.ts
git commit -m "feat(registry): figma metadata + build:figma-map for the codegen plugin"
```

---

### Task 2: plugin build pipeline — esbuild + sync + vitest (code-adapter repo)

**Files:**
- Create: `esbuild.config.mjs`, `scripts/sync-map.ts`
- Modify: `package.json`, `.gitignore`

**Interfaces:**
- Produces: `npm run build` in `../code-adapter` → bundles `src/code.ts` (and its imports + `src/figma-map.json`) into `code.js`. `npm run prebuild` copies the design-system map into `src/figma-map.json`. `npm test` runs vitest (node).

- [ ] **Step 1: Branch the plugin repo**

```bash
cd ../code-adapter
git rev-parse HEAD >/dev/null 2>&1 && git checkout -b feat/codegen-adapter || (git add -A && git commit -m "chore: scaffold" && git checkout -b feat/codegen-adapter)
```
(If the repo has no commits yet, the `||` branch makes an initial commit first.)

- [ ] **Step 2: Install dev deps**

Run (in `../code-adapter`): `npm i -D esbuild tsx vitest`
Expected: all three in `devDependencies`.

- [ ] **Step 3: Write `esbuild.config.mjs`**

```js
import { build } from 'esbuild';

await build({
  entryPoints: ['src/code.ts'],
  bundle: true,
  outfile: 'code.js',
  target: 'es2017',
  format: 'iife',
  loader: { '.json': 'json' },
  logLevel: 'info',
});
```

- [ ] **Step 4: Write `scripts/sync-map.ts`**

```ts
import { copyFileSync, existsSync } from 'node:fs';

const src = '../clubebravos-design-system/public/figma-map.json';
const dest = 'src/figma-map.json';
if (!existsSync(src)) {
  throw new Error(`[sync-map] ${src} not found — run "npm run build:figma-map" in the design-system repo first`);
}
copyFileSync(src, dest);
console.log(`[sync-map] copied ${src} -> ${dest}`);
```

- [ ] **Step 5: Wire scripts + gitignore (`package.json`, `.gitignore`)**

In `package.json` `scripts`, set:
```json
"prebuild": "tsx scripts/sync-map.ts",
"build": "node esbuild.config.mjs",
"test": "vitest run"
```
Append `src/figma-map.json` and `code.js` to `.gitignore` (both are build artifacts).

- [ ] **Step 6: Verify sync + build (the design-system map must exist from Task 1)**

Run: `npm run build`
Expected: prebuild prints `[sync-map] copied …`, then esbuild writes `code.js`. `src/figma-map.json` exists.
(If `code.ts` is still the default template, the build of the placeholder is fine — it just must bundle.)

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json esbuild.config.mjs scripts/sync-map.ts .gitignore
git commit -m "build: esbuild bundle + figma-map sync + vitest"
```

---

### Task 3: pure adapter functions + unit tests (code-adapter repo)

**Files:**
- Create: `src/adapter.ts`, `tests/adapter.test.ts`

**Interfaces:**
- Consumes: the `figma-map.json` shape from Task 1.
- Produces: `resolve(map, name)`, `extractProps(entry, componentProperties)`, `emit(entry, props)`, `emitFallback(opts)` — the functions Task 4's handler calls. Signatures fixed in Step 1.

- [ ] **Step 1: Write `src/adapter.ts`**

```ts
export type PropRule = { figma: string; prop: string; kind: 'variant' | 'text' | 'boolean'; map?: Record<string, string> };
export type MapEntry = { component: string; import: string; registryItem: string; props: PropRule[] };
export type FigmaMap = Record<string, MapEntry>;
export type ComponentProps = Record<string, { type: string; value: string | boolean }>;

export function resolve(map: FigmaMap, name: string | null | undefined): MapEntry | null {
  if (!name) return null;
  return map[name] ?? null;
}

export function extractProps(entry: MapEntry, componentProperties: ComponentProps): Record<string, unknown> {
  // Figma keys carry an id suffix, e.g. "Variant#12:0" — index by the prefix before '#'.
  const byPrefix: Record<string, string | boolean> = {};
  for (const [key, val] of Object.entries(componentProperties)) {
    byPrefix[key.split('#')[0]] = val.value;
  }
  const out: Record<string, unknown> = {};
  for (const rule of entry.props) {
    if (!(rule.figma in byPrefix)) continue;
    const raw = byPrefix[rule.figma];
    if (rule.kind === 'variant') out[rule.prop] = rule.map?.[String(raw)] ?? String(raw);
    else if (rule.kind === 'text') out[rule.prop] = String(raw);
    else if (rule.kind === 'boolean') out[rule.prop] = Boolean(raw);
  }
  return out;
}

export function emit(entry: MapEntry, props: Record<string, unknown>): { code: string; install: string } {
  const children = props.children;
  const attrs = Object.entries(props)
    .filter(([k]) => k !== 'children')
    .map(([k, v]) => (typeof v === 'string' ? `${k}="${v}"` : `${k}={${JSON.stringify(v)}}`))
    .join(' ');
  const open = attrs ? `${entry.component} ${attrs}` : entry.component;
  const jsx = children !== undefined && children !== '' ? `<${open}>${children}</${entry.component}>` : `<${open} />`;
  const code = `import { ${entry.component} } from '${entry.import}';\n\n${jsx}`;
  return { code, install: `npx shadcn add ${entry.registryItem}` };
}

export function emitFallback(opts: { name: string; text?: string; className?: string }): string {
  const cls = opts.className ?? 'text-foreground';
  return `{/* token-fallback: unmapped node "${opts.name}" — adjust markup */}\n<div className="${cls}">${opts.text ?? ''}</div>`;
}
```

- [ ] **Step 2: Write the failing tests `tests/adapter.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { resolve, extractProps, emit, emitFallback, type FigmaMap } from '../src/adapter';

const MAP: FigmaMap = {
  Button: {
    component: 'BravosButton',
    import: '@/components/bravos/BravosButton',
    registryItem: 'bravos-button',
    props: [
      { figma: 'Variant', prop: 'variant', kind: 'variant', map: { Primary: 'primary', Outline: 'outline' } },
      { figma: 'Size', prop: 'size', kind: 'variant', map: { MD: 'md' } },
      { figma: 'Label', prop: 'children', kind: 'text' },
    ],
  },
};

describe('resolve', () => {
  it('returns the entry on a hit', () => expect(resolve(MAP, 'Button')?.component).toBe('BravosButton'));
  it('returns null on a miss or empty name', () => {
    expect(resolve(MAP, 'Nope')).toBeNull();
    expect(resolve(MAP, null)).toBeNull();
  });
});

describe('extractProps', () => {
  it('maps variant values and text through the #id suffix', () => {
    const props = extractProps(MAP.Button, {
      'Variant#1:0': { type: 'VARIANT', value: 'Primary' },
      'Size#1:1': { type: 'VARIANT', value: 'MD' },
      'Label#1:2': { type: 'TEXT', value: 'Próximo step' },
    });
    expect(props).toEqual({ variant: 'primary', size: 'md', children: 'Próximo step' });
  });
  it('falls back to the raw value when not in the map', () => {
    const props = extractProps(MAP.Button, { 'Variant#1:0': { type: 'VARIANT', value: 'Ghost' } });
    expect(props.variant).toBe('Ghost');
  });
});

describe('emit', () => {
  it('emits import + JSX with attrs and children', () => {
    const { code, install } = emit(MAP.Button, { variant: 'primary', size: 'md', children: 'Próximo step' });
    expect(code).toContain("import { BravosButton } from '@/components/bravos/BravosButton';");
    expect(code).toContain('<BravosButton variant="primary" size="md">Próximo step</BravosButton>');
    expect(install).toBe('npx shadcn add bravos-button');
  });
  it('self-closes when there are no children', () => {
    const { code } = emit(MAP.Button, { variant: 'primary' });
    expect(code).toContain('<BravosButton variant="primary" />');
  });
});

describe('emitFallback', () => {
  it('produces a scaffold naming the node', () => {
    const out = emitFallback({ name: 'Mystery', text: 'Hi', className: 'bg-primary' });
    expect(out).toContain('token-fallback: unmapped node "Mystery"');
    expect(out).toContain('<div className="bg-primary">Hi</div>');
  });
});
```

- [ ] **Step 3: Run tests to verify they fail then pass**

Run: `npx vitest run tests/adapter.test.ts`
Expected: PASS (adapter.ts written in Step 1). If any fail, fix `adapter.ts` until green.

- [ ] **Step 4: Commit**

```bash
git add src/adapter.ts tests/adapter.test.ts
git commit -m "feat(adapter): pure resolve/extractProps/emit/emitFallback + tests"
```

---

### Task 4: generate handler + manifest + final build (code-adapter repo)

**Files:**
- Modify: `src/code.ts`, `manifest.json`

**Interfaces:**
- Consumes: `src/figma-map.json` (synced), `src/adapter.ts` (Task 3).

- [ ] **Step 1: Rewrite `src/code.ts`**

```ts
import figmaMap from './figma-map.json';
import { resolve, extractProps, emit, emitFallback, type FigmaMap, type ComponentProps } from './adapter';

const MAP = figmaMap as FigmaMap;

figma.codegen.on('generate', async (event): Promise<CodegenResult[]> => {
  const node = event.node;
  const main = node.type === 'INSTANCE' ? await node.getMainComponentAsync() : null;
  const entry = resolve(MAP, main?.name ?? node.name);

  if (entry) {
    const componentProperties =
      node.type === 'INSTANCE' ? (node.componentProperties as unknown as ComponentProps) : {};
    const props = extractProps(entry, componentProperties);
    const { code, install } = emit(entry, props);
    return [
      { title: 'Clube Bravos — component', language: 'TYPESCRIPT', code },
      { title: 'Install', language: 'BASH', code: install },
    ];
  }

  const text = node.type === 'TEXT' ? node.characters : '';
  return [
    {
      title: 'Clube Bravos — token JSX',
      language: 'TYPESCRIPT',
      code: emitFallback({ name: node.name, text }),
    },
  ];
});
```

- [ ] **Step 2: Update `manifest.json` `codegenLanguages`**

Replace the placeholder entry with:
```json
"codegenLanguages": [
  { "label": "Clube Bravos (TSX)", "value": "tsx" }
]
```
Leave `capabilities: ["codegen"]`, `editorType: ["dev"]`, `documentAccess: "dynamic-page"`, `networkAccess: { "allowedDomains": ["none"] }` unchanged.

- [ ] **Step 3: Build the plugin**

Run: `npm run build`
Expected: `[sync-map] copied …`, esbuild writes `code.js`, no type/bundle errors. `code.js` contains the bundled adapter + map.

- [ ] **Step 4: Run the full plugin test suite**

Run: `npm test`
Expected: adapter tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/code.ts manifest.json code.js
git commit -m "feat(codegen): generate handler wiring map + adapter; manifest codegenLanguages"
```

- [ ] **Step 6: Manual integration check (record in the report, cannot be automated)**

In Figma desktop, Dev Mode → Plugins → import `code-adapter` (Import plugin from manifest). Open the Clube Bravos Design Kit, select the Button component, confirm the codegen panel shows `<BravosButton …>` + `npx shadcn add bravos-button`. Select the `footer-bar`, confirm `<BravosWizardFooter summary=…>`. Select any unmapped node, confirm the token-fallback scaffold. Note the outcome (or "deferred — no Figma desktop access") in the task report.

---

## Self-Review

**Spec coverage:**
- registry `figma` metadata + `build:figma-map` (generated map, unique-node validation) — Task 1. ✓
- Approach A: sibling-repo sync + esbuild bundle — Task 2. ✓
- Pure functions resolve/extractProps/emit/emitFallback — Task 3. ✓
- Async dynamic-page `generate` handler, hybrid output (component + install, or fallback) — Task 4. ✓
- Testing: pure functions (Task 3), map test (Task 1), build smoke (Task 2/4), manual Figma load (Task 4 Step 6). ✓
- Verify-kit-names-first — Task 1 Step 1. ✓
- Out of scope (no task, by design): recursive footer children (emit uses the `summary` text prop only; the children placeholder is inherent to not mapping children), real host URL in install (`npx shadcn add <item>` only), extra components.

**Placeholder scan:** No TBD/TODO. Task 1 Step 1 is a real research action with named MCP tools, not a placeholder. The wizard-footer has no `children` rule, so `emit` self-closes it — acceptable for v1 (the consumer composes actions); noted in the spec's out-of-scope.

**Type consistency:** `PropRule`/`MapEntry`/`FigmaMap`/`ComponentProps` are defined in `src/adapter.ts` (Task 3) and consumed in `src/code.ts` (Task 4). The map shape emitted by `build-figma-map.ts` (Task 1: `{component, import, registryItem, props}`) matches `MapEntry`. `resolve`/`extractProps`/`emit`/`emitFallback` signatures are identical across Tasks 3 and 4.
