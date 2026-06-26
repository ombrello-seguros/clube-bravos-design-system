import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const map = JSON.parse(readFileSync(new URL('../public/figma-map.json', import.meta.url), 'utf8')) as Record<string, any>;
const entries = Object.values(map);

describe('figma-map', () => {
  it('contains the two v1 components by registryItem', () => {
    const items = entries.map((e) => e.registryItem);
    expect(items).toContain('bravos-button');
    expect(items).toContain('bravos-wizard-footer');
  });
  it('every entry has component, import, registryItem, props[]', () => {
    for (const e of entries) {
      expect(typeof e.component).toBe('string');
      expect(typeof e.import).toBe('string');
      expect(typeof e.registryItem).toBe('string');
      expect(Array.isArray(e.props)).toBe(true);
    }
  });
  it('the button entry maps a variant prop', () => {
    const btn = entries.find((e) => e.registryItem === 'bravos-button');
    const rule = btn.props.find((p: any) => p.prop === 'variant');
    expect(rule.kind).toBe('variant');
    expect(rule.map).toBeTruthy();
  });
});
