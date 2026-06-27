import { build } from 'esbuild';

await build({
  entryPoints: ['code.ts'],
  bundle: true,
  outfile: 'code.js',
  target: 'es2017',
  format: 'iife',
  loader: { '.json': 'json' },
  logLevel: 'info',
});
