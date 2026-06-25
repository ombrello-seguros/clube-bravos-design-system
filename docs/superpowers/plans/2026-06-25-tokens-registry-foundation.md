# Tokens + shadcn Registry Foundation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `tokens.json` the canonical source that generates the Tailwind/shadcn theme, package the design system as a pure shadcn registry, and prove it by migrating the signup-wizard navigation in `cbdigital_frontend`.

**Architecture:** A DTCG `tokens/tokens.json` is built by style-dictionary into a generated `src/styles/theme.tokens.css` (imported by `theme.css`). A `scripts/build-registry.ts` reads `src/` + the token output and emits static `public/r/*.json` registry items (theme + components). The frontend installs them with `shadcn add` from a local static server.

**Tech Stack:** Tailwind v4 (CSS-first, no config), Vite, TypeScript, style-dictionary v4, shadcn CLI (registry), vitest (already being added to the repo), tsx for running TS scripts.

## Global Constraints

- Brand colors are referenced by **named token** (`bravos-cyan`), never literal `rgb()`/`#hex`. (verbatim from spec)
- Official manual colors are exact: cyan `rgb(0,164,213)`, gray `rgb(157,157,156)`. Off-manual: purple `#2C2879` (site), yellow, green, tints.
- `Bravos*` components ship **as-is** (clsx idiom), not rewritten to cn()/CVA.
- Distribution is pure shadcn: registry items copy source; consumers own it.
- `theme.css` token values become **generated**; the `@layer base` typography/body rules stay hand-authored.
- Registry items are **generated** from `src/` — `src/` stays the single source of component code.
- Work happens on branch `design/tokens-registry-foundation` (already checked out).

---

## File Structure

- `tokens/tokens.json` — DTCG tokens (brand primitives, semantic aliases, foundations, light/dark). The only editable token config.
- `build/style-dictionary.config.mjs` — build config + custom CSS format emitting `:root`, `.dark`, `@theme inline`.
- `src/styles/theme.tokens.css` — GENERATED. Not hand-edited.
- `src/styles/theme.css` — hand-kept: `@import './theme.tokens.css';` + `@layer base` rules.
- `registry.json` — shadcn registry manifest.
- `scripts/build-registry.ts` — reads `src/` + token output, emits `public/r/*.json`.
- `public/r/*.json` — GENERATED registry items.
- `tests/tokens.test.ts`, `tests/registry.test.ts` — vitest unit checks.
- `cbdigital_frontend/` (separate repo) — proof consumer (Task 6).

---

### Task 1: style-dictionary scaffold + brand tokens → generated CSS

**Files:**
- Create: `tokens/tokens.json`
- Create: `build/style-dictionary.config.mjs`
- Create: `tests/tokens.test.ts`
- Modify: `package.json` (devDep + `build:tokens` script)
- Generated: `src/styles/theme.tokens.css`

**Interfaces:**
- Produces: `npm run build:tokens` → writes `src/styles/theme.tokens.css` containing, for each `bravos.<name>` token, a `--bravos-<name>: <value>;` line in `:root` and a `--color-bravos-<name>: var(--bravos-<name>);` line in `@theme inline`.

- [ ] **Step 1: Install style-dictionary + tsx**

Run: `npm i -D style-dictionary@^4 tsx`
Expected: both appear in `devDependencies`.

- [ ] **Step 2: Write `tokens/tokens.json` (brand primitives only for now)**

