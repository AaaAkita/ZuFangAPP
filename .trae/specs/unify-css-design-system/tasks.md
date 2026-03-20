# Tasks

## Phase 1: CSS变量系统设计
- [ ] Task 1.1: 创建全局CSS变量文件 `styles/variables.scss`
  - [ ] SubTask 1.1.1: 定义颜色系统变量（主色、辅助色、状态色、文字色、背景色、边框色）
  - [ ] SubTask 1.1.2: 定义字体系统变量（标题、正文、辅助、字重）
  - [ ] SubTask 1.1.3: 定义间距系统变量（xs、sm、md、lg、xl、xxl）
  - [ ] SubTask 1.1.4: 定义圆角和阴影变量

- [ ] Task 1.2: 创建SCSS mixins文件 `styles/mixins.scss`
  - [ ] SubTask 1.2.1: 定义flex布局mixins（flex-center、flex-between等）
  - [ ] SubTask 1.2.2: 定义文字截断mixins
  - [ ] SubTask 1.2.3: 定义响应式布局mixins

## Phase 2: 基础组件库开发
- [ ] Task 2.1: 创建Button按钮组件 `components/ui/Button.vue`
  - [ ] SubTask 2.1.1: 实现type属性（primary、secondary、text）
  - [ ] SubTask 2.1.2: 实现size属性（large、medium、small）
  - [ ] SubTask 2.1.3: 实现disabled和loading状态
  - [ ] SubTask 2.1.4: 实现block块级按钮

- [ ] Task 2.2: 创建Card卡片组件 `components/ui/Card.vue`
  - [ ] SubTask 2.2.1: 实现默认插槽内容区域
  - [ ] SubTask 2.2.2: 实现footer插槽底部区域
  - [ ] SubTask 2.2.3: 应用统一的阴影和圆角样式

- [ ] Task 2.3: 创建ListItem列表项组件 `components/ui/ListItem.vue`
  - [ ] SubTask 2.3.1: 实现左侧图标插槽
  - [ ] SubTask 2.3.2: 实现标题和描述文本
  - [ ] SubTask 2.3.3: 实现右侧箭头显示
  - [ ] SubTask 2.3.4: 实现右侧操作区域插槽

- [ ] Task 2.4: 创建Icon图标组件 `components/ui/Icon.vue`
  - [ ] SubTask 2.4.1: 实现name属性指定图标
  - [ ] SubTask 2.4.2: 实现size和color属性

## Phase 3: 页面重构
- [ ] Task 3.1: 重构首页 `pages/index/index.vue`
  - [ ] SubTask 3.1.1: 引入CSS变量替换硬编码颜色
  - [ ] SubTask 3.1.2: 引入CSS变量替换硬编码字体大小
  - [ ] SubTask 3.1.3: 使用flex布局替换固定宽高
  - [ ] SubTask 3.1.4: 使用基础组件替换重复代码

- [ ] Task 3.2: 重构社区页 `pages/community/index.vue`
  - [ ] SubTask 3.2.1: 引入CSS变量替换硬编码样式
  - [ ] SubTask 3.2.2: 使用flex布局替换固定宽高
  - [ ] SubTask 3.2.3: 使用基础组件

- [ ] Task 3.3: 重构消息页 `pages/message/index.vue`
  - [ ] SubTask 3.3.1: 引入CSS变量替换硬编码样式
  - [ ] SubTask 3.3.2: 使用flex布局
  - [ ] SubTask 3.3.3: 使用基础组件

- [ ] Task 3.4: 重构个人中心 `pages/profile/index.vue`
  - [ ] SubTask 3.4.1: 引入CSS变量替换硬编码样式
  - [ ] SubTask 3.4.2: 使用flex布局
  - [ ] SubTask 3.4.3: 使用基础组件

- [ ] Task 3.5: 重构搜索页 `pages/search/index.vue`
  - [ ] SubTask 3.5.1: 引入CSS变量
  - [ ] SubTask 3.5.2: 使用flex布局
  - [ ] SubTask 3.5.3: 使用基础组件

- [ ] Task 3.6: 重构登录注册页 `pages/login/index.vue` 和 `pages/register/index.vue`
  - [ ] SubTask 3.6.1: 引入CSS变量
  - [ ] SubTask 3.6.2: 使用flex布局
  - [ ] SubTask 3.6.3: 使用基础组件

- [ ] Task 3.7: 重构社区详情页 `pages/community-detail/index.vue`
  - [ ] SubTask 3.7.1: 引入CSS变量
  - [ ] SubTask 3.7.2: 使用flex布局
  - [ ] SubTask 3.7.3: 使用基础组件

## Phase 4: 测试与验证
- [ ] Task 4.1: 功能测试
  - [ ] SubTask 4.1.1: 测试所有页面正常渲染
  - [ ] SubTask 4.1.2: 测试交互功能正常
  - [ ] SubTask 4.1.3: 测试响应式布局

- [ ] Task 4.2: 视觉回归测试
  - [ ] SubTask 4.2.1: 对比重构前后页面样式一致性
  - [ ] SubTask 4.2.2: 验证颜色、字体、间距符合设计规范

# Task Dependencies
- Phase 2 依赖 Phase 1（组件库依赖CSS变量）
- Phase 3 依赖 Phase 2（页面重构依赖基础组件）
- Phase 4 依赖 Phase 3（测试依赖重构完成）
- Phase 3 的各页面重构任务可以并行执行
