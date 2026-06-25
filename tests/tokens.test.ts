import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const css = readFileSync(new URL('../src/styles/theme.tokens.css', import.meta.url), 'utf8');

describe('generated theme.tokens.css', () => {
  it('emits the official brand vars with exact manual values', () => {
    expect(css).toContain('--bravos-cyan: rgb(0,164,213);');
    expect(css).toContain('--bravos-gray: rgb(157,157,156);');
  });
  it('emits the off-manual purple at the site value', () => {
    expect(css).toContain('--bravos-purple: #2C2879;');
  });
  it('maps each brand var to a Tailwind @theme utility', () => {
    expect(css).toContain('--color-bravos-cyan: var(--bravos-cyan);');
    expect(css).toContain('--color-bravos-purple: var(--bravos-purple);');
  });
});

describe('theme.css integration', () => {
  const main = readFileSync(new URL('../src/styles/theme.css', import.meta.url), 'utf8');

  it('theme.css imports the generated token file', () => {
    expect(main).toContain("@import './theme.tokens.css';");
    // format-agnostic: the brand var must be gone regardless of rgb() spacing
    expect(main).not.toContain('--bravos-cyan:');
    // the @theme brand mapping must also be gone (now lives in theme.tokens.css)
    expect(main).not.toContain('--color-bravos-cyan:');
  });
});