```json
{
  "bravos": {
    "cyan":        { "$type": "color", "$value": "rgb(0,164,213)",   "$extensions": { "clubebravos.authority": "manual" } },
    "cyan-light":  { "$type": "color", "$value": "rgb(51,188,229)",  "$extensions": { "clubebravos.authority": "derived" } },
    "cyan-dark":   { "$type": "color", "$value": "rgb(0,131,170)",   "$extensions": { "clubebravos.authority": "derived" } },
    "gray":        { "$type": "color", "$value": "rgb(157,157,156)", "$extensions": { "clubebravos.authority": "manual" } },
    "gray-light":  { "$type": "color", "$value": "rgb(230,230,230)", "$extensions": { "clubebravos.authority": "derived" } },
    "gray-dark":   { "$type": "color", "$value": "rgb(100,100,100)", "$extensions": { "clubebravos.authority": "derived" } },
    "purple":      { "$type": "color", "$value": "#2C2879",          "$extensions": { "clubebravos.authority": "site" } },
    "purple-dark": { "$type": "color", "$value": "rgb(35,38,120)",   "$extensions": { "clubebravos.authority": "site" } },
    "yellow":      { "$type": "color", "$value": "rgb(255,193,7)",   "$extensions": { "clubebravos.authority": "off-manual" } },
    "green":       { "$type": "color", "$value": "rgb(37,211,102)",  "$extensions": { "clubebravos.authority": "off-manual" } }
  }
}
```

- [ ] **Step 3: Write `build/style-dictionary.config.mjs` with a custom CSS format**

```js
import StyleDictionary from 'style-dictionary';

// Emits the :root vars + the Tailwind v4 @theme inline mapping for brand tokens.
StyleDictionary.registerFormat({
  name: 'clubebravos/css-theme',
  format: ({ dictionary }) => {
    const brand = dictionary.allTokens.filter((t) => t.path[0] === 'bravos');
    const name = (t) => t.path.join('-'); // ["bravos","cyan-dark"] -> "bravos-cyan-dark"
    const rootLines = brand.map((t) => `  --${name(t)}: ${t.$value};`).join('\n');
    const themeLines = brand.map((t) => `  --color-${name(t)}: var(--${name(t)});`).join('\n');
    return [
      '/* GENERATED by style-dictionary from tokens/tokens.json — do not edit by hand. */',
      ':root {',
      rootLines,
      '}',
      '',
      '@theme inline {',
      themeLines,
      '}',
      '',
    ].join('\n');
  },
});

export default {
  source: ['tokens/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{ destination: 'theme.tokens.css', format: 'clubebravos/css-theme' }],
    },
  },
};
```

- [ ] **Step 4: Add the build script to `package.json`**

Add to `"scripts"`: `"build:tokens": "style-dictionary build --config build/style-dictionary.config.mjs"`

- [ ] **Step 5: Run the build**

Run: `npm run build:tokens`
Expected: `src/styles/theme.tokens.css` is written, no errors.

- [ ] **Step 6: Write the failing test `tests/tokens.test.ts`**

```ts
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const css = readFileSync('src/styles/theme.tokens.css', 'utf8');

describe('generated theme.tokens.css', () => {
  it('emits the official brand vars with exact manual values', () => {
    expect(css).toContain('--bravos-cyan: rgb(0,164,213);');
    expect(css).toContain('--bravos-gray: rgb(157,157,156);');
  });
  it('emits the off-manual purple at the site value', () => {
    expect(css).toContain('--bravos-purple: #2C2879;');
  });
  it('maps each brand var to a Tailwind @theme utility', () => {
    expect(css).toContain('--color-bravos-cyan: var(--bravos-cyan);');
    expect(css).toContain('--color-bravos-purple: var(--bravos-purple);');
  });
});
```

- [ ] **Step 7: Run the test**

Run: `npx vitest run tests/tokens.test.ts`
Expected: PASS (the build already ran in Step 5).

- [ ] **Step 8: Commit**

```bash
git add tokens build package.json package-lock.json src/styles/theme.tokens.css tests/tokens.test.ts
git commit -m "feat(tokens): generate brand CSS vars from tokens.json via style-dictionary"
```

---

### Task 2: wire `theme.css` to the generated file + keep base layer

