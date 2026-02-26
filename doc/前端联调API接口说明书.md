# 租房避雷 App - 前后端联调 API 接口说明书

> **提示**：这份文档是基于当前后端**实际已实现的逻辑和路由**反向生成的基准文档。请前端同学在联调时**完全以本文件为准**，原有 `API接口设计文档.md` 仅作为宏观设计参考。

---

## 📅 全局约定

- **基础前缀**：所有接口固定使用 `http://localhost:3000/api/v1` 开头（线上替换为实际域名）。
- **通信格式**：全部采用 `application/json`。

### 统一成功响应结构
我们全局使用了拦截器处理成以下格式：
```json
{
  "success": true,
  "data": { ... 实际返回的数据包体 ... },
  "message": "操作成功",
  "timestamp": 1729837261893
}
```

### 统一异常响应结构
当触发 4xx、5xx 错误时（如 ValidationPipe 校验失败，用户不存在等）：
```json
{
  "success": false,
  "error": {
    "statusCode": 401,
    "message": "Token 已过期或无效",
    "path": "/api/v1/users/profile"
  },
  "timestamp": 1729837265000
}
```

---

## 1. 认证鉴权模块 (Auth)
不需要携带 JWT Token。

### 1.1 用户注册 `[POST] /api/v1/auth/register`
**请求 Body**:
```json
{
  "phone": "13800138000",
  "password": "Password123!",
  "nickname": "可不填"
}
```
**返回**：`{ id, phone, nickname, createdAt, token }`

### 1.2 用户登录 `[POST] /api/v1/auth/login`
**请求 Body**:
```json
{
  "phone": "13800138000",
  "password": "Password123!"
}
```
**返回**：`{ token }` （这里会签发有效期 7d 的 JWT Token）

---

## 2. 用户管理模块 (User)

### 2.1 获取当前登录信息 `[GET] /api/v1/users/profile`
**Header**: `Authorization: Bearer <Token>`
**请求参数**: 无
**返回**：返回使用当前 Token 对应的数据库内 User 详情（剔除了 password 等敏感字段）。

---

## 3. 小区查询与展示模块 (Community)

### 3.1 分页/过滤查询小区列表 `[GET] /api/v1/communities`
**Header**: `Authorization: Bearer <Token>` (目前框架级加了 AuthGuard 判断)
**Query 请求参数**:
| 字段名称 | 类型 | 必填 | 描述 |
| ------ | --- | --- | --- |
| page | number | 否 | 页码 (默认 1) |
| limit | number | 否 | 每页条数 (默认 20) |
| keyword | string | 否 | 支持地址、小区名称的模糊查询 |
| city | string | 否 | 城市筛选 |
| district | string | 否 | 行政区筛选 |
| sortBy | string | 否 | 支持 `ratingAvg`, `commentCount`, `createdAt` |
| order | string | 否 | `asc` 或 `desc` |

**返回 `data`**:
```json
{
  "items": [{ community 对象... }],
  "total": 100,
  "page": 1,
  "limit": 20,
  "totalPages": 5
}
```

### 3.2 查阅单个小区详情 `[GET] /api/v1/communities/:id`
**获取方式**：将 ID 拼在 URL 后面，例如 `/activities/1`。
**返回**：返回指定小区的数据库记录对象。

---

## 4. 评论避雷业务模块 (Comment)

### 4.1 获取某小区的评价列表 `[GET] /api/v1/comments`
**Query 请求参数**:
| 字段名称 | 类型 | 必填 | 描述 |
| ------ | --- | --- | --- |
| communityId | number | 是 | 小区的 ID |
| page | number | 否 | 页码 (默认 1) |
| limit | number | 否 | 默认 20 |

**返回 `data`**:
```json
{
  "items": [{
      "id": 1,
      "content": "这房东非常坑",
      "rating": 1,
      ...
      "user": { "id", "nickname", "avatar" } // 发评人简要信息
  }],
  "total": 1,
  ...
}
```

### 4.2 发布评价/避雷贴 `[POST] /api/v1/comments`
**Header**: `Authorization: Bearer <Token>` (强需认证)
**请求 Body**:
```json
{
  "communityId": 1,
  "content": "这房子隔音太差了！",
  "images": ["url1", "url2"],   // 选填
  "videos": ["url1"],          // 选填
  "rating": 2                  // (范围 1-5 必填)
}
```
**说明**：发布成功后后端会自动执行事务，把该小区的 `commentCount` 加 1 并重新按公式计算 `ratingAvg` 获取最新均分。

---

## 5. 高级检索模块 (Search)

该模块接口均支持**静默吸收 Token**。即请求头不带 Authorization 也可以查；如果带了，系统会在后台记录该用户的 `搜索历史` (SearchHistory 表)。

### 5.1 全局综合搜索 `[GET] /api/v1/search`
**Query 请求参数**:
| 字段名称 | 类型 | 必填 | 描述 |
| ------ | --- | --- | --- |
| keyword | string | **是** | 用户输入的搜索词 |
| city | string | 否 | 城市筛选 |
| sort | string | 否 | 排序类型：`default` / `hot` (热度) / `new` (最新) |
| page/limit | number | 否 | 与其他分页一致 |

### 5.2 输入框下拉联想 `[GET] /api/v1/search/suggestions`
**Query 请求参数**: `?keyword=万科`
**返回 `data`**：只返回轻量级的数组，如 `[{ id, name, city, district }]` 供前端快速展示列表。

### 5.3 热门榜单查询 `[GET] /api/v1/search/hot`
**请求参数**: 无
**返回 `data`**：
返回当前最高频搜索的 15 个词汇数组，格式如：`[{ keyword: "万科", searchCount: 1532 }]`。
