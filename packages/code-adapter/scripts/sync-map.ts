import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const src = '../clubebravos-design-system/public/figma-map.json';
const dest = 'src/figma-map.json';
if (!existsSync(src)) {
  throw new Error(`[sync-map] ${src} not found — run "npm run build:figma-map" in the design-system repo first`);
}
mkdirSync('src', { recursive: true });
copyFileSync(src, dest);
console.log(`[sync-map] copied ${src} -> ${dest}`);
