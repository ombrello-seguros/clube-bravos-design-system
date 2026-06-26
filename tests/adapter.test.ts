import { describe, it, expect } from 'vitest';
import { resolve, extractProps, emit, emitFallback, type FigmaMap } from '../src/adapter';

const MAP: FigmaMap = {
  Button: {
    component: 'BravosButton',
    import: '@/components/bravos/BravosButton',
    registryItem: 'bravos-button',
    props: [
      { figma: 'Variant', prop: 'variant', kind: 'variant', map: { Primary: 'primary', Outline: 'outline' } },
      { figma: 'Size', prop: 'size', kind: 'variant', map: { MD: 'md' } },
      { figma: 'Label', prop: 'children', kind: 'text' },
      { figma: 'Disabled', prop: 'disabled', kind: 'boolean' },
    ],
  },
};

describe('resolve', () => {
  it('returns the entry on a hit', () => expect(resolve(MAP, 'Button')?.component).toBe('BravosButton'));
  it('returns null on a miss or empty name', () => {
    expect(resolve(MAP, 'Nope')).toBeNull();
    expect(resolve(MAP, null)).toBeNull();
  });
});

describe('extractProps', () => {
  it('maps variant values and text through the #id suffix', () => {
    const props = extractProps(MAP.Button, {
      'Variant#1:0': { type: 'VARIANT', value: 'Primary' },
      'Size#1:1': { type: 'VARIANT', value: 'MD' },
      'Label#1:2': { type: 'TEXT', value: 'Próximo step' },
    });
    expect(props).toEqual({ variant: 'primary', size: 'md', children: 'Próximo step' });
  });
  it('falls back to the raw value when not in the map', () => {
    const props = extractProps(MAP.Button, { 'Variant#1:0': { type: 'VARIANT', value: 'Ghost' } });
    expect(props.variant).toBe('Ghost');
  });
  it('coerces a boolean kind to a real boolean', () => {
    const props = extractProps(MAP.Button, { 'Disabled#1:3': { type: 'BOOLEAN', value: true } });
    expect(props.disabled).toBe(true);
  });
});

describe('emit', () => {
  it('emits import + JSX with attrs and children', () => {
    const { code, install } = emit(MAP.Button, { variant: 'primary', size: 'md', children: 'Próximo step' });
    expect(code).toContain("import { BravosButton } from '@/components/bravos/BravosButton';");
    expect(code).toContain('<BravosButton variant="primary" size="md">Próximo step</BravosButton>');
    expect(install).toBe('npx shadcn add bravos-button');
  });
  it('self-closes when there are no children', () => {
    const { code } = emit(MAP.Button, { variant: 'primary' });
    expect(code).toContain('<BravosButton variant="primary" />');
  });
  it('self-closes when children is an empty string', () => {
    const { code } = emit(MAP.Button, { variant: 'primary', children: '' });
    expect(code).toContain('<BravosButton variant="primary" />');
    expect(code).not.toContain('<BravosButton variant="primary"></BravosButton>');
  });
});

describe('emitFallback', () => {
  it('produces a scaffold naming the node', () => {
    const out = emitFallback({ name: 'Mystery', text: 'Hi', className: 'bg-primary' });
    expect(out).toContain('token-fallback: unmapped node "Mystery"');
    expect(out).toContain('<div className="bg-primary">Hi</div>');
  });
});
