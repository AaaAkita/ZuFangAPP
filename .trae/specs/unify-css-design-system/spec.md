# 统一CSS设计系统 Spec

## Why
当前项目中的CSS样式分散在各页面，存在以下问题：
1. 字体大小、颜色值硬编码在各组件中，难以维护
2. 大量使用固定宽高（px/rpx），无法适配不同屏幕
3. 相同样式重复定义，没有统一的设计规范
4. 组件缺乏复用性，每个页面独立实现

## What Changes
- 创建全局CSS变量系统（颜色、字体、间距）
- 创建可复用的基础组件库
- 重构所有页面，使用权重分布和最小宽高替代固定值
- 统一字体和颜色使用规范

## Impact
- 受影响文件：所有 `.vue` 页面文件
- 新增文件：`styles/variables.scss`、`styles/mixins.scss`、`components/ui/` 组件库

## ADDED Requirements

### Requirement: CSS变量系统
设计系统 SHALL 提供统一的CSS变量。

#### Scenario: 颜色系统
- **GIVEN** 设计系统定义了颜色变量
- **THEN** 提供以下颜色级别：
  - 主色：`--color-primary`（品牌主色）
  - 辅助色：`--color-secondary`
  - 成功/警告/错误：`--color-success`/`--color-warning`/`--color-error`
  - 文字色：`--color-text-primary`/`--color-text-secondary`/`--color-text-tertiary`
  - 背景色：`--color-bg-primary`/`--color-bg-secondary`
  - 边框色：`--color-border`

#### Scenario: 字体系统
- **GIVEN** 设计系统定义了字体变量
- **THEN** 提供以下字体级别：
  - 标题：`--font-size-h1` (36rpx)、`--font-size-h2` (32rpx)、`--font-size-h3` (28rpx)
  - 正文：`--font-size-body` (28rpx)、`--font-size-body-sm` (26rpx)
  - 辅助：`--font-size-caption` (24rpx)、`--font-size-tiny` (22rpx)
  - 字重：`--font-weight-regular` (400)、`--font-weight-medium` (500)、`--font-weight-bold` (600)

#### Scenario: 间距系统
- **GIVEN** 设计系统定义了间距变量
- **THEN** 提供以下间距级别：
  - `--spacing-xs` (8rpx)、`--spacing-sm` (16rpx)、`--spacing-md` (24rpx)
  - `--spacing-lg` (32rpx)、`--spacing-xl` (48rpx)、`--spacing-xxl` (64rpx)

### Requirement: 基础组件库
设计系统 SHALL 提供可复用的基础组件。

#### Scenario: Button 组件
- **GIVEN** 按钮组件
- **THEN** 支持以下属性：
  - `type`: primary | secondary | text
  - `size`: large | medium | small
  - `disabled`: boolean
  - `loading`: boolean
  - `block`: boolean（块级按钮）

#### Scenario: Card 组件
- **GIVEN** 卡片组件
- **THEN** 支持默认插槽和底部插槽，有统一的阴影和圆角

#### Scenario: ListItem 组件
- **GIVEN** 列表项组件
- **THEN** 支持左侧图标、标题、描述、右侧箭头和操作区域

### Requirement: 响应式布局系统
设计系统 SHALL 使用权重分布替代固定宽高。

#### Scenario: 布局原则
- **GIVEN** 页面布局
- **THEN** 遵循以下规则：
  - 使用 `flex: 1` 或 `flex-grow` 分配剩余空间
  - 使用 `min-height` / `min-width` 替代固定宽高
  - 使用百分比 `%` 或 `vw/vh` 进行相对布局
  - 使用 `gap` 或 `padding` 控制间距，而非固定margin

#### Scenario: 适配规则
- **GIVEN** 不同尺寸屏幕
- **THEN** 使用 rpx 单位进行适配，确保在各设备上显示一致

### Requirement: 页面重构
所有页面 SHALL 使用新的设计系统。

#### Scenario: 样式迁移
- **GIVEN** 现有页面样式
- **THEN** 进行以下替换：
  - 硬编码颜色 → CSS 变量
  - 硬编码字体大小 → 字体变量
  - 固定宽高 → flex 布局 + min-height/min-width
  - 重复组件 → 引用基础组件库

## MODIFIED Requirements
无

## REMOVED Requirements
无
