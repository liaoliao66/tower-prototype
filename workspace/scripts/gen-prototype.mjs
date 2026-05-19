import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const protoRoot = path.join(__dirname, '..', 'prototype');
const DIR_PC = 'PC端';
const DIR_APP = 'APP端';
const pcPagesDir = path.join(protoRoot, 'pages', DIR_PC);
const appPagesDir = path.join(protoRoot, 'pages', DIR_APP);

const FA = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';

const IMG = {
  tower: 'https://images.unsplash.com/photo-1545558014-8692077e9d5c?auto=format&fit=crop&w=1200&q=80',
  office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  engineer: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
  antenna: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
  landscape: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
};

function tailwindScript() {
  return `<script src="https://cdn.tailwindcss.com"></script>
<script>
tailwind.config = {
  theme: {
    extend: {
      colors: { brand: { DEFAULT: '#0f172a', accent: '#059669' } }
    }
  }
};
</script>`;
}

function pcHead(title) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${tailwindScript()}
<link rel="stylesheet" href="${FA}">
<link rel="stylesheet" href="../../assets/pc-layout.css">
<style>body{ font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }</style>
</head>`;
}

const NAV = [
  { g: '工作台', items: [['dashboard','工作台首页'],['workflow','流程中心'],['workflow_approve','流程审批']] },
  { g: '个人', items: [['profile','个人中心'],['messages','消息中心'],['notices','通知公告'],['logs','登录日志']] },
  { g: '营销管理', items: [['customer_list','客户列表'],['customer_create','客户录入'],['project_list','工程列表'],['project_create','工程录入'],['order_list','订单列表'],['order_create','订单录入'],['order_reports','报告查询'],['company_info','检测单位(历史)']] },
  { g: '任务模板', items: [['task_template_list','任务模板列表'],['task_template_edit','任务模板编辑'],['task_template_fields','模板字段配置'],['task_template_versions','模板版本']] },
  { g: '报告模板', items: [['report_template_list','报告模板列表'],['report_template_edit','报告模板编辑'],['report_template_chapters','报告章节配置'],['report_template_style','报告样式配置']] },
  { g: '基础数据', items: [['data_inspection_unit','检测单位'],['data_device','设备管理'],['data_tower_type','铁塔类型'],['data_wind','区域风压'],['data_standard','标准规范'],['data_standard_group','规范组'],['data_device_type','设备类型'],['data_inspect_type','检测类型'],['data_antenna','天线数据']] },
  { g: '检测业务', items: [['task_list','检测任务'],['report_generate','报告生成'],['report_audit','报告审核'],['report_approve','报告签发']] },
  { g: '运营', items: [['cockpit','运营驾驶舱']] },
  { g: '系统', items: [['system_users','用户管理'],['system_roles','角色管理'],['system_logs','操作日志']] },
];

function sidebar(active) {
  let h = `<aside class="w-60 shrink-0 border-r border-slate-200/80 bg-white/90 backdrop-blur-xl flex flex-col min-h-screen">
<div class="p-5 border-b border-slate-100"><div class="flex items-center gap-2"><span class="text-xl text-brand"><i class="fa-solid fa-broadcast-tower"></i></span><span class="font-semibold text-slate-900">铁塔检测</span></div><p class="text-xs text-slate-500 mt-1">管理后台</p></div>
<nav class="flex-1 overflow-y-auto p-3 space-y-4 text-sm">`;
  for (const sec of NAV) {
    h += `<div><p class="px-2 text-[11px] uppercase tracking-wide text-slate-400 mb-2">${sec.g}</p><div class="space-y-0.5">`;
    for (const [id, label] of sec.items) {
      const cls = id === active ? 'pc-sidebar-link active' : 'pc-sidebar-link';
      h += `<a href="pc_${id}.html" class="${cls} flex items-center gap-2 rounded-xl px-3 py-2 text-slate-600 hover:bg-slate-50 transition">${label}</a>`;
    }
    h += `</div></div>`;
  }
  h += `</nav><div class="p-4 border-t border-slate-100 text-xs text-slate-400"><a href="pc_login.html" class="hover:text-slate-600"><i class="fa-solid fa-arrow-right-from-bracket mr-1"></i>退出登录</a></div></aside>`;
  return h;
}

function pcLayout(active, crumb, title, inner) {
  return `${pcHead(title)}
<body class="pc-body bg-slate-50 text-slate-900 antialiased">
<div class="flex min-h-screen">
${sidebar(active)}
<div class="flex-1 flex flex-col min-w-0">
<header class="h-14 border-b border-slate-200/80 bg-white/80 backdrop-blur flex items-center justify-between px-8 shrink-0">
<div class="flex items-center gap-3 text-sm text-slate-500"><i class="fa-solid fa-house text-slate-400"></i><span>${crumb}</span></div>
<div class="flex items-center gap-4"><button type="button" class="relative text-slate-500 hover:text-slate-800 transition"><i class="fa-regular fa-bell"></i><span class="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span></button>
<div class="flex items-center gap-2"><img src="${IMG.engineer}" alt="" class="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow"><span class="text-sm font-medium text-slate-800">张伟</span></div></div>
</header>
<main class="flex-1 p-8 overflow-auto max-w-7xl mx-auto w-full">${inner}</main>
</div></div>
</body></html>`;
}

function tableBlock(title, cols, rows) {
  let t = `<div class="rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden"><div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center"><h2 class="font-semibold text-slate-900">${title}</h2><div class="flex gap-2"><button class="px-4 py-2 rounded-xl border border-slate-200 text-sm hover:bg-slate-50 transition btn-tap">查询</button><button class="px-4 py-2 rounded-xl bg-brand text-white text-sm hover:opacity-95 transition btn-tap"><i class="fa-solid fa-plus mr-1"></i>新增</button></div></div><div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="bg-slate-50 text-slate-600"><tr>`;
  for (const c of cols) t += `<th class="px-6 py-3 font-medium">${c}</th>`;
  t += `</tr></thead><tbody>`;
  for (const r of rows) {
    t += `<tr class="border-t border-slate-100 hover:bg-slate-50/80 transition">`;
    for (const cell of r) t += `<td class="px-6 py-3 text-slate-700">${cell}</td>`;
    t += `</tr>`;
  }
  t += `</tbody></table></div><div class="px-6 py-4 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500"><span>共 128 条</span><div class="flex gap-2"><button class="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">上一页</button><button class="px-3 py-1 rounded-lg bg-slate-900 text-white">1</button><button class="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50">下一页</button></div></div></div>`;
  return t;
}