**Files:**
- Modify: `src/styles/theme.css` (replace the hand-written brand `:root` lines and brand `@theme` lines with an import; keep semantic vars, `.dark`, foundations, and `@layer base`)
- Modify: `tests/tokens.test.ts` (add an integration assertion)

**Interfaces:**
- Consumes: `src/styles/theme.tokens.css` from Task 1.
- Produces: `theme.css` whose brand utilities resolve from the generated file; everything else unchanged.

- [ ] **Step 1: Add the import at the top of `src/styles/theme.css`**

Add as the first line (before `@custom-variant`):

```css
@import './theme.tokens.css';
```

- [ ] **Step 2: Remove the now-duplicated brand lines from `theme.css`**

Delete from `:root` the 10 `--bravos-*` brand color declarations (cyan, cyan-light, cyan-dark, gray, gray-light, gray-dark, purple, purple-dark, yellow, green) and from `@theme inline` the 10 `--color-bravos-*` lines added earlier. Leave the semantic vars (`--primary`, `--secondary`, …), foundations (`--text-*`, `--r-*`, `--s-*`, `--shadow-*`), `.dark`, and `@layer base` intact — those move to tokens in a later sub-project, not now.

- [ ] **Step 3: Verify the lib still type-checks and builds CSS**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: exit 0.

Run: `npm run build:lib`
Expected: completes; `dist/` contains `theme.css` and `theme.tokens.css` (confirm `scripts/copy-styles.ts` copies the new file — see Step 4).

- [ ] **Step 4: Ensure `copy-styles` ships the generated file**

Open `scripts/copy-styles.ts`. If it copies a fixed list of CSS files, add `theme.tokens.css` to that list so the published/dist stylesheet import resolves. If it copies the whole `src/styles` dir, no change needed. Re-run `npm run build:lib` and confirm `dist/theme.tokens.css` exists.

Run: `ls dist/theme.tokens.css`
Expected: the file exists.

- [ ] **Step 5: Add an integration assertion to `tests/tokens.test.ts`**

```ts
it('theme.css imports the generated token file', () => {
  const main = readFileSync('src/styles/theme.css', 'utf8');
  expect(main).toContain("@import './theme.tokens.css';");
  expect(main).not.toContain('--bravos-cyan: rgb(0,164,213);'); // no longer hand-written
});
```

- [ ] **Step 6: Run tests**

Run: `npx vitest run tests/tokens.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/styles/theme.css scripts/copy-styles.ts tests/tokens.test.ts
git commit -m "refactor(styles): source brand tokens from generated theme.tokens.css"
```

---

### Task 3: registry manifest + theme item

**Files:**
- Create: `registry.json`
- Create: `scripts/build-registry.ts`
- Create: `tests/registry.test.ts`
- Modify: `package.json` (`build:registry` script)
- Generated: `public/r/clube-bravos-theme.json`

**Interfaces:**
- Consumes: `src/styles/theme.tokens.css` (Task 1).
- Produces: `npm run build:registry` → writes `public/r/<name>.json` for every item in `registry.json`. The theme item `clube-bravos-theme` has `type: "registry:theme"` and a `files` entry carrying `theme.tokens.css`. `buildItem(name): RegistryItem` is the exported builder later tasks extend.

- [ ] **Step 1: Write `registry.json` (manifest, theme item only for now)**

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "clube-bravos",
  "homepage": "https://github.com/ombrello/clubebravos-design-system",
  "items": [
    {
      "name": "clube-bravos-theme",
      "type": "registry:theme",
      "title": "Clube Bravos theme",
      "description": "Brand tokens (colors, Tailwind @theme) — install once.",
      "files": [{ "path": "src/styles/theme.tokens.css", "type": "registry:file", "target": "src/styles/theme.tokens.css" }]
    }
  ]
}
```

- [ ] **Step 2: Write `scripts/build-registry.ts`**

```ts
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

