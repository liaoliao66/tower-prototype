---
title: 通信铁塔检测系统产品需求文档（PRD）
version: V2.0
date: 2026-05-07
author: 浙江中能工程检测有限公司
status: 内部文件 · 机密
description: 本PRD面向AI代码生成工具，严格按7节模板输出，涵盖PC管理后台+移动端APP（H5/小程序）双端完整功能。
---

<center>通信铁塔检测系统</center>
<center>产品需求文档 PRD</center>
<center>V2.0 | 2026年5月 | 浙江中能工程检测有限公司</center>

# 文档控制信息

| 项 | 内容 |
| --- | --- |
| 文档名称 | 通信铁塔检测系统产品需求文档（PRD）V2.0 |
| 版本号 | V2.0 |
| 编制日期 | 2026年5月7日 |
| 编制单位 | 浙江中能工程检测有限公司 |
| 密级 | 内部文件 · 机密 |
| 适用范围 | PC管理后台 + 移动端APP（H5/小程序） |


## 修订记录

| 版本 | 日期 | 修订内容 | 修订人 |
| --- | --- | --- | --- |
| V1.0 | 2026-05 | 初始版本，含7大章节基础PRD | - |
| V2.0 | 2026-05-07 | 新增：①模板配置功能 ②4类流程图 ③逐页面详细IO与权限 ④完整功能逻辑描述 | 产品经理 |


# 一、产品概述
## 1.1 产品定位
本产品是面向通信铁塔结构安全检测行业的B端业务系统，覆盖PC端管理后台（Web）与移动端APP（H5/小程序）两大端口。系统以"检测任务"为业务主线，将客户委托、营销建档、合同派单、现场检测、报告编制、审核审批、打印交付的全流程线上化，消除纸质单据流转，实现数据一次录入、全程复用。
PC端定位：企业级检测业务管理平台，面向合同部、报告编制人员、审核审批人员、设备管理员及系统管理员，提供基础数据维护、任务派发、报告生成与审批、运营统计等能力。
APP端定位：现场检测作业工具，面向一线检测人员，支持离线采集检测数据、照片、语音记录，联网后自动同步至PC端。

## 1.2 产品目标
**产品目标分为以下四个维度：**
1. 流程线上化：实现客户委托→营销建档→合同派单→现场检测→报告生成→审核审批→打印交付全流程线上化，消除纸质单据流转。
2. 数据一体化：客户、工程、铁塔、标准、设备、人员六大基础档案一次录入，检测报告自动关联填充，禁止手动录入报告抬头信息。
3. 离线作业：APP端支持离线采集、在线同步，确保野外现场网络不稳定时仍可正常工作。
4. 运营可视化：构建企业运营驾驶舱，实时展示任务进度、人员工作量、设备状态、不合格项分布等关键经营指标。

## 1.3 用户角色定义
系统采用角色-菜单-按钮三级权限模型，按岗位职责划分功能视图与数据权限。

| 角色名称 | 职责说明 | 使用端口 | 核心功能 | 数据权限 |
| --- | --- | --- | --- | --- |
| 营销人员 | 客户建档、工程建档、业务源头录入 | PC端 | 营销管理模块 | 本人创建的数据 |
| 合同部人员 | 订单创建/Excel批量导入、派单、进度监控、报告预览 | PC端 | 合同部管理模块 | 本部门数据 |
| 现场检测人员 | APP端接单、现场检测、数据采集、照片拍摄、语音手记 | APP端 | 现场检测模块 | 本人派单任务 |
| 报告编制人员 | 报告生成、在线编辑完善、提交审核审批 | PC端 | 报告编制模块 | 本人编制任务 |
| 数据审核员 | 校验原始数据与影像资料的完整性、合规性 | PC端 | 检测任务审核 | 分配的审核任务 |
| 审批员 | 报告技术审核、流程审批、质量把关、电子签章 | PC端 | 报告审批模块 | 分配的审批任务 |
| 设备管理员 | 仪器设备建档、出入库管理、台账维护 | PC端 | 仪器设备管理 | 全部设备数据 |
| 系统管理员 | 基础配置、权限管理、日志审计 | PC端 | 系统配置 | 全部数据 |


## 1.4 系统架构概述
**系统采用B/S架构（PC端）+ Hybrid APP架构（移动端）的混合模式：**
- PC端：基于Vue3/React + Element Plus/Ant Design的单页应用，通过RESTful API与后端交互，支持角色-菜单-按钮三级权限控制。
- APP端：基于uni-app/Taro的跨平台框架，同时支持H5和小程序，本地数据存储采用SQLite/IndexedDB，联网时通过HTTPS+Token验证同步。
- 后端：基于Spring Boot/Node.js的微服务架构，数据库采用MySQL，文件存储采用MinIO/OSS，报告生成采用模板引擎+OpenXML技术。
- 部署：支持私有化部署与云部署两种模式，数据库每日自动备份。

# 二、整体业务流程
## 2.1 核心业务流程图
以下为通信铁塔检测系统核心业务流程全景图，涵盖从基础档案初始化到最终交付的完整闭环：
![核心业务流程图](flowcharts/biz_flow.png)

## 2.2 用户交互流程图
以下为PC端各角色与APP端检测人员的交互流程，以及系统核心响应节点：
![用户交互流程图](flowcharts/interact_flow.png)

## 2.3 检测任务状态流转图
检测任务从创建到交付的全生命周期状态流转如下：
![任务状态流转图](flowcharts/state_flow.png)
**状态流转规则说明：**
- 待执行 → 执行中：检测人员在APP端接单后触发
- 执行中 → 待审核：检测人员完成现场检测并提交数据
- 待审核 → 审核通过/执行中：审核员进行三级校验（数据完整性/合规性/影像匹配性），通过则进入下一阶段，驳回则退回检测人员修改
- 审核通过 → 已编制：报告编制人员完成报告初稿
- 已编制 → 待签发：编制人员提交审批
- 待签发 → 已签发/已编制：一级技术审核+终审签发，通过则归档，驳回则退回修改
- 已签发 → 已归档 → 已打印：报告归档后申请打印，审批通过后生成PDF交付

## 2.4 PC-APP数据流转时序图
以下为PC端与APP端之间的数据同步时序，展示从派单到数据同步的完整交互过程：
**时序说明：**
![PC-APP数据时序图](flowcharts/seq_flow.png)
- 合同部在PC端创建订单并派单，数据持久化到服务端
- 检测员在APP端登录后拉取派单列表，支持离线查看
- 现场检测数据先存入本地SQLite，联网后一键同步至服务端
- 同步过程支持断点续传和冲突检测，确保数据一致性
- PC端实时获取同步后的检测数据，进入审核-编制-审批流程

## 2.5 业务规则总览
规则1（数据单向流转）：检测数据从APP同步至PC端后，一旦审核通过锁定，任何角色均不可修改原始检测数据。如需修改，须由管理员在后台开启数据解锁流程，并留存所有修改痕迹。
规则2（设备强绑定）：设备出库须与检测任务强关联，同一设备同时只能被一个检测任务领用。设备入库时必须关联原出库单号，确保资产流转可追溯。
规则3（报告自动填充）：报告封面、委托单位、工程名称、铁塔名称、检测日期、鉴定类别等字段全部自动从基础档案取值，禁止手动录入。编制员仅可编辑检测结果、处理建议等动态内容。
规则4（三级审批制）：检测报告必须经历"编制完成 → 一级技术审核 → 终审质量把关 → 正式归档"四个状态。每一级均支持驳回/同意/转办操作，所有意见与签名永久留痕。
规则5（一塔一档）：每座铁塔的历次检测记录、不合格项、报告归档自动归集形成"一塔一档"，支持按时间轴追溯。
规则6（模板驱动）：检测报告和检测任务均采用模板化配置，不同塔型、不同检测类型自动匹配对应模板，确保检测项完整且规范统一。

# 三、功能模块总览
## 3.1 PC端功能模块总览
PC端面向合同部、报告编制人员、审核审批人员、设备管理员及系统管理员，采用B/S架构，覆盖以下一级模块：

| 一级模块 | 二级模块 | 三级功能 | 功能说明 | 角色权限 |
| --- | --- | --- | --- | --- |
| 登录与权限 | 统一登录 | 账号登录 | 支持多角色权限分配登录 | 全部角色 |
| 登录与权限 | 权限管理 | 角色管理/菜单管理/按钮管理 | 角色-菜单-按钮三级权限控制 | 系统管理员 |
| 合同部管理 | 订单管理 | 订单导入/录入/导出/编辑/删除 | Excel批量导入+手动录入，未派单可删 | 合同部 |
| 合同部管理 | 派单管理 | 任务派发/派单跟踪/撤单 | 指定检测人员一键派单，实时状态跟踪 | 合同部 |
| 合同部管理 | 进度统计 | 检测进度/报告查阅 | 按项目/人员/时间维度统计 | 合同部 |
| 工作台 | 首页 | 待办展示/快捷入口 | 聚合待办、消息、公告，10min刷新 | 全部角色 |
| 工作台 | 流程管理 | 待办/已办/抄送/我发起 | 流程审批（同意/驳回/转办/加签） | 全部角色 |
| 个人中心 | 我的信息 | 信息维护/签名管理/证件上传 | 电子签名PNG 300x150px，用于报告签章 | 全部角色 |
| 营销管理 | 客户管理 | 客户建档/导入/查询 | 委托单位信息，用于报告自动填充 | 营销人员 |
| 营销管理 | 工程管理 | 工程建档/导入/查询 | 必须关联客户，用于报告自动填充 | 营销人员 |
| 营销管理 | 检测单位管理 | 单位维护/LOGO上传 | 检测机构资质信息，用于报告封面 | 营销人员 |
| 供应商管理 | 供应商名录 | 供应商维护/资质管理 | 设备建档前置条件，确保购置溯源 | 设备管理员 |
| 仪器设备管理 | 设备信息 | 设备建档/查询/导出 | 自动生成唯一编号（SB+类别+年月+流水） | 设备管理员 |
| 仪器设备管理 | 设备出入库 | 出库登记/入库登记 | 出库绑定借用人，入库关联原出库单 | 设备管理员 |
| 仪器设备管理 | 出入库台账 | 台账查询/导出 | 按人员/设备/时间筛选，不可删除 | 设备管理员 |
| 铁塔基础配置 | 标准规范 | 标准维护/检测依据引用 | GB/T 51338/YD/T 5132等标准库 | 系统管理员 |
| 铁塔基础配置 | 铁塔类型 | 塔型配置 | 单管塔/角钢塔/三管塔/四管塔 | 系统管理员 |
| 铁塔基础配置 | 区域风压 | 风压数据导入 | 全国各城市风压数据库 | 系统管理员 |
| 铁塔基础配置 | 塔段类型 | 塔段模板配置 | 普通/特殊塔段检测项目模板 | 系统管理员 |
| 铁塔任务模板配置 | 任务模板管理 | 模板创建/编辑/复制/删除 | 按塔型+检测类型配置检测项清单 | 系统管理员 |
| 铁塔任务模板配置 | 模板字段配置 | 字段增删改/排序/校验规则 | 配置每个检测项的字段名/类型/必填/默认值 | 系统管理员 |
| 铁塔任务模板配置 | 模板版本管理 | 版本发布/历史回溯 | 模板修改后创建新版本，不影响历史任务 | 系统管理员 |
| 检测报告模板配置 | 报告模板管理 | 模板创建/编辑/复制/删除 | 按塔型+检测类型配置报告结构 | 系统管理员 |
| 检测报告模板配置 | 报告章节配置 | 章节增删改/排序/内容模板 | 配置报告各章节的内容模板和占位符 | 系统管理员 |
| 检测报告模板配置 | 报告样式配置 | 页眉页脚/水印/签章位置 | 配置报告输出样式和格式 | 系统管理员 |
| 基础数据 | 天线数据 | 天线维护 | 天线品牌/尺寸/重量 | 系统管理员 |
| 基础数据 | 站点数据 | 站点维护 | 站址编码/名称/位置 | 系统管理员 |
| 基础数据 | 铁塔信息 | 铁塔建档/导入 | Excel批量导入，自动关联工程/客户/站点 | 系统管理员 |
| 铁塔检测业务 | 检测任务 | 任务创建/数据录入/上传/查询 | 关联铁塔自动带出数据 | 合同部/编制员 |
| 铁塔检测业务 | 报告编制 | 报告生成/状态管理 | 自动填充生成标准报告初稿 | 编制员 |
| 铁塔检测业务 | 报告审批 | 提交审核/多级审批/记录 | 一级技术审核+终审质量把关 | 审核员/审批员 |
| 铁塔检测业务 | 报告打印 | 打印申请/打印审批/台账 | PDF导出+水印+加密 | 合同部 |
| 运营驾驶舱 | 数据看板 | 大屏展示/指标统计 | 任务进度/人员工作量/设备/不合格项 | 管理层 |


