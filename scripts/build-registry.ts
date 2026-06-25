import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

type RegistryFile = { path: string; type: string; target?: string };
type RegistryItem = {
  name: string; type: string; title?: string; description?: string;
  dependencies?: string[]; registryDependencies?: string[]; files?: RegistryFile[];
};

const manifest = JSON.parse(readFileSync('registry.json', 'utf8')) as { items: RegistryItem[] };
const OUT = 'public/r';

export function buildItem(item: RegistryItem): RegistryItem {
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
