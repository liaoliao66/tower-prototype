// Rewrite all pages/**.html as UTF-8 without BOM (Node writeFileSync has no BOM).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'prototype', 'pages');

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) {
      let buf = fs.readFileSync(full);
      if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) buf = buf.subarray(3);
      fs.writeFileSync(full, buf);
    }
  }
}

walk(root);
console.log('Stripped BOM / normalized UTF-8 write for all HTML under pages/');
