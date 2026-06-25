import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

type RegistryFile = { path: string; type: string; target?: string };
type RegistryItem = {
  name: string; type: string; title?: string; description?: string;
  dependencies?: string[]; registryDependencies?: string[]; files?: RegistryFile[];
};
type RegistryItemOutput = RegistryItem & { $schema: string };

const OUT = 'public/r';

export function buildItem(item: RegistryItem): RegistryItemOutput {
  const files = (item.files ?? []).map((f) => {
    try {
      return { ...f, content: readFileSync(f.path, 'utf8') };
    } catch (err) {
      throw new Error(`[build-registry] failed to read ${f.path} for item '${item.name}'`, { cause: err });
    }
  });
  return { $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...item, files };
}

function main() {
  const manifest = JSON.parse(readFileSync('registry.json', 'utf8')) as { items: RegistryItem[] };
  for (const item of manifest.items) {
    const built = buildItem(item);
    const dest = join(OUT, `${item.name}.json`);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, JSON.stringify(built, null, 2) + '\n');
    console.log(`wrote ${dest}`);
  }
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) main();
