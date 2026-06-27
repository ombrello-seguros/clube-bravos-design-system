// Imported directly from the design-system package in this monorepo (no sync step).
import figmaMap from '../../public/figma-map.json';
import { resolve, extractProps, emit, emitFallback, type FigmaMap, type ComponentProps } from './src/adapter';

const MAP = figmaMap as FigmaMap;

figma.codegen.on('generate', async (event): Promise<CodegenResult[]> => {
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
