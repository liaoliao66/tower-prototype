/**
 * Pages live at prototype/pages/{PC端|APP端}/a/b/file.html — need 4x .. to reach prototype/assets.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'prototype', 'pages');
const wrong = '../../../assets/';
const right = '../../../../assets/';

let n = 0;
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) {
      let s = fs.readFileSync(full, 'utf8');
      if (!s.includes(wrong)) continue;
      s = s.split(wrong).join(right);
      fs.writeFileSync(full, s, 'utf8');
      n++;
    }
  }
}

walk(root);
console.log('Updated asset paths in', n, 'HTML files');