type RegistryFile = { path: string; type: string; target?: string };
type RegistryItem = {
  name: string; type: string; title?: string; description?: string;
  dependencies?: string[]; registryDependencies?: string[]; files?: RegistryFile[];
};

const manifest = JSON.parse(readFileSync('registry.json', 'utf8')) as { items: RegistryItem[] };
const OUT = 'public/r';

function buildItem(item: RegistryItem): RegistryItem {
  const files = (item.files ?? []).map((f) => ({
    ...f,
    content: readFileSync(f.path, 'utf8'),
  }));
  return { $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...item, files } as RegistryItem;
}

for (const item of manifest.items) {
  const built = buildItem(item);
  const dest = join(OUT, `${item.name}.json`);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, JSON.stringify(built, null, 2));
  console.log(`wrote ${dest}`);
}
```

- [ ] **Step 3: Add the build script to `package.json`**

Add to `"scripts"`: `"build:registry": "tsx scripts/build-registry.ts"`

- [ ] **Step 4: Run it**

Run: `npm run build:tokens && npm run build:registry`
Expected: `public/r/clube-bravos-theme.json` written.

- [ ] **Step 5: Write the failing test `tests/registry.test.ts`**

```ts
import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const read = (n: string) => JSON.parse(readFileSync(`public/r/${n}.json`, 'utf8'));

