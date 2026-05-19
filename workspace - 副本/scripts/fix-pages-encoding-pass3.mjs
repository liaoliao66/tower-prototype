import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesRoot = path.join(__dirname, '..', 'prototype', 'pages');

const REPLACEMENTS = [
  [' �?列表', ' - 列表'],
  ['�?78 </span>', '共 78 条</span>'],
  ['�?156 </span>', '共 156 条</span>'],
  ['关联出库�?span class="required"', '关联出库单<span class="required"'],
  ['检测一�?>', '检测一组">'],
  ['placeholder="检测一�?', 'placeholder="检测一组"'],
  ['请输入规格型�?>', '请输入规格型号">'],
  ['请输入生产厂�?>', '请输入生产厂家">'],
  ['供应�?span class="required"', '供应商<span class="required"'],
  ['请输入金�? style', '请输入金额" style'],
  ['校准有效�?span class="required"', '校准有效期<span class="required"'],
  ['placeholder="�?>"', 'placeholder="—"'],
  ['检测结果描</label>', '检测结果描述</label>'],
  ['> 不合</label>', '> 不合格</label>'],
  ['签字</div>', '签字区</div>'],
];

REPLACEMENTS.sort((a, b) => b[0].length - a[0].length);

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) {
      let s = fs.readFileSync(full, 'utf8');
      for (const [a, b] of REPLACEMENTS) s = s.split(a).join(b);
      // 破损的 textarea：检测结果
      s = s.replace(
        /placeholder="请详细描述检测结果>经检测，([\s\S]*?)（≤0\.2%）。\/textarea>/,
        'placeholder="请详细描述检测结果">经检测，$1（≤0.2%）。</textarea>'
      );
      fs.writeFileSync(full, s, { encoding: 'utf8' });
    }
  }
}

walk(pagesRoot);
console.log('Pass3 done');
