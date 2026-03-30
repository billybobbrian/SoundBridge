/**
 * Copies netlify/_redirects into web-build/ after `expo export`.
 * Netlify uses this file at the publish root for SPA rewrites.
 */
import { copyFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const src = join(root, 'netlify', '_redirects');
const dest = join(root, 'web-build', '_redirects');

if (!existsSync(join(root, 'web-build'))) {
  console.error('copy-netlify-redirects: web-build/ not found. Run expo export first.');
  process.exit(1);
}
if (!existsSync(src)) {
  console.error('copy-netlify-redirects: netlify/_redirects not found.');
  process.exit(1);
}

copyFileSync(src, dest);
console.log('copy-netlify-redirects: copied netlify/_redirects -> web-build/_redirects');
