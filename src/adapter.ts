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