function formCard(title, fields) {
  let h = `<div class="rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-6 mb-6"><h3 class="font-semibold text-slate-900 mb-4">${title}</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
  for (const f of fields) {
    h += `<div><label class="block text-xs text-slate-500 mb-1">${f.label}${f.req ? '<span class="text-red-500">*</span>' : ''}</label>${f.html}</div>`;
  }
  h += `</div></div>`;
  return h;
}

const inp = (ph) => `<input type="text" placeholder="${ph}" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-300 outline-none">`;
const sel = () => `<select class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"><option>请选择</option><option>选项一</option></select>`;

function defaultListPage(spec) {
  const cols = spec.cols || ['编号', '名称', '状态', '更新时间', '操作'];
  const rows = spec.rows || [
    ['SB-202605-001','示例记录-A','进行中','2026-05-07','<a href="#" class="text-emerald-700 hover:underline">编辑</a>'],
    ['SB-202605-002','示例记录-B','已完成','2026-05-06','<a href="#" class="text-emerald-700 hover:underline">查看</a>'],
  ];
  return `<div class="space-y-6"><div class="flex flex-wrap gap-3">${inp('关键词')} ${sel()} <button class="px-5 py-2 rounded-xl bg-brand text-white text-sm btn-tap">筛选</button></div>${tableBlock(spec.tableTitle || '数据列表', cols, rows)}</div>`;
}

function defaultFormPage(spec) {
  const fields = spec.fields || [
    { label: '名称', req: true, html: inp('请输入') },
    { label: '备注', req: false, html: `<textarea class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm min-h-[88px]" placeholder="说明"></textarea>` },
  ];
  return `<div class="max-w-4xl">${formCard(spec.cardTitle || '基本信息', fields)}<div class="flex gap-3 justify-end"><button class="px-6 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 btn-tap">取消</button><button class="px-6 py-2.5 rounded-xl bg-brand text-white hover:opacity-95 btn-tap">保存</button></div></div>`;
}

function writePc(name, html) {
  fs.mkdirSync(pcPagesDir, { recursive: true });
  fs.writeFileSync(path.join(pcPagesDir, name), html, 'utf8');
}

function writeApp(name, html) {
  fs.mkdirSync(appPagesDir, { recursive: true });
  fs.writeFileSync(path.join(appPagesDir, name), html, 'utf8');
}

/* --- PC 页面规格： [文件名不含扩展名, activeNavKey, 面包屑, 标题, 类型, 自定义] --- */
const pcSpecs = [];

function addPc(fileStem, active, crumb, title, type, extra = {}) {
  pcSpecs.push({ fileStem, active, crumb, title, type, extra });
}

addPc('login', null, '', '登录', 'login');
addPc('dashboard', 'dashboard', '工作台 / 首页', '工作台首页', 'dashboard');
addPc('workflow', 'workflow', '工作台 / 流程', '流程中心', 'workflow');
addPc('workflow_approve', 'workflow_approve', '工作台 / 审批', '流程审批', 'approve');
addPc('profile', 'profile', '个人 / 资料', '个人中心', 'profile');
addPc('messages', 'messages', '个人 / 消息', '消息中心', 'list');
addPc('notices', 'notices', '个人 / 公告', '通知公告', 'list');
addPc('logs', 'logs', '个人 / 日志', '登录日志', 'list');

['order_list','order_create','order_reports'].forEach(id => {
  const titles = { order_list:'订单列表', order_create:'订单录入', order_reports:'报告查询' };
  const crumbs = { order_list:'营销 / 订单', order_create:'营销 / 录入', order_reports:'营销 / 报告' };
  const ty = id === 'order_create' ? 'order_form' : id === 'order_list' ? 'order_list_page' : 'list';
  addPc(id, id, crumbs[id], titles[id], ty);
});

addPc('order_dispatch', 'order_list', '营销 / 订单 / 派单管理', '派单管理', 'dispatch');
addPc('order_tracking', 'order_list', '营销 / 订单 / 派单跟踪', '派单跟踪', 'list');

['customer_list','customer_create','project_list','project_create','company_info'].forEach(id => {
  const m = { customer_list:['客户列表','营销 / 客户'], customer_create:['客户录入','营销 / 客户'], project_list:['工程列表','营销 / 工程'], project_create:['工程录入','营销 / 工程'], company_info:['检测单位','营销 / 单位'] };
  addPc(id, id, m[id][1], m[id][0], id.endsWith('create') || id === 'company_info' ? 'form' : 'list');
});

['device_list','device_create','device_out','device_in','device_ledger'].forEach(id => {
  const t = { device_list:'设备列表', device_create:'设备录入', device_out:'设备出库', device_in:'设备入库', device_ledger:'出入库台账' };
  addPc(id, id, '设备 / ' + t[id], t[id], ['device_out','device_in','device_create'].includes(id)?'device_form':'list');
});

const tmplTitles = {
  task_template_list:'任务模板列表', task_template_edit:'任务模板编辑', task_template_fields:'模板字段配置', task_template_versions:'模板版本管理',
  report_template_list:'报告模板列表', report_template_edit:'报告模板编辑', report_template_chapters:'报告章节配置', report_template_style:'报告样式配置'
};
['task_template_list','task_template_edit','task_template_fields','task_template_versions','report_template_list','report_template_edit','report_template_chapters','report_template_style'].forEach(id => {
  addPc(id, id, '模板配置', tmplTitles[id], id.endsWith('list')||id.includes('versions')?'list':'form');
});

const dataTitles = {
  data_inspection_unit:'检测单位', data_device:'设备管理',
  data_tower_type:'铁塔类型', data_wind:'区域风压', data_standard:'标准规范',
  data_standard_group:'规范组', data_device_type:'设备类型', data_inspect_type:'检测类型',
  data_antenna:'天线数据'
};
['data_inspection_unit','data_device','data_tower_type','data_wind','data_standard','data_standard_group','data_device_type','data_inspect_type','data_antenna'].forEach(id => addPc(id, id, '基础数据', dataTitles[id], 'list'));

addPc('task_list', 'task_list', '检测业务', '检测任务', 'list');
addPc('task_data', 'task_data', '检测业务', '检测数据录入', 'form');

['report_generate','report_audit','report_approve'].forEach(id => {
  const ty = id === 'report_generate' ? 'report_gen' : id === 'report_audit' ? 'audit' : 'approve_final';
  addPc(id, id, '报告', id === 'report_generate' ? '报告生成' : id === 'report_audit' ? '报告审核' : '报告签发', ty);
});

addPc('cockpit', 'cockpit', '运营 / 驾驶舱', '运营驾驶舱', 'cockpit');

['system_users','system_roles','system_logs'].forEach(id => addPc(id, id, '系统', id==='system_users'?'用户管理':id==='system_roles'?'角色管理':'操作日志', 'list'));

/* 业务弹窗页 */
addPc('order_list_import', 'order_list', '营销 / 订单 / 导入', '导入订单', 'modal_import');
addPc('order_list_export', 'order_list', '营销 / 订单 / 导出', '导出订单', 'modal_export');
addPc('order_list_dispatch', 'order_list', '营销 / 订单 / 派单', '派单', 'modal_dispatch');
addPc('order_list_batch_dispatch', 'order_list', '营销 / 订单 / 批量派单', '批量派单', 'modal_batch');
addPc('order_dispatch_confirm', 'order_list', '营销 / 订单 / 派单确认', '确认派单', 'modal_confirm');
addPc('report_generate_preview', 'report_generate', '报告 / 预览', '报告预览', 'modal_preview');
addPc('report_audit_transfer', 'report_audit', '报告 / 转办', '审核转办', 'modal_transfer');

function innerFor(spec) {
  const { type, extra, title } = spec;
  switch (type) {
    case 'login':
      return `<div class="min-h-screen flex items-center justify-center bg-slate-100 relative overflow-hidden">
<img src="${IMG.office}" alt="" class="absolute inset-0 w-full h-full object-cover opacity-40">
<div class="relative z-10 w-full max-w-md mx-4"><div class="bg-white/95 backdrop-blur rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 border border-slate-200/80">
<div class="text-center mb-8"><img src="${IMG.tower}" alt="" class="w-[120px] h-auto mx-auto rounded-xl mb-4 object-cover"><h1 class="text-xl font-semibold text-slate-900">通信铁塔检测系统</h1><p class="text-sm text-slate-500 mt-1">浙江中能工程检测有限公司</p></div>
<form class="space-y-4" onsubmit="event.preventDefault();location.href='pc_dashboard.html'">
<div><label class="text-xs text-slate-500">账号</label><input name="u" class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="请输入账号" maxlength="50"></div>
<div><label class="text-xs text-slate-500">密码</label><input type="password" class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" placeholder="请输入密码"></div>
<div class="flex gap-2"><input class="w-28 rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="验证码" maxlength="4"><img src="${IMG.landscape}" alt="验证码" class="h-10 w-28 object-cover rounded-lg cursor-pointer border border-slate-200" title="点击刷新"></div>
<label class="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox"> 记住密码</label>
<button type="submit" class="w-full py-3 rounded-xl bg-brand text-white font-medium hover:opacity-95 transition btn-tap">登录</button>
</form>
<p class="text-center mt-4 text-sm text-slate-500"><a href="#" class="hover:text-slate-800">忘记密码</a></p></div></div></div>`;
    case 'dashboard':
      return `<div class="space-y-8"><div class="grid md:grid-cols-2 gap-6">
<div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm pc-card-hover"><div class="flex justify-between items-center mb-4"><h2 class="font-semibold text-lg">待办任务</h2><span class="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">3</span></div>
<ul class="space-y-3 text-sm"><li class="flex justify-between"><a href="pc_workflow_approve.html" class="text-slate-700 hover:text-brand">审批：铁塔检测报告签发</a><span class="text-slate-400">紧急</span></li><li class="flex justify-between"><span class="text-slate-700">现场数据审核·余杭站点</span><span class="text-slate-400">一般</span></li></ul>
<a href="pc_workflow.html" class="text-sm text-emerald-700 mt-4 inline-block hover:underline">查看更多</a></div>
<div class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm pc-card-hover"><h2 class="font-semibold text-lg mb-4">消息通知</h2><ul class="space-y-3 text-sm"><li class="flex gap-2"><span class="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0"></span><a href="pc_messages.html" class="text-slate-700">您有新的派单任务</a></li></ul></div></div>
<div class="grid md:grid-cols-2 gap-6"><div class="rounded-2xl border border-slate-200/80 bg-white p-6"><h2 class="font-semibold mb-4">快捷入口</h2><div class="grid grid-cols-3 gap-3 text-sm">
<a href="pc_order_list.html" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition btn-tap"><i class="fa-solid fa-file-contract text-xl text-slate-600"></i>订单</a>
<a href="pc_task_list.html" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 btn-tap"><i class="fa-solid fa-clipboard-check text-xl text-slate-600"></i>检测任务</a>
<a href="pc_report_generate.html" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 btn-tap"><i class="fa-solid fa-file-lines text-xl text-slate-600"></i>报告</a>
</div></div><div class="rounded-2xl border border-slate-200/80 bg-white p-6"><h2 class="font-semibold mb-4">系统公告</h2><ul class="text-sm text-slate-600 space-y-2"><li><a href="pc_notices.html" class="hover:text-brand">关于加强汛期检测安全的通知</a></li></ul></div></div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">${['本月任务','完成报告','在检设备','不合格项'].map((t,i)=>`<div class="rounded-2xl border border-slate-200/80 bg-white p-5 pc-card-hover"><p class="text-2xl font-semibold text-slate-900">${[42,28,16,5][i]}</p><p class="text-sm text-slate-500 mt-1">${t}</p><p class="text-xs text-emerald-600 mt-2"><i class="fa-solid fa-arrow-trend-up"></i> 同比上升</p></div>`).join('')}</div></div>`;
    case 'workflow':
      return defaultListPage({ tableTitle: '流程事项', cols: ['标题','类型','到达时间','状态','操作'], rows: [['报告审核·滨江项目','审批','2026-05-07 09:12','待办','<a href="pc_workflow_approve.html" class="text-emerald-700">办理</a>']] });
    case 'order_list_page':
      return `<div class="space-y-6"><div class="flex flex-wrap gap-2"><button onclick="location.href='pc_order_create.html'" class="px-4 py-2 rounded-xl bg-brand text-white text-sm btn-tap"><i class="fa-solid fa-plus mr-1"></i>新增订单</button><button onclick="location.href='pc_order_list_import.html'" class="px-4 py-2 rounded-xl border border-slate-200 text-sm hover:bg-slate-50 btn-tap"><i class="fa-solid fa-file-import mr-1"></i>导入</button><button onclick="location.href='pc_order_list_export.html'" class="px-4 py-2 rounded-xl border border-slate-200 text-sm hover:bg-slate-50 btn-tap"><i class="fa-solid fa-file-export mr-1"></i>导出</button><button onclick="location.href='pc_order_list_batch_dispatch.html'" class="px-4 py-2 rounded-xl border border-slate-200 text-sm hover:bg-slate-50 btn-tap"><i class="fa-solid fa-paper-plane mr-1"></i>批量派单</button></div>${defaultListPage({ tableTitle: '订单列表', cols: ['订单名称','铁塔','状态','派单时间','操作'], rows: [['滨江基站安全性鉴定','滨江01塔','待派单','2026-05-06','<a href="pc_order_list_dispatch.html" class="text-emerald-700 mr-2">派单</a><a href="pc_order_create.html" class="text-slate-600">编辑</a>'],['城西改造项目','城西角钢塔','已派单','2026-05-05','<span class="text-slate-400">已锁定</span>']] })}</div>`;
    case 'approve':
      return `<div class="max-w-3xl space-y-6"><div class="rounded-2xl border border-slate-200 bg-white p-6"><h3 class="font-semibold mb-4">审批内容</h3><p class="text-sm text-slate-600 leading-relaxed">铁塔结构安全性检测报告（编号 BG-2026-0512）待您审批。</p></div>
<div><label class="text-xs text-slate-500">审批意见</label><textarea class="mt-1 w-full rounded-xl border border-slate-200 p-3 text-sm min-h-[100px]" placeholder="请输入意见"></textarea></div>
<div class="flex flex-wrap gap-3"><button class="px-6 py-2.5 rounded-xl bg-brand text-white btn-tap">同意</button><button class="px-6 py-2.5 rounded-xl border border-red-200 text-red-700 btn-tap">驳回</button><button class="px-6 py-2.5 rounded-xl border border-slate-200 btn-tap" onclick="location.href='pc_report_audit_transfer.html'">转办</button></div></div>`;
    case 'profile':
      return `<div class="grid md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6">${formCard('基本信息',[{label:'姓名',req:true,html:inp('张伟')},{label:'部门',req:true,html:inp('检测一部')},{label:'手机',req:true,html:inp('13800000000')}])}${formCard('电子签名',[{label:'签名图片',req:false,html:'<div class="border border-dashed border-slate-300 rounded-xl p-8 text-center text-slate-400 text-sm">PNG 300×150 像素</div>'}])}</div><div class="rounded-2xl border border-slate-200 bg-white p-6 h-fit"><img src="${IMG.engineer}" class="w-full rounded-xl mb-4 object-cover"><p class="text-sm text-slate-600">证件上传区</p><button class="mt-4 w-full py-2 rounded-xl border border-slate-200 text-sm btn-tap">上传证件</button></div></div>`;
    case 'order_form':
      return `<div class="max-w-4xl space-y-6">${formCard('基本信息',[{label:'订单名称',req:true,html:inp('滨江通信铁塔安全性鉴定')},{label:'订单编号',req:false,html:'<input readonly class="w-full rounded-xl border border-slate-200 px-3 py-2 bg-slate-50 text-sm" value="系统自动生成">'},{label:'派单日期',req:true,html:'<input type="date" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" value="2026-05-08">'}])}
${formCard('关联信息',[{label:'选择铁塔',req:true,html:sel()},{label:'客户信息',req:false,html:inp('某某通信有限公司')},{label:'工程信息',req:false,html:inp('滨江基站改造工程')}])}
${formCard('检测需求',[{label:'检测类型',req:true,html:sel()},{label:'检测依据',req:true,html:'<select multiple class="w-full rounded-xl border border-slate-200 h-24 text-sm"><option>GB/T 51338</option><option>YD/T 5132</option></select>'},{label:'检测设备',req:true,html:sel()},{label:'说明',req:false,html:'<textarea class="w-full rounded-xl border border-slate-200 p-3 text-sm min-h-[80px]"></textarea>'}])}
<div class="flex gap-3 justify-end"><button type="button" onclick="history.back()" class="px-6 py-2.5 rounded-xl border border-slate-200 btn-tap">取消</button><button class="px-6 py-2.5 rounded-xl bg-brand text-white btn-tap" onclick="location.href='pc_order_list.html'">保存</button></div></div>`;
    case 'dispatch':
      return `<div class="grid md:grid-cols-2 gap-6"><div class="rounded-2xl border border-slate-200 bg-white p-6">${tableBlock('待派单订单',['','订单名称','铁塔','状态'],[['<input type="checkbox">','滨江项目','单管塔','待派单'],['<input type="checkbox">','城西改造','角钢塔','待派单']])}</div>
<div class="rounded-2xl border border-slate-200 bg-white p-6 space-y-4"><h3 class="font-semibold">派单设置</h3><div><label class="text-xs text-slate-500">检测人员</label><select class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"><option>请选择检测人员</option><option>李强（华东）- 任务3</option></select></div><div><label class="text-xs text-slate-500">计划完成日期</label><input type="date" class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"></div>
<button class="w-full py-3 rounded-xl bg-brand text-white btn-tap" onclick="location.href='pc_order_dispatch_confirm.html'">确认派单</button><button class="w-full py-2 rounded-xl border border-slate-200 text-sm btn-tap">撤单</button></div></div>`;
    case 'report_gen':
      return `<div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-4 text-sm space-y-2"><p class="font-semibold mb-2">报告结构</p>${['封面','目录','检测依据','设备','铁塔概况','检测项','结论','签字'].map(s=>`<div class="py-2 px-3 rounded-xl hover:bg-slate-50 cursor-pointer">${s}</div>`).join('')}</div>
<div class="lg:col-span-2 space-y-4"><div class="rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm px-4 py-3">以下字段自动从基础档案取值，禁止手动修改</div>
${formCard('只读信息',[{label:'委托单位',req:false,html:inp('某某公司')},{label:'工程名称',req:false,html:inp('滨江基站')},{label:'铁塔名称',req:false,html:inp('滨江01塔')}])}
${formCard('可编辑内容',[{label:'检测结果',req:true,html:'<textarea class="w-full rounded-xl border border-slate-200 p-3 text-sm min-h-[120px]"></textarea>'},{label:'处理建议',req:false,html:'<textarea class="w-full rounded-xl border border-slate-200 p-3 text-sm min-h-[80px]"></textarea>'},{label:'检测结论',req:true,html:'<label class="mr-4"><input type="radio" name="c"> 合格</label><label><input type="radio" name="c"> 不合格</label>'}])}
<div class="flex flex-wrap gap-3"><button class="px-5 py-2 rounded-xl border border-slate-200 btn-tap" onclick="location.href='pc_report_generate_preview.html'">预览</button><button class="px-5 py-2 rounded-xl bg-slate-100 btn-tap">保存</button><button class="px-5 py-2 rounded-xl bg-brand text-white btn-tap">提交审核</button></div></div></div>`;
    case 'audit':
      return `<div class="space-y-6 max-w-4xl"><div class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 leading-relaxed">报告全文只读展示区（关联原始检测数据已校验）</div>
<label class="block text-xs text-slate-500">审核意见</label><textarea class="w-full rounded-xl border border-slate-200 p-3 min-h-[100px]"></textarea>
<div class="flex gap-3"><button class="px-6 py-2.5 rounded-xl bg-brand text-white btn-tap">通过</button><button class="px-6 py-2.5 rounded-xl border border-red-200 text-red-700 btn-tap">驳回</button><button class="px-6 py-2.5 rounded-xl border border-slate-200 btn-tap" onclick="location.href='pc_report_audit_transfer.html'">转办</button></div></div>`;
    case 'approve_final':
      return `<div class="space-y-6 max-w-4xl"><div class="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700 leading-relaxed">报告全文只读 · 终审签发</div>
<label class="block text-xs text-slate-500">审批意见</label><textarea class="w-full rounded-xl border border-slate-200 p-3 min-h-[100px]" placeholder="终审质量把关意见"></textarea>
<div class="flex gap-3"><button class="px-6 py-2.5 rounded-xl bg-brand text-white btn-tap">签发通过</button><button class="px-6 py-2.5 rounded-xl border border-red-200 text-red-700 btn-tap">驳回修改</button></div></div>`;
    case 'cockpit':
      return `<div class="space-y-6"><div class="rounded-2xl overflow-hidden border border-slate-200 shadow-sm"><img src="${IMG.landscape}" alt="" class="w-full h-48 object-cover"><div class="bg-slate-900 text-white p-6"><h2 class="text-xl font-semibold">运营驾驶舱</h2><p class="text-slate-300 text-sm mt-1">任务进度 · 人员工作量 · 设备状态 · 不合格项分布</p></div></div>
<div class="grid md:grid-cols-4 gap-4">${['任务完成率','平均周期','设备利用率','不合格占比'].map((t,i)=>`<div class="rounded-2xl bg-white border border-slate-200 p-5 pc-card-hover"><p class="text-3xl font-bold text-slate-900">${['86%','12天','74%','3.2%'][i]}</p><p class="text-sm text-slate-500 mt-2">${t}</p></div>`).join('')}</div></div>`;
    case 'device_form':
      return defaultFormPage({ cardTitle: spec.title + ' — 表单信息', fields: extra.fields || [{label:'设备编号',req:false,html:'<input readonly class="w-full rounded-xl border bg-slate-50 px-3 py-2 text-sm" value="SB-TM-202605-001">'},{label:'借用人',req:true,html:sel()},{label:'备注',req:false,html:'<textarea class="w-full rounded-xl border p-2 text-sm min-h-[60px]"></textarea>'}] });
    case 'form':
      return defaultFormPage({ cardTitle: '表单', fields: extra.fields });
    case 'modal_import':
      return `<div class="max-w-lg mx-auto mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"><h2 class="font-semibold text-lg mb-4">Excel 导入订单</h2><div class="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-500 mb-4"><i class="fa-solid fa-cloud-arrow-up text-3xl mb-2"></i><p>拖拽文件到此处或点击上传</p></div><div class="flex gap-3 justify-end"><button onclick="history.back()" class="px-5 py-2 rounded-xl border btn-tap">取消</button><button onclick="location.href='pc_order_list.html'" class="px-5 py-2 rounded-xl bg-brand text-white btn-tap">开始导入</button></div></div>`;
    case 'modal_export':
      return `<div class="max-w-lg mx-auto mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"><h2 class="font-semibold text-lg mb-4">导出订单</h2><div class="space-y-2 text-sm">${['订单编号','客户名称','铁塔名称','状态'].map(f=>`<label class="flex items-center gap-2"><input type="checkbox" checked> ${f}</label>`).join('')}</div><div class="flex gap-3 justify-end mt-6"><button onclick="history.back()" class="px-5 py-2 rounded-xl border btn-tap">取消</button><button class="px-5 py-2 rounded-xl bg-brand text-white btn-tap">导出</button></div></div>`;
    case 'modal_dispatch':
    case 'modal_batch':
      return `<div class="max-w-md mx-auto mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"><h2 class="font-semibold text-lg mb-4">选择检测人员与计划日期</h2><div class="space-y-4"><select class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"><option>请选择检测人员</option></select><input type="date" class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"></div><div class="flex gap-3 justify-end mt-6"><button onclick="history.back()" class="px-5 py-2 rounded-xl border btn-tap">取消</button><button onclick="location.href='pc_order_list.html'" class="px-5 py-2 rounded-xl bg-brand text-white btn-tap">确认</button></div></div>`;
    case 'modal_confirm':
      return `<div class="max-w-md mx-auto mt-20 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg text-center"><h2 class="font-semibold text-lg mb-2">确认派单</h2><p class="text-sm text-slate-600 mb-6">将向所选检测人员派发 2 个订单，是否继续？</p><div class="flex gap-3 justify-center"><button onclick="history.back()" class="px-6 py-2 rounded-xl border btn-tap">取消</button><button onclick="location.href='pc_order_dispatch.html'" class="px-6 py-2 rounded-xl bg-brand text-white btn-tap">确认</button></div></div>`;
    case 'modal_preview':
      return `<div class="max-w-4xl mx-auto mt-6 rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden"><div class="bg-slate-800 text-white px-6 py-3 flex justify-between items-center"><span>报告预览</span><button onclick="history.back()" class="text-sm opacity-80 hover:opacity-100">关闭</button></div><div class="p-8 bg-slate-100 min-h-[480px]"><img src="${IMG.tower}" alt="" class="w-full rounded-lg shadow mb-4"><p class="text-center text-slate-500 text-sm">检测报告 PDF 预览区域（示意）</p></div></div>`;
    case 'modal_transfer':
      return `<div class="max-w-md mx-auto mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg"><h2 class="font-semibold text-lg mb-4">转办审核</h2><div class="mb-4"><select class="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"><option>请选择审核人</option><option>王芳</option></select></div><textarea class="w-full rounded-xl border p-3 text-sm min-h-[80px]" placeholder="转办说明"></textarea><div class="flex gap-3 justify-end mt-6"><button onclick="history.back()" class="px-5 py-2 rounded-xl border btn-tap">取消</button><button onclick="location.href='pc_report_audit.html'" class="px-5 py-2 rounded-xl bg-brand text-white btn-tap">确认转办</button></div></div>`;
    default:
      return defaultListPage({ tableTitle: title + ' — 列表', cols: extra.cols, rows: extra.rows });
  }
}

function renderPc(spec) {
  const inner = innerFor(spec);
  if (spec.type === 'login') {
    return `${pcHead(spec.title)}
<body class="pc-body">${inner}</body></html>`;
  }
  return pcLayout(spec.active, spec.crumb, spec.title, inner);
}

for (const s of pcSpecs) {
  writePc(`pc_${s.fileStem}.html`, renderPc({ ...s, title: s.title }));
}

/* ============ APP ============ */
function appHead(title) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>${title}</title>
${tailwindScript()}
<link rel="stylesheet" href="${FA}">
<link rel="stylesheet" href="../../assets/app-frame.css">
</head>`;
}

function tabBar(active) {
  if (active < 0) return '';
  const tabs = [['app_workbench_index.html','工作台','fa-house'],['app_order_list.html','订单','fa-file-lines'],['app_inspect_index.html','检测','fa-magnifying-glass'],['app_profile_index.html','我的','fa-user']];
  return `<nav class="tab-bar">${tabs.map(([href,label,icon],i)=>`<a href="${href}" class="tab-item btn-tap ${active===i?'active':''}"><i class="fa-solid ${icon} text-lg"></i><span>${label}</span></a>`).join('')}</nav>`;
}

function phoneWrap(title, activeTab, bodyInner) {
  return `${appHead(title)}
<body class="app-root bg-slate-200 min-h-screen flex items-center justify-center py-8">
<div class="phone-shell"><div class="phone-inner">
<div class="dynamic-island"></div>
<div class="status-bar"><span>9:41</span><span class="status-icons"><i class="fa-solid fa-signal"></i><i class="fa-solid fa-wifi"></i><i class="fa-solid fa-battery-full"></i></span></div>
<div class="app-scroll px-4 pt-2" ${activeTab < 0 ? 'style="padding-bottom:24px"' : ''}>${bodyInner}</div>
${tabBar(activeTab)}
</div></div></body></html>`;
}

const appPages = [
  ['app_login', -1, '登录', `<div class="flex flex-col items-center pt-8 pb-4"><img src="${IMG.tower}" class="w-24 h-24 rounded-2xl object-cover shadow-lg mb-6"><form class="w-full space-y-4" onsubmit="event.preventDefault();location.href='app_workbench_index.html'"><input class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm bg-white" placeholder="请输入账号"><input type="password" class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm bg-white" placeholder="请输入密码"><button type="submit" class="w-full py-3.5 rounded-2xl bg-brand text-white font-medium btn-tap">登录</button></form></div>`],
  ['app_workbench_index', 0, '工作台', `<h1 class="text-2xl font-bold text-slate-900 mb-2">待办检测</h1><p class="text-sm text-slate-500 mb-6">按派单时间倒序</p><div class="space-y-3">${[1,2].map(i=>`<a href="app_order_detail.html" class="block rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-slate-100 btn-tap"><div class="flex justify-between"><span class="font-medium text-slate-900">滨江基站${i}号塔</span><span class="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">待执行</span></div><p class="text-xs text-slate-500 mt-2">派单时间 2026-05-0${i} 08:30</p></a>`).join('')}</div>`],
  ['app_order_list', 1, '订单', `<h1 class="text-xl font-bold mb-4">我的订单</h1>${[1,2,3].map(i=>`<a href="app_order_detail.html" class="block rounded-2xl bg-white p-4 mb-3 border border-slate-100 shadow-sm btn-tap"><div class="flex gap-3"><img src="${IMG.tower}" class="w-16 h-16 rounded-xl object-cover"><div><p class="font-medium">订单 ${i}</p><p class="text-xs text-slate-500 mt-1">角钢塔 · 已派单</p></div></div></a>`).join('')}<button class="w-full py-3 rounded-2xl border border-slate-200 text-sm mt-2 btn-tap"><i class="fa-solid fa-download mr-1"></i>导出 Excel</button>`],
  ['app_order_detail', 1, '订单详情', `<a href="app_order_list.html" class="text-sm text-emerald-700 mb-4 inline-block"><i class="fa-solid fa-chevron-left"></i> 返回</a><div class="rounded-2xl overflow-hidden mb-4"><img src="${IMG.landscape}" class="w-full h-40 object-cover"></div><h2 class="text-lg font-semibold">滨江基站检测</h2><p class="text-sm text-slate-600 mt-2 leading-relaxed">地址：浙江省杭州市滨江区<br>导航至现场请使用地图应用。</p><div class="grid grid-cols-2 gap-3 mt-6"><a href="https://maps.apple.com" class="py-3 rounded-2xl bg-brand text-white text-center text-sm btn-tap"><i class="fa-solid fa-location-dot mr-1"></i>地图导航</a><a href="app_inspect_index.html" class="py-3 rounded-2xl border border-slate-200 text-center text-sm btn-tap">进入检测</a></div>`],
  ['app_inspect_index', 2, '现场检测', `<h1 class="text-xl font-bold mb-4">检测导航</h1><div class="grid grid-cols-2 gap-3 text-sm">${['铁塔信息','基础及地锚','结构简图','塔段检测','平台天线避雷','馈线检测','快捷手记','数据同步'].map((t,i)=>`<a href="${['app_inspect_tower','app_inspect_foundation','app_inspect_diagram','app_inspect_segment','app_inspect_platform','app_inspect_feed','app_inspect_note','app_sync_index'][i]}.html" class="rounded-2xl bg-white p-4 border border-slate-100 shadow-sm text-center font-medium text-slate-800 btn-tap">${t}</a>`).join('')}</div><div class="grid grid-cols-3 gap-2 mt-3">${['回弹强度','接地电阻','垂直度'].map((t,i)=>`<a href="${['app_inspect_rebound','app_inspect_ground','app_inspect_vertical'][i]}.html" class="rounded-xl bg-white border border-slate-100 py-3 text-center text-xs font-medium text-slate-800 btn-tap">${t}</a>`).join('')}</div>`],
  ['app_inspect_tower', 2, '铁塔信息', `<a href="app_inspect_index.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><div class="rounded-2xl bg-white p-4 border border-slate-100 mb-4"><p class="text-xs text-slate-500 mb-2">最少上传 3 张照片（整体/上部/基础）</p><div class="grid grid-cols-3 gap-2">${[IMG.tower,IMG.antenna,IMG.engineer].map(u=>`<img src="${u}" class="w-full aspect-square rounded-xl object-cover">`).join('')}</div><button class="mt-4 w-full py-3 rounded-2xl border border-dashed border-slate-300 text-sm text-slate-600 btn-tap"><i class="fa-solid fa-camera mr-1"></i>拍摄照片</button></div><label class="block text-xs text-slate-500 mb-1">塔身编号</label><input class="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm mb-4 bg-white" value="TT-HZ-001"><button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap" onclick="location.href='app_inspect_foundation.html'">保存并继续</button>`],
  ['app_inspect_foundation', 2, '基础及地锚', `<a href="app_inspect_tower.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><p class="text-sm text-slate-600 mb-4">12 项合规检查，不合格须拍照留证</p>${Array.from({length:4},(_,i)=>`<div class="rounded-2xl bg-white p-4 mb-3 border border-slate-100"><p class="font-medium text-sm">检查项 ${i+1}</p><div class="flex gap-4 mt-2 text-sm"><label><input type="radio" name="r${i}"> 合格</label><label><input type="radio" name="r${i}"> 不合格</label></div></div>`).join('')}<button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap" onclick="location.href='app_inspect_diagram.html'">下一步</button>`],
  ['app_inspect_diagram', 2, '结构简图', `<a href="app_inspect_foundation.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><div class="rounded-2xl bg-white border border-slate-200 h-64 flex items-center justify-center text-slate-400 text-sm mb-4">画布：搭建结构示意图</div><button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap" onclick="location.href='app_inspect_segment.html'">保存</button>`],
  ['app_inspect_segment', 2, '塔段检测', `<a href="app_inspect_diagram.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><p class="text-xs text-slate-500 mb-3">按塔段数自动生成各节表单</p>${[1,2].map(n=>`<div class="rounded-2xl bg-white p-4 mb-3 border"><p class="font-medium text-sm mb-2">第 ${n} 段</p><input class="w-full rounded-xl border px-3 py-2 text-sm mb-2" placeholder="垂直度偏差"><input class="w-full rounded-xl border px-3 py-2 text-sm" placeholder="锈蚀情况"></div>`).join('')}<button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap" onclick="location.href='app_inspect_platform.html'">下一步</button>`],
  ['app_inspect_platform', 2, '平台天线避雷', `<a href="app_inspect_segment.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><div class="rounded-2xl bg-white p-4 mb-4 border"><p class="text-sm mb-2">是否存在平台/天线/避雷针？</p><label class="mr-4"><input type="radio" name="p" checked> 是</label><label><input type="radio" name="p"> 否</label></div><input class="w-full rounded-2xl border px-4 py-3 text-sm mb-4 bg-white" placeholder="天线数量"><button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap" onclick="location.href='app_inspect_feed.html'">下一步</button>`],
  ['app_inspect_feed', 2, '馈线检测', `<a href="app_inspect_platform.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><div class="space-y-3">${['馈线门','馈线孔','孔径','数量','宽度'].map(l=>`<div><label class="text-xs text-slate-500">${l}</label><input class="mt-1 w-full rounded-2xl border px-4 py-3 text-sm bg-white"></div>`).join('')}<button class="w-full py-3 rounded-2xl bg-brand text-white mt-4 btn-tap" onclick="location.href='app_inspect_rebound.html'">下一步</button>`],
  ['app_inspect_rebound', 2, '回弹强度', `<a href="app_inspect_feed.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><input type="number" class="w-full rounded-2xl border px-4 py-3 text-sm mb-4 bg-white" placeholder="回弹值"><button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap" onclick="location.href='app_inspect_ground.html'">保存</button>`],
  ['app_inspect_ground', 2, '接地电阻', `<a href="app_inspect_rebound.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><input type="number" class="w-full rounded-2xl border px-4 py-3 text-sm mb-4 bg-white" placeholder="接地电阻（Ω）"><button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap" onclick="location.href='app_inspect_vertical.html'">保存</button>`],
  ['app_inspect_vertical', 2, '垂直度', `<a href="app_inspect_ground.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><input type="number" class="w-full rounded-2xl border px-4 py-3 text-sm mb-4 bg-white" placeholder="倾斜值（‰）"><button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap" onclick="location.href='app_inspect_validate.html'">完成并校验</button>`],
  ['app_inspect_note', 2, '快捷手记', `<a href="app_inspect_index.html" class="text-sm text-emerald-700 mb-3 inline-block">返回</a><button class="w-full py-3 rounded-2xl border border-slate-200 mb-3 btn-tap"><i class="fa-solid fa-microphone mr-2"></i>语音记录</button><button class="w-full py-3 rounded-2xl border border-slate-200 mb-3 btn-tap"><i class="fa-solid fa-camera mr-2"></i>拍照记录</button><textarea class="w-full rounded-2xl border p-4 text-sm min-h-[120px] bg-white" placeholder="手写备注"></textarea><button class="w-full py-3 rounded-2xl bg-brand text-white mt-4 btn-tap">保存手记</button>`],
  ['app_inspect_validate', 2, '数据校验', `<div class="fixed inset-0 z-[100] flex items-end justify-center bg-black/40" style="position:relative;min-height:400px;"><div class="w-full rounded-t-3xl bg-white p-6 shadow-2xl mb-20"><h3 class="font-semibold text-lg mb-2">数据校验</h3><ul class="text-sm text-slate-600 space-y-2 mb-6"><li>· 照片数量满足最低要求</li><li>· 必填项已完成</li></ul><div class="flex gap-3"><button onclick="history.back()" class="flex-1 py-3 rounded-2xl border btn-tap">返回修改</button><button onclick="location.href='app_sync_index.html'" class="flex-1 py-3 rounded-2xl bg-brand text-white btn-tap">确认无误</button></div></div></div><p class="text-sm text-slate-500">下层页面内容…</p>`],
  ['app_sync_index', 2, '数据同步', `<h1 class="text-xl font-bold mb-4">数据同步</h1><div class="rounded-2xl bg-white p-6 border border-slate-100 mb-4"><div class="flex justify-between text-sm mb-2"><span>上传进度</span><span>68%</span></div><div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-emerald-500 w-2/3"></div></div></div><button class="w-full py-3 rounded-2xl bg-brand text-white btn-tap">立即同步</button><p class="text-xs text-slate-500 mt-4 text-center">离线数据将在联网后自动提示同步</p>`],
  ['app_profile_index', 3, '我的', `<div class="flex flex-col items-center pt-4"><img src="${IMG.engineer}" class="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow mb-4"><h2 class="font-semibold text-lg">李强</h2><p class="text-sm text-slate-500">现场检测员 · 华东分部</p></div><div class="mt-8 space-y-2">${['我的签名','离线缓存','关于'].map(t=>`<div class="rounded-2xl bg-white px-4 py-4 border border-slate-100 flex justify-between items-center btn-tap"><span>${t}</span><i class="fa-solid fa-chevron-right text-slate-400"></i></div>`).join('')}<button onclick="location.href='app_login.html'" class="w-full mt-8 py-3 rounded-2xl border border-red-200 text-red-700 btn-tap">退出登录</button>`],
];

for (const [name, tab, ti, inner] of appPages) {
  writeApp(`${name}.html`, phoneWrap(ti, tab, inner));
}

console.log('Generated', pcSpecs.length, 'PC pages in', pcPagesDir);
console.log('Generated', appPages.length, 'APP pages in', appPagesDir);
