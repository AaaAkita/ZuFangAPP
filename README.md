# ZuFangAPP - 租房避雷 App

「巴音布鲁克永远的王」专属租房协作平台。旨在通过社区互助、真实评价与 OCR 合约验证，帮助打工人避开租房陷阱。

## 🚀 项目概览

本仓库包含「租房避雷 App」的全栈代码：
-   **Backend**: 基于 NestJS + Prisma (PostgreSQL) + Redis 的高性能 RESTful API 架构。
-   **Frontend**: 现代化的 Web/移动端界面（开发中）。
-   **Documentation**: 完备的开发记录与 API 对接规范。

## 🛠️ 技术栈

### 后端 (Backend)
-   **框架**: [NestJS](https://nestjs.com/) (Node.js)
-   **ORM**: [Prisma](https://www.prisma.io/) (PostgreSQL)
-   **缓存**: [Redis](https://redis.io/) (用于验证码、热点数据)
-   **鉴权**: JWT (Passport)
-   **文档**: Swagger / OpenAPI 3.0
-   **检索**: Elasticsearch (准备中/已搭建服务骨架)

### 前端 (Frontend)
-   (待详细披露，通常基于 React/Vite 生态)

## ✨ 核心功能

-   [x] **用户系统**: 注册、登录、JWT 状态保持、权限校验。
-   [x] **小区模块**: 地理位置查询、分类检索、精细化分页。
-   [x] **评价避雷**: 用户发表带图文评价、动态计算小区平均分（事务驱动）。
-   [x] **搜索增强**: 全局模糊搜索、搜索建议、热门搜索排行榜。
-   [ ] **安全审核**: OCR 合同验证、图片违规检测 (计划中)。

## 📁 目录结构

```text
ZuFangAPP/
├── backend/            # 后端服务端代码 (NestJS)
├── frontend/           # 前端应用代码
├── doc/                # 核心设计文档与联调说明书
└── README.md           # 本说明文件
```

## 🛠️ 快速启动 (Backend)

1. **环境准备**:
   - 安装 Node.js (v18+)
   - 准备 PostgreSQL 与 Redis 实例
   - 配置 `backend/.env` (DATABASE_URL, REDIS_URL)

2. **安装依赖**:
   ```bash
   cd backend
   npm install
   ```

3. **数据库初始化**:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed  # 注入演示种子数据
   ```

4. **启动服务**:
   ```bash
   npm run start:dev
   ```

5. **API 文档**:
   访问 `http://localhost:3000/api/docs` 查看 Swagger 文档。

---
*Created and maintained by Antigravity AI Agent.*
