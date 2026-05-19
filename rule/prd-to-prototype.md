
# PRD to Prototype — 可交互原型

## Overview

本技能将用户的模糊产品想法，通过两步强制流程，转化为完整的PRD文档和高保真可交互HTML原型。全程零提问、直接执行，最终交付可在浏览器中预览的原型页面。

---

## ⚠️ 核心铁律（违反必究）

1. **禁止提问**：无论用户输入的需求多么简短或模糊，**绝对禁止**在生成PRD之前询问任何问题。
2. **直接脑补**：必须立即基于行业标准和合理假设，自动补全所有细节，直接产出包含完整交互流程的PRD。
3. **两步流程**：首先如果用户上来已经指定prd文档并要求根据其直接生成原型图，则直接进入第二阶段生成原型图，其次如果用户未指定PRD或者指定PRD文档要求对其完善，必须先生成PRD，再生成原型图。

---

## Workflow（强制流程）；

### 🟢 第一阶段：直出PRD与交互流程

**触发条件：** 
1. 用户仅表达产品想法/需求/痛点/创意（无PRD相关提及）；
2. 用户提及PRD但未要求“直接基于PRD生成原型”（如要求“完善PRD”“先做PRD再做原型”）；

**执行步骤：**

1. **零延迟响应**：不进行任何澄清对话，直接开始生成PRD。
2. **生成完整PRD文档**，写入 `/workspace/docs/prd.md`，内容必须包含：
   - 产品概述，必须包括产品定位、产品目标、用户角色定义
   - 业务流程，不限于以下几种，但是必须对其补齐
        完整业务流程 + 子业务流程图（Mermaid 语法）；
        用户交互流程图（Mermaid 语法）；
        流程状态机图，例如：mermaid<br>stateDiagram-v2<br>[*] --> 未支付<br>未支付 --> 已支付 : 支付成功<br>未支付 --> 已取消 : 用户取消/超时<br>已支付 --> 已发货 : 商家发货<br>已发货 --> 已完成 : 用户确认收货<br>已完成 --> [*]<br>已取消 --> [*]<br>；
        系统数据流转时序图（Mermaid 语法），例如：mermaid<br>sequenceDiagram<br>用户->>前端: 提交订单<br>前端->>后端: 校验库存<br>后端->>数据库: 查询商品库存<br>数据库-->>后端: 返回库存数据<br>后端-->>前端: 库存校验结果<br>前端-->>用户: 订单提交结果<br>；
   - 功能模块总览，不得少于两级介绍各个功能模块、功能项，对功能说明需要进行详细的说明，结构如下
     - 一级功能名称
       - 一级功能概述
       - 二级功能功能名称（当为最小功能模块时）
         - 二级功能模块必填维度补充示例：
            功能介绍：一句话说明该功能核心价值；
            前置条件：用户需完成 XX 操作（如登录 / 绑定手机号）、系统需具备 XX 数据（如商品库存 > 0）；
            数据权限：普通用户仅查看自身数据，管理员可查看全量数据；
            页面跳转：点击 “提交” 按钮后跳转至 XX 页面，超时未操作跳转至首页；
   - 完整的用户交互路径（User Flows）
   - 页面清单与页面间跳转关系
   - 非功能性需求（性能、安全等合理假设）
   - 系统功能清单，包括至少一二功能模块、功能概述
3. **PRD生成后，立即在同一条消息中展示 GenUI 确认表单**（模板见下方）。

**GenUI 确认表单模板（必须严格一致）：**

```markdown
✅ **PRD与交互流程已生成**：`/workspace/docs/prd.md`

-----------------------------------------------------------------------
📋 **GenUI Project Confirmation**
-----------------------------------------------------------------------
请审核方案，并选择下一步操作：

[ 🚀 确认并生成移动端 App 原型 ]   (回复: "确认移动端")
[ 💻 确认并生成 PC 端 Web 原型 ]   (回复: "确认PC端")
[ 💻/🚀 确认并生成 PC 和APP 原型 ]   (回复: "两者都需要")
[ 🛠️ 修改需求文档 ]               (回复: "修改: <您的意见>")
[ ❌ 拒绝并重写 ]                 (回复: "重写")
-----------------------------------------------------------------------
```

### 🔵 第二阶段：原型设计与生成

**触发条件：** 
1. 用户明确回复“确认移动端”/“确认PC端”；
2. 用户明确要求“直接基于已有PRD生成原型”（需先校验PRD完整性，若不完整则自动补全后进入第二阶段）。

**执行步骤：**

1. 读取 `/workspace/docs/prd.md` 中的PRD内容。
2. 根据用户选择的目标平台（Mobile / PC），按照下方【设计系统】和【构建策略】生成原型。
3. 创建原型文件到 `/workspace/prototype/` 目录。
4. 部署原型（如有 deploy 工具可用）。
5. **双重交付**：返回可访问的原型预览链接 + PRD文档路径。

