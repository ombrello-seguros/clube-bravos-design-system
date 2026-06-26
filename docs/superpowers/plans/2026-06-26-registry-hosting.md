# Registry Hosting + `@clube-bravos` Namespacing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the Clube Bravos shadcn registry on GitHub Pages (latest on main, pinned on `v*` tags) and namespace it `@clube-bravos`, so `shadcn add @clube-bravos/<item>` resolves dependencies without the curl workaround.

**Architecture:** `build-registry` prefixes internal `registryDependencies` with `@clube-bravos/`. A `registry-pages.yml` workflow builds the registry and publishes `public/r` + `figma-map.json` to a `gh-pages` branch via `peaceiris/actions-gh-pages` with `keep_files` (root for main, `vX.Y.Z/` for tags). Consumers add one `registries` entry to `components.json`.

**Tech Stack:** TypeScript, tsx, vitest, GitHub Actions, `peaceiris/actions-gh-pages@v4`, GitHub Pages, shadcn CLI (registries/namespacing).

## Global Constraints

- Public static registry on GitHub Pages, served from the `gh-pages` branch. Repo: `ombrello-seguros/clube-bravos-design-system` → base `https://ombrello-seguros.github.io/clube-bravos-design-system/`.
- Publish both: `push main` → `/r/` (latest); `push tag v*` → `/vX.Y.Z/r/` (pinned). Use `peaceiris/actions-gh-pages@v4` with `keep_files: true` (NOT the official deploy-pages, which full-replaces).
- Namespace = `@clube-bravos`. `build-registry` prefixes each `registryDependency` that names one of our items; item `name` stays bare; external deps stay bare.
- Three repos: `clubebravos-design-system` (Tasks 1-2; branch `design/registry-hosting`, already checked out), `code-adapter` (Task 3; branch `feat/registry-namespace`), `cbdigital_frontend` (Task 4 proof).
- Namespaced `registries` in `components.json` requires a recent shadcn CLI — verify the installed version supports it before the proof (Task 4 Step 1).
- Manual one-time prereq (documented, not automated): enable Pages on the `gh-pages` branch in repo Settings.

---

## File Structure

- `scripts/build-registry.ts` — Modify: namespace internal `registryDependencies` (design-system).
- `tests/registry.test.ts` — Modify: assert namespaced deps; integrity check strips prefix (design-system).
- `.github/workflows/registry-pages.yml` — Create (design-system).
- `guidelines/registry.md` — Create: consumer `registries` config + `shadcn add` commands (design-system).
- `code-adapter/src/adapter.ts` — Modify: `emit` install string namespaced (code-adapter).
- `code-adapter/tests/adapter.test.ts` — Modify: assert namespaced install (code-adapter).
- `cbdigital_frontend/components.json` — Modify: add the `registries` entry (proof).

---

### Task 1: namespace `registryDependencies` (design-system)

**Files:**
- Modify: `scripts/build-registry.ts`
- Modify: `tests/registry.test.ts`
- Regenerated: `public/r/*.json`

**Interfaces:**
- Produces: served registry items whose `registryDependencies` use `@clube-bravos/<name>` for internal deps; item `name` fields stay bare. `buildItem(item, itemNames)` gains a second arg.

- [ ] **Step 1: Update `buildItem` + `main` in `scripts/build-registry.ts`**

Change the signature and body of `buildItem`, and `main` to pass the set:
```ts
export function buildItem(item: RegistryItem, itemNames: Set<string>): RegistryItemOutput {
  // strip `figma` — it's plugin-map source, not shadcn registry data
  const { figma: _figma, ...rest } = item;
  const files = (rest.files ?? []).map((f) => {
    try {
      return { ...f, content: readFileSync(f.path, 'utf8') };
    } catch (err) {
      throw new Error(`[build-registry] failed to read ${f.path} for item '${rest.name}'`, { cause: err });
    }
  });
  // namespace internal registry deps so consumers resolve them via their @clube-bravos config
  const registryDependencies = rest.registryDependencies?.map((d) =>
    itemNames.has(d) ? `@clube-bravos/${d}` : d,
  );
  return { $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...rest, registryDependencies, files };
}

function main() {
  const manifest = JSON.parse(readFileSync('registry.json', 'utf8')) as { items: RegistryItem[] };
  const itemNames = new Set(manifest.items.map((i) => i.name));
  for (const item of manifest.items) {
    const built = buildItem(item, itemNames);
    const dest = join(OUT, `${item.name}.json`);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, JSON.stringify(built, null, 2) + '\n');
    console.log(`wrote ${dest}`);
  }
}
```
(Items with no `registryDependencies`, like the theme, get `registryDependencies: undefined` — which `JSON.stringify` omits. Unchanged behavior.)

- [ ] **Step 2: Regenerate the registry**

Run: `npm run build:registry`
Expected: `public/r/*.json` rewritten.

