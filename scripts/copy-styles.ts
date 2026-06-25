import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');
const stylesDir = join(distDir, 'styles');
const assetsDir = join(distDir, 'assets');

// Criar diretórios se não existirem
if (!existsSync(stylesDir)) {
  mkdirSync(stylesDir, { recursive: true });
}

if (!existsSync(assetsDir)) {
  mkdirSync(assetsDir, { recursive: true });
}

// Copiar CSS
const cssFiles = [
  { src: 'src/styles/theme.css', dest: 'styles/theme.css' },
  { src: 'src/styles/theme.tokens.css', dest: 'styles/theme.tokens.css' },
  { src: 'src/styles/fonts.css', dest: 'styles/fonts.css' },
];

cssFiles.forEach(({ src, dest }) => {
  const srcPath = join(rootDir, src);
  const destPath = join(distDir, dest);

  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${src} -> dist/${dest}`);
  } else {
    console.warn(`⚠️  File not found: ${src}`);
  }
});

// Copiar logos
const logoFiles = [
  'Logo_Bravos_300.png',
  'Logo_Bravos_72_.png',
  'Logo_Bravos_secundaria_300_.png',
  'Logo_Bravos_secundaria_72_.png'
];

logoFiles.forEach((file) => {
  const srcPath = join(rootDir, 'src/imports', file);
  const destPath = join(assetsDir, file);

  if (existsSync(srcPath)) {
    copyFileSync(srcPath, destPath);
    console.log(`✅ Copied logo ${file} -> dist/assets/`);
  } else {
    console.warn(`⚠️  Logo not found: ${file}`);
  }
});

console.log('\n✨ Styles and assets copied successfully!');
