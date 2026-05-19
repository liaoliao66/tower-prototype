import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesRoot = path.join(__dirname, '..', 'prototype', 'pages');

const REPLACEMENTS = [
  ['上一�?/button>', '上一页</button>'],
  ['下一�?/button>', '下一页</button>'],
  ["'铁塔检测业务,'", "'铁塔检测业务','"],
  ["'合同部管理,'", "'合同部管理','"],
  ["'供应商管理,'", "'供应商管理','"],
  ["'营销管理,'", "'营销管理','"],
  ['"工作台,"', '"工作台","'],
  [',"工作台首页]};', ',"工作台首页"]};'],
  ["'检测单位管理]};", "'检测单位管理'];"],
  ["'出入库台账]};", "'出入库台账'];"],
  ["'供应商名录]};", "'供应商名录'];"],
  ["'供应商名录,'", "'供应商名录','"],
  ["'新增供应商]};", "'新增供应商'];"],
];

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) {
      let s = fs.readFileSync(full, 'utf8');
      for (const [a, b] of REPLACEMENTS) s = s.split(a).join(b);
      fs.writeFileSync(full, s, { encoding: 'utf8' });
    }
  }
}

walk(pagesRoot);
console.log('Breadcrumb + pagination fix done');
