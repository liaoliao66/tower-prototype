import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const pcDir = join(import.meta.dirname, '..', 'prototype', 'pages', 'PC端');

const menuMap = {
  'pc_dashboard.html': { active: 'dashboard', bc: ['工作台', '工作台首页'] },
  'pc_workflow.html': { active: 'workflow', bc: ['工作台', '流程中心'] },
  'pc_workflow_approve.html': { active: 'workflow', bc: ['工作台', '流程中心', '流程审批'] },
  'pc_profile.html': { active: 'profile', bc: ['个人中心', '我的信息'] },
  'pc_messages.html': { active: 'messages', bc: ['个人中心', '消息中心'] },
  'pc_notices.html': { active: 'notices', bc: ['个人中心', '通知公告'] },
  'pc_logs.html': { active: 'logs', bc: ['个人中心', '登录日志'] },
  'pc_customer_list.html': { active: 'customer_list', bc: ['营销管理', '客户管理'] },
  'pc_customer_create.html': { active: 'customer_list', bc: ['营销管理', '客户管理', '新增客户'] },
  'pc_project_list.html': { active: 'project_list', bc: ['营销管理', '工程管理'] },
  'pc_project_create.html': { active: 'project_list', bc: ['营销管理', '工程管理', '新增工程'] },
  'pc_company_info.html': { active: 'company_info', bc: ['营销管理', '检测单位管理'] },
  'pc_supplier_list.html': { active: 'supplier_list', bc: ['供应商管理', '供应商名录'] },
  'pc_supplier_create.html': { active: 'supplier_list', bc: ['供应商管理', '供应商名录', '新增供应商'] },
  'pc_device_list.html': { active: 'device_list', bc: ['仪器设备管理', '设备信息'] },
  'pc_device_create.html': { active: 'device_list', bc: ['仪器设备管理', '设备信息', '新增设备'] },
  'pc_device_out.html': { active: 'device_out', bc: ['仪器设备管理', '设备出库'] },
  'pc_device_in.html': { active: 'device_in', bc: ['仪器设备管理', '设备入库'] },
  'pc_device_ledger.html': { active: 'device_ledger', bc: ['仪器设备管理', '出入库台账'] },
  'pc_system_users.html': { active: 'system_users', bc: ['系统管理', '用户管理'] },
  'pc_system_roles.html': { active: 'system_roles', bc: ['系统管理', '角色管理'] },
  'pc_system_logs.html': { active: 'system_logs', bc: ['系统管理', '操作日志'] },
  'pc_cockpit.html': { active: 'cockpit', bc: ['运营驾驶舱', '数据看板'] },
  'pc_print_ledger.html': { active: 'print_ledger', bc: ['铁塔检测业务', '打印台账'] },
};

let converted = 0;
let skipped = 0;

for (const fname of Object.keys(menuMap)) {
  const fpath = join(pcDir, fname);
  let html;
  try { html = readFileSync(fpath, 'utf8'); } catch { console.log(`SKIP (not found): ${fname}`); skipped++; continue; }

  if (html.includes('shared-layout.js')) { console.log(`SKIP (already converted): ${fname}`); skipped++; continue; }

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!mainMatch) { console.log(`SKIP (no <main> found): ${fname}`); skipped++; continue; }

  const mainContent = mainMatch[1].trim();
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : fname.replace('.html', '');
  const cfg = menuMap[fname];

  const newHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="../../assets/pc-layout.css">
</head>
<body>
<div id="page-content">
${mainContent}
</div>
<script src="../../assets/shared-layout.js"><\/script>
<script>window.__layoutConfig = {active:'${cfg.active}', breadcrumb:${JSON.stringify(cfg.bc)}};<\/script>
</body>
</html>`;

  writeFileSync(fpath, newHtml, 'utf8');
  console.log(`CONVERTED: ${fname}`);
  converted++;
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped`);