describe('registry: theme item', () => {
  it('is a registry:theme and inlines the generated token css', () => {
    const theme = read('clube-bravos-theme');
    expect(theme.type).toBe('registry:theme');
    expect(theme.files[0].content).toContain('--bravos-cyan: rgb(0,164,213);');
  });
});
```

- [ ] **Step 6: Run the test**

Run: `npx vitest run tests/registry.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add registry.json scripts/build-registry.ts package.json tests/registry.test.ts public/r
git commit -m "feat(registry): manifest + generated clube-bravos-theme item"
```

---

### Task 4: component items (bravos-button, bravos-wizard-footer)

**Files:**
- Modify: `registry.json` (add two `registry:component` items)
- Modify: `tests/registry.test.ts`
- Generated: `public/r/bravos-button.json`, `public/r/bravos-wizard-footer.json`

**Interfaces:**
- Consumes: `buildItem` from Task 3 (unchanged — it already inlines file content).
- Produces: two component items. `bravos-wizard-footer` declares `registryDependencies: ["bravos-button", "clube-bravos-theme"]`; `bravos-button` declares `registryDependencies: ["clube-bravos-theme"]`.

- [ ] **Step 1: Add the two items to `registry.json` `items`**

```json
{
  "name": "bravos-button",
  "type": "registry:component",
  "title": "BravosButton",
  "dependencies": ["clsx"],
  "registryDependencies": ["clube-bravos-theme"],
  "files": [{ "path": "src/app/components/BravosButton.tsx", "type": "registry:component", "target": "components/bravos/BravosButton.tsx" }]
},
{
  "name": "bravos-wizard-footer",
  "type": "registry:component",
  "title": "BravosWizardFooter",
  "dependencies": ["lucide-react"],
  "registryDependencies": ["bravos-button", "clube-bravos-theme"],
  "files": [{ "path": "src/app/components/BravosWizardFooter.tsx", "type": "registry:component", "target": "components/bravos/BravosWizardFooter.tsx" }]
}
```

- [ ] **Step 2: Fix the relative import in the copied source**

`BravosWizardFooter.tsx` imports `./BravosButton`. With both copied to `components/bravos/`, that relative import still resolves. No change needed — confirm by reading the import line (`import { ReactNode } from 'react';` only; the simplified footer has no BravosButton import). Verify:

Run: `grep -n "import" src/app/components/BravosWizardFooter.tsx`
Expected: only `react` import — the footer takes actions as children, so no cross-component import to rewrite.

- [ ] **Step 3: Rebuild the registry**

Run: `npm run build:registry`
Expected: `public/r/bravos-button.json` and `public/r/bravos-wizard-footer.json` written.

- [ ] **Step 4: Add assertions to `tests/registry.test.ts`**

```ts
describe('registry: component items', () => {
  it('button depends on the theme and inlines its source', () => {
    const btn = read('bravos-button');
    expect(btn.type).toBe('registry:component');
    expect(btn.registryDependencies).toContain('clube-bravos-theme');
    expect(btn.files[0].content).toContain('export function BravosButton');
    expect(btn.files[0].content).toContain('bg-bravos-cyan'); // named token, not literal
  });
  it('wizard-footer depends on button + theme', () => {
    const wf = read('bravos-wizard-footer');
    expect(wf.registryDependencies).toEqual(expect.arrayContaining(['bravos-button', 'clube-bravos-theme']));
    expect(wf.files[0].content).toContain('export function BravosWizardFooter');
  });
});
```

- [ ] **Step 5: Run the tests**

Run: `npx vitest run tests/registry.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add registry.json tests/registry.test.ts public/r
git commit -m "feat(registry): bravos-button + bravos-wizard-footer component items"
```

---

### Task 5: registry validation check

**Files:**
- Modify: `tests/registry.test.ts` (cross-item validation)
- Modify: `package.json` (`test` script if absent)

**Interfaces:**
- Consumes: all `public/r/*.json` from Tasks 3–4.

- [ ] **Step 1: Add a validation block to `tests/registry.test.ts`**

```ts
import { readFileSync } from 'node:fs';

describe('registry: integrity', () => {
  const manifest = JSON.parse(readFileSync('registry.json', 'utf8'));
  const names: string[] = manifest.items.map((i: any) => i.name);

  it('every item builds to a JSON file', () => {
    for (const n of names) expect(() => read(n)).not.toThrow();
  });

  it('every registryDependency points to a real item', () => {
    for (const n of names) {
      const deps: string[] = read(n).registryDependencies ?? [];
      for (const d of deps) expect(names).toContain(d);
    }
  });

  it('every file entry has inlined content', () => {
    for (const n of names) for (const f of read(n).files ?? []) expect(f.content?.length ?? 0).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Ensure `package.json` has a test script**

If `"scripts"` has no `test`, add: `"test": "vitest run"`.

- [ ] **Step 3: Run the full suite**

Run: `npm test`
Expected: all of `tests/tokens.test.ts` and `tests/registry.test.ts` PASS.

- [ ] **Step 4: Commit**

```bash
git add tests/registry.test.ts package.json
git commit -m "test(registry): cross-item integrity validation"
```

---

### Task 6: proof — migrate the wizard navigation in cbdigital_frontend

**Files (in the `cbdigital_frontend` repo):**
- Create: `components.json` (shadcn config) if absent
- Create (via `shadcn add`): `components/bravos/BravosButton.tsx`, `components/bravos/BravosWizardFooter.tsx`, `src/styles/theme.tokens.css`
- Modify: the wizard component that renders the nav (the `CBButton` + inline bar)
- Delete: the `CB*` nav equivalents used only by that flow

**Interfaces:**
- Consumes: the locally served registry from Tasks 3–4.

- [ ] **Step 1: Serve the registry locally (in the design-system repo)**

Run: `npx serve public -l 4000`
Expected: `http://localhost:4000/r/clube-bravos-theme.json` is reachable. Leave it running.

- [ ] **Step 2: Init shadcn in the frontend (if no components.json)**

In `cbdigital_frontend`: `npx shadcn@latest init`
Choose: TypeScript, Tailwind v4, the existing `src/styles/index.css` as the global CSS. Expected: `components.json` created.

- [ ] **Step 3: Install the theme, then the components**

```bash
npx shadcn@latest add http://localhost:4000/r/clube-bravos-theme.json
npx shadcn@latest add http://localhost:4000/r/bravos-wizard-footer.json
```
Expected: `theme.tokens.css`, `BravosButton.tsx`, `BravosWizardFooter.tsx` copied; `lucide-react`/`clsx` installed (skipped if present). The footer pulls button + theme via `registryDependencies`.

- [ ] **Step 4: Import the token CSS in the global stylesheet**

In `src/styles/index.css`, add at the top (if `shadcn add` did not already): `@import './theme.tokens.css';`
Verify `bg-bravos-cyan` resolves by checking the file is imported.

- [ ] **Step 5: Locate the wizard nav and replace it**

Run: `grep -rn "CBButton" src/components | grep -i "step\|wizard\|registration\|footer"`
Expected: the file(s) rendering the wizard's back/next bar. In that JSX, replace the inline nav with:

```tsx
import { BravosWizardFooter } from '@/components/bravos/BravosWizardFooter';
import { BravosButton } from '@/components/bravos/BravosButton';
import { ArrowRight } from 'lucide-react';

<BravosWizardFooter summary={`v4 · ${sectionCount} seções · ${fieldCount} campos`}>
  {step > 0 && <BravosButton variant="outline" onClick={back}>Voltar</BravosButton>}
  <BravosButton variant="primary" onClick={next} disabled={!valid}>
    Próximo step <ArrowRight className="w-3.5 h-3.5" /> {nextStepName}
  </BravosButton>
</BravosWizardFooter>
```
(Wire `sectionCount`/`fieldCount`/`step`/`back`/`next`/`valid`/`nextStepName` to the existing wizard state — names already present in the component.)

- [ ] **Step 6: Remove the dead CB* nav for that flow**

Delete the now-unused `CBButton` import and any inline footer-bar markup in that wizard file. Do **not** delete `CBButton` itself if other flows still import it:

Run: `grep -rln "from.*mobile/CBButton\|components/.*CBButton" src | wc -l`
Expected: if `> 0`, leave `CBButton.tsx`; if `0`, delete `src/components/mobile/CBButton.tsx`.

- [ ] **Step 7: Verify the front builds and renders**

Run: `npm run build` (in `cbdigital_frontend`)
Expected: build succeeds.

Run the dev server and open the wizard; confirm the footer renders with brand cyan primary + outline back, summary on the left. (Or run the existing Playwright wizard test if present: `npx playwright test -g wizard`.)

- [ ] **Step 8: Commit (in cbdigital_frontend)**

```bash
git checkout -b feat/consume-bravos-registry
git add -A
git commit -m "feat: consume Clube Bravos registry for wizard navigation"
```

---

## Self-Review

**Spec coverage:**
- Token source `tokens.json` → generates CSS — Task 1, 2. ✓
- Figma payload (`tokens.figma.json`) — **deferred**: spec lists it, but the proof slice and registry don't need it; it belongs with the Figma-sync automation (sub-project 2). Noted as out-of-scope-for-now in the spec's roadmap. No task here by design.
- Registry: theme + ui + component items — Task 3 (theme), Task 4 (components). `registry:ui` primitives not needed by the wizard slice; manifest can grow later. ✓ (slice-appropriate)
- Pure shadcn distribution / `shadcn add` — Task 6. ✓
- Proof = wizard nav slice, local host — Task 6. ✓
- Verification (lib tsc/Chromatic, registry validation, front build) — Task 2 (tsc/build), Task 5 (registry), Task 6 (front). ✓

**Placeholder scan:** No TBD/TODO. Step 5 of Task 6 references existing wizard state names rather than inventing them — flagged for the implementer to wire to the real identifiers found via grep.

**Type consistency:** `buildItem` (Task 3) is reused unchanged in Task 4. Item names (`clube-bravos-theme`, `bravos-button`, `bravos-wizard-footer`) and `registryDependencies` are consistent across Tasks 3–6.

**Gap fixed inline:** `tokens.figma.json` intentionally has no task — moved to sub-project 2 to keep this plan a working, testable slice.