### 用户反馈处理

1. 修改需求（回复“修改: <意见>”）：
   - 若意见为局部微调（如“修改XX功能的权限规则”“补充XX页面跳转逻辑”）：直接修改PRD对应章节；
   - 若意见为核心重构（如“更换产品定位”“新增核心功能模块”）：基于新意见重新生成完整PRD；
   - 无论修改幅度，修改后均需再次展示GenUI确认表单，且累计修改次数不超过3次（超过则提示“建议重新提交全新需求”）；
2. 重写（回复“重写”）：
   - 完全基于用户初始需求，重新按照PRD规范生成全新版本（不保留原PRD任何内容），生成后展示确认表单；

---

## 设计系统（Design System）

### 色彩 (Color Palette)

- 避免使用高饱和度的纯色（如 `#0000FF`）。
- **PC端**：偏向 B端 SaaS 风格（清爽、大留白）或极客暗黑模式。
- **移动端**：偏向 iOS 18 风格（大圆角、毛玻璃、沉浸式）。
- **配色建议**：使用 Zinc/Slate 中性色系作为骨架，品牌色仅用于 CTA（行动号召）按钮。

### 排版 (Typography)

- 字体栈：`-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- 字号：建立清晰的层次（H1 vs Body），使用 `rem` 单位。
- 行高：正文行高至少 `1.6`。

### 质感 (Texture & Depth)

- **投影**：使用多层柔和阴影（`box-shadow`），避免生硬的黑边。
- **圆角**：现代 UI 标配大圆角（`rounded-xl`, `rounded-2xl`）。
- **模糊**：背景模糊（`backdrop-filter: blur(20px)`）用于侧边栏或弹窗。

### 审美标准

- **拒绝**：默认蓝色/系统蓝、粗糙的阴影、拥挤的布局、低像素图片、Arial/宋体默认字体。
- **必须**：使用高级灰/黑白/品牌色、大留白、毛玻璃效果、流畅动效、高清真实图片、系统级字体栈。
- **标准**：设计必须对标 Awwwards、Dribbble 热门作品和 Apple 设计规范。看起来像 2025 年的产品，而非 2010 年的 Bootstrap 模板。

### 设计细节量化规范
1. 圆角数值：
   - 移动端：按钮/卡片使用rounded-2xl（24px）、弹窗使用rounded-3xl（32px）；
   - PC端：按钮使用rounded-xl（20px）、卡片使用rounded-2xl（24px）；
2. 阴影规范：
   - 基础卡片：box-shadow: 0 4px 12px rgba(0,0,0,0.05);
   - 悬浮卡片：box-shadow: 0 8px 24px rgba(0,0,0,0.08);
3. 毛玻璃兼容：
   - 支持backdrop-filter的浏览器：backdrop-filter: blur(20px); background-color: rgba(255,255,255,0.8);
   - 不支持的浏览器：直接使用rgba纯色背景（无模糊）；
4. 移动端iPhone 16外框：
   - 宽度：390px，高度：844px（含灵动岛）；
   - 灵动岛尺寸：宽度120px，高度32px，顶部居中；
   - 外框样式：border: 1px solid #e5e7eb; border-radius: 48px; box-shadow: 0 0 20px rgba(0,0,0,0.1);

---


## 平台构建策略

### 📱 移动端 (Mobile) — "沉浸式体验"

- **容器模拟**：在 `index.html` 中必须使用 CSS 绘制一个逼真的 iPhone 16 外框（带灵动岛/刘海）。
- **布局**：
  - 顶部：状态栏（时间/电量）+ 导航栏（大标题/透明背景）。
  - 底部：悬浮或磨砂质感的 TabBar。
  - 内容：卡片式布局，左右留边，内容不贴边。
- **交互**：按钮点击要有缩放反馈（`active:scale-95`）。

### 💻 PC端 (Desktop) — "生产力美学"

- **布局**：
  - 经典的 Sidebar + Header + Content 布局，或顶部大导航布局。
  - 最大宽度限制（`max-w-7xl`），居中显示，避免在大屏上内容过于拉伸。
- **交互**：
  - 移动端按钮缩放：
    css<br>.btn { transition: transform 0.2s ease; }<br>.btn:active { transform: scale(0.95); }<br>
  -PC 端 hover 上浮：
    css<br>.card { transition: all 0.2s ease; }<br>.card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }<br>

---

## 资源生成规范

### 图片 (Unsplash)

- **严禁**使用占位符（如 `via.placeholder.com`）。
- 必须使用 Unsplash Source 或类似服务获取**高质量、无水印**图片。
- 根据产品类型选择关键词（e.g., "minimalist office", "abstract technology", "modern portrait"）。
- URL 示例：`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80`（确保图片链接稳定有效）。

### 图标 (Icons)

- 使用 **FontAwesome 6 (CDN)** 或 **Heroicons (SVG)**。
- 图标要与文字垂直居中对齐，大小适中。

---

## 技术栈与代码规范

### 技术栈（强制）

- 输出纯 **HTML5 + Tailwind CSS (CDN) + Vanilla JS**。
- **严禁**依赖需要编译的框架（如 React/Vue）。

### HTML 模板结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>产品名称</title>
    <!-- 引入 Tailwind -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- 引入 FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- 配置 Tailwind 主题 (可选) -->
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              brand: '#0f172a', // 自定义品牌色
            }
          }
        }
      }
    </script>
    <style>
        /* 自定义微调样式，如滚动条隐藏、毛玻璃兼容性 */
        body { font-family: -apple-system, system-ui, sans-serif; }
    </style>
</head>
<body class="bg-gray-50 text-gray-900 antialiased">
    <!-- 内容区域 -->
</body>
</html>
```

  1. HTML视口配置：
   <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  2. 子页面命名规则：
   按“功能模块_页面类型”命名，示例：goods_list.html（商品列表页）、order_detail.html（订单详情页）、user_center.html（用户中心页）；
  3. 通用弹窗判定标准：
   - 无业务意义弹窗：网络错误提示、系统维护提示、操作成功/失败提示（无需单独存为html，可在对应页面用JS动态生成）；
   - 有业务意义弹窗：提交订单确认、商品规格选择、优惠券领取（需单独存为html文件，命名为“弹窗所属页面_弹窗功能.html”，如goods_detail_spec.html）；

