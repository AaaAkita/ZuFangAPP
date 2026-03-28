# 租房避雷 APP - 前端项目结构说明

本文档详细说明 `frontend_uniapp` 项目中除 `dist` 和依赖文件之外的所有文件及文件夹的作用。

---

## 📁 根目录文件

### 配置文件

| 文件 | 作用 |
|------|------|
| `package.json` | 项目依赖管理、脚本命令定义（构建、开发、测试等） |
| `tsconfig.json` | TypeScript 编译配置，定义类型检查规则和路径别名 `@/*` |
| `vite.config.ts` | Vite 构建工具配置，使用 uni-app 官方插件 |
| `.npmrc` | npm 配置，可设置镜像源等 |
| `.gitignore` | Git 版本控制忽略规则 |
| `.editorconfig` | 编辑器代码风格统一配置（缩进、换行等） |
| `index.html` | H5 模式的入口 HTML 文件 |
| `nginx.conf` | Nginx 服务器配置，用于生产环境部署 |
| `shims-uni.d.ts` | uni-app 类型声明补充文件 |

---

## 📁 src/ 源代码目录

### 1. 入口文件

| 文件 | 作用 |
|------|------|
| `main.ts` | 应用入口，创建 Vue SSR 应用实例 |
| `App.vue` | 根组件，定义全局样式、CSS 变量、生命周期钩子 |
| `manifest.json` | 应用配置文件（AppID、版本、各平台特有配置） |
| `pages.json` | 页面路由配置、导航栏样式、TabBar 配置 |
| `uni.scss` | uni-app 全局 SCSS 变量（可被所有页面引用） |
| `env.d.ts` | 环境变量类型声明 |
| `shime-uni.d.ts` | uni-app API 类型声明补充 |

#### manifest.json 关键配置说明
- `mp-weixin`: 微信小程序配置（AppID: `wxda87a0acd673adaa`）
- `app-plus`: App 打包配置（Android/iOS 权限等）
- `versionName`: 应用版本号

#### pages.json 关键配置说明
- `pages`: 页面路由列表（12 个页面）
- `globalStyle`: 全局导航栏样式
- `tabBar`: 底部导航栏配置（首页、社区、消息、我的）

---

### 2. pages/ 页面目录

存放所有页面组件，每个页面一个文件夹：

| 文件夹 | 页面功能 | 说明 |
|--------|----------|------|
| `index/` | 首页 | 展示推荐小区、优质榜单、风险榜单 |
| `community/` | 社区列表 | 小区搜索和筛选列表 |
| `community-detail/` | 小区详情 | 展示小区详细信息、评价列表、核心指标 |
| `search/` | 搜索页 | 小区搜索功能 |
| `message/` | 消息页 | 用户消息通知 |
| `profile/` | 个人中心 | 用户信息、设置等 |
| `login/` | 登录页 | 用户登录（含测试文件 `login.test.ts`） |
| `register/` | 注册页 | 用户注册（含测试文件 `register.test.ts`） |
| `reviews/` | 评价列表 | 查看所有评价 |
| `review-publish/` | 发布评价 | 用户发布小区评价 |
| `safety/` | 安全指南 | 租房安全知识 |
| `about/` | 关于页面 | 应用关于信息 |

**页面文件规范**：
- `index.vue` - 页面主组件
- `*.test.ts` - 单元测试文件（如有）

---

### 3. components/ 组件目录

#### components/ui/ - UI 组件库

| 组件 | 作用 |
|------|------|
| `Button.vue` | 通用按钮组件 |
| `Card.vue` | 卡片容器组件 |
| `Icon.vue` | 图标组件（支持 Material Symbols） |
| `ListItem.vue` | 列表项组件 |
| `GlobalBack.vue` | 全局返回按钮组件 |

---

### 4. utils/ 工具函数目录

