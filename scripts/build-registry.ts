import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

type RegistryFile = { path: string; type: string; target?: string };
type RegistryItem = {
  name: string; type: string; title?: string; description?: string;
  dependencies?: string[]; registryDependencies?: string[]; files?: RegistryFile[];
  // map-source-only metadata, consumed by build-figma-map — must NOT leak into shadcn registry items
  figma?: unknown;
};
type RegistryItemOutput = Omit<RegistryItem, 'figma'> & { $schema: string };

const OUT = 'public/r';

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

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) main();
