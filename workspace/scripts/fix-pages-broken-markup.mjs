import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'prototype', 'pages');

function fixContent(s) {
  // Missing '<' before closing tags (e.g. 鉴定/td> -> 鉴定</td>)
  s = s.replace(/([^<\s/])\/td>/g, '$1</td>');
  s = s.replace(/([^<\s/])\/div>/g, '$1</div>');
  s = s.replace(/([^<\s/])\/li>/g, '$1</li>');
  s = s.replace(/条记录\/span>/g, '条记录</span>');

  // Broken textarea placeholders (missing closing quote before >)
  s = s.replace(/placeholder="([^>]+)><\/textarea>/g, 'placeholder="$1"></textarea>');
  // Missing closing quote on value="...> before tag end
  s = s.replace(/value="([^">]+)>/g, 'value="$1">');

  return s;
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) {
      const before = fs.readFileSync(full, 'utf8');
      const after = fixContent(before);
      if (after !== before) fs.writeFileSync(full, after, 'utf8');
    }
  }
}

walk(root);
console.log('Broken /td>, /span>, placeholders, breadcrumb scan complete');
