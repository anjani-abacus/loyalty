// generate-icon-map.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, 'src/assets/icons');
const outputFile = path.join(iconsDir, 'index.js');

const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

const imports = files.map(file => {
  const name = path.basename(file, '.svg');
  return `import ${name} from './${file}';`;
}).join('\n');

const exports = `export const icons = {\n${files.map(file => {
  const name = path.basename(file, '.svg');
  return `  "${name}": ${name},`;
}).join('\n')}\n};`;

const content = `${imports}\n\n${exports}\n`;

fs.writeFileSync(outputFile, content);
