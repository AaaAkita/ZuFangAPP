# ZuFangAPP 前端微信小程序适配审查报告

审查时间：2026-03-26  
审查范围：`frontend_uniapp/src`、`frontend_uniapp/package.json`、`frontend_uniapp/tsconfig.json`、`frontend_uniapp/dist/build/mp-weixin`

## 结论

当前前端更接近“可演示原型”，距离“可稳定上线微信小程序”仍有明显差距。  
建议先完成 `P0/P1` 项后再进入提审阶段，否则会有较高概率出现包体或运行时问题。

## 核心发现（按优先级）

## P0（上线阻断）

1. 主包体积严重风险（疑似超主包约束）
- 证据：
`src/App.vue:26-32` 引入本地图标字体 `MaterialSymbolsOutlined.woff2`。
`src/static/fonts/MaterialSymbolsOutlined.woff2` 文件大小为 `3,879,868 bytes`（约 3.70MB）。
`dist/build/mp-weixin` 总体积约 `3.88MB`，且未做分包。
- 影响：
若按微信小程序常见主包约束（2MB）执行，将直接影响上传/审核；即使可上传，也会明显拉长冷启动时间。
- 建议：
移除该大字体，改为 SVG/Icon 组件按需方案；同时在 `pages.json` 进行分包，确保主包只保留首屏必需页面。

2. 页面路由存在死链
- 证据：
`src/pages/community-detail/index.vue:177` 跳转 `/pages/reviews/index`。
`src/pages/community-detail/index.vue:366` 跳转 `/pages/review-publish/index`。
这两个页面未在 `src/pages.json` 注册。
- 影响：
用户点击后会报路由不存在，直接造成核心流程中断。
- 建议：
补充页面并注册，或临时关闭入口并给出可用替代路径。

3. 网络层不统一，`fetch` 在小程序端兼容与可管控性不足
- 证据：
`src/pages/login/index.vue`、`src/pages/register/index.vue`、`src/utils/auth.ts`、`src/utils/wechat.ts` 共 7 处直接 `fetch(...)`。
同时 `src/utils/request.ts` 存在但未被接入。
- 影响：
鉴权、超时、重试、错误映射无法统一；平台差异处理成本高。
- 建议：
统一改成 `uni.request` 封装（或单一请求 SDK），集中处理 token 注入、401 刷新、错误码映射与日志。

4. 鉴权状态实现存在一致性缺陷
- 证据：
`src/utils/auth.ts:31` 使用 `JSON.parse(userInfoStr)` 读取用户信息。
`src/utils/auth.ts:59` 写入时直接 `setStorageSync(..., userInfo)`（对象）。
`src/utils/auth.ts:102-109` 返回的是快照值（非响应式 getter），`isLoggedIn` 在 `:104` 为一次性计算值。
- 影响：
重启后用户信息可能解析失败；多页面状态同步容易出现“UI 与真实登录态不一致”。
- 建议：
统一序列化策略（写入/读取一致），并将 `token/userInfo/isLoggedIn` 改为 `ref/computed` 或 getter 读取。

## P1（高优先级优化）

5. `type-check` 当前不通过
- 证据：执行 `npm run type-check` 报错，包括：
`src/config/index.ts` 缺 `process` 类型；
多个 `*.test.ts` 缺 `vitest`/`@testing-library/vue`；
`src/pages/profile/index.vue:104` 访问 `createdAt` 但 `UserInfo` 未定义该字段。
- 影响：
CI 难以建立稳定质量门禁，回归风险高。
- 建议：
补齐类型依赖与测试依赖，或调整 `tsconfig` 排除测试文件；同步修正 `UserInfo` 类型定义。

6. 页面配置文本存在乱码
- 证据：
`src/pages.json:42,48,66,78,82,86,90` 等文本为乱码（如 `"鍏充簬鎴戜滑"`）。
- 影响：
导航栏标题、Tab 文案在端上展示异常，影响可用性与审核观感。
- 建议：
统一文件编码为 UTF-8 并修复文案。

7. 远程图片来源不适配国内小程序上线场景
- 证据：
`src/pages` 下共 14 处 `https://lh3.googleusercontent.com/...` 图片。
- 影响：
域名白名单、可达性、加载稳定性均存在风险。
- 建议：
迁移至自有 CDN（HTTPS + 合法域名配置），并补充本地兜底图与加载失败处理。

8. 小程序 AppID 配置不完整
- 证据：
`src/manifest.json:53` 的 `mp-weixin.appid` 为空；
`dist/build/mp-weixin/project.config.json:16` 为 `touristappid`。
- 影响：
真机联调、授权链路、提审一致性都会受影响。
- 建议：
明确“开发/测试/生产”配置注入方式，构建时自动写入目标环境 AppID。

## P2（建议优化）

9. 页面完成度不足
- 证据：
`about`、`safety`、`community`、`message` 仍为“建设中/空态”。
- 影响：
若这些入口面向真实用户，会影响完整体验。
- 建议：
在提审前至少补齐最小可用流程，或隐藏未完成入口。

10. 鉴权过期逻辑未实现
- 证据：
`src/utils/auth.ts:94-98` 的 `isTokenExpired()` 固定返回 `false`。
- 影响：
过期 token 无法自动处理，容易出现请求失败后状态混乱。
- 建议：
接入 JWT 过期时间判断或后端刷新策略。

11. 部分样式特性兼容性需回归验证
- 证据：
多处使用 `backdrop-filter`、`:focus-within`、`aspect-ratio`。
- 影响：
低版本基础库或部分机型可能降级显示。
- 建议：
补一轮真机兼容清单（iOS/Android + 不同基础库）并加降级样式。

## 建议的落地顺序

1. 先修阻断项：包体、路由、网络层统一、鉴权状态一致性。
2. 再修工程项：`type-check` 全绿、编码/文案、AppID 注入、资源域名治理。
3. 最后补体验项：空页面可用化、低版本样式回归、埋点与错误监控。

## 上线前验收清单（建议）

1. `npm run type-check` 无报错。
2. 自动脚本校验“代码中引用路由”全部在 `pages.json` 注册。
3. 小程序端 API 请求统一走同一个请求封装。
4. 主包体积压到目标阈值内（建议 <= 2MB），总包体可控。
5. 外链图片与接口域名全部完成微信后台合法域名配置。
6. 关键页面（首页、搜索、详情、登录、注册、个人中心）真机走通。

