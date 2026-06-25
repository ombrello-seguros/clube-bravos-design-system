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