- [ ] **Step 3: Update `tests/registry.test.ts`**

Change the two component-dep assertions and the integrity dep check:
- The `bravos-button` test: `expect(btn.registryDependencies).toContain('@clube-bravos/clube-bravos-theme');`
- The `bravos-wizard-footer` test: `expect(wf.registryDependencies).toEqual(expect.arrayContaining(['@clube-bravos/bravos-button', '@clube-bravos/clube-bravos-theme']));`
- The integrity "every registryDependency points to a real item" test — strip the namespace before checking:
```ts
it('every registryDependency points to a real item', () => {
  for (const n of names) {
    const deps: string[] = read(n).registryDependencies ?? [];
    for (const d of deps) expect(names).toContain(d.replace('@clube-bravos/', ''));
  }
});
```

- [ ] **Step 4: Run the tests**

Run: `npx vitest run --project unit tests/registry.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-registry.ts tests/registry.test.ts public/r
git commit -m "feat(registry): namespace internal registryDependencies as @clube-bravos/*"
```

---

### Task 2: Pages workflow + consumer docs (design-system)

**Files:**
- Create: `.github/workflows/registry-pages.yml`
- Create: `guidelines/registry.md`

**Interfaces:**
- Produces: a workflow publishing `public/r` + `public/figma-map.json` to `gh-pages` (root on main, `vX.Y.Z/` on tags); consumer docs for the `@clube-bravos` namespace.

- [ ] **Step 1: Write `.github/workflows/registry-pages.yml`**

```yaml
name: Registry Pages
on:
  push:
    branches: [main]
    tags: ['v*']
permissions:
  contents: write
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install
        env:
          HUSKY: 0
        run: npm ci --no-audit --no-fund
      - name: Build registry
        run: npm run build:tokens && npm run build:registry && npm run build:figma-map
      - name: Stage site
        run: |
          mkdir -p _site/r
          cp public/r/*.json _site/r/
          cp public/figma-map.json _site/
      - name: Compute destination dir
        id: dest
        run: echo "dir=${{ startsWith(github.ref, 'refs/tags/') && github.ref_name || '' }}" >> "$GITHUB_OUTPUT"
      - name: Publish to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
          destination_dir: ${{ steps.dest.outputs.dir }}
          keep_files: true
```

- [ ] **Step 2: Verify the staging produces the right structure (local dry-run of the Stage step)**

Run:
```bash
npm run build:registry && npm run build:figma-map
rm -rf _site && mkdir -p _site/r && cp public/r/*.json _site/r/ && cp public/figma-map.json _site/
ls _site _site/r
```
Expected: `_site/` has `r/` and `figma-map.json`; `_site/r/` has `clube-bravos-theme.json`, `bravos-button.json`, `bravos-wizard-footer.json`.

