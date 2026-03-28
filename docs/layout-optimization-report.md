# 小程序布局分析报告

## 1. 当前风险
- 小区详情、社区榜单等页面缺少统一的内边距/盒模型约束，导致卡片（核心指标、评价、排行榜）在窄屏设备下被撑出屏幕。
- 底部浮动按钮没有为内容区留出安全距离，住户评价区域被遮挡且横向滚动条出现。
- 局部卡片（核心指标环、排行卡、评价气泡）强依赖固定尺寸，内容过长时会撑破布局。

## 2. 优化办法
- 在 `App.vue` 中添加全局 `--page-gutter`、`page-shell` 等变量和 `border-box` 重置，与 `overflow-x: hidden` 共同构建统一版心。
- 将首页、社区榜单与社区详情的主要容器切换到 `page-shell`/`page-shell-wide`，将 padding 精度控制在 `$page-gutter`；卡片级样式也增加 `min-width: 0` 等换行保护。
- 社区详情的 `scroll-view`、核心指标卡片、评价气泡、`view-all` 链接等都使用 `box-sizing: border-box` 和可收缩尺寸，环形图从 `144` 缩到 `120`，底部 `fab` 按钮由 `padding` + safe-area 保护内容。

## 3. 后续建议
- 继续在其他页面铺开 `page-shell` 容器，防止未来单页自行写死 `padding`。
- 考虑把 `rank-card`/`review-item` 等公共组件抽象成可复用的 card 组件，便于统一圆角、阴影和 spacing。