## 3.2 APP端功能模块总览
APP端专为现场检测人员设计，采用Hybrid框架，核心原则为"离线可用、在线同步、操作简便"。

| 一级模块 | 二级模块 | 三级功能 | 功能说明 | 角色权限 |
| --- | --- | --- | --- | --- |
| 检测人员工作台 | 任务中心 | 待办工作/已办工作 | 首页展示待检测任务，按派单时间倒序 | 检测人员 |
| 订单管理 | 订单列表 | 订单查看/操作/地图展示 | 查看分配订单，支持地图导航 | 检测人员 |
| 订单管理 | 订单导出 | Excel导出 | 支持订单信息导出Excel | 检测人员 |
| 现场检测 | 铁塔信息 | 照片拍摄/基本信息/更多信息 | 最少3张照片（整体/上部/基础） | 检测人员 |
| 现场检测 | 基础及地锚 | 基础状况/地锚检测 | 12项合规检查，不合格强制拍照 | 检测人员 |
| 现场检测 | 结构简图 | 示意图搭建 | 按塔型快速搭建结构示意图 | 检测人员 |
| 现场检测 | 塔段检测 | 自动表单/横隔识别/各塔型检测 | 按塔段数N自动生成N节表单 | 检测人员 |
| 现场检测 | 平台/天线/避雷针 | 按塔型分别检测 | 先设置是否存在，再弹出表单 | 检测人员 |
| 现场检测 | 馈线检测 | 馈线记录 | 馈线门/孔/直径/数量/宽度 | 检测人员 |
| 现场检测 | 其他检测 | 回弹强度/接地电阻/垂直度 | 各项数据录入与AI合理性判断 | 检测人员 |
| 快捷操作 | 快捷手记 | 语音记录/拍照记录/手写记录 | 全场景语音识别转文字 | 检测人员 |
| 数据同步 | 数据同步 | 本地同步/离线缓存/数据校验 | 离线存储，联网自动提示同步 | 检测人员 |


## 3.3 模块间数据流转关系
PC端与APP端通过"检测任务"实现数据联动：PC端负责基础数据维护、任务派发、报告编制与审批管控；APP端负责现场数据采集与影像留证。
**关键数据流向：**
- 基础档案（PC端维护） → 检测任务创建时自动关联 → APP端现场检测自动带出 → 报告生成时自动填充
- 订单创建（PC端） → 派单至APP → APP接单与检测 → APP提交同步 → PC端数据审核 → PC端报告编制
- 设备出库（PC端） → 关联检测任务 → 报告自动填充设备信息 → 设备入库后释放关联
- 任务模板配置（PC端） → 创建任务时自动匹配模板 → APP端按模板展开检测表单 → 报告模板配置 → 报告按模板自动生成

# 四、页面清单与路由规划
## 4.1 PC端页面清单
PC端页面采用左侧导航+右侧内容区的经典B端布局。公共页面包括登录页、工作台首页、个人中心。各业务模块页面按角色权限动态加载。

| 页面名称 | 路由路径 | 所属模块 | 页面类型 | 权限角色 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 登录页 | /login | 公共 | 表单页 | 全部 | 账号+密码+验证码 |
| 工作台首页 | /dashboard | 工作台 | 数据看板 | 全部 | 待办+消息+快捷入口 |
| 流程中心 | /workflow | 工作台 | 列表页 | 全部 | 待办/已办/我发起 |
| 流程审批页 | /workflow/approve/:id | 工作台 | 表单页 | 全部 | 同意/驳回/转办/加签 |
| 个人中心 | /profile | 个人中心 | 表单页 | 全部 | 信息+签名+证件 |
| 消息中心 | /messages | 个人中心 | 列表页 | 全部 | 未读/已读/分类 |
| 通知公告 | /notices | 个人中心 | 列表页 | 全部 | 按时间排序 |
| 登录日志 | /logs | 个人中心 | 列表页 | 全部 | 仅本人可见 |
| 订单列表 | /order/list | 合同部 | 列表页 | 合同部 | 增删改查+导入导出 |
| 订单录入 | /order/create | 合同部 | 表单页 | 合同部 | 手动录入+关联铁塔 |
| 派单管理 | /order/dispatch | 合同部 | 列表+弹窗 | 合同部 | 批量派单+撤单 |
| 派单跟踪 | /order/tracking | 合同部 | 数据看板 | 合同部 | 状态色标+催办 |
| 报告查阅 | /order/reports | 合同部 | 列表页 | 合同部 | 在线预览+权限控制 |
| 客户列表 | /customer/list | 营销 | 列表页 | 营销 | 导入+导出 |
| 客户录入 | /customer/create | 营销 | 表单页 | 营销 | 抬头与公章一致 |
| 工程列表 | /project/list | 营销 | 列表页 | 营销 | 必绑客户 |
| 工程录入 | /project/create | 营销 | 表单页 | 营销 | 经纬度+合同金额 |
| 检测单位 | /company/info | 营销 | 表单页 | 营销 | LOGO+CMA资质 |
| 供应商列表 | /supplier/list | 供应商 | 列表页 | 设备管理 | 资质有效期管理 |
| 供应商录入 | /supplier/create | 供应商 | 表单页 | 设备管理 | 信用代码 |
| 设备列表 | /device/list | 设备 | 列表页 | 设备管理 | 状态筛选+导出 |
| 设备录入 | /device/create | 设备 | 表单页 | 设备管理 | 自动生成编号 |
| 设备出库 | /device/out | 设备 | 表单页 | 设备管理 | 选借用人+勾选设备 |
| 设备入库 | /device/in | 设备 | 表单页 | 设备管理 | 关联原出库单 |
| 设备台账 | /device/ledger | 设备 | 列表页 | 设备管理 | 不可删除 |
| 标准规范 | /config/standard | 配置 | 列表页 | 管理员 | GB/YD等标准 |
| 铁塔类型 | /config/tower-type | 配置 | 列表页 | 管理员 | 单管/角钢/三管/四管 |
| 风压配置 | /config/wind | 配置 | 列表页 | 管理员 | 按省市导入 |
| 塔段模板 | /config/segment | 配置 | 列表页 | 管理员 | 检测项目模板 |
| 任务模板列表 | /task-template/list | 任务模板 | 列表页 | 管理员 | 按塔型+检测类型筛选 |
| 任务模板编辑 | /task-template/edit/:id | 任务模板 | 表单页 | 管理员 | 配置检测项清单 |
| 任务模板字段 | /task-template/fields/:id | 任务模板 | 表单页 | 管理员 | 字段增删改/排序 |
| 任务模板版本 | /task-template/versions/:id | 任务模板 | 列表页 | 管理员 | 版本发布/历史回溯 |
| 报告模板列表 | /report-template/list | 报告模板 | 列表页 | 管理员 | 按塔型+检测类型筛选 |
| 报告模板编辑 | /report-template/edit/:id | 报告模板 | 表单页 | 管理员 | 配置报告章节结构 |
| 报告模板章节 | /report-template/chapters/:id | 报告模板 | 表单页 | 管理员 | 章节增删改/内容模板 |
| 报告模板样式 | /report-template/style/:id | 报告模板 | 表单页 | 管理员 | 页眉页脚/水印/签章 |
| 天线数据 | /data/antenna | 基础数据 | 列表页 | 管理员 | 品牌/尺寸/重量 |
| 站点数据 | /data/site | 基础数据 | 列表页 | 管理员 | 经纬度+地址 |
| 铁塔信息 | /data/tower | 基础数据 | 列表页 | 管理员 | Excel导入 |
| 检测任务 | /task/list | 检测业务 | 列表页 | 合同部/编制 | 状态筛选 |
| 检测数据录入 | /task/data | 检测业务 | 表单页 | 编制 | 塔段N节表单 |
| 报告生成 | /report/generate | 检测业务 | 表单+编辑页 | 编制 | 自动填充+线上编辑 |
| 报告审核 | /report/audit | 检测业务 | 表单页 | 审核 | 同意/驳回/转办 |
| 报告签发 | /report/approve | 检测业务 | 表单页 | 审批 | 终审质量把关 |
| 打印申请 | /print/apply | 检测业务 | 表单页 | 合同部 | 份数+用途 |
| 打印审批 | /print/audit | 检测业务 | 表单页 | 审批 | 打印权限控制 |
| 打印台账 | /print/ledger | 检测业务 | 列表页 | 合同部 | 不可删除 |
| 运营驾驶舱 | /cockpit | 运营 | 数据看板 | 管理层 | 大屏展示 |
| 用户管理 | /system/users | 系统 | 列表页 | 管理员 | 增删改查 |
| 角色管理 | /system/roles | 系统 | 列表页 | 管理员 | 菜单+按钮权限 |
| 操作日志 | /system/logs | 系统 | 列表页 | 管理员 | 增删改查追溯 |


## 4.2 APP端页面清单
APP端采用底部TabBar+页面栈的移动端常见布局。Tab页包括工作台、订单、检测、我的四大主入口。

| 页面名称 | 路由路径 | 所属模块 | 页面类型 | 权限角色 |
| --- | --- | --- | --- | --- |
| 登录页 | /pages/login/index | 公共 | 表单页 | 检测人员 |
| 工作台首页 | /pages/workbench/index | 工作台 | 列表页 | 检测人员 |
| 订单列表 | /pages/order/list | 订单 | 列表页 | 检测人员 |
| 订单详情 | /pages/order/detail | 订单 | 详情页 | 检测人员 |
| 检测首页 | /pages/inspect/index | 检测 | 导航页 | 检测人员 |
| 铁塔信息 | /pages/inspect/tower | 检测 | 表单页 | 检测人员 |
| 基础及地锚 | /pages/inspect/foundation | 检测 | 表单页 | 检测人员 |
| 结构简图 | /pages/inspect/diagram | 检测 | 画布页 | 检测人员 |
| 塔段检测 | /pages/inspect/segment | 检测 | 表单页 | 检测人员 |
| 平台/天线/避雷针 | /pages/inspect/platform | 检测 | 表单页 | 检测人员 |
| 馈线检测 | /pages/inspect/feed | 检测 | 表单页 | 检测人员 |
| 回弹强度 | /pages/inspect/rebound | 检测 | 表单页 | 检测人员 |
| 接地电阻 | /pages/inspect/ground | 检测 | 表单页 | 检测人员 |
| 垂直度 | /pages/inspect/vertical | 检测 | 表单页 | 检测人员 |
| 快捷手记 | /pages/inspect/note | 快捷 | 表单页 | 检测人员 |
| 数据校验 | /pages/inspect/validate | 检测 | 弹窗 | 检测人员 |
| 数据同步 | /pages/sync/index | 同步 | 进度页 | 检测人员 |
| 我的 | /pages/profile/index | 个人 | 表单页 | 检测人员 |


