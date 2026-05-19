import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'prototype', 'pages');
const needle = '<meta charset="UTF-8">';
let n = 0;
const bad = [];

function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith('.html')) {
      n++;
      const buf = fs.readFileSync(f);
      const t = buf.toString('utf8');
      if (!t.includes(needle)) bad.push(`${f} (no charset)`);
      if (buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) bad.push(`${f} (BOM)`);
    }
  }
}

walk(root);
console.log('html files:', n);
console.log('issues:', bad.length);
bad.forEach((x) => console.log(x));
