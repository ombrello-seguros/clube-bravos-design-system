import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const read = (n: string) => JSON.parse(readFileSync(new URL(`../public/r/${n}.json`, import.meta.url), 'utf8'));

describe('registry: theme item', () => {
  it('is a registry:theme and inlines the generated token css', () => {
    const theme = read('clube-bravos-theme');
    expect(theme.type).toBe('registry:theme');
    expect(theme.files[0].content).toContain('--bravos-cyan: rgb(0,164,213);');
  });
});

describe('registry: component items', () => {
  it('button depends on the theme and inlines its source', () => {
    const btn = read('bravos-button');
    expect(btn.type).toBe('registry:component');
    expect(btn.registryDependencies).toContain('clube-bravos-theme');
    expect(btn.files[0].content).toContain('export function BravosButton');
    expect(btn.files[0].content).toContain('bg-bravos-cyan'); // named token, not literal
  });
  it('wizard-footer depends on button + theme', () => {
    const wf = read('bravos-wizard-footer');
    expect(wf.registryDependencies).toEqual(expect.arrayContaining(['bravos-button', 'clube-bravos-theme']));
    expect(wf.files[0].content).toContain('export function BravosWizardFooter');
  });
});
