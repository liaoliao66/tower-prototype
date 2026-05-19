/**
 * 第二轮：修复误替换、补全截断词、统一 title、清理 head 空行
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesRoot = path.join(__dirname, '..', 'prototype', 'pages');

const REPLACEMENTS = [
  ['通信铁塔检测系</title>', '通信铁塔检测系统</title>'],
  ['检测系系统', '检测系统'],
  ['有限公司/p>', '有限公司</p>'],
  ['分公无', '分公司'],
  ['铁塔公无', '铁塔公司'],
  ['建设集无', '建设集团'],
  ['所属客�?span class="required"', '所属客户<span class="required"'],
  ['供应商名录span class="required"', '供应商名称<span class="required"'],
  ['选择借用途span class="required"', '选择借用人<span class="required"'],
  ['资质有效�?span class="required"', '资质有效期<span class="required"'],
  ['请输入工程名录>', '请输入工程名称">'],
  ['请输入工程地�?>', '请输入工程地点">'],
  ['请输入金�?>', '请输入金额">'],
  ['请输入单位全�?>', '请输入单位全称">'],
  ['请输入单位简�?>', '请输入单位简称">'],
  ['请输入联系电�?>', '请输入联系电话">'],
  ['张某�?>', '张某某">'],
  ['XX路XX�?>', 'XX路XX号">'],
  ['建议尺�?400', '建议尺寸 400'],
  ['建议尺�?300', '建议尺寸 300'],
  ['用于报告封</p>', '用于报告封面</p>'],
  ['用于报告签</p>', '用于报告签章</p>'],
  ['运营驾驶�?,\'', '运营驾驶舱\',\''],
  ['�?4 条记', '共 4 条记录'],
  ['�?3 条记', '共 3 条记录'],
  ['�?42 </span>', '共 42 条</span>'],
  ['�?86 </span>', '共 86 条</span>'],
  ['�?128 </span>', '共 128 条</span>'],
  ['�?56 </span>', '共 56 条</span>'],
  ['�?23 </span>', '共 23 条</span>'],
  ['�?1,286 条记', '共 1,286 条记录'],
  ['�?15 条待派单', '共 15 条待派单'],
  ['�?42 </span>', '共 42 条</span>'],
  ['placeholder="关键�?', 'placeholder="关键词"'],
  ['筛�?/button>', '筛选</button>'],
  ['长河�?28', '长河路128'],
  ['文三�?65', '文三路265'],
  ['市心�?9', '市心路9'],
  ['placeholder="请输入账�?', 'placeholder="请输入账号"'],
  ['placeholder="请输入密�?', 'placeholder="请输入密码"'],
  ['placeholder="验证�?', 'placeholder="验证码"'],
  ['alt="验证�?', 'alt="验证码"'],
  ['搜索操作�?内容', '搜索操作人/内容'],
  ['修改任务 RW202605001 �?段检测数', '修改任务 RW202605001 第3段检测数据'],
  ['报告章节配置 �?角钢塔', '报告章节配置 - 角钢塔'],
  ['<!-- 左侧：章节列�?-->', '<!-- 左侧：章节列表 -->'],
  ['模板字段配置 �?单管塔', '模板字段配置 - 单管塔'],
  ['<!-- 右侧：字段配�?-->', '<!-- 右侧：字段配置 -->'],
  ['本次检测依据以下标准和规范进行�?', '本次检测依据以下标准和规范进行：'],
  ['技术规程�?', '技术规程》'],
  ['模板�?版本历史', '模板 - 版本历史'],
  ['最多导�?', '最多导入 '],
  ['当前页（�?20', '当前页（共20'],
  ['时间范�?', '时间范围'],
  ['自动填�?', '自动填充'],
  ['<!-- 检测需�?-->', '<!-- 检测需求 -->'],
  ['较上月增�?', '较上月增长'],
  ['较上周减�?', '较上周减少'],
  ['较上周增�?', '较上周增长'],
  ['选填�?', '选填）'],
  ['已�?3 个订', '已选 3 个订单'],
  ['<!-- 已选订单列�?-->', '<!-- 已选订单列表 -->'],
  ['<!-- 已选订单明�?-->', '<!-- 已选订单明细 -->'],
  ['新增供应�?', '新增供应商'],
  ['新增供应系统', '新增供应商'],
  ['供应商信</div>', '供应商信息</div>'],
  ['<title>供应商名录- ', '<title>供应商名录 - '],
  ['<title>出入库台账-', '<title>出入库台账 - '],
  ['breadcrumb:[\'供应商管理,\'供应商名录,\'新增供应�?\']', 'breadcrumb:[\'供应商管理\',\'供应商名录\',\'新增供应商\']'],
  ['数码相机等�?', '数码相机等。'],
  ['请选择借用无', '请选择借用人'],
  ['李明（检测一组）- 已�?无', '李明（检测一组）- 已借3件'],
  ['王强（检测二组）- 已�?无', '王强（检测二组）- 已借1件'],
  ['张华（检测三组）- 已�?无', '张华（检测三组）- 已借0件'],
  ['赵刚（检测四组）- 已�?无', '赵刚（检测四组）- 已借2件'],
  ['回弹�?', '回弹仪'],
  ['经纬�?', '经纬仪'],
  ['裂缝测宽�?', '裂缝测宽仪'],
  ['已选设</div>', '已选设备</div>'],
  ['已�?<strong>0</strong> 件设备', '已选 <strong>0</strong> 件设备'],
  ['锈蚀面积�?', '锈蚀面积(%)'],
  ['至少2�?', '至少2张'],
  ['检测位置坐�?', '检测位置坐标'],
  ['placeholder="�?"', 'placeholder="—"'],
  ['第X�?共Y无', '第X页，共Y页'],
  ['2026�?�?', '2026-05-08'],
  [`placeholder="请输入处理建议>1. 第4段松动螺栓需立即进行紧固处理意见2. 第3段法兰间隙偏大，建议增加垫片调整�?3. 建议6个月后进行复检。/textarea>`,
    `placeholder="请输入处理建议">1. 第4段松动螺栓需立即进行紧固处理。2. 第3段法兰间隙偏大，建议增加垫片调整。3. 建议6个月后进行复检。</textarea>`],
  [`placeholder="请输入申请说明>杭州移动要求提交3份纸质检测报告，其中2份交付客户，1份存档�?/textarea>`,
    `placeholder="请输入申请说明">杭州移动要求提交3份纸质检测报告，其中2份交付客户，1份存档。</textarea>`],
];

REPLACEMENTS.sort((a, b) => b[0].length - a[0].length);

function normalizeHead(html) {
  return html
    .replace(/<head([^>]*)>\s*\n\s*\n\s*<meta charset="UTF-8">\s*\n\s*\n/gi, '<head$1>\n<meta charset="UTF-8">\n')
    .replace(/<head([^>]*)>\n<meta charset="UTF-8">\n\n/gi, '<head$1>\n<meta charset="UTF-8">\n');
}

function process(html) {
  let s = html;
  for (const [a, b] of REPLACEMENTS) s = s.split(a).join(b);
  s = normalizeHead(s);
  return s;
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) {
      const raw = fs.readFileSync(full, 'utf8');
      fs.writeFileSync(full, process(raw), { encoding: 'utf8' });
    }
  }
}

walk(pagesRoot);
console.log('Pass2 done');
