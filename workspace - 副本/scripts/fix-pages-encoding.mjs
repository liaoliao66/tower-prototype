/**
 * 批量修复 prototype/pages 下 HTML：UTF-8 meta、无 BOM 保存、相对路径、常见乱码替换
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prototypeRoot = path.join(__dirname, '..', 'prototype');
const pagesRoot = path.join(prototypeRoot, 'pages');
const pcRoot = path.join(pagesRoot, 'PC端');

/** basename -> 相对 PC端 的目录（正斜杠） */
const pcFileDirs = new Map();

function walkPc(dir, relPosix = '') {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkPc(full, relPosix ? `${relPosix}/${ent.name}` : ent.name);
    } else if (ent.name.endsWith('.html')) {
      pcFileDirs.set(ent.name, relPosix);
    }
  }
}

if (fs.existsSync(pcRoot)) walkPc(pcRoot);

function posixRelFromPcRoot(fileAbs) {
  let rel = path.relative(pcRoot, fileAbs);
  return rel.split(path.sep).join('/');
}

/** 从当前 PC 页面到目标 pc_*.html 的相对路径 */
function hrefToPcTarget(fromAbs, targetBase) {
  const toDir = pcFileDirs.get(targetBase);
  if (!toDir) return null;
  const fromRel = posixRelFromPcRoot(fromAbs);
  const fromDir = path.posix.dirname(fromRel);
  const fromParts = fromDir === '.' ? [] : fromDir.split('/');
  const toParts = toDir.split('/');
  let i = 0;
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) i++;
  const ups = fromParts.length - i;
  const rest = toParts.slice(i).join('/');
  let out = '../'.repeat(ups) + rest;
  if (rest) out += '/';
  out += targetBase;
  return out;
}

