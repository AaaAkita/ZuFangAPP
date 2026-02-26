# 🏠 ZuFangAPP - 租房避雷协作平台

> **「巴音布鲁克永远的王」专属租房利器**
>
> 旨在通过社区互助、真实评价与 OCR 合约验证，打破租房市场的信息不对称，帮助每一位打工人避开租房陷阱。

---

## 🌟 项目亮点

-   **真避雷**: 拒绝“水军”好评，核心逻辑围绕“避雷”设计，展示最真实的居住体验。
-   **硬核验证**: 计划集成 OCR 技术，验证租房合同真实性，确保评价来源可靠。
-   **极速响应**: 后端采用 NestJS + Redis 架构，保障高并发下的流畅搜索与交互。
-   **精致设计**: 前端遵循现代审美，提供丝滑的多端交互体验。

---

## 🛠️ 技术底座

### 🟢 后端 (Backend) - 强健的感知层
-   **核心框架**: [NestJS (v11)](https://nestjs.com/) - 模块化、易扩展的 Node.js 架构。
-   **数据持久化**: [Prisma](https://www.prisma.io/) + **PostgreSQL** - 强类型的 ORM 配合稳定的关系型数据库。
-   **高速缓存**: [Redis](https://redis.io/) - 支撑验证码、热门搜索榜单及高频查询加速。
-   **安全卫士**: [Passport.js](https://www.passportjs.org/) + **JWT** - 完善的策略模式身份验证。
-   **实时检索**: **Elasticsearch** (骨架就绪) - 支撑全城千万级小区的秒级模糊搜索。
-   **工程化**: 集成 Swagger UI、全局异常过滤、响应统一包装、自动 API 文档生成。

### 🔵 前端 (Frontend) - 丝滑的交互层
-   **技术选型**: (开发中，拟采用 React/Vite + TailwindCSS + Framer Motion)
-   **核心组件**: 响应式设计、动效丰富的 UI 组件库。

---

## ✨ 核心路线图 (Roadmap)

### 阶段 1：基础设施与基石 (已完成)
-   [x] **统一架构**: 全局过滤、拦截、Swagger 与日志系统。
-   [x] **鉴权中心**: 用户注册/登录 (bcrypt 哈希) 与 JWT 鉴权。
-   [x] **小区元数据**: 全量小区信息、分类查询、地理坐标。
-   [x] **评价引擎**: 发表打分、图文避雷、小区评分自动加权更新。

### 阶段 2：搜索增强与社交 (进行中)
-   [x] **综合搜索**: 关键字联想、城市过滤、多维排序。
-   [x] **社交属性**: 评论点赞、热门搜索排行榜。
-   [ ] **ES 落地**: 迁移动态查询至真正的 Elasticsearch 引擎。

### 阶段 3：合规审核与进阶 (计划中)
-   [ ] **文件云端**: 接入 OSS/Minio 的多媒体上传。
-   [ ] **OCR 实验室**: 合同/房产证自动化比对验证。
-   [ ] **盾构系统**: 违规关键字自动过滤与举报闭环。

---

## 📁 核心设计
项目文档存放于 `doc/` 目录，为您提供技术深度解析：
-   📄 [前端联调 API 说明书](file:///e:/software/ZuFangAPP/doc/前端联调API接口说明书.md) - **联调必看！**
-   📂 [后端开发进度记录](file:///e:/software/ZuFangAPP/doc/后端开发进度记录文档.md) - 记录了所有的“踩坑”经验。
-   🗄️ [旧版设计文档归档](file:///e:/software/ZuFangAPP/doc/旧版API接口设计文档_仅供参考.md) - 历史设计的参考足迹。

---

## � 开发者快速启动 (Backend)

### 环境依赖
-   Node.js >= 18.x
-   PostgreSQL 14+
-   Redis 6+

### 启动步骤
1.  **克隆与安装**:
    ```bash
    cd backend
    npm install
    ```
2.  **环境变量**:
    备份并重命名 `.env.example` 为 `.env`，填入您的数据库与 Redis 连接字符串。
3.  **模式同步**:
    ```bash
    npx prisma generate
    npx prisma migrate dev
    npx prisma db seed  # 关键！注入演示用的小区与避雷数据
    ```
4.  **运行**:
    ```bash
    npm run start:dev
    ```
5.  **探索**:
    浏览器打开 `http://localhost:3000/api/docs` 开启交互式 API 调试。

---

## 📜 许可证

本项目采用 [UNLICENSED](https://choosealicense.com/no-permission/)。代码所有权归主人所有。

---
*Generated with ❤️ by Antigravity (Advanced Agentic AI).*
