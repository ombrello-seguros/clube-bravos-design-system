import bundledMap from '../../public/figma-map.json';
import { resolve, extractProps, emit, emitFallback, type FigmaMap, type ComponentProps } from './src/adapter';

// The map is hosted on GitHub Pages (CI redeploys it on every registry change).
// Fetch it once per session so the plugin stays current without a rebuild/republish;
// the bundled copy (inlined at build time) is the offline fallback.
const MAP_URL = 'https://ombrello-seguros.github.io/clube-bravos-design-system/figma-map.json';
const BUNDLED_MAP = bundledMap as FigmaMap;

let cachedMap: FigmaMap | null = null;
let fetchAttempted = false;
async function getMap(): Promise<FigmaMap> {
  if (cachedMap) return cachedMap;
  if (!fetchAttempted) {
    fetchAttempted = true;
    try {
      const res = await fetch(MAP_URL);
      if (res.ok) cachedMap = (await res.json()) as FigmaMap;
    } catch {
      // Pages unreachable / offline — fall back to the bundled map.
    }
  }
  return cachedMap ?? BUNDLED_MAP;
}

figma.codegen.on('generate', async (event): Promise<CodegenResult[]> => {
  const MAP = await getMap();
  const node = event.node;
  const main = node.type === 'INSTANCE' ? await node.getMainComponentAsync() : null;
  // For a variant instance, mainComponent.name is the variant descriptor
  // ("Variant=Primary, Size=MD"); the map is keyed by the component-set name (the parent).
  const lookupName =
    main?.parent?.type === 'COMPONENT_SET' ? main.parent.name : (main?.name ?? node.name);
  const entry = resolve(MAP, lookupName);

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
