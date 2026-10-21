/**
 * v1.1.0 PC 侧栏。链接相对 PC端 下三级目录页。
 */
const MENU = [
  { id:'jcyw', label:'检测管理', icon:'fa-tower-broadcast', items:[
    {id:'report_generate', label:'报告编制', href:'../../铁塔检测业务/报告编制/report-list.html'}
  ]},
  { id:'jcsj', label:'基础数据', icon:'fa-database', items:[
    {id:'data_rectify', label:'整改建议', href:'../../基础数据/整改建议/pc_data_rectify.html'}
  ]},
  { id:'tjfx', label:'统计分析', icon:'fa-chart-column', items:[
    {id:'problem_summary', label:'问题汇总', href:'../../统计分析/问题汇总/pc_problem_summary.html'}
  ]}
];

function buildSidebar(activeId) {
  let html = `<div class="layout-sidebar" id="sidebar">
  <div class="sidebar-logo">
    <i class="fa-solid fa-tower-broadcast"></i>
    <span class="logo-text">铁塔检测系统</span>
  </div>
  <nav class="sidebar-nav">`;
  for (const g of MENU) {
    const hasActive = g.items.some(function (i) { return i.id === activeId; });
    html += `<div class="menu-group${hasActive ? ' open' : ''}">
      <div class="menu-group-title" onclick="this.parentElement.classList.toggle('open')">
        <span><i class="fa-solid ${g.icon} group-icon"></i>${g.label}</span>
        <i class="fa-solid fa-chevron-right chevron"></i>
      </div>
      <div class="menu-group-items">`;
    for (const item of g.items) {
      html += `<a class="menu-item${item.id === activeId ? ' active' : ''}" href="${item.href}">${item.label}</a>`;
    }
    html += `</div></div>`;
  }
  html += `</nav>
  <div style="padding:12px 16px;border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;gap:8px">
    <a href="../../../../../../index.html" style="color:rgba(255,255,255,0.75);font-size:12px;text-decoration:none;display:flex;align-items:center;gap:6px"><i class="fa-solid fa-house"></i>返回总入口</a>
    <a href="../../../../../../../docs/versions/v1.1.0/prd.html" style="color:rgba(255,255,255,0.75);font-size:12px;text-decoration:none;display:flex;align-items:center;gap:6px"><i class="fa-solid fa-file-lines"></i>查看 PRD</a>
  </div></div>`;
  return html;
}

function buildTopNav(breadcrumbArr, userName) {
  userName = userName || '张伟';
  let bc = '<div class="breadcrumb"><a href="../../../../index.html"><i class="fa-solid fa-house" style="font-size:13px"></i></a>';
  if (breadcrumbArr && breadcrumbArr.length) {
    for (let i = 0; i < breadcrumbArr.length; i++) {
      bc += '<span class="bc-sep">/</span>';
      if (i === breadcrumbArr.length - 1) bc += `<span class="bc-current">${breadcrumbArr[i]}</span>`;
      else bc += `<span>${breadcrumbArr[i]}</span>`;
    }
  }
  bc += '</div>';
  return `<div class="top-nav">${bc}<div class="top-nav-right"><div class="user-info"><i class="fa-solid fa-user-circle" style="font-size:20px;color:var(--text-3)"></i> ${userName}</div></div></div>`;
}

function initLayout(config) {
  const content = document.getElementById('page-content');
  if (!content) return;
  if (config && config.skipLayout) return;
  const bc = config.breadcrumb || [];
  content.remove();
  document.body.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'layout-wrap';
  wrap.innerHTML = buildSidebar(config.active || '') +
    `<div class="layout-main">` + buildTopNav(bc, config.user) + `<div class="page-content"></div></div>`;
  document.body.appendChild(wrap);
  const slot = wrap.querySelector('.layout-main .page-content');
  if (slot) slot.appendChild(content);
}

window.addEventListener('DOMContentLoaded', function () {
  try {
    if (window.__layoutConfig) initLayout(window.__layoutConfig);
  } catch (e) {
    console.error('[prototype] initLayout', e);
  }
});