| 文件 | 作用 |
|------|------|
| `auth.ts` | 用户认证状态管理（Pinia Store）、Token 处理 |
| `auth-helpers.ts` | 认证相关辅助函数 |
| `request.ts` | HTTP 请求封装（基于 uni.request） |
| `wechat.ts` | 微信小程序特有功能（登录、分享、版本检查等） |
| `auth.test.ts` | auth 模块单元测试 |
| `wechat.test.ts` | wechat 模块单元测试 |

#### 核心工具说明

**auth.ts**
- 管理用户登录状态
- Token 存储与读取
- 用户信息管理

**request.ts**
- 统一封装 HTTP 请求
- 自动添加 Token
- 错误处理与超时控制

**wechat.ts**
- `wechatLogin()`: 微信一键登录
- `refreshWechatToken()`: Token 刷新
- `shareToWechat()`: 分享功能
- `checkWechatVersion()`: 版本检查

---

### 5. data/ 数据目录

| 文件 | 作用 |
|------|------|
| `communities.ts` | 小区数据定义（类型接口 + 模拟数据） |

#### communities.ts 内容
- `CommunityItem` 接口：小区数据类型定义
- `CommunityReview` 接口：评价数据类型
- `communities` 数组：5 个模拟小区数据
- `getCommunityById()`: 根据 ID 获取小区
- `getFeaturedCommunities()`: 获取推荐小区
- `getQualityRanking()`: 获取优质榜单
- `getRiskRanking()`: 获取风险榜单

---

### 6. config/ 配置目录

| 文件 | 作用 |
|------|------|
| `index.ts` | 应用配置文件（API 地址、超时时间、存储键名等） |

#### 配置项
- `apiBaseUrl`: API 基础地址（开发/生产环境不同）
- `requestTimeout`: 请求超时时间（10秒）
- `storageKeys`: 本地存储键名定义

---

### 7. styles/ 样式目录

| 文件 | 作用 |
|------|------|
| `variables.scss` | SCSS 变量定义（颜色、尺寸等） |
| `mixins.scss` | SCSS 混入（复用样式片段） |

---

### 8. static/ 静态资源目录

| 文件 | 作用 |
|------|------|
| `logo.png` | 应用 Logo |

---

## 📁 scripts/ 脚本目录

| 文件 | 作用 |
|------|------|
| `check-icon-regressions.js` | 图标回归检查脚本（防止图标意外变更） |

---

## 📁 static/ 根静态资源目录

| 文件夹 | 作用 |
|--------|------|
| `fonts/` | 字体文件目录 |
| `fonts/MaterialSymbolsOutlined.woff2` | Material Symbols 图标字体 |

---

## 🔄 构建流程说明

```
源代码 (src/)
    ↓
Vite 构建 (vite.config.ts)
    ↓
uni-app 编译器 (@dcloudio/vite-plugin-uni)
    ↓
输出到 dist/build/mp-weixin/ (微信小程序)
    ↓
微信开发者工具运行
```

### 常用命令

```bash
# 开发模式
npm run dev:mp-weixin      # 微信小程序开发
npm run dev:h5             # H5 开发

# 构建模式
npm run build:mp-weixin    # 构建微信小程序
npm run build:h5           # 构建 H5

# 其他
npm run type-check         # TypeScript 类型检查
npm run check:icons        # 检查图标回归
```

---

## 📝 开发规范

1. **页面开发**：在 `pages/` 下新建文件夹，添加 `index.vue`
2. **组件开发**：在 `components/ui/` 下添加 `.vue` 文件
3. **类型定义**：在 `data/` 或相关文件中定义 TypeScript 接口
4. **样式使用**：优先使用 `App.vue` 中定义的 CSS 变量
5. **API 请求**：使用 `utils/request.ts` 封装的请求方法
6. **状态管理**：使用 `utils/auth.ts` 中的 Pinia Store

---

## 🎯 项目特点

- **跨平台**：基于 uni-app，支持微信小程序、H5、App 多端
- **TypeScript**：全项目使用 TS，类型安全
- **组件化**：UI 组件抽离，便于复用
- **Mock 数据**：`communities.ts` 提供模拟数据，便于开发调试
- **测试覆盖**：关键模块包含单元测试（*.test.ts）
