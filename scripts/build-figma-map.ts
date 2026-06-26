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
