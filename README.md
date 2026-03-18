# 🏠 ZuFangAPP - 租房避雷协作平台

> **「巴音布鲁克永远的王」专属租房利器**
>
> 旨在通过社区互助、真实评价与 OCR 合约验证，打破租房市场的信息不对称，帮助每一位打工人避开租房陷阱。

---

## 🌟 项目亮点

-   **真避雷**: 拒绝"水军"好评，核心逻辑围绕"避雷"设计，展示最真实的居住体验。
-   **硬核验证**: 计划集成 OCR 技术，验证租房合同真实性，确保评价来源可靠。
-   **极速响应**: 后端采用 NestJS + Redis 架构，保障高并发下的流畅搜索与交互。
-   **多端覆盖**: 基于 uni-app 实现一套代码多端运行，支持 H5、微信小程序、App 等多平台。
-   **精致设计**: 前端遵循现代审美，提供丝滑的多端交互体验。

---

## 🛠️ 技术底座

### 🟢 后端 (Backend) - 强健的感知层

-   **核心框架**: [NestJS (v11)](https://nestjs.com/) - 模块化、易扩展的 Node.js 架构
-   **数据持久化**: [Prisma](https://www.prisma.io/) + **PostgreSQL** - 强类型的 ORM 配合稳定的关系型数据库
-   **高速缓存**: [Redis](https://redis.io/) - 支撑验证码、热门搜索榜单及高频查询加速
-   **安全卫士**: [Passport.js](https://www.passportjs.org/) + **JWT** - 完善的策略模式身份验证
-   **实时检索**: **Elasticsearch** (骨架就绪) - 支撑全城千万级小区的秒级模糊搜索
-   **工程化**: 集成 Swagger UI、全局异常过滤、响应统一包装、自动 API 文档生成

### 🔵 前端 (Frontend) - 丝滑的交互层

-   **核心框架**: [uni-app (Vue 3)](https://uniapp.dcloud.net.cn/) - 一套代码，多端发布
-   **支持平台**:
    -   📱 H5 网页端
    -   💬 微信小程序
    -   📲 Android / iOS App
    -   🔗 其他小程序平台（支付宝、百度、抖音等）
-   **开发工具**: Vite + TypeScript

### 🎨 设计稿 (Demo)

`demo/` 目录包含各页面的设计参考：
-   `warm_welcome_login` - 登录页面
-   `property_search_results` - 搜索结果页
-   `community_detail_insights` - 小区详情页
-   `community_home_feed` - 社区首页
-   `personal_profile_center` - 个人中心

---

## 📁 项目结构

```
ZuFangAPP/
├── backend/                 # NestJS 后端服务
│   ├── src/                 # 源代码
│   │   ├── modules/         # 业务模块 (auth, user, community, comment, search)
│   │   ├── common/          # 公共组件 (guards, filters, interceptors)
│   │   └── config/          # 配置文件
│   ├── prisma/              # 数据库 Schema 和种子数据
│   └── docs/                # API 文档
├── frontend_uniapp/         # uni-app 前端项目
│   ├── src/
│   │   ├── pages/           # 页面组件
│   │   ├── utils/           # 工具函数
│   │   └── static/          # 静态资源
│   └── package.json
├── demo/                    # UI 设计稿
├── doc/                     # 项目文档
│   ├── mydocs/              # 详细设计文档
│   ├── PRD.md               # 产品需求文档
│   └── 前端联调API接口说明书.md
├── docker-compose.dev.yml   # 开发环境 Docker 编排
├── docker-compose.db.yml    # 仅数据库服务 Docker 编排
└── README.md
```

---

## ✨ 核心路线图 (Roadmap)

### 阶段 1：基础设施与基石 ✅
-   [x] **统一架构**: 全局过滤、拦截、Swagger 与日志系统
-   [x] **鉴权中心**: 用户注册/登录 (bcrypt 哈希) 与 JWT 鉴权
-   [x] **小区元数据**: 全量小区信息、分类查询、地理坐标
-   [x] **评价引擎**: 发表打分、图文避雷、小区评分自动加权更新

### 阶段 2：搜索增强与社交 🚧
-   [x] **综合搜索**: 关键字联想、城市过滤、多维排序
-   [x] **社交属性**: 评论点赞、热门搜索排行榜
-   [x] **前端重构**: 迁移至 uni-app，支持多端发布
-   [ ] **ES 落地**: 迁移动态查询至真正的 Elasticsearch 引擎

### 阶段 3：合规审核与进阶 📋
-   [ ] **文件云端**: 接入 OSS/Minio 的多媒体上传
-   [ ] **OCR 实验室**: 合同/房产证自动化比对验证
-   [ ] **盾构系统**: 违规关键字自动过滤与举报闭环

---

## 🚀 快速启动

### 方式一：Docker 开发环境（推荐）

适合快速搭建完整开发环境，无需本地安装 PostgreSQL 和 Redis。

```bash
# 启动所有服务（后端 + 前端 + 数据库 + Redis）
docker-compose -f docker-compose.dev.yml up -d

# 首次启动需要初始化数据库
docker-compose -f docker-compose.dev.yml exec backend npx prisma migrate dev
docker-compose -f docker-compose.dev.yml exec backend npx prisma db seed
```

服务地址：
-   前端 H5: http://localhost:5179
-   后端 API: http://localhost:3026
-   API 文档: http://localhost:3026/api

### 方式二：仅启动数据库服务

适合本地运行代码，仅需 Docker 提供数据库服务。

```bash
# 仅启动 PostgreSQL 和 Redis
docker-compose -f docker-compose.db.yml up -d
```

然后按下方「本地开发」步骤启动前后端。

### 方式三：本地开发

#### 环境依赖
-   Node.js >= 18.x
-   PostgreSQL 14+
-   Redis 6+

#### 后端启动

```bash
cd backend

# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 填入数据库和 Redis 连接信息

# 3. 初始化数据库
npx prisma generate
npx prisma migrate dev
npx prisma db seed    # 注入演示数据

# 4. 启动开发服务器
npm run start:dev
```

#### 前端启动

```bash
cd frontend_uniapp

# 1. 安装依赖
npm install

# 2. 启动 H5 开发服务器
npm run dev:h5

# 3. 或启动微信小程序开发
npm run dev:mp-weixin
```

---

## 📚 文档导航

| 文档 | 说明 |
|------|------|
| [前端联调 API 说明书](file:///e:/software/ZuFangAPP/doc/前端联调API接口说明书.md) | 联调必看 |
| [后端开发进度记录](file:///e:/software/ZuFangAPP/doc/后端开发进度记录文档.md) | 踩坑经验 |
| [技术架构设计文档](file:///e:/software/ZuFangAPP/doc/mydocs/技术架构设计文档.md) | 架构详解 |
| [数据库设计文档](file:///e:/software/ZuFangAPP/doc/mydocs/数据库设计文档.md) | 表结构说明 |

---

## 🐳 Docker 命令速查

```bash
# 开发环境
docker-compose -f docker-compose.dev.yml up -d        # 启动所有服务
docker-compose -f docker-compose.dev.yml down         # 停止所有服务
docker-compose -f docker-compose.dev.yml logs -f      # 查看日志

# 仅数据库
docker-compose -f docker-compose.db.yml up -d         # 启动数据库
docker-compose -f docker-compose.db.yml down          # 停止数据库

# 进入后端容器
docker-compose -f docker-compose.dev.yml exec backend sh

# 数据库操作
docker-compose -f docker-compose.dev.yml exec backend npx prisma studio  # 打开 Prisma Studio
```

---

## 📜 许可证

本项目采用 [UNLICENSED](https://choosealicense.com/no-permission/)。代码所有权归主人所有。

---
*Generated with ❤️ by Antigravity (Advanced Agentic AI).*