Then clean up: `rm -rf _site` (it's a build artifact, do not commit). Confirm `_site` is not tracked: `git status --porcelain _site` is empty after removal. If you want belt-and-suspenders, add `_site/` to `.gitignore` and stage it in this task.

- [ ] **Step 3: Write `guidelines/registry.md`**

```markdown
# Consuming the Clube Bravos registry

The components are distributed as a shadcn registry on GitHub Pages, namespaced `@clube-bravos`.

## One-time setup

Add the registry to your `components.json`:

\`\`\`json
{
  "registries": {
    "@clube-bravos": "https://ombrello-seguros.github.io/clube-bravos-design-system/r/{name}.json"
  }
}
\`\`\`

For a pinned version, point at a tagged snapshot instead:
`https://ombrello-seguros.github.io/clube-bravos-design-system/vX.Y.Z/r/{name}.json`

## Adding components

\`\`\`bash
npx shadcn add @clube-bravos/clube-bravos-theme    # tokens/theme — install once
npx shadcn add @clube-bravos/bravos-button
npx shadcn add @clube-bravos/bravos-wizard-footer  # pulls button + theme automatically
\`\`\`

`registryDependencies` resolve through the same `@clube-bravos` config — no manual URLs.
```

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/registry-pages.yml guidelines/registry.md
git commit -m "ci: publish registry to GitHub Pages (main + tags); docs: consumer registry config"
```

---

### Task 3: namespaced install string in the plugin emit (code-adapter)

**Files:**
- Modify: `code-adapter/src/adapter.ts`
- Modify: `code-adapter/tests/adapter.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `emit(...).install === 'npx shadcn add @clube-bravos/<registryItem>'`.

- [ ] **Step 1: Branch the plugin repo**

```bash
cd ../code-adapter
git checkout main && git checkout -b feat/registry-namespace
```

- [ ] **Step 2: Update the install string in `src/adapter.ts`**

In `emit`, change the install return to namespace the item:
```ts
return { code, install: `npx shadcn add @clube-bravos/${entry.registryItem}` };
```

- [ ] **Step 3: Update the emit test in `tests/adapter.test.ts`**

Change the install assertion:
```ts
expect(install).toBe('npx shadcn add @clube-bravos/bravos-button');
```

- [ ] **Step 4: Run the tests**

Run: `npx vitest run tests/adapter.test.ts`
Expected: PASS (9/9).

- [ ] **Step 5: Commit**

```bash
git add src/adapter.ts tests/adapter.test.ts
git commit -m "feat(emit): namespace the shadcn add install string as @clube-bravos/*"
```

---

### Task 4: proof — local namespace resolution + frontend config

**Files:**
- Modify: `cbdigital_frontend/components.json`
- (No committed artifact in the design-system; the local proof uses a temp dir.)

**Interfaces:**
- Consumes: the namespaced `public/r/*.json` from Task 1, served locally.

- [ ] **Step 1: Verify the shadcn CLI supports namespaced registries**

Run: `npx shadcn@latest --version` and check the shadcn docs/skill that `components.json` `registries` namespacing is supported in that version. If it is NOT, STOP and report — the namespace proof can't pass; the fallback (full-URL `registryDependencies`) is a spec deviation needing approval.

- [ ] **Step 2: Serve the registry locally (design-system repo)**

In `clubebravos-design-system`: `python3 -m http.server 4000 --directory public` (leave running). Confirm `curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/r/bravos-wizard-footer.json` → 200.

- [ ] **Step 3: Local namespace proof in a throwaway consumer**

```bash
mkdir -p /tmp/cb-ns-proof/src/components && cd /tmp/cb-ns-proof
cat > components.json <<'JSON'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york", "rsc": false, "tsx": true,
  "tailwind": { "config": "", "css": "src/index.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": { "components": "@/components", "utils": "@/lib/utils" },
  "registries": { "@clube-bravos": "http://localhost:4000/r/{name}.json" }
}
JSON
npx shadcn@latest add @clube-bravos/bravos-wizard-footer --yes
```
Expected: shadcn resolves `@clube-bravos/bravos-wizard-footer` AND its deps `@clube-bravos/bravos-button` + `@clube-bravos/clube-bravos-theme` through the namespace (no curl), copying all three. List the copied files to confirm. If the CLI can't write without a real project, capture the resolution log showing it fetched the two dep URLs via the namespace and report that as the proof.

- [ ] **Step 4: Add the `registries` entry to the frontend's `components.json`**

In `cbdigital_frontend/components.json`, add (merge, keep existing keys):
```json
"registries": {
  "@clube-bravos": "https://ombrello-seguros.github.io/clube-bravos-design-system/r/{name}.json"
}
```
This points the front at the live Pages registry for future `shadcn add @clube-bravos/...` (replacing the curl workaround).

- [ ] **Step 5: Stop the local server + commit the frontend config**

Stop the `http.server`. In `cbdigital_frontend`:
```bash
git checkout -b feat/clube-bravos-registry-config
git add components.json
git commit -m "chore: point shadcn at the @clube-bravos Pages registry"
```

- [ ] **Step 6: Record the post-merge manual checks (in the task report)**

Document for the human to run after merge + enabling Pages on `gh-pages`:
- `https://ombrello-seguros.github.io/clube-bravos-design-system/r/clube-bravos-theme.json` → 200
- after a `v*` tag: `…/vX.Y.Z/r/clube-bravos-theme.json` → 200
- `npx shadcn add @clube-bravos/bravos-wizard-footer` against the live URL in a real project

---

## Self-Review

**Spec coverage:**
- Namespaced `registryDependencies` (build + test, prefix-strip integrity) — Task 1. ✓
- Pages workflow (main→/r/, tag→/vX.Y.Z/, peaceiris keep_files, contents: write) — Task 2. ✓
- Consumer docs (`registries` config, namespaced `shadcn add`, pinned URL) — Task 2 Step 3. ✓
- Plugin emit namespaced — Task 3. ✓
- Proof: local namespace resolution (no curl) + frontend `registries` config — Task 4. ✓
- shadcn-version assumption verified first — Task 4 Step 1. ✓
- Manual prereq (enable Pages) + post-merge URL checks — Task 4 Step 6 + Global Constraints. ✓
- Out of scope (no task, by design): private/auth, other hosts, npm deprecation, version-dir pruning, the variant-set resolution follow-up.

**Placeholder scan:** No TBD/TODO. Task 4 Step 1 is a real version-check gate, not a placeholder. Task 4 Step 3's "if the CLI can't write without a real project, capture the resolution log" is an explicit, concrete fallback instruction.

**Type consistency:** `buildItem(item, itemNames)` (Task 1) is the only signature change; it's internal to `build-registry.ts` (only `main` calls it; `build-figma-map.ts` does not import it). The `@clube-bravos/<name>` format is identical across Task 1 (deps), Task 2 (docs/URL `{name}`), Task 3 (emit), and Task 4 (consumer config + add command).