### 语言统一

- 界面所有文案、数据、按钮必须为**简体中文**（除非用户指定外语）。
- 严禁残留 Lorem Ipsum 或英文标题。

---

## 文件与输出规范

### 目录结构

```
/workspace/
├── docs/
│   └── prd.md              # PRD文档（唯一）
└── prototype/
    ├── index.html           # 原型入口页面（预览所有子页面）
    └── pages/
        ├── [模块名]_[页面类型].html       # 子页面（如goods_list.html、order_detail.html）
        ├── [页面名]_[弹窗功能].html       # 有业务意义弹窗（如goods_detail_spec.html）
        └── ...
        └── ...
注意：多级功能模块命名为 “一级模块_二级模块_页面类型”，示例：user_center_address_manage.html（用户中心_地址管理页）；
```

### 关键要求

- `index.html` 必须能够预览所有页面：
  - 移动端：用 iframe 手机壳展示。
  - PC端：直接作为首页。
- 所有图片必须真实加载（Unsplash），所有链接必须可点击（跳转或空锚点）。
- 每个页面即使是弹窗必须存为一个单独的html文件（通用没有业务意义提醒弹窗不用）。

---

## 原型生成执行步骤

1. **分析 PRD**：确定核心页面（首页、列表、详情）。
2. **定义视觉风格**：根据平台和产品类型确定配色、排版、质感。
3. **生成资源**：选择合适的 Unsplash 图片关键词。
4. **编写代码**：
   - 创建 `/workspace/prototype/index.html`（入口）。
   - 创建 `/workspace/prototype/pages/*.html`（子页面）。
5. **检查细节**：
   - 检查所有文案是否为中文。
   - 检查图片是否加载成功。
   - 检查布局是否错位。
6. **部署**：如有 deploy 工具可用，调用部署。

---

## 质量自检 (Pre-flight Check)

质量自检 (Pre-flight Check)
- [ ] 审美：是否符合指定设计系统（配色无高饱和纯色、使用大圆角/毛玻璃/柔和阴影、字体栈符合要求）；
- [ ] 中文：无Lorem Ipsum/英文文案，所有界面内容为简体中文；
- [ ] 图片：无裂图，所有图片来自Unsplash且风格统一；
- [ ] 完整性：所有链接可点击、所有页面可访问、子页面命名符合规则；
- [ ] 响应速度：Tailwind/FontAwesome CDN链接可访问，页面加载≤3s；
- [ ] 交互：按钮点击/hover动效正常、移动端模拟容器符合iPhone 16尺寸规范；
- [ ] PRD一致性：原型功能/页面跳转与PRD中交互流程完全匹配；
- [ ] PRD完整性：包含产品概述/业务流程/功能模块/用户交互路径/非功能性需求所有核心项；

---

## Common Mistakes to Avoid

1. **在生成PRD前询问用户问题** — 绝对禁止，必须零提问直接生成。
2. **跳过PRD直接生成原型** — 必须严格遵守两步流程。
3. **使用占位符图片** — 必须使用 Unsplash 真实图片。
4. **使用需要编译的框架** — 只允许纯 HTML + Tailwind CDN + Vanilla JS。
5. **残留英文文案** — 所有界面内容必须为简体中文。
6. **使用默认系统蓝或高饱和纯色** — 必须使用高级配色方案。
7. **忘记展示 GenUI 确认表单** — PRD生成后必须立即展示。
8. **PRD中缺少交互流程** — 必须包含完整的 User Flows。
