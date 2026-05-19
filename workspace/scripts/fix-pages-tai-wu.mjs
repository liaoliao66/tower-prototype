/**
 * 修复误替换：「态」等被写成「无」的选项与标签（批量替换安全片段）
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesRoot = path.join(__dirname, '..', 'prototype', 'pages');

const REPLACEMENTS = [
  ['全部状无', '全部状态'],
  ['待归无', '待归还'],
  ['维修无', '维修中'],
  ['不合无', '不合格'],
  ['待执无', '待执行'],
  ['执行无', '执行中'],
  ['待审无', '待审核'],
  ['已编无', '已编制'],
  ['已审无', '已审核'],
  ['已打无', '已打印'],
  ['已拒无', '已拒绝'],
  ['全部检测类无', '全部检测类型'],
  ['安全性鉴无', '安全性鉴定'],
  ['可靠性鉴无', '可靠性鉴定'],
  ['常规检无', '常规检测'],
  ['请选择审核无', '请选择审核人'],
  ['高级工程无', '高级工程师'],
  ['检测报无', '检测报告'],
  ['请选择供应无', '请选择供应商'],
  ['请选择关联出库无', '请选择关联出库单'],
  ['全部供应无', '全部供应商'],
  ['南京测控仪器无', '南京测控仪器厂'],
  ['单管无</option>', '单管塔</option>'],
  ['角钢无</option>', '角钢塔</option>'],
  ['三管无</option>', '三管塔</option>'],
  ['四管无</option>', '四管塔</option>'],
  ['运营无', '运营商'],
  ['合同无', '合同部'],
  ['检测一无', '检测一组'],
  ['检测二无', '检测二组'],
  ['检测人无', '检测人员'],
  ['审核无', '审核员'],
  ['审批无', '审批员'],
  ['角钢塔报无', '角钢塔报告'],
  ['格构塔报无', '格构塔报告'],
  ['法兰式单管报无', '法兰式单管报告'],
  ['插接式单管报无', '插接式单管报告'],
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
console.log('态/告/厂等误替换修复完成');
