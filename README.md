# 🏏 ZuFangAPP - 租房避雷协作平台

> **「巴音布鲁克永远的王」专属租房利器**

> 帮助租客（大学生、职场人）快速了解周边租房市场的小区和房屋真实情况，通过真实用户评价避免租房踩坑。

---

## 🌟 产品定位

**核心价值**：
- **信息透明**：真实用户评价，避免租房踩坑
- **便捷查询**：快速了解小区详情、老化程度、卫生问题、周边服务
- **防坑指南**：提供中介黑幕、押金问题、房源真实性等避雷信息

**目标用户**：
- 正在租房的大学生、职场人
- 管理员（内容审核、系统配置）

**核心痛点**：
- 小区安全问题
- 小区设施老化
- 卫生问题
- 中介问题
- 房源真实性
- 押金问题

---

## 🏗 系统架构

### 开发阶段（P0）
- **服务器**：使用公司服务器（节省云服务器费用）
- **前端平台**：H5 网页端、微信小程序
- **后端架构**：NestJS + PostgreSQL + Redis

###**生产阶段（P2）
- **云服务器**：阿里云 ECS（2核4G × 2台，负载均衡）
- **数据库**：PostgreSQL RDS（2核4G）
- **缓存**：Redis（2G）
- **原生App**：iOS/Android（P2扩展）

### **开发阶段可节省费用**
- 云服务器：¥400/月
- 原生App开发：节省开发成本和商店发布费用

---

## 🛠️ 技术底座

### 🟢 后端 (Backend) - 强健的感知层