/** 修正 PC 页面内指向其它 pc_*.html 的链接（含乱码路径） */
function fixPcInternalHrefs(html, fromAbs) {
  return html.replace(
    /\b(href|src)=(["'])((?:(?!\2).)*?)(pc_[a-z0-9_]+\.html)\2/gi,
    (m, attr, q, _prefix, base) => {
      const fixed = hrefToPcTarget(fromAbs, base);
      if (!fixed) return m;
      return `${attr}=${q}${fixed}${q}`;
    }
  );
}

/** 乱码替换：按长度降序，避免短串误伤 */
const MOJIBAKE_REPLACEMENTS = [
  ['检测数据录�?/title>', '检测数据录入</title>'],
  ['检测任�?/title>', '检测任务</title>'],
  ['<!-- 检测数据录�?Tabs -->', '<!-- 检测数据录入 Tabs -->'],
  ['<!-- 塔段检�?-->', '<!-- 塔段检测 -->'],
  ['<!-- �?�?-->', '<!-- 塔段卡片 -->'],
  ['�?段（0-9m�?', '第1段（0-9m）'],
  ['�?段（9-18m�?', '第2段（9-18m）'],
  ['�?段（18-27m�?', '第3段（18-27m）'],
  ['�?段（27-36m�?', '第4段（27-36m）'],
  ['�?段（36-45m�?', '第5段（36-45m）'],
  ['其中�?段发�?颗', '其中第4段发现2颗'],
  ['�?段松动', '第4段松动'],
  ['�?段法兰', '第3段法兰'],
  ['�?段螺栓', '第4段螺栓'],
  ['�?段法兰间隙', '第3段法兰间隙'],
  ['满足规范要求（�?.2%）�?', '满足规范要求（≤0.2%）。'],
  ['拍照记�?', '拍照记录'],
  ['placeholder="请输入壁�?', 'placeholder="请输入壁厚"'],
  ['placeholder="请输入法兰间�?', 'placeholder="请输入法兰间距"'],
  ['placeholder="请输入备注信�?', 'placeholder="请输入备注信息"'],
  ['检测数据录�?-', '检测数据录入 -'],
  ['检测数据录�?', '检测数据录入'],
  ['铁塔检测业�?', '铁塔检测业务'],
  ['检测任�?', '检测任务'],
  ['全部状�?', '全部状态'],
  ['待执�?', '待执行'],
  ['执行�?', '执行中'],
  ['待审�?', '待审核'],
  ['已编�?', '已编制'],
  ['已审�?', '已审核'],
  ['已打�?', '已打印'],
  ['全部检测类�?', '全部检测类型'],
  ['安全性鉴�?', '安全性鉴定'],
  ['可靠性鉴�?', '可靠性鉴定'],
  ['常规检�?', '常规检测'],
  ['检测类�?', '检测类型'],
  ['检测人�?', '检测人员'],
  ['状�?', '状态'],
  ['塔安全鉴�?', '塔安全鉴定'],
  ['塔常规检�?', '塔常规检测'],
  ['塔可靠性鉴�?', '塔可靠性鉴定'],
  ['�?5 条记�?', '共 5 条记录'],
  ['单管�?', '单管塔'],
  ['塔段�?', '塔段号'],
  ['检测类�?', '检测类型'],
  ['塔段检�?', '塔段检测'],
  ['基础检�?', '基础检测'],
  ['平台检�?', '平台检测'],
  ['天线检�?', '天线检测'],
  ['其他检�?', '其他检测'],
  ['检测结�?', '检测结果'],
  ['不合�?', '不合格'],
  ['点击上传或拖拽照�?', '点击上传或拖拽照片'],
  ['label class="form-label">检测结�?', 'label class="form-label">检测结果'],
  ['通信铁塔检测报�?', '通信铁塔检测报告'],
  ['浙江中能工程检测有限公�?', '浙江中能工程检测有限公司'],
  ['检测日�?', '检测日期'],
  ['检测类�?', '检测类型'],
  ['检测依�?', '检测依据'],
  ['执行�?br>', '执行。<br>'],
  ['技术规范�?br>', '技术规范》<br>'],
  ['设计标准�?br>', '设计标准》<br>'],
  ['验收规范�?br>', '验收规范》<br>'],
  ['竣工图�?', '竣工图纸'],
  ['检测设�?', '检测设备'],
  ['铁塔概�?', '铁塔概况'],
  ['设计总高�?', '设计总高度'],
  ['共�?个塔段', '共5个塔段'],
  ['约8年�?', '约8年。'],
  ['检测结�?', '检测结论'],
  ['不合格项分�?', '不合格项分析'],
  ['�?段螺栓松动', '第4段螺栓松动'],
  ['引起塔身微变形导致�?', '引起塔身微变形导致。'],
  ['不合�?/strong>', '不合格</strong>'],
  ['进行紧固处理�?br>', '进行紧固处理。<br>'],
  ['增加垫片调整�?br>', '增加垫片调整。<br>'],
  ['进行复检�?', '进行复检。'],
  ['编制�?', '编制人'],
  ['审核�?', '审核人'],
  ['签发�?', '签发人'],
  ['检测结果描�?', '检测结果描述'],
  ['请详细描述检测结�?', '请详细描述检测结果'],
  ['请输入处理建�?', '请输入处理建议'],
  ['检测结�?<span', '检测结论<span'],
  ['label class="form-label">检测结�?', 'label class="form-label">检测结论'],
  ['签字�?', '签字区'],
  ['禁止手动修�?', '禁止手动修改'],
  ['预览报告', '预览报告'],
  ['转办�?', '转办人'],
  ['请选择审核�?', '请选择审核人'],
  ['高级工程�?', '高级工程师'],
  ['检测报�?', '检测报告'],
  ['打印用�?', '打印用途'],
  ['请输入申请说�?', '请输入申请说明'],
  ['申请�?', '申请人'],
  ['签发意�?', '签发意见'],
  ['审核意�?', '审核意见'],
  ['处理�?', '处理意见'],
  ['完成检测报告编�?', '完成报告编制'],
  ['规范�?', '规范》'],
  ['标准�?', '标准》'],
  ['�?.2%', '≤0.2%'],
  ['执�?。', '执行。'],
  ['�?/option>', '无</option>'],
  ['<option selected>�?', '<option selected>无'],
  ['<option>�?', '<option>有'],
  ['option>�?/option', 'option>是</option'],
  ['selected>�?/option', 'selected>否</option'],
  ['<td>�?/td>', '<td>—</td>'],
  ['运营�?', '运营商'],
  ['全部类�?', '全部类型'],
  ['全部铁�?', '全部铁塔'],
  ['状�?/th>', '状态</th>'],
  ['状�?/td>', '状态</td>'],
  ['类�?/th>', '类型</th>'],
  ['备�?', '备注'],
  ['流�?', '流程'],
  ['工作�?', '工作台'],
  ['首�?', '首页'],
  ['消息�?', '消息'],
  ['通�?', '通知'],
  ['订�?', '订单'],
  ['报�?/th>', '报告</th>'],
  ['客户�?', '客户'],
  ['工程�?', '工程'],
  ['用户�?', '用户'],
  ['角色�?', '角色'],
  ['权�?', '权限'],
  ['模�?', '模板'],
  ['字�?', '字段'],
  ['版�?', '版本'],
  ['章�?', '章节'],
  ['样�?', '样式'],
  ['站�?', '站点'],
  ['信�?', '信息'],
  ['录�?', '录入'],
  ['台�?', '台账'],
  ['名�?', '名录'],
  ['管�?', '管理'],
  ['部�?', '部门'],
  ['单�?', '单位'],
  ['驾�?', '驾驶舱'],
  ['看�?', '看板'],
  ['系�?', '系统'],
  ['原�?', '原型'],
  ['预�?', '预览'],
  ['开�?', '开始'],
  ['页�?', '页面'],
  ['公�?', '公司'],
  ['类�?', '类型'],
  ['检�?', '检测'],
  ['鉴�?', '鉴定'],
  ['执�?', '执行'],
  ['审�?', '审核'],
  ['编�?', '编制'],
  ['打�?', '打印'],
  ['描�?', '描述'],
  ['建�?', '建议'],
  ['修�?', '修改'],
  ['说�?', '说明'],
  ['意�?', '意见'],
  ['用�?', '用途'],
  ['人�?', '人员'],
  ['记�?', '记录'],
  ['任�?', '任务'],
  ['业�?', '业务'],
  ['报�?', '报告'],
  ['依�?', '依据'],
  ['设�?', '设备'],
  ['概�?', '概况'],
  ['高�?', '高度'],
  ['分�?', '分析'],
  ['发�?', '发现'],
  ['照�?', '照片'],
  ['间�?', '间距'],
  ['壁�?', '壁厚'],
  ['结�?', '结果'],
  ['号�?', '号段'],
  ['塔段�?', '塔段编号'],
  ['法兰间�?', '法兰间距'],
  ['壁�?', '壁厚'],
  ['录�?', '录入'],
  ['类�?', '类型'],
  ['鉴�?', '鉴定'],
  ['检�?', '检测'],
  ['状�?', '状态'],
  ['合�?', '合格'],
  ['信�?', '信息'],
  ['�?/h1>', '系统</h1>'],
  ['�?/h2>', '</h2>'],
  ['�?/div>', '</div>'],
  ['�?/span>', '</span>'],
  ['�?/label>', '</label>'],
  ['�?/option>', '</option>'],
  ['�?/th>', '</th>'],
  ['�?/td>', '</td>'],
  ['�?/title>', '</title>'],
  ['�?/a>', '</a>'],
  ['�?/p>', '</p>'],
  ['�?/li>', '</li>'],
  ['�?/strong>', '</strong>'],
];

MOJIBAKE_REPLACEMENTS.sort((a, b) => b[0].length - a[0].length);

function applyMojibakeFixes(html) {
  let s = html;
  for (const [from, to] of MOJIBAKE_REPLACEMENTS) {
    if (from.includes('�')) s = s.split(from).join(to);
  }
  return s;
}

/** 确保 <head> 后第一行是 <meta charset="UTF-8"> */
function ensureUtf8Meta(html) {
  let s = html.replace(/<meta\s+charset\s*=\s*["']?UTF-8["']?\s*\/?\s*>/gi, '');
  s = s.replace(
    /<meta\s+http-equiv\s*=\s*["']Content-Type["']\s+content\s*=\s*["'][^"']*charset\s*=\s*utf-8[^"']*["']\s*\/?\s*>/gi,
    ''
  );
  if (!/<head[^>]*>/i.test(s)) return s;
  return s.replace(/<head([^>]*)>/i, '<head$1>\n<meta charset="UTF-8">');
}

function processFile(absPath) {
  let html = fs.readFileSync(absPath, 'utf8');
  html = ensureUtf8Meta(html);
  const rel = path.relative(pagesRoot, absPath);
  if (rel.startsWith(`PC端${path.sep}`) || rel.startsWith('PC端/')) {
    html = fixPcInternalHrefs(html, absPath);
  }
  html = applyMojibakeFixes(html);
  fs.writeFileSync(absPath, html, { encoding: 'utf8' });
}

function walkAllHtml(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walkAllHtml(full);
    else if (ent.name.endsWith('.html')) processFile(full);
  }
}

walkAllHtml(pagesRoot);
console.log('Done: UTF-8 meta, mojibake + PC href fixes, UTF-8 no BOM:', pagesRoot);