## 4.3 全局路由规划
### 4.3.1 PC端路由嵌套关系
顶层布局（Layout）包含顶部导航栏+左侧菜单+右侧内容区（<router-view>）。登录页为独立页面（无Layout），登录成功后跳转 /dashboard。
- /order/list, /order/create, /order/dispatch, /order/tracking, /order/reports — 合同部订单模块
- /customer/list, /customer/create, /project/list, /project/create, /company/info — 营销管理模块
- /device/list, /device/create, /device/out, /device/in, /device/ledger — 仪器设备模块
- /task/list, /task/data — 检测任务模块
- /report/generate, /report/audit, /report/approve — 报告管理模块
- /print/apply, /print/audit, /print/ledger — 打印管理模块
- /task-template/list, /task-template/edit/:id, /task-template/fields/:id, /task-template/versions/:id — 任务模板配置模块
- /report-template/list, /report-template/edit/:id, /report-template/chapters/:id, /report-template/style/:id — 报告模板配置模块

### 4.3.2 APP端路由嵌套关系
APP端采用TabBar顶层布局，包含4个主Tab：
- 工作台: /pages/workbench/index
- 订单: /pages/order/list
- 检测: /pages/inspect/index
- 我的: /pages/profile/index
检测流程采用页面栈逐层进入：index → tower → foundation → diagram → segment → platform → feed → rebound → ground → vertical → validate → sync

# 五、逐页面详细PRD
本章节为AI代码生成工具的核心输入，每个页面按统一模板描述页面布局、组件清单、交互逻辑、表单校验、按钮权限、数据流向。模板字段说明如下：

| 字段 | 说明 |
| --- | --- |
| 页面名称 | 中文页面名，与第4章页面清单对应 |
| 页面路由 | Vue/React Router path，含动态参数 |
| 页面布局 | 整体布局描述，如左侧导航+右侧内容区/TabBar+页面栈 |
| 组件清单 | 页面内所有组件的ID、类型、数据来源、事件绑定 |
| 交互逻辑 | 用户操作触发的状态变化、页面跳转、弹窗/提示 |
| 表单校验 | 每个字段的校验规则、错误提示文案 |
| 按钮权限 | 按钮的可见性、启用条件、操作人角色 |
| 数据流向 | 页面输入数据、输出数据、调用的API接口 |
| 数据输入 | 本页面需要哪些输入数据（来自上级页面/API/用户输入） |
| 数据输出 | 本页面产生哪些输出数据（提交给API/传递给下级页面） |
| 功能逻辑 | 核心业务逻辑的描述，包括计算规则、状态流转、数据处理 |
| 边界情况 | 空状态、加载状态、错误状态的处理 |


