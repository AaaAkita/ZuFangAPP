# Demo 页面整合规范

## Why
将 `f:\software\ZuFangAPP\demo` 目录下的 Demo 页面整合到 UniApp 项目中，确保页面布局、交互效果、视觉样式与 Demo 保持一致，同时保持项目现有技术栈不变。

## What Changes
- 整合登录页面 (`warm_welcome_login`) 到 `pages/login/index.vue`
- 整合小区详情页面 (`community_detail_insights_1/2`) 到 `pages/community-detail/index.vue`
- 整合搜索结果页面 (`property_search_results_1/2`) 到 `pages/search/index.vue`
- 更新 `pages.json` 添加新页面路由
- 创建公共组件（筛选弹窗、地图选择弹窗）

## Impact
- Affected specs: 前端页面结构
- Affected code: `frontend_uniapp/src/pages/` 目录

## ADDED Requirements

### Requirement: 登录页面整合
系统应提供温馨风格的登录页面，包含以下功能：

#### Scenario: 登录页面展示
- **WHEN** 用户访问登录页面
- **THEN** 显示温馨的登录界面，包含：
  - 应用 Logo 和欢迎文字
  - 手机号/邮箱输入框
  - 密码输入框（带显示/隐藏切换）
  - 忘记密码链接
  - 登录按钮
  - 第三方登录选项（微信、Apple、更多）
  - 注册链接

### Requirement: 小区详情页面整合
系统应提供小区详情页面，包含以下功能：

#### Scenario: 小区详情展示
- **WHEN** 用户查看小区详情
- **THEN** 显示小区详情信息，包含：
  - 顶部图片轮播区域
  - 小区名称、位置、评分
  - 小区标签（允许宠物、近地铁等）
  - 核心指标（安全性、安静度、性价比）圆环进度
  - 小区简介
  - 住户评价列表
  - 发布评价浮动按钮
  - 底部导航栏

#### Scenario: 地图导航选择
- **WHEN** 用户点击导航按钮
- **THEN** 显示底部弹窗，包含：
  - 高德地图、百度地图、腾讯地图选项
  - 取消按钮

### Requirement: 搜索结果页面整合
系统应提供房源搜索结果页面，包含以下功能：

#### Scenario: 搜索结果展示
- **WHEN** 用户进行房源搜索
- **THEN** 显示搜索结果页面，包含：
  - 搜索栏（带筛选按钮）
  - 快捷筛选标签（全部、近地铁、租金低等）
  - 房源卡片列表（图片、标题、位置、评分、价格）
  - 地图查看浮动按钮
  - 底部导航栏

#### Scenario: 筛选弹窗展示
- **WHEN** 用户点击筛选按钮
- **THEN** 显示筛选弹窗，包含：
  - 区域选择（左侧区域列表、右侧街道列表）
  - 地铁线选择
  - 租金范围滑块
  - 评分要求选择
  - 重置和查看房源按钮

## MODIFIED Requirements

### Requirement: 页面路由配置
更新 `pages.json` 添加以下新页面路由：
- `pages/community-detail/index` - 小区详情页
- `pages/search/index` - 搜索结果页

## REMOVED Requirements
无移除的需求。

## 技术约束
1. 必须使用 UniApp + Vue 3 + TypeScript 技术栈
2. 样式使用 rpx 单位进行响应式设计
3. 图标使用 Material Symbols Outlined
4. 不得引入新的 UI 框架或工具库
5. 保持与现有项目代码风格一致