- **核心框架**: [NestJS (v10.x)](https://nestjs.com/) - 模块化、易扩展的 Node.js 架构
- **数据持久化**: [Prisma](https://www.prisma.io/) + **PostgreSQL** - 强类型的 ORM 配合稳定的关系型数据库
- **高速缓存**: [Redis](https://redis.io/) - 支撑验证码、热门搜索榜单及高频查询加速
- **安全卫士**: [Passport.js](https://www.passportjs.org/) + **JWT** - 完善的策略模式身份验证
- **地图服务**: 高德地图API - 提供地理编码、周边搜索等功能
- **对象存储**: 阿里云OSS - 图片、视频文件存储
- **工程化**: 集成 Swagger UI、全局异常过滤、响应统一包装、自动 API 文档生成

### 🔵 前端 (Frontend) - 丝滑的交互层

- **核心框架**: [uni-app (Vue 3)](https://uniapp.dcloud.net.cn/) - 一套代码，多端发布
- **支持平台**:
  - 📱 H5 网页端
  - 💬 微信小程序
  - 📲 Android App (P2扩展)
  - 📱 iOS App (P2扩展)
- **开发工具**: Vite + TypeScript + Pinia

---

## 📁 项目结构

```
ZuFangAPP/
├── backend/                 # NestJS 后端服务
│   ├── src/                 # 源代码
│   │   ├── modules/         # 业务模块
│   │   │   ├── auth/      # 认证模块
│   │   │   ├── user/      # 用户模块
│   │   │   ├── community/ # 小区模块
│   │   │   ├── comment/   # 评论模块
│   │   │   ├── search/    # 搜索模块
│   │   │   ├── file/      # 文件模块
│   │   │   ├── message/   # 消息模块
│   │   │   ├── ad/        # 广告模块
│   │   │   └── admin/     # 管理后台模块
│   │   ├── common/          # 公共组件 (guards, filters, interceptors)
│   │   └── config/          # 配置文件
│   ├── prisma/              # 数据库 Schema 和种子数据
│   └── test/                # 测试文件
├── frontend_uniapp/         # uni-app 前端项目
│   ├── src/
│   │   ├── pages/           # 页面组件
│   │   ├── components/       # 公共组件
│   │   ├── utils/           # 工具函数
│   │   ├── api/             # API请求封装
│   │   ├── store/           # 状态管理
│   │   └── static/          # 静态资源
│   └── package.json
├── doc/                     # 项目文档
│   ├── 01-项目简介.md
│   ├── 02-技术架构.md
│   ├── 03-开发任务.md
│   ├── 04-API接口文档.md
│   ├── 05-代码规划.md
│   ├── 06-数据库设计.md
│   ├── 07-认证模块.md
│   ├── 08-小区模块.md
│   ├── 09-评论模块.md
│   ├── 10-搜索模块.md
│   ├── 11-广告模块.md
│   ├── 12-管理后台.md
│   └── PRD.md
├── docker-compose.yml       # 生产部署 Docker 编排
└── README.md
```

---

## ✨ 核心功能 (MVP - P0)

### 用户体系
- [x] 用户注册登录（手机号、邮箱、微信）
- [x] 用户信息管理
- [x] 个人中心完善

### 小区管理
- [x] 小区列表查询（分页、筛选、排序）
- [x] 小区详情展示
- [x] 小区搜索（关键词搜索）
- [x] 管理员添加/编辑小区
- [x] 首页推荐配置

### 评论功能
- [x] 发布评论（避雷/推荐）
- [x] 评论列表查询
- [x] 评论点赞
- [x] 评论回复
- [x] 评论举报

### 搜索功能
- [x] 全局综合搜索
- [x] 搜索联想建议
- [x] 热门搜索榜单
- [x] 用户搜索历史

### 广告功能
- [x] 广告管理（添加、编辑、删除）
- [x] 广告投放统计
- [x] CPM + CPC 计费

### 管理后台
- [x] 小区管理
- [x] 广告管理
- [x] 管理员权限控制
- [ ] 评论审核（P2）
- [ ] 举报处理（P2）

---

## 📚 文档导航

| 文档 | 说明 |
|------|------|
| [01-项目简介](./doc/01-项目简介.md) | 产品定位、目标用户、核心功能 |
| [02-技术架构](./doc/02-技术架构.md) | 技术栈、架构设计、API规范 |
| [03-开发任务](./doc/03-开发任务.md) | 后端/前端/测试/部署任务清单 |
| [04-API接口文档](./doc/04-API接口文档.md) | 前后端联调API接口说明 |
| [05-代码规划](./doc/05-代码规划.md) | 代码结构、命名规范、模块设计 |
| [06-数据库设计](./doc/06-数据库设计.md) | 数据库表结构、索引、关系设计 |
| [07-认证模块](./doc/07-认证模块.md) | JWT配置、认证流程、守卫设计 |
| [08-小区模块](./doc/08-小区模块.md) | 小区CRUD、筛选、地图集成 |
| [09-评论模块](./doc/09-评论模块.md) | 评论发布、审核、标签系统 |
| [10-搜索模块](./doc/10-搜索模块.md) | 搜索算法、热词统计、联想搜索 |
| [11-广告模块](./doc/11-广告模块.md) | 广告投放、统计、计费 |
| [12-管理后台](./doc/12-管理后台.md) | 权限设计、功能模块 |
| [PRD](./doc/PRD.md) | 产品需求文档 |

---

## 💰 成本估算

### 开发阶段（使用公司服务器）

| 服务 | 配置 | 月费用 |
|------|------|--------|
| 应用服务器 | 公司服务器 | 免费 |
| 数据库 | 公司服务器PostgreSQL | 免费 |
| Redis缓存 | 公司服务器 | 免费 |
| 对象存储OSS | 100GB存储 + 流量 | ¥50 |
| CDN | 流量费用（可选） | ¥100 |
| 高德地图API | 按调用量计费 | ¥50-200 |
| 微信小程序 | 免费开发（需300元认证费） | ¥300（一次性） |
| **合计** | | **¥500-750/月** |

### 生产阶段（云服务器部署，P2）

| 服务 | 配置 | 月费用 |
|------|------|--------|
| 云服务器ECS | 2核4G × 2台（负载均衡） | ¥400 |
| PostgreSQL RDS | 2核4G | ¥300 |
| Redis | 2G | ¥100 |
| 对象存储OSS | 100GB存储 + 流量 | ¥50 |
| CDN | 流量费用 | ¥100 |
| 高德地图API | 按调用量计费 | ¥50-200 |
| **合计** | | **¥950-1100/月** |

### 节省费用说明
- **云服务器**：节省 ¥400/月（使用公司服务器）
- **原生App开发**：节省开发成本和商店发布费用（优先开发小程序和H5）
- **总计节省**：开发阶段可节省约 ¥400/月 + App开发成本

---

## 🚀 快速启动

### 方式一：Docker 生产部署（使用已构建产物）

适合使用本地已构建文件进行部署，避免在 Docker 构建阶段下载 Node 依赖。

```bash
# 1) 先在本机构建后端产物
cd backend
npm install
npm run build
npx prisma generate

# 2) 构建前端 H5 产物
cd ../frontend_uniapp
npm install
npm run build:h5

# 3) 回到项目根目录后启动 Docker（后端 + 前端 + 数据库 + Redis）
cd ..
docker-compose up -d --build
```

服务地址：
- 前端 H5: http://localhost:5179
- 后端 API: http://localhost:3026
- API 文档: http://localhost:3026/api/docs

### 方式二：本地开发

#### 环境依赖
- Node.js >= 18.x
- PostgreSQL 14+
- Redis 6+

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

## 🐳 Docker 命令速查

```bash
# 生产部署（基于已构建产物）
docker-compose up -d --build      # 启动所有服务
docker-compose down               # 停止所有服务
docker-compose logs -f            # 查看日志

# 进入后端容器
docker-compose exec backend sh

# 数据库操作
docker-compose exec backend npx prisma migrate deploy  # 执行生产迁移
```

---

## 📋 开发规范

- **代码风格**：遵循 ESLint + Prettier 配置
- **命名规范**：驼峰命名（camelCase），数据库字段使用下划线（snake_case）
- **提交规范**：使用 conventional commits 格式
- **分支管理**：main（主分支）、feature/*（功能分支）、bugfix/*（修复分支）

---

## 📜 许可证

本项目采用 [UNLICENSED](https://choosealicense.com/no-permission/)。代码所有权归主人所有。

---

*Generated with ❤️ by Claude Code*