## 5.1 PC端逐页面详细PRD
### 5.1.1 登录页 /login
**页面路由: **/login | 无Layout，独立页面
**页面布局: **居中卡片式布局。页面背景为浅灰色(#f5f7fa)，中央白色卡片宽度360px，圆角8px。卡片内从上到下依次为LOGO区、登录表单区、操作按钮区。
**组件清单:**
- LOGO_IMG [Image] 渲染检测单位LOGO，宽120px，高auto
- LOGIN_FORM [Form] 登录表单容器
- USERNAME [Input] 账号输入框，placeholder="请输入账号"，maxLength=50
- PASSWORD [Input.Password] 密码输入框，placeholder="请输入密码"，maxLength=256
- VERIFY_CODE [Input] 验证码输入框，宽120px，右侧并排VERIFY_IMG
- VERIFY_IMG [Image] 图片验证码，点击刷新，API: GET /api/captcha
- REMEMBER [Checkbox] 记住密码复选框
- LOGIN_BTN [Button.Primary] 登录按钮，占满宽度
- FORGET_LINK [Link] 忘记密码链接，跳转忘记密码页
**交互逻辑:**
- USERNAME获取焦点时清空placeholder，失焦时若为空则恢复
- LOGIN_BTN点击时触发表单校验，通过后调用POST /api/auth/login
- 登录成功: 将Token存入localStorage，跳转/dashboard，显示欢迎消息
- 登录失败: 显示错误提示（账号或密码错误/已锁定/验证码错误），并刷新验证码
- VERIFY_IMG点击时调用GET /api/captcha获取新图片，更新src
**表单校验:**
- USERNAME: 必填，长度1-50，仅允许字母数字下划线，错误提示"账号格式不正确"
- PASSWORD: 必填，长度1-256，错误提示"密码不能为空"
- VERIFY_CODE: 必填，长度4位，错误提示"请输入4位验证码"
**按钮权限:**
- LOGIN_BTN: 全部角色可见，表单校验通过后启用，点击后进入loading状态
**数据流向:**
- 输入: 用户输入的账号/密码/验证码
- API: POST /api/auth/login {username, password, captcha, captchaKey}
- API: GET /api/captcha 获取图片验证码
- 输出: Token + RefreshToken + 用户信息(姓名/部门/角色/电子签名URL)
**数据输入:**
- 用户手动输入的账号字符串
- 用户手动输入的密码字符串
- 图形验证码识别结果字符串
- 验证码Key（由后端生成，用于校验对应关系）
**数据输出:**
- Token对象（含accessToken和refreshToken）
- 用户信息对象（用于后续页面展示和权限控制）
- 登录状态标记（存入localStorage/sessionStorage）
**功能逻辑:**
- 前端先对表单进行基础校验（非空/格式/长度），通过后组装请求体
- 调用登录API，成功后解析响应体中的Token和用户信息
- Token存入localStorage，设置全局请求拦截器自动携带Token
- 根据用户角色动态计算可访问路由，生成左侧菜单树
- 跳转工作台首页/dashboard
**边界情况:**
- 空状态: 初次进入页面时表单为空，验证码自动加载
- 加载状态: LOGIN_BTN显示loading图标，表单组件置灰
- 错误状态: 网络异常时显示"网络连接异常，请检查网络"
- 已登录用户访问/login时自动跳转/dashboard

### 5.1.2 工作台首页 /dashboard
**页面路由: **/dashboard | Layout包裹
**页面布局: **顶层Layout布局：左侧导航栏+右侧内容区。内容区为仪表盘式布局，分为三行两列。第一行全宽待办任务+消息通知。第二行左列快捷入口，右列系统公告。第三行全宽数据统计卡片。
**组件清单:**
- TODO_CARD [Card] 待办任务卡片，标题"待办任务"，带Badge数量标识
- TODO_LIST [List] 待办列表，最多5条，每条显示任务名称+派单时间+紧急程度Tag
- MSG_CARD [Card] 消息通知卡片，标题"消息通知"
- MSG_LIST [List] 消息列表，最多5条，未读显示红点
- QUICK_CARD [Card] 快捷入口卡片，标题"快捷入口"
- QUICK_GRID [Grid] 2x3网格，每格为图标+文字按钮，点击跳转对应页面
- NOTICE_CARD [Card] 公告卡片，标题"系统公告"
- NOTICE_LIST [List] 公告列表，按发布时间倒序
- STAT_ROW [Row] 统计卡片行，包含4个数据统计卡片
- STAT_CARD [Card] 每个卡片显示数值+标题+同比上升/下降箭头
**交互逻辑:**
- 页面加载时自动调用API获取待办/消息/公告/统计数据
- TODO_LIST点击某条跳转对应的流程审批页
- MSG_LIST点击某条标为已读，跳转消息详情
- QUICK_GRID点击跳转对应页面
- 定时器每10分钟自动刷新数据，页面可见时启动
- 页面隐藏时清除定时器，页面可见时重新启动
**按钮权限:**
- 待办更多: 角色权限内可见，跳转/workflow
- 消息更多: 角色权限内可见，跳转/messages
**数据流向:**
- 输入: 当前用户角色ID
- API: GET /api/dashboard/todos?limit=5 获取待办
- API: GET /api/dashboard/messages?limit=5 获取消息
- API: GET /api/dashboard/notices?limit=5 获取公告
- API: GET /api/dashboard/stats 获取统计数据
- 输出: 待办数组/消息数组/公告数组/统计数据对象
**数据输入:**
- 当前用户角色ID（用于过滤待办和统计数据）
- 当前用户部门ID（用于过滤部门级数据）
**数据输出:**
- 待办任务列表（用于渲染待办卡片）
- 消息通知列表（用于渲染消息卡片）
- 系统公告列表（用于渲染公告卡片）
- 运营统计数据（用于渲染统计卡片）
**功能逻辑:**
- 页面初始化时并行调用4个API获取数据
- 待办数据按紧急程度排序（紧急>一般>低），最多展示5条
- 消息数据区分已读/未读，未读项显示红色圆点标记
- 统计数据计算同比变化率，正增长显示绿色上升箭头，负增长显示红色下降箭头
- 设置10分钟定时器自动刷新，visibilitychange事件控制定时器启停
**边界情况:**
- 空状态: 无待办时显示"暂无待办任务"提示，带提供"去处理"按钮
- 加载状态: 卡片内显示Skeleton占位加载效果
- 错误状态: API调用失败时显示"数据加载失败，请刷新重试"

### 5.1.3 订单列表页 /order/list
**页面路由: **/order/list | Layout包裹
**页面布局: **标准列表页布局。顶部查询条件区（折叠展开）+操作按钮区。中部数据表格区（分页）。底部分页器。
**组件清单:**
- SEARCH_BAR [Row] 查询条件行，默认折叠显示常用字段
- SEARCH_NAME [Input] 订单名称模糊查询
- SEARCH_STATUS [Select] 状态下拉框：全部/待派单/已派单/已完成
- SEARCH_DATE [DateRange] 派单时间范围选择
- SEARCH_BTN [Button] 查询按钮
- RESET_BTN [Button] 重置按钮
- MORE_FILTER [Button.Link] 更多筛选展开/收起
- ADD_BTN [Button.Primary] 新增订单按钮
- IMPORT_BTN [Button] Excel导入按钮
- EXPORT_BTN [Button] 导出按钮
- BATCH_DISPATCH [Button] 批量派单按钮（多选时启用）
- DATA_TABLE [Table] 数据表格，含复选框列
- PAGINATION [Pagination] 分页器，默认每页20条
- ACTION_COL [Table.Column] 操作列，含编辑/删除/派单按钮
**交互逻辑:**
- 页面加载时自动调用API获取第一页数据
- SEARCH_BTN点击时根据当前查询条件重新加载表格，页码重置为1
- RESET_BTN点击时清空所有查询条件，重新加载
- ADD_BTN点击跳转/order/create
- IMPORT_BTN点击弹出导入对话框，支持上传Excel文件
- EXPORT_BTN点击弹出导出对话框，支持选择导出字段
- 表格行复选框变化时更新BATCH_DISPATCH启用状态
- BATCH_DISPATCH点击弹出派单人选择对话框，确认后一键批量派单
- ACTION_COL中编辑按钮跳转/order/edit/:id，删除按钮弹窗确认
- ACTION_COL中派单按钮弹出派单对话框，选择检测人员与计划日期
- 删除确认弹窗标题"确认删除"，内容"删除后不可恢复，是否继续？"，确认后调用DELETE API
**按钮权限:**
- ADD_BTN: 合同部角色可见，始终启用
- IMPORT_BTN: 合同部角色可见，始终启用
- EXPORT_BTN: 合同部角色可见，始终启用
- BATCH_DISPATCH: 合同部角色可见，选中>0行时启用
- 编辑: 未派单订单可编辑，已派单禁用编辑
- 删除: 未派单订单可删除，已派单禁用删除
- 派单: 待派单状态显示，已派单/已完成禁用
**数据流向:**
- 输入: 查询条件对象{name, status, dateRange, page, pageSize}
- API: GET /api/orders?keyword=&status=&startDate=&endDate=&page=1&size=20
- API: POST /api/orders/import 上传Excel导入
- API: GET /api/orders/export 导出Excel
- API: DELETE /api/orders/:id 删除订单
- API: POST /api/orders/dispatch 派单
- 输出: 订单数组（含分页信息）
**数据输入:**
- 用户输入的查询关键词（订单名称模糊匹配）
- 用户选择的订单状态筛选值
- 用户选择的派单时间范围[startDate, endDate]
- 分页参数page和pageSize
**数据输出:**
- 订单列表数据数组（含分页信息total/current/pageSize）
- 批量派单结果（成功/失败订单ID列表）
- 导入结果（成功数/失败数/失败明细）
- 导出文件Blob（前端触发下载）
**功能逻辑:**
- 查询逻辑：组装查询参数调用API，后端根据关键词做LIKE匹配，状态做精确匹配，时间范围做BETWEEN匹配
- 分页逻辑：默认page=1, size=20，支持切换每页条数（10/20/50/100）
- 批量派单：校验选中订单状态必须全部为"待派单"，调用批量派单API事务处理
- 导入逻辑：前端解析Excel，校验必填字段，分批提交（每批100条），返回导入结果明细
- 删除逻辑：校验订单状态为"待派单"且未关联检测任务，否则禁止删除
**边界情况:**
- 空状态: 无数据时显示"暂无订单数据"提示，并提供"立即创建"按钮
- 加载状态: 表格行显示Skeleton占位效果
- 错误状态: API失败显示"加载失败"，导入失败显示错误行索引引导

### 5.1.4 订单录入页 /order/create
**页面路由: **/order/create | Layout包裹
**页面布局: **标准表单页布局。顶部返回按钮+页面标题。内容区分为三个卡片：基本信息、关联信息、检测需求。底部固定操作栏。
**组件清单:**
- BACK_BTN [Button] 返回按钮，跳转/order/list
- BASIC_CARD [Card] 基本信息卡片，标题"基本信息"
- ORDER_NAME [Input] 订单名称，必填，maxLength=200
- ORDER_CODE [Input] 订单编号，系统自动生成，只读
- ORDER_DATE [DatePicker] 派单日期，默认当天，必填
- LINK_CARD [Card] 关联信息卡片，标题"关联信息"
- SELECT_TOWER [Select.Search] 选择铁塔，必填，搜索下拉，选中后自动带出客户/工程/站点
- SELECT_CUSTOMER [Input] 客户信息，自动填充，只读
- SELECT_PROJECT [Input] 工程信息，自动填充，只读
- SELECT_SITE [Input] 站点信息，自动填充，只读
- DEMAND_CARD [Card] 检测需求卡片，标题"检测需求"
- DETECT_TYPE [Select] 检测类型：安全性鉴定/可靠性鉴定/抗震鉴定
- STANDARD_SELECT [Select.Multiple] 检测依据，多选，关联标准规范库
- DEVICE_SELECT [Select.Multiple] 检测设备，多选，过滤已出库状态设备
- DEMAND_DESC [TextArea] 检测需求说明，maxLength=500
- FOOTER_BAR [Affix] 底部固定操作栏
- SAVE_BTN [Button.Primary] 保存按钮
- CANCEL_BTN [Button] 取消按钮
**交互逻辑:**
- SELECT_TOWER搜索时调用API获取铁塔列表，选中后自动填充关联字段
- DETECT_TYPE变化时自动更新STANDARD_SELECT的可选项
- SAVE_BTN点击时先校验表单，通过后调用POST /api/orders
- 保存成功: 显示成功提示，返回列表页并刷新
- CANCEL_BTN点击时若表单有未保存数据，弹窗确认"是否放弃编辑"
**表单校验:**
- ORDER_NAME: 必填，长度1-200，错误提示"请输入订单名称"
- ORDER_DATE: 必填，不得早于当天，错误提示"派单日期不能早于今天"
- SELECT_TOWER: 必填，错误提示"请选择铁塔"
- DETECT_TYPE: 必填
- STANDARD_SELECT: 必填，至少选择1项，错误提示"请至少选择一项检测依据"
- DEVICE_SELECT: 必填，至少选择1项
**按钮权限:**
- SAVE_BTN: 合同部角色可见，表单校验通过后启用
- CANCEL_BTN: 合同部角色可见
**数据流向:**
- 输入: 铁塔搜索关键字、表单字段值
- API: GET /api/towers?keyword= 获取铁塔列表
- API: GET /api/standards?type= 获取检测依据
- API: GET /api/devices?status=idle 获取闲置设备
- API: POST /api/orders 创建订单
- 输出: 新建订单ID
**数据输入:**
- 用户手动输入的订单名称
- 用户选择的派单日期
- 用户搜索选择的铁塔ID
- 用户选择的检测类型
- 用户多选的检测依据ID数组
- 用户多选的设备ID数组
**数据输出:**
- 新建订单ID（用于列表页跳转或后续操作）
- 订单完整对象（用于编辑页回填）
**功能逻辑:**
- 页面加载时初始化表单，ORDER_CODE字段由后端生成规则自动填充
- SELECT_TOWER组件支持远程搜索，输入关键词后防抖300ms调用API
- 选中铁塔后自动级联查询关联的客户/工程/站点信息，以只读方式展示
- 检测类型切换时联动更新检测依据的可选项范围
- 设备选择器过滤条件：仅展示status=idle的设备，且校准有效期>30天
- 表单提交前进行全字段校验，校验通过后组装请求体调用创建API
- 创建成功后清除表单草稿（localStorage中的临时数据）
**边界情况:**
- 空状态: 初次加载时表单为空，编号字段自动生成占位符
- 加载状态: 保存按钮进入loading状态
- 错误状态: 保存失败显示错误提示，表单字段保持用户输入
- 取消确认: 表单有修改时弹出确认对话框，防止误操作丢失数据

### 5.1.5 派单管理页 /order/dispatch
**页面路由: **/order/dispatch | Layout包裹
**页面布局: **分为左右两栏布局。左栏为待派单订单列表（可勾选），右栏为检测人员选择区+派单设置区。
**组件清单:**
- LEFT_PANEL [Card] 左侧待派单列表卡片
- PENDING_TABLE [Table] 待派单订单表格，含复选框列
- RIGHT_PANEL [Card] 右侧派单设置卡片
- INSPECTOR_SELECT [Select] 选择检测人员，必填，下拉选择
- PLAN_DATE [DatePicker] 计划完成日期，必填
- SELECTED_LIST [List] 已选订单列表，可点击移除
- DISPATCH_BTN [Button.Primary] 确认派单按钮
- CANCEL_DISPATCH [Button] 撤单按钮（对已派单操作）
**交互逻辑:**
- PENDING_TABLE勾选时更新SELECTED_LIST，可选全选/全不选
- SELECTED_LIST中点击移除按钮时取消对应订单的选中状态
- DISPATCH_BTN点击时先校验选中订单>0且选了检测人员，确认弹窗后调用API
- 派单成功: 显示成功提示，列表刷新
- CANCEL_DISPATCH点击后显示已派单列表，选择后确认撤销
**表单校验:**
- INSPECTOR_SELECT: 必填，错误提示"请选择检测人员"
- PLAN_DATE: 必填，不得早于当天
- 选中订单: 至少选1条，错误提示"请至少选择一个订单"
**按钮权限:**
- DISPATCH_BTN: 合同部角色可见，选中订单>0且选了检测人员时启用
- CANCEL_DISPATCH: 合同部角色可见
**数据流向:**
- 输入: 待派单订单数组、选中订单ID数组、检测人员ID、计划日期
- API: GET /api/orders?status=pending 获取待派单
- API: GET /api/users?role=inspector 获取检测人员列表
- API: POST /api/orders/dispatch {orderIds, inspectorId, planDate}
- API: POST /api/orders/cancel-dispatch {orderIds}
- 输出: 派单结果
**数据输入:**
- 待派单订单列表（左栏展示用）
- 用户勾选的订单ID数组
- 用户选择的检测人员ID
- 用户选择的计划完成日期
**数据输出:**
- 派单结果（成功/失败状态及失败原因）
- 更新后的订单状态列表
**功能逻辑:**
- 页面加载时并行获取待派单列表和检测人员列表
- 检测人员下拉框展示格式：姓名（部门）- 当前任务数
- 批量派单时校验所有选中订单的状态必须为"待派单"
- 派单API采用事务处理，全部成功或全部失败
- 派单成功后创建对应的检测任务记录，任务状态为"待执行"
- 撤单操作校验：仅允许撤销状态为"待执行"的任务，已开始的任务不允许撤单
**边界情况:**
- 空状态: 无待派单时显示"暂无待派单订单"
- 加载状态: 列表显示Skeleton
- 错误状态: API失败显示错误提示

### 5.1.6 报告生成页 /report/generate/:taskId
**页面路由: **/report/generate/:taskId | Layout包裹
**页面布局: **分为左右两栏布局。左栏为报告结构树（封面/目录/检测依据/设备/铁塔概况/各检测项/不合格项/结论/签字）。右栏为报告编辑区，支持在线编辑。底部固定操作栏。
**组件清单:**
- STRUCT_TREE [Tree] 报告结构树，可点击切换编辑区域
- EDIT_AREA [Card] 编辑区域，根据树节点动态切换内容
- AUTO_FILL [Alert] 自动填充提示条，显示"以下字段自动从基础档案取值，禁止手动修改"
- READ_ONLY_FIELDS [Descriptions] 只读字段列表：委托单位/工程名称/铁塔名称/检测日期/鉴定类别
- EDITABLE_FIELDS [Form] 可编辑表单，含检测结果/处理建议/备注
- CONCLUSION_RADIO [Radio.Group] 检测结论：合格/不合格
- SIGN_AREA [Card] 签字栏区域，显示编制/审核/审批人员姓名与签名图片
- PREVIEW_BTN [Button] 预览按钮
- SAVE_BTN [Button.Primary] 保存按钮
- SUBMIT_BTN [Button.Primary] 提交审核按钮
**交互逻辑:**
- 页面加载时根据taskId调用API获取检测数据与报告初稿
- 自动填充字段显示为灰色背景，禁止点击编辑
- EDITABLE_FIELDS可自由编辑，离开页面时自动保存草稿
- PREVIEW_BTN点击弹出报告预览对话框，显示PDF预览
- SAVE_BTN点击时保存当前编辑内容，显示"已保存"提示
- SUBMIT_BTN点击时弹窗确认"确认提交审核"，确认后更新状态为待审核
**表单校验:**
- CONCLUSION_RADIO: 必选
- EDITABLE_FIELDS: 检测结果不能为空
**按钮权限:**
- PREVIEW_BTN: 编制员可见，始终启用
- SAVE_BTN: 编制员可见，始终启用
- SUBMIT_BTN: 编制员可见，状态为编制中时启用
**数据流向:**
- 输入: taskId
- API: GET /api/tasks/:id 获取检测任务详情
- API: GET /api/reports/draft?taskId= 获取报告初稿
- API: POST /api/reports/save 保存报告
- API: POST /api/reports/submit 提交审核
- 输出: 报告ID + 状态更新
**数据输入:**
- taskId（从上级页面传入的路由参数）
- 检测任务详情数据
- 报告模板配置数据
**数据输出:**
- 保存的报告内容对象
- 报告状态变更（编制中→待审核）
**功能逻辑:**
- 页面加载时根据taskId查询检测任务，自动关联报告模板配置
- 只读字段从基础档案自动填充（委托单位、工程名称、铁塔名称、检测日期等），不可编辑
- 可编辑区域根据报告模板配置的章节结构动态生成表单
- 检测结论切换为"不合格"时，自动弹出不合格项填写要求
- 签字栏区域展示各级人员的电子签名图片，签名从用户档案中读取
- 自动保存草稿机制：每30秒自动保存当前编辑内容到localStorage
- 提交审核前校验所有必填字段和检测结论
- 提交成功后发送系统通知给审核员
**边界情况:**
- 空状态: 无检测数据时显示"暂无检测数据，请先完成现场检测"
- 加载状态: 编辑区显示Skeleton
- 离页面保存: 如有未保存修改，弹窗确认是否保存

### 5.1.7 报告审核页 /report/audit/:reportId
**页面路由: **/report/audit/:reportId | Layout包裹
**页面布局: **与report/generate类似，但所有字段为只读。底部增加审核操作区。
**组件清单:**
- REPORT_CONTENT [Card] 报告内容区，全部只读
- AUDIT_OPINION [TextArea] 审核意见输入，必填，maxLength=500
- PASS_BTN [Button.Primary] 通过按钮
- REJECT_BTN [Button.Danger] 驳回按钮
- TRANSFER_BTN [Button] 转办按钮
**交互逻辑:**
- 页面加载时获取报告详情
- PASS_BTN点击弹窗确认，确认后更新状态为待终审
- REJECT_BTN点击弹窗确认，需填写驳回原因，确认后退回编制员
- TRANSFER_BTN弹出选择人员对话框，选择后转交给其他审核员
**表单校验:**
- AUDIT_OPINION: 必填，长度1-500
**按钮权限:**
- PASS_BTN: 审核员可见，审核意见已填时启用
- REJECT_BTN: 审核员可见
- TRANSFER_BTN: 审核员可见
**数据流向:**
- 输入: reportId
- API: GET /api/reports/:id
- API: POST /api/reports/audit {reportId, opinion, action: pass/reject/transfer, nextAuditor?}
- 输出: 审核结果
**数据输入:**
- reportId（从列表页传入）
- 报告完整内容（只读展示）
**数据输出:**
- 审核结果（通过/驳回/转办）
- 审核意见（永久留痕）
- 报告状态变更
**功能逻辑:**
- 页面加载时获取报告完整数据和关联的检测原始数据
- 审核员可查看报告全文和原始检测数据，进行交叉核对
- 通过操作：校验审核意见已填写，更新报告状态为"待终审"，通知终审人员
- 驳回操作：必须填写驳回原因，更新报告状态为"编制中"，通知编制员修改
- 转办操作：选择其他审核员，将审核任务转交，原审核意见保留
- 所有审核操作记录审计日志，包含操作人/时间/IP/操作类型/变更前后状态
**边界情况:**
- 空状态: 无待审核报告时显示"暂无待审核报告"
- 加载/错误: 同前

### 5.1.8 报告签发页 /report/approve/:reportId
**页面路由: **/report/approve/:reportId | Layout包裹
**页面布局: **同report/audit，但角色为审批员。审批通过后报告状态变为已审批（已归档），数据锁定。
**组件清单:**
- REPORT_CONTENT [Card] 报告内容，只读
- APPROVE_OPINION [TextArea] 审批意见，必填
- PASS_BTN [Button.Primary] 签发通过
- REJECT_BTN [Button.Danger] 驳回修改
**交互逻辑:**
- PASS_BTN点击弹窗确认"确认签发"，确认后更新状态为已审批，数据锁定
- REJECT_BTN点击需填写驳回原因，退回编制员修改
**表单校验:**
- APPROVE_OPINION: 必填，长度1-500
**按钮权限:**
- PASS_BTN: 审批员可见，意见已填时启用
- REJECT_BTN: 审批员可见
**数据流向:**
- API: GET /api/reports/:id
- API: POST /api/reports/approve {reportId, opinion, action: pass/reject}
**数据输入:**
- reportId
**数据输出:**
- 签发结果
- 报告状态变更（待签发→已签发）
- PDF归档文件
**功能逻辑:**
- 终审签发是报告发布的最后一道关卡，审批通过后报告数据永久锁定
- 签发通过后自动生成PDF文件，添加水印和数字签名
- 签发通过后触发"一塔一档"归档逻辑，将报告关联到对应铁塔档案
- 签发通过后允许合同部发起打印申请
- 驳回操作必须有明确的修改意见，退回编制员重新编辑
**边界情况:**
- 空状态: 无待签发报告时显示提示

### 5.1.9 任务模板列表页 /task-template/list
**页面路由: **/task-template/list | Layout包裹
**页面布局: **标准列表页布局。顶部查询条件+操作按钮。中部数据表格+分页。支持按塔型和检测类型筛选。
**组件清单:**
- SEARCH_NAME [Input] 模板名称模糊查询
- SEARCH_TOWER_TYPE [Select] 塔型筛选：单管塔/角钢塔/三管塔/四管塔/全部
- SEARCH_DETECT_TYPE [Select] 检测类型筛选：安全性/可靠性/抗震/全部
- SEARCH_STATUS [Select] 模板状态：已发布/草稿/已停用
- ADD_BTN [Button.Primary] 新增模板按钮
- COPY_BTN [Button] 复制模板按钮（单选时启用）
- DATA_TABLE [Table] 模板列表，列：模板编号/名称/塔型/检测类型/版本号/状态/操作
- PAGINATION [Pagination]
**交互逻辑:**
- 页面加载时获取模板列表
- ADD_BTN跳转/task-template/create创建新模板
- 表格行点击"编辑"跳转/task-template/edit/:id
- 表格行点击"配置字段"跳转/task-template/fields/:id
- 表格行点击"版本历史"跳转/task-template/versions/:id
- COPY_BTN点击复制选中模板，弹出确认框后创建副本
**按钮权限:**
- 新增: 系统管理员可见
- 编辑: 系统管理员可见，草稿状态可编辑，已发布仅可复制
- 停用: 系统管理员可见，已发布模板可停用
**数据流向:**
- API: GET /api/task-templates?keyword=&towerType=&detectType=&status=
- API: POST /api/task-templates 创建模板
- API: POST /api/task-templates/:id/copy 复制模板
**数据输入:**
- 查询关键词
- 塔型筛选值
- 检测类型筛选值
- 模板状态筛选值
**数据输出:**
- 模板列表数据
- 复制结果（新模板ID）
**功能逻辑:**
- 模板列表支持多条件组合查询，默认按更新时间倒序
- 已发布模板不可直接编辑，必须先停用或复制为新版本
- 复制操作会创建模板的完整副本（含字段配置），副本状态为草稿
- 模板停用后不影响已使用该模板创建的历史任务
**边界情况:**
- 空状态: 显示"暂无任务模板，请创建"

### 5.1.10 任务模板编辑页 /task-template/edit/:id
**页面路由: **/task-template/edit/:id | Layout包裹
**页面布局: **表单页布局。分三卡片：基本信息、检测项配置、字段规则配置。
**组件清单:**
- TEMPLATE_NAME [Input] 模板名称，必填
- TOWER_TYPE [Select] 适用塔型，必填
- DETECT_TYPE [Select] 适用检测类型，必填
- ITEM_LIST [EditableTable] 检测项列表，可增删改排序
- ADD_ITEM [Button] 添加检测项
- FIELD_CONFIG [Drawer] 字段配置抽屉，配置每个检测项的字段名/类型/必填/默认值/校验规则
- SAVE_BTN [Button.Primary] 保存草稿
- PUBLISH_BTN [Button.Primary] 发布模板
**交互逻辑:**
- ITEM_LIST支持拖拽排序
- 点击某检测项的"配置字段"打开FIELD_CONFIG抽屉
- FIELD_CONFIG中可添加/删除/编辑字段，设置字段类型（文本/数字/选择/日期/图片）
- SAVE_BTN保存为草稿状态
- PUBLISH_BTN发布模板，发布后不可修改，需创建新版本
**表单校验:**
- TEMPLATE_NAME: 必填
- TOWER_TYPE: 必选
- DETECT_TYPE: 必选
- ITEM_LIST: 至少1个检测项
**按钮权限:**
- 保存: 管理员可见
- 发布: 管理员可见，草稿状态可发布
**数据流向:**
- API: GET /api/task-templates/:id
- API: PUT /api/task-templates/:id
- API: POST /api/task-templates/:id/publish
**数据输入:**
- 模板ID（编辑时）
- 用户输入的模板基本信息
- 用户配置的检测项数组
- 每个检测项的字段配置
**数据输出:**
- 保存的模板对象
- 发布后的模板版本号
**功能逻辑:**
- 模板编辑采用"草稿-发布"机制，草稿可反复修改，发布后锁定
- 检测项支持层级结构（父项-子项），通过缩进展示
- 字段类型支持：文本、数字、单选、多选、日期、图片、坐标
- 每个字段可配置：是否必填、默认值、校验规则（最小值/最大值/正则/自定义）
- 发布时自动创建版本记录（V1.0, V2.0...），历史版本可回溯查看
- 模板发布后立即生效，新创建的任务自动匹配最新发布的模板
**边界情况:**
- 空状态: 新增时表单为空

### 5.1.11 报告模板列表页 /report-template/list
**页面路由: **/report-template/list | Layout包裹
**页面布局: **同任务模板列表页布局。
**组件清单:**
- SEARCH_NAME [Input] 模板名称查询
- SEARCH_TOWER_TYPE [Select] 塔型筛选
- SEARCH_REPORT_TYPE [Select] 报告类型筛选
- ADD_BTN [Button.Primary] 新增报告模板
- DATA_TABLE [Table] 列：编号/名称/塔型/报告类型/版本/状态/操作
- PAGINATION [Pagination]
**交互逻辑:**
- 页面加载获取列表
- ADD_BTN跳转创建页
- 编辑跳转/report-template/edit/:id
- 章节配置跳转/report-template/chapters/:id
**按钮权限:**
- 新增/编辑: 系统管理员可见
- 章节配置: 系统管理员可见
**数据流向:**
- API: GET /api/report-templates
- API: POST /api/report-templates
**数据输入:**
- 查询条件
**数据输出:**
- 模板列表
- 新建模板ID
**功能逻辑:**
- 报告模板与任务模板独立管理，但可关联使用
- 报告模板控制报告的结构、章节、样式
- 已发布模板不可编辑，需复制新版本
**边界情况:**
- 空状态: 显示提示

### 5.1.12 报告模板编辑页 /report-template/edit/:id
**页面路由: **/report-template/edit/:id | Layout包裹
**页面布局: **三卡片布局：基本信息、章节结构配置、样式配置。
**组件清单:**
- TEMPLATE_NAME [Input] 模板名称，必填
- TOWER_TYPE [Select] 适用塔型，必填
- REPORT_TYPE [Select] 报告类型：角钢塔/格构塔/法兰式单管/插接式单管
- CHAPTER_LIST [SortableList] 章节列表，支持拖拽排序
- ADD_CHAPTER [Button] 添加章节
- CHAPTER_CONTENT [Editor] 章节内容模板编辑器，支持占位符插入
- STYLE_CONFIG [Form] 样式配置：页眉/页脚/水印/签章位置/字体/字号
- PLACEHOLDER_SELECT [Select] 占位符选择器（自动插入到编辑器）
- SAVE_BTN [Button.Primary]
- PUBLISH_BTN [Button.Primary]
**交互逻辑:**
- CHAPTER_LIST支持拖拽排序和嵌套（父章节-子章节）
- CHAPTER_CONTENT为富文本编辑器，支持占位符语法 {{fieldName}}
- PLACEHOLDER_SELECT下拉选择系统字段（委托单位/工程名称/铁塔名称等），自动插入光标位置
- STYLE_CONFIG实时预览效果
- SAVE_BTN保存草稿
- PUBLISH_BTN发布
**表单校验:**
- TEMPLATE_NAME: 必填
- TOWER_TYPE: 必选
- REPORT_TYPE: 必选
- CHAPTER_LIST: 至少1个章节
**按钮权限:**
- 保存/发布: 系统管理员可见
**数据流向:**
- API: GET /api/report-templates/:id
- API: PUT /api/report-templates/:id
- API: POST /api/report-templates/:id/publish
**数据输入:**
- 模板ID
- 模板基本信息
- 章节结构数组
- 每个章节的内容模板
- 样式配置对象
**数据输出:**
- 保存的模板
- 发布后的版本号
**功能逻辑:**
- 报告模板采用"章节-内容模板"结构，每个章节对应报告中的一个部分
- 内容模板使用占位符语法 {{fieldName}}，报告生成时自动替换为实际数据
- 支持条件章节：根据检测结论（合格/不合格）显示不同章节
- 样式配置独立管理，可统一修改整份报告的输出样式
- 发布时创建新版本，历史版本可回溯查看和对比差异
- 模板与塔型+报告类型绑定，生成报告时自动匹配最合适的模板
**边界情况:**
- 空状态: 新增时所有配置为空

### 5.1.13 设备列表页 /device/list
**页面路由: **/device/list | Layout包裹
**页面布局: **标准列表页布局。
**组件清单:**
- SEARCH_NAME [Input] 设备名称查询
- SEARCH_STATUS [Select] 设备状态筛选：全部/闲置/借出/待归还/维修中/报废
- SEARCH_SUPPLIER [Select] 供应商筛选
- ADD_BTN [Button.Primary] 新增设备
- EXPORT_BTN [Button] 导出台账
- DATA_TABLE [Table] 列：编号/名称/规格/状态/借用人/校准有效期/操作
- STATUS_TAG [Tag] 状态标签，不同状态不同颜色
- PAGINATION [Pagination]
**交互逻辑:**
- 点击查询重新加载
- 点击新增跳转/device/create
- 点击编辑跳转/device/edit/:id
- 点击删除弹窗确认
- 状态标签点击可快速筛选该状态
**按钮权限:**
- 新增: 设备管理员可见
- 编辑: 设备管理员可见
- 删除: 设备管理员可见，状态=闲置时启用
- 导出: 设备管理员可见
**数据流向:**
- API: GET /api/devices?keyword=&status=&supplierId=
- API: DELETE /api/devices/:id
- API: GET /api/devices/export
**数据输入:**
- 查询关键词
- 状态筛选值
- 供应商筛选值
**数据输出:**
- 设备列表
- 导出文件
**功能逻辑:**
- 设备列表按状态分组展示，不同状态用不同颜色标签
- 校准有效期<30天的设备高亮提醒
- 删除逻辑：仅允许删除状态为"闲置"且从未被借用的设备
- 导出功能支持选择导出字段和格式（Excel/PDF）
**边界情况:**
- 空状态: 显示"暂无设备数据"

### 5.1.14 设备出库页 /device/out
**页面路由: **/device/out | Layout包裹
**页面布局: **表单页布局。分三个卡片：借用人选择、设备选择、出库单信息。底部操作栏。
**组件清单:**
- BORROWER_SELECT [Select] 选择借用人（检测人员），必填
- DEVICE_SELECT [Transfer] 设备选择，左侧显示闲置设备列表，右侧显示已选设备
- OUT_DATE [DatePicker] 出库日期，默认当天，必填
- PLAN_RETURN [DatePicker] 计划归还日期，必填
- REMARK [TextArea] 备注，maxLength=200
- OUT_NO [Input] 出库单号，系统自动生成，只读
- SAVE_BTN [Button.Primary] 确认出库
- CANCEL_BTN [Button] 取消
**交互逻辑:**
- BORROWER_SELECT选择后列出该借用人当前已借出设备（供参考）
- DEVICE_SELECT过滤条件：仅显示状态=闲置的设备
- 选中设备后自动累计数量
- SAVE_BTN点击时校验并弹窗确认"是否确认出库"
- 确认后调用API，成功后返回列表页
**表单校验:**
- BORROWER_SELECT: 必填
- DEVICE_SELECT: 至少选1项
- OUT_DATE: 必填，不得晚于当天
- PLAN_RETURN: 必填，必须晚于出库日期
**按钮权限:**
- SAVE_BTN: 设备管理员可见，选中设备>0时启用
- CANCEL_BTN: 设备管理员可见
**数据流向:**
- API: GET /api/users?role=inspector
- API: GET /api/devices?status=idle
- API: POST /api/devices/out {borrowerId, deviceIds, outDate, planReturnDate}
**数据输入:**
- 借用人ID
- 设备ID数组
- 出库日期
- 计划归还日期
**数据输出:**
- 出库单ID
- 更新后的设备状态列表
**功能逻辑:**
- 借用人下拉框展示格式：姓名（部门）- 当前借出X件设备
- 设备选择器左侧列出所有闲置设备，右侧为已选设备，支持搜索
- 出库时批量更新设备状态为"借出"，并创建出库记录
- 出库单号自动生成规则：CK+年月日+4位流水号
- 出库成功后发送通知给借用人
**边界情况:**
- 空状态: 无闲置设备时显示"暂无可借出设备"

### 5.1.15 用户管理页 /system/users
**页面路由: **/system/users | Layout包裹
**页面布局: **标准列表页布局。
**组件清单:**
- SEARCH_NAME [Input] 姓名/账号查询
- SEARCH_DEPT [Select] 部门筛选
- SEARCH_ROLE [Select] 角色筛选
- ADD_BTN [Button.Primary] 新增用户
- DATA_TABLE [Table] 列：账号/姓名/部门/岗位/手机/状态/操作
- STATUS_SWITCH [Switch] 账号状态开关（启用/停用/锁定）
- PAGINATION [Pagination]
**交互逻辑:**
- 点击新增弹出对话框或跳转新页面
- STATUS_SWITCH切换时实时更新用户状态
- 点击编辑弹出编辑对话框
- 点击删除弹窗确认，管理员账号禁止删除
**按钮权限:**
- 新增: 管理员可见
- 编辑: 管理员可见
- 删除: 管理员可见，非管理员账号启用
**数据流向:**
- API: GET /api/users?keyword=&dept=&role=
- API: PUT /api/users/:id/status
- API: DELETE /api/users/:id
**数据输入:**
- 查询条件
**数据输出:**
- 用户列表
- 状态更新结果
**功能逻辑:**
- 用户列表支持多条件组合查询
- 状态切换操作实时生效，同时记录操作日志
- 删除用户前校验：不能删除自己、不能删除唯一的管理员、不能删除已有业务数据的用户
- 用户创建后自动发送初始密码到用户邮箱/手机
**边界情况:**
- 空状态: 显示"暂无用户数据"

### 5.1.16 角色管理页 /system/roles
**页面路由: **/system/roles | Layout包裹
**页面布局: **分为左右两栏布局。左栏为角色列表，右栏为权限配置区（树形菜单+按钮级权限）。
**组件清单:**
- ROLE_LIST [List] 角色列表，点击切换右侧权限配置
- ADD_ROLE [Button] 新增角色按钮
- PERM_TREE [Tree] 菜单权限树，可勾选访问权限
- BUTTON_PERM [Checkbox.Group] 按钮级权限复选框，按页面分组
- DATA_PERM [Radio.Group] 数据权限：全部/本部门/本人
- SAVE_PERM [Button.Primary] 保存权限按钮
**交互逻辑:**
- ROLE_LIST点击某角色时，右侧加载该角色的当前权限
- PERM_TREE勾选父节点时自动勾选/取消全部子节点
- BUTTON_PERM复选框变化时实时更新
- SAVE_PERM点击时保存当前角色的权限配置
**按钮权限:**
- 新增角色: 管理员可见
- 保存权限: 管理员可见，选中角色后启用
**数据流向:**
- API: GET /api/roles
- API: GET /api/roles/:id/permissions
- API: PUT /api/roles/:id/permissions
- API: POST /api/roles
**数据输入:**
- 角色ID（用于查询当前权限）
- 用户修改后的权限配置
**数据输出:**
- 角色列表
- 保存后的权限配置
**功能逻辑:**
- 角色列表加载时默认选中第一个角色
- 菜单权限树采用三级结构（模块-页面-操作），勾选父级自动级联子级
- 按钮权限按页面分组展示，每个页面下列出该页面的所有操作按钮
- 数据权限控制用户能查看的数据范围：全部=所有数据，本部门=同部门数据，本人=仅自己的数据
- 保存权限时计算差异，仅提交变更部分，减少网络传输
- 权限变更后立即生效，已登录用户下次请求时生效
**边界情况:**
- 空状态: 显示"暂无角色数据"

### 5.1.17 运营驾驶舱 /cockpit
**页面路由: **/cockpit | Layout包裹（或独立大屏页面）
**页面布局: **全屏数据看板布局。顶部标题栏（时间+公司名）。主体分为多个统计卡片区域，采用CSS Grid布局。
**组件清单:**
- HEADER_BAR [Row] 顶部标题栏
- TIME_DISPLAY [Text] 实时时钟
- KPI_ROW [Row] 关键指标行，包含4-6个大数据卡片
- KPI_CARD [Card] 每个卡片显示数值+标题+同比趋势
- CHART_ROW [Row] 图表行，包含柱状图/折线图/饼图
- TASK_PROGRESS [Card] 任务进度卡片，显示各状态任务数量
- INSPECTOR_RANK [Card] 人员工作量排行榜
- DEVICE_STATUS [Card] 设备状态分布饼图
- DEFECT_MAP [Card] 不合格项区域分布地图
**交互逻辑:**
- 页面加载时获取所有统计数据
- 定时器每5分钟自动刷新
- 支持全屏切换（F11或页面内全屏按钮）
- 支持现场喊话功能（需接入音频设备）
**按钮权限:**
- 全屏切换: 管理层可见
- 现场喊话: 管理层可见
**数据流向:**
- API: GET /api/cockpit/kpi 关键指标
- API: GET /api/cockpit/task-progress 任务进度
- API: GET /api/cockpit/inspector-rank 人员排行
- API: GET /api/cockpit/device-status 设备状态
- API: GET /api/cockpit/defect-map 不合格项分布
**数据输入:**
- 时间范围筛选（默认本月）
- 部门筛选（可选）
**数据输出:**
- KPI指标数据
- 任务进度数据
- 人员排行数据
- 设备状态数据
- 不合格项分布数据
**功能逻辑:**
- 页面初始化时并行调用所有API获取数据
- KPI卡片展示核心指标：本月任务数/完成率/不合格率/在检人员数
- 趋势箭头计算环比增长率，展示上升/下降/持平状态
- 任务进度卡片按状态分组展示各状态的数量和占比
- 人员排行榜按本月完成任务数降序，展示姓名+部门+任务数+合格率
- 设备状态饼图展示各状态（闲置/借出/维修中/报废）的数量分布
- 定时器每5分钟刷新一次，全屏模式下隐藏非必要UI元素
**边界情况:**
- 空状态: 无数据时显示"暂无运营数据"
- 加载状态: 卡片内显示Skeleton
- 错误状态: 显示错误提示，保持上次成功加载的数据

## 5.2 APP端逐页面详细PRD
### 5.2.1 APP登录页 /pages/login/index
**页面路由: **/pages/login/index | 独立页面
**页面布局: **移动端居中卡片布局。页面中央白色卡片，内含LOGO、账号输入、密码输入、登录按钮。
**组件清单:**
- LOGO [Image] 检测单位LOGO，宽200rpx
- ACCOUNT [Input] 账号输入
- PASSWORD [Input.Password] 密码输入
- LOGIN_BTN [Button] 登录按钮，主色，占满宽
**交互逻辑:**
- LOGIN_BTN点击校验表单，通过后调用API
- 登录成功: 存Token跳转工作台
- 登录失败: Toast错误提示
**表单校验:**
- ACCOUNT: 必填
- PASSWORD: 必填
**按钮权限:**
- LOGIN_BTN: 全部可见，校验通过后启用
**数据流向:**
- API: POST /api/auth/login
- 输出: Token+用户信息
**数据输入:**
- 用户输入的账号
- 用户输入的密码
**数据输出:**
- Token对象
- 用户信息对象
**功能逻辑:**
- 前端基础校验（非空）通过后组装请求
- Token存入localStorage，设置请求拦截器
- 根据角色计算可访问页面，生成TabBar菜单
- 登录成功后预加载检测任务数据到本地SQLite
**边界情况:**
- 空状态: 表单为空
- 加载: 按钮loading
- 错误: Toast提示

### 5.2.2 APP工作台 /pages/workbench/index
**页面路由: **/pages/workbench/index | TabBar页面
**页面布局: **移动端列表布局。顶部为用户信息区（头像+姓名+部门）。中部为待办任务列表（默认），可切换至已办列表。已办列表支持日历视图。
**组件清单:**
- USER_INFO [Row] 用户信息区
- TAB_SWITCH [Tabs] 待办/已办切换标签
- TODO_LIST [List] 待办任务列表
- DONE_LIST [List] 已办任务列表
- CALENDAR [Calendar] 日历视图（已办模式下）
- REFRESH [PullRefresh] 下拉刷新
**交互逻辑:**
- 页面加载获取待办列表
- TAB_SWITCH切换加载对应数据
- TODO_LIST点击跳转检测页面
- 下拉刷新重新加载数据
- 日历模式下点击日期列出该日检测任务
**按钮权限:**

### 5.2.2 APP工作台 /pages/workbench/index
**页面路由: **/pages/workbench/index | TabBar页面
**页面布局: **移动端列表布局。顶部为用户信息区（头像+姓名+部门）。中部为待办任务列表（默认），可切换至已办列表。已办列表支持日历视图。
**组件清单:**
- USER_INFO [Row] 用户信息区
- TAB_SWITCH [Tabs] 待办/已办切换标签
- TODO_LIST [List] 待办任务列表
- DONE_LIST [List] 已办任务列表
- CALENDAR [Calendar] 日历视图（已办模式下）
- REFRESH [PullRefresh] 下拉刷新
**交互逻辑:**
- 页面加载获取待办列表
- TAB_SWITCH切换加载对应数据
- TODO_LIST点击跳转检测页面
- 下拉刷新重新加载数据
- 日历模式下点击日期列出该日检测任务
**按钮权限:**
- 无特殊按钮权限控制
**数据流向:**
- API: GET /api/app/tasks?status=pending
- API: GET /api/app/tasks?status=done
**数据输入:**
- 当前用户ID
**数据输出:**
- 待办任务列表
- 已办任务列表
**功能逻辑:**
- 页面加载时并行获取待办和已办数据
- 待办数据按紧急程度排序，最多展示20条
- 已办数据支持日历视图和列表视图两种展示方式
- 下拉刷新触发全量数据重新加载
- 网络异常时展示离线提示，显示本地缓存数据
**边界情况:**
- 空状态: 显示"暂无待办任务"
- 离线: 显示本地缓存数据

### 5.2.3 APP铁塔信息检测页 /pages/inspect/tower
**页面路由: **/pages/inspect/tower | 页面栈
**页面布局: **表单页布局。顶部返回按钮+步骤标题。内容区分为照片区域和参数录入区域。底部固定下一步按钮。
**组件清单:**
- PHOTO_GRID [Grid] 照片网格，默认显示3个占位图，点击可添加/查看照片
- ADD_PHOTO [Button] 添加照片按钮，调用相机或相册
- TOWER_TYPE [Picker] 铁塔类型选择器，从基础配置库加载
- TOWER_HEIGHT [InputNumber] 塔高，单位米，保留1位小数
- SEGMENT_COUNT [InputNumber] 塔段数量，整数，决定后续塔段检测表单数量
- NEXT_BTN [Button.Primary] 下一步按钮
**交互逻辑:**
- ADD_PHOTO调用uni.chooseImage，最多8张，选择后压缩上传
- TOWER_TYPE选择后自动显示/隐藏单管塔专属字段
- SEGMENT_COUNT输入后实时校验为正整数
- NEXT_BTN校验通过（必填项+照片>=3张）后保存并跳转下一步
**表单校验:**
- TOWER_TYPE: 必选
- TOWER_HEIGHT: 必填，>0
- SEGMENT_COUNT: 必填，整数，>0
- 照片: 至少3张，错误提示"请至少拍摄3张照片（整体/上部/基础）"
**按钮权限:**
- NEXT_BTN: 检测人员可见，校验通过后启用
**数据流向:**
- API: GET /api/app/towers/:id
- API: GET /api/app/config/tower-types
- 本地存储: SQLite
**数据输入:**
- 任务ID
- 铁塔基础数据
- 用户输入的检测参数
**数据输出:**
- 检测数据对象（存入SQLite）
- 塔段数量（决定后续步骤）
**功能逻辑:**
- 页面加载时获取铁塔基础信息和模板配置
- 照片拍摄后自动压缩（最长边1024px），本地存储原图，上传压缩图
- 塔型选择后动态调整后续检测步骤（不同塔型检测项不同）
- 所有数据实时存入本地SQLite，防止意外丢失
- 网络可用时自动上传已拍照片，离线时标记为待同步
**边界情况:**
- 空状态: 表单为空，照片区为3个占位图
- 离线: 显示"离线模式"标签

### 5.2.4 APP数据同步页 /pages/sync/index
**页面路由: **/pages/sync/index | 页面栈
**页面布局: **进度页面布局。显示待同步数据列表、同步进度条、操作按钮。
**组件清单:**
- SYNC_LIST [List] 待同步检测任务列表，显示任务名称+数据量
- PROGRESS_BAR [Progress] 同步进度条
- SYNC_BTN [Button.Primary] 一键同步按钮
- NETWORK_STATUS [Tag] 网络状态标签：在线/离线
**交互逻辑:**
- 页面加载检查本地待同步数据
- SYNC_BTN点击时逐个上传检测任务数据，更新进度条
- 同步完成后显示"同步成功"，并清空待同步列表
- 离线状态下SYNC_BTN禁用，显示"等待网络连接"
**按钮权限:**
- SYNC_BTN: 检测人员可见，有待同步数据且在线时启用
**数据流向:**
- 本地读取: SQLite待同步数据
- API: POST /api/app/sync {taskData, images}
- 输出: 同步结果
**数据输入:**
- 本地SQLite中待同步的数据记录
- 待上传的图片文件列表
**数据输出:**
- 同步结果（成功/失败的记录明细）
- 更新后的本地数据状态
**功能逻辑:**
- 页面加载时扫描本地SQLite中标记为"待同步"的记录
- 同步过程采用分批次上传，每批最多5条任务+对应图片
- 图片上传支持断点续传，大文件分片传输
- 同步时进行冲突检测：如果PC端已修改同一任务，提示用户选择保留哪方数据
- 同步成功后更新本地记录状态为"已同步"，并发送通知给合同部
- 同步失败保留本地数据，显示失败原因，支持重试
**边界情况:**
- 空状态: 显示"暂无待同步数据"
- 离线: 显示"离线模式"
- 同步中: 进度条动画

# 六、数据字典
本章节定义系统中所有核心数据实体的字段、类型、约束与关联关系，为数据库设计与API接口开发提供基础。

## 6.1 基础数据实体
### 6.1.1 客户档案 (t_customer)
存储委托检测单位的基础信息，用于报告封面自动填充。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键、自增 | 唯一标识 |
| customer_code | VARCHAR | 50 | Y | 唯一 | 客户编号 |
| customer_name | VARCHAR | 200 | Y |  | 单位名称，与报告封面一致 |
| customer_short | VARCHAR | 100 | N |  | 单位简称 |
| customer_type | VARCHAR | 50 | N | 枚举：运营商/集团/政府/企业 |  |
| contact_name | VARCHAR | 100 | N |  | 联系人 |
| contact_phone | VARCHAR | 50 | N |  | 联系电话 |
| address | VARCHAR | 500 | N |  | 地址 |
| logo_url | VARCHAR | 500 | N |  | 单位LOGO图片URL |
| status | TINYINT | 1 | Y | 默认1 | 0停用 1启用 |
| create_time | DATETIME |  | Y |  | 创建时间 |
| update_time | DATETIME |  | Y |  | 更新时间 |


### 6.1.2 工程档案 (t_project)
存储检测工程项目信息，必须关联客户。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键、自增 |  |
| project_code | VARCHAR | 50 | Y | 唯一 | 工程编号 |
| project_name | VARCHAR | 200 | Y |  | 工程名称 |
| customer_id | BIGINT | 20 | Y | 外键→t_customer | 所属客户 |
| location | VARCHAR | 500 | N |  | 地点 |
| contract_amount | DECIMAL | 18,2 | N |  | 合同金额（元） |
| longitude | DECIMAL | 10,6 | N |  | 经度 |
| latitude | DECIMAL | 10,6 | N |  | 纬度 |
| status | TINYINT | 1 | Y |  | 0停用 1启用 |
| create_time | DATETIME |  | Y |  |  |
| update_time | DATETIME |  | Y |  |  |


### 6.1.3 铁塔档案 (t_tower)
存储铁塔基础信息，包括站点、铁塔、工程、客户关联。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键 |  |
| tower_code | VARCHAR | 50 | Y | 唯一 | 铁塔编号 |
| tower_name | VARCHAR | 200 | Y |  | 铁塔名称 |
| tower_type | VARCHAR | 50 | Y |  | 塔型：单管/角钢/格构/三管/四管 |
| project_id | BIGINT | 20 | Y | 外键→t_project |  |
| site_id | BIGINT | 20 | Y | 外键→t_site | 站点 |
| tower_height | DECIMAL | 10,2 | N |  | 塔高（m） |
| segment_count | INT |  | N |  | 塔段数量 |
| address | VARCHAR | 500 | N |  | 地址 |
| longitude | DECIMAL | 10,6 | N |  |  |
| latitude | DECIMAL | 10,6 | N |  |  |
| status | TINYINT | 1 | Y |  |  |
| create_time | DATETIME |  | Y |  |  |


### 6.1.4 仪器设备档案 (t_device)
存储检测仪器设备信息，含出入库状态。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键 |  |
| device_code | VARCHAR | 100 | Y | 唯一 | 自动生成：SB+类别+年月+流水号 |
| device_name | VARCHAR | 200 | Y |  | 设备名称 |
| device_category | VARCHAR | 50 | Y |  | 类别：金属材料实验仪器/大取样器/测量仪器 |
| specification | VARCHAR | 200 | N |  | 规格型号 |
| manufacturer | VARCHAR | 200 | N |  | 生产厂家 |
| supplier_id | BIGINT | 20 | N | 外键→t_supplier | 供应商 |
| purchase_date | DATE |  | N |  | 购置日期 |
| price | DECIMAL | 18,2 | N |  | 价格（元） |
| status | TINYINT | 1 | Y |  | 0闲置 1借出 2待归还 3维修中 4报废 |
| borrower_id | BIGINT | 20 | N |  | 当前借用人 |
| calibration_valid | DATE |  | N |  | 校准有效期 |
| create_time | DATETIME |  | Y |  |  |


### 6.1.5 人员档案 (t_user)
存储系统用户信息，支持多角色权限。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键 |  |
| username | VARCHAR | 50 | Y | 唯一 | 登录账号 |
| real_name | VARCHAR | 100 | Y |  | 真实姓名 |
| password_hash | VARCHAR | 256 | Y |  | 密码哈希（bcrypt） |
| dept | VARCHAR | 100 | N |  | 部门 |
| position | VARCHAR | 100 | N |  | 岗位 |
| phone | VARCHAR | 50 | N |  | 手机号 |
| email | VARCHAR | 100 | N |  | 邮箱 |
| signature_url | VARCHAR | 500 | N |  | 电子签名图片URL |
| role_id | BIGINT | 20 | Y | 外键→t_role | 角色 |
| status | TINYINT | 1 | Y |  | 0停用 1启用 2锁定 |
| last_login | DATETIME |  | N |  |  |
| create_time | DATETIME |  | Y |  |  |


### 6.1.6 任务模板配置 (t_task_template)
【新增】存储铁塔检测任务模板，按塔型+检测类型配置检测项清单。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键 |  |
| template_code | VARCHAR | 50 | Y | 唯一 | 模板编号 |
| template_name | VARCHAR | 200 | Y |  | 模板名称 |
| tower_type | VARCHAR | 50 | Y |  | 适用塔型 |
| detect_type | VARCHAR | 50 | Y |  | 适用检测类型 |
| version | VARCHAR | 10 | Y |  | 版本号，如V1.0 |
| status | TINYINT | 1 | Y |  | 0草稿 1已发布 2已停用 |
| items_json | LONGTEXT |  | Y |  | 检测项配置JSON |
| create_by | BIGINT | 20 | Y |  | 创建人 |
| create_time | DATETIME |  | Y |  |  |
| update_time | DATETIME |  | Y |  |  |


### 6.1.7 报告模板配置 (t_report_template)
【新增】存储检测报告模板，按塔型+报告类型配置报告结构和样式。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键 |  |
| template_code | VARCHAR | 50 | Y | 唯一 | 模板编号 |
| template_name | VARCHAR | 200 | Y |  | 模板名称 |
| tower_type | VARCHAR | 50 | Y |  | 适用塔型 |
| report_type | VARCHAR | 50 | Y |  | 报告类型 |
| version | VARCHAR | 10 | Y |  | 版本号 |
| status | TINYINT | 1 | Y |  | 0草稿 1已发布 2已停用 |
| chapters_json | LONGTEXT |  | Y |  | 章节结构JSON |
| style_json | LONGTEXT |  | N |  | 样式配置JSON |
| create_by | BIGINT | 20 | Y |  |  |
| create_time | DATETIME |  | Y |  |  |


## 6.2 业务数据实体
### 6.2.1 检测任务 (t_task)
核心业务实体，记录检测流程的全生命周期状态。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键 |  |
| task_code | VARCHAR | 50 | Y | 唯一 | 任务编号 |
| task_name | VARCHAR | 200 | Y |  |  |
| order_id | BIGINT | 20 | Y | 外键→t_order | 关联订单 |
| tower_id | BIGINT | 20 | Y | 外键→t_tower | 关联铁塔 |
| inspector_id | BIGINT | 20 | N |  | 检测人员 |
| status | TINYINT | 1 | Y |  | 0待执行 1执行中 2待审核 3审核通过 4已编制 5已审批 6已打印 |
| dispatch_date | DATE |  | N |  | 派单日期 |
| plan_date | DATE |  | N |  | 计划完成日期 |
| actual_date | DATE |  | N |  | 实际完成日期 |
| data_locked | TINYINT | 1 | Y |  | 0未锁定 1已锁定 |
| template_id | BIGINT | 20 | N | 外键→t_task_template | 【新增】使用的任务模板 |
| create_time | DATETIME |  | Y |  |  |


### 6.2.2 检测数据 (t_detect_data)
存储现场检测采集的原始数据，包括各检测项的测量值。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键 |  |
| task_id | BIGINT | 20 | Y |  | 关联任务 |
| segment_no | INT |  | N |  | 塔段序号 |
| detect_item | VARCHAR | 100 | Y |  | 检测项目 |
| detect_value | VARCHAR | 200 | Y |  | 测量值 |
| unit | VARCHAR | 20 | N |  | 单位 |
| qualified | TINYINT | 1 | N |  | 0不合格 1合格 |
| remark | VARCHAR | 500 | N |  | 备注 |
| photo_urls | TEXT |  | N |  | 照片URL数组，JSON格式 |
| create_time | DATETIME |  | Y |  |  |


### 6.2.3 检测报告 (t_report)
存储报告生成与审批状态。

| 字段名 | 字段类型 | 长度 | 是否必填 | 约束规则 | 备注 |
| --- | --- | --- | --- | --- | --- |
| id | BIGINT | 20 | Y | 主键 |  |
| report_code | VARCHAR | 50 | Y | 唯一 | 报告编号 |
| task_id | BIGINT | 20 | Y |  | 关联任务 |
| report_type | VARCHAR | 50 | Y |  | 角钢塔/格构塔/法兰式单管/插接式单管 |
| content_json | LONGTEXT |  | Y |  | 报告内容JSON |
| status | TINYINT | 1 | Y |  | 0草稿 1待审核 2审核通过 3待签发 4已审批 5已打印 |
| drafter_id | BIGINT | 20 | Y |  | 编制人 |
| auditor_id | BIGINT | 20 | N |  | 审核人 |
| approver_id | BIGINT | 20 | N |  | 签发人 |
| audit_opinion | VARCHAR | 500 | N |  | 审核意见 |
| approve_opinion | VARCHAR | 500 | N |  | 签发意见 |
| pdf_url | VARCHAR | 500 | N |  | 生成的PDF文件URL |
| template_id | BIGINT | 20 | N | 外键→t_report_template | 【新增】使用的报告模板 |
| create_time | DATETIME |  | Y |  |  |


## 6.3 枚举值定义
系统中使用的关键枚举值定义，确保数据一致性。

| 枚举名称 | 枚举值 | 说明 |
| --- | --- | --- |
| 订单状态 | 0待派单 1已派单 2已完成 | 订单生命周期 |
| 任务状态 | 0待执行 1执行中 2待审核 3审核通过 4已编制 5已审批 6已打印 | 检测任务流转 |
| 报告状态 | 0草稿 1待审核 2审核通过 3待签发 4已审批 5已打印 | 报告审批流转 |
| 设备状态 | 0闲置 1借出 2待归还 3维修中 4报废 | 设备资产流转 |
| 用户状态 | 0停用 1启用 2锁定 | 账号管理 |
| 检测类型 | 1安全性鉴定 2可靠性鉴定 3抗震鉴定 | 检测属性 |
| 塔型 | 1单管塔 2角钢塔 3格构塔 4三管塔 5四管塔 | 铁塔分类 |
| 检测结论 | 0不合格 1合格 | 检测结果 |
| 打印用途 | 1客户交付 2档案归档 3其他 | 打印申请 |
| 模板状态 | 0草稿 1已发布 2已停用 | 【新增】模板生命周期 |


# 七、非功能需求
## 7.1 性能需求
系统应满足以下性能指标：

| 指标项 | 要求值 | 说明 |
| --- | --- | --- |
| 页面加载时间 | <2s | 首屏加载时间，含资源下载 |
| 列表查询响应 | <1s | 单表查询、20条/页 |
| 报告生成 | <5s | 标准报告自动生成时间 |
| 同时在线用户 | >=500人 | PC端系统支持 |
| 数据库连接池 | >=50连接 | MySQL连接池配置 |
| APP离线存储 | >=1000条记录 | SQLite本地存储容量 |
| 文件上传 | <10s/10MB | 图片/报告上传 |
| 大数据量导出 | <30s/10万条 | Excel导出 |
| 驾驶舱刷新 | <3s | 全屏看板数据加载 |


## 7.2 安全需求
**安全需求覆盖传输、认证、授权、审计四个维度：**
传输安全：全系统采用HTTPS协议，TLS 1.2+，禁用HTTP明文传输。API接口统一返回JSON格式，禁止在URL中传输敏感信息。
认证安全：采用JWT Token机制，Access Token有效期2小时，Refresh Token有效期7天。密码存储采用bcrypt哈希（成本因子10+），禁止明文存储。支持多因素认证（仅对管理员开放）。
授权安全：角色-菜单-按钮三级权限模型，后端API每个接口均需校验权限，禁止前端仅依赖隐藏按钮的方式控制权限。数据权限支持全部/本部门/本人三级控制。
审计安全：所有数据操作（增删改查）均记录操作日志，包含操作人、时间、IP、操作类型、变更前后数据。日志保留180天，不可删除。

## 7.3 兼容性需求

| 端口 | 兼容范围 | 备注 |
| --- | --- | --- |
| PC端浏览器 | Chrome 90+ / Firefox 88+ / Edge 90+ / Safari 14+ | 不支持IE |
| PC端分辨率 | 1366x768 ~ 1920x1080 | 自适应布局 |
| APP端H5 | iOS 12+ / Android 8+ | uni-app兼容 |
| APP端小程序 | 微信/支付宝/字节 | 同源开发 |
| 打印 | 支持PDF打印与预览 | A4横竖版均支持 |


## 7.4 可靠性需求
系统可用性要求达到99.5%（年停机时间<43.8小时）。
数据备份：数据库采用主从复制+每日全量备份+实时增量备份。备份数据保存至异地存储。
容灾恢复：支持分钟级精度的数据恢复，RPO<5分钟，RTO<30分钟。
异常处理：系统具备全局异常捕获与监控，错误响应统一为 {code, message, data} 格式，不暴露内部堆栈信息。
降级策略：当核心服务不可用时，系统提供降级模式，保证基础查询和数据录入功能可用。

## 7.5 离线需求
**APP端必须支持离线作业，核心要求如下：**
1. 离线采集：无网络时所有检测数据存入本地SQLite，照片存入本地文件系统，支持断点续传。
2. 离线校验：表单校验逻辑在本地执行，不依赖网络。
3. 自动同步：检测到网络恢复时自动提示同步，支持一键上传所有积压数据。
4. 强制同步：提交检测数据前必须检查网络状态，在线后方可提交。
5. 离线查看：已下载的任务信息支持离线查看，包括铁塔基础信息、检测项目模板、天线数据等。
6. 数据一致性：同步时采用事务机制，确保本地与服务端数据一致。同步失败时保留本地数据，支持重试。

## 7.6 模板配置需求
**【新增】铁塔任务模板和检测报告模板的配置需求：**
**任务模板配置：**
- 支持按塔型+检测类型创建检测任务模板，模板包含检测项清单和字段配置
- 检测项支持层级结构（父项-子项），支持排序和嵌套
- 字段类型支持：文本、数字、单选、多选、日期、图片、坐标
- 每个字段可配置：是否必填、默认值、校验规则（最小值/最大值/正则/自定义）
- 模板采用"草稿-发布"机制，发布后锁定，修改需创建新版本
- 版本历史可追溯，支持查看和对比不同版本的差异
- 模板停用后不影响已使用该模板的历史任务
**报告模板配置：**
- 支持按塔型+报告类型创建报告模板，模板包含章节结构和内容模板
- 章节支持层级结构和条件显示（根据检测结论显示不同章节）
- 内容模板使用占位符语法 {{fieldName}}，报告生成时自动替换
- 样式配置独立管理：页眉、页脚、水印、签章位置、字体、字号
- 模板发布后立即生效，生成报告时自动匹配最新发布的模板
- 支持模板预览功能，发布前可查看实际效果
<center>浙江中能工程检测有限公司</center>
<center>内部文件 · 机密</center>