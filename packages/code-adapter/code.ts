import figmaMap from './src/figma-map.json';
import { resolve, extractProps, emit, emitFallback, type FigmaMap, type ComponentProps } from './src/adapter';

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
