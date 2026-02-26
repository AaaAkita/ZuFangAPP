# 租房避雷应用 - API接口设计文档

## 文档信息
- **文档类型**：给AI Agent开发使用
- **创建日期**：2026年2月24日
- **适用范围**：API接口开发、API接口测试

---

## 1. 概述

### 1.1 API设计原则
- **RESTful风格**：遵循RESTful API设计规范
- **统一响应格式**：统一的响应格式
- **版本控制**：API版本控制
- **错误处理**：统一的错误处理
- **文档完善**：完善的API文档

### 1.2 API基础信息

| 项目 | 说明 |
|------|------|
| 基础URL | https://api.zufang.com |
| API版本 | v1 |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |
| 认证方式 | JWT Bearer Token |

### 1.3 通用请求头

| 请求头 | 说明 | 示例 |
|--------|------|------|
| Content-Type | 内容类型 | application/json |
| Authorization | 认证Token | Bearer {token} |
| X-Request-ID | 请求ID | uuid |
| X-Client-Version | 客户端版本 | 1.0.0 |
| X-Device-ID | 设备ID | uuid |
| User-Agent | 用户代理 | Mozilla/5.0... |

### 1.4 通用响应格式

#### 1.4.1 成功响应
```json
{
  "success": true,
  "data": {},
  "message": "操作成功",
  "timestamp": 1640000000000
}
```

#### 1.4.2 错误响应
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误信息",
    "details": []
  },
  "timestamp": 1640000000000
}
```

### 1.5 HTTP状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 204 | 删除成功 |
| 400 | 请求参数错误 |
| 401 | 未认证 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 409 | 资源冲突 |
| 422 | 验证失败 |
| 429 | 请求过于频繁 |
| 500 | 服务器错误 |

### 1.6 错误码定义

| 错误码 | 说明 |
|--------|------|
| VALIDATION_ERROR | 参数验证失败 |
| UNAUTHORIZED | 未认证 |
| FORBIDDEN | 无权限 |
| NOT_FOUND | 资源不存在 |
| CONFLICT | 资源冲突 |
| RATE_LIMIT_EXCEEDED | 请求过于频繁 |
| INTERNAL_SERVER_ERROR | 服务器错误 |

---

## 2. 用户接口

### 2.1 用户注册

#### 2.1.1 发送验证码
- **接口**：POST /api/v1/users/send-code
- **描述**：发送注册验证码
- **认证**：不需要

**请求参数**：
```json
{
  "phone": "13800138000"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "expireTime": 300
  },
  "message": "验证码发送成功",
  "timestamp": 1640000000000
}
```

#### 2.1.2 用户注册
- **接口**：POST /api/v1/users/register
- **描述**：用户注册
- **认证**：不需要

**请求参数**：
```json
{
  "phone": "13800138000",
  "code": "123456",
  "password": "Password123!",
  "nickname": "张三"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "phone": "13800138000",
    "nickname": "张三",
    "avatar": null,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "注册成功",
  "timestamp": 1640000000000
}
```

### 2.2 用户登录

#### 2.2.1 手机号登录
- **接口**：POST /api/v1/users/login
- **描述**：手机号登录
- **认证**：不需要

**请求参数**：
```json
{
  "phone": "13800138000",
  "password": "Password123!"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "phone": "13800138000",
    "nickname": "张三",
    "avatar": "https://cdn.zufang.com/avatars/1.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "登录成功",
  "timestamp": 1640000000000
}
```

#### 2.2.2 第三方登录
- **接口**：POST /api/v1/users/oauth/login
- **描述**：第三方登录
- **认证**：不需要

**请求参数**：
```json
{
  "provider": "wechat",
  "code": "auth_code",
  "state": "state"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "phone": "13800138000",
    "nickname": "张三",
    "avatar": "https://cdn.zufang.com/avatars/1.jpg",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "登录成功",
  "timestamp": 1640000000000
}
```

### 2.3 用户信息

#### 2.3.1 获取用户信息
- **接口**：GET /api/v1/users/profile
- **描述**：获取当前用户信息
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "phone": "13800138000",
    "nickname": "张三",
    "avatar": "https://cdn.zufang.com/avatars/1.jpg",
    "gender": 1,
    "birthday": "1990-01-01",
    "province": "北京市",
    "city": "北京市",
    "district": "东城区",
    "role": "user",
    "createdAt": "2026-01-01T00:00:00Z"
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 2.3.2 更新用户信息
- **接口**：PUT /api/v1/users/profile
- **描述**：更新用户信息
- **认证**：需要

**请求参数**：
```json
{
  "nickname": "李四",
  "avatar": "https://cdn.zufang.com/avatars/2.jpg",
  "gender": 2,
  "birthday": "1995-01-01",
  "province": "北京市",
  "city": "北京市",
  "district": "朝阳区"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "phone": "13800138000",
    "nickname": "李四",
    "avatar": "https://cdn.zufang.com/avatars/2.jpg",
    "gender": 2,
    "birthday": "1995-01-01",
    "province": "北京市",
    "city": "北京市",
    "district": "朝阳区",
    "role": "user",
    "updatedAt": "2026-02-24T00:00:00Z"
  },
  "message": "更新成功",
  "timestamp": 1640000000000
}
```

#### 2.3.3 修改密码
- **接口**：PUT /api/v1/users/password
- **描述**：修改密码
- **认证**：需要

**请求参数**：
```json
{
  "oldPassword": "Password123!",
  "newPassword": "NewPassword456!"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "密码修改成功",
  "timestamp": 1640000000000
}
```

#### 2.3.4 用户登出
- **接口**：POST /api/v1/users/logout
- **描述**：用户登出
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "登出成功",
  "timestamp": 1640000000000
}
```

#### 2.3.5 注销账号
- **接口**：DELETE /api/v1/users/account
- **描述**：注销账号
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "账号注销成功",
  "timestamp": 1640000000000
}
```

---

## 3. 小区接口

### 3.1 小区列表

#### 3.1.1 获取小区列表
- **接口**：GET /api/v1/communities
- **描述**：获取小区列表
- **认证**：不需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |
| city | String | 否 | 城市 |
| district | String | 否 | 区县 |
| keyword | String | 否 | 搜索关键词 |
| sortBy | String | 否 | 排序字段（rating/commentCount/createdAt） |
| sortOrder | String | 否 | 排序方向（asc/desc） |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "communityId": 1,
        "name": "建国门小区",
        "province": "北京市",
        "city": "北京市",
        "district": "东城区",
        "address": "建国门外大街1号",
        "longitude": 116.4340,
        "latitude": 39.9087,
        "propertyType": "住宅",
        "buildYear": 2000,
        "propertyFee": 2.5,
        "images": [
          "https://cdn.zufang.com/communities/1/1.jpg",
          "https://cdn.zufang.com/communities/1/2.jpg"
        ],
        "tags": ["地铁", "商圈", "学区"],
        "ratingAvg": 4.5,
        "ratingCount": 100,
        "commentCount": 50,
        "viewCount": 1000,
        "favoriteCount": 200
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

### 3.2 小区详情

#### 3.2.1 获取小区详情
- **接口**：GET /api/v1/communities/:id
- **描述**：获取小区详情
- **认证**：不需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "communityId": 1,
    "name": "建国门小区",
    "province": "北京市",
    "city": "北京市",
    "district": "东城区",
    "address": "建国门外大街1号",
    "longitude": 116.4340,
    "latitude": 39.9087,
    "propertyType": "住宅",
    "buildYear": 2000,
    "developer": "北京房地产开发公司",
    "propertyCompany": "建国门物业",
    "propertyFee": 2.5,
    "greenRate": 35.5,
    "plotRate": 2.8,
    "totalBuildings": 10,
    "totalHouseholds": 500,
    "parkingSpaces": 300,
    "description": "位于建国门外大街，交通便利，配套设施完善",
    "images": [
      "https://cdn.zufang.com/communities/1/1.jpg",
      "https://cdn.zufang.com/communities/1/2.jpg"
    ],
    "tags": ["地铁", "商圈", "学区"],
    "facilities": {
      "transport": ["地铁1号线建国门站"],
      "education": ["建国门小学"],
      "medical": ["北京医院"],
      "shopping": ["王府井商圈"]
    },
    "ratingAvg": 4.5,
    "ratingCount": 100,
    "commentCount": 50,
    "viewCount": 1000,
    "favoriteCount": 200,
    "isFavorite": false,
    "createdAt": "2026-01-01T00:00:00Z"
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 3.2.2 获取周边设施
- **接口**：GET /api/v1/communities/:id/surrounding
- **描述**：获取周边设施
- **认证**：不需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | String | 否 | 设施类型（transport/education/medical/shopping） |
| radius | Integer | 否 | 搜索半径（米），默认2000 |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "transport": [
      {
        "name": "地铁1号线建国门站",
        "type": "subway",
        "distance": 500,
        "address": "建国门外大街",
        "longitude": 116.4340,
        "latitude": 39.9087
      }
    ],
    "education": [
      {
        "name": "建国门小学",
        "type": "school",
        "distance": 800,
        "address": "建国门大街",
        "longitude": 116.4340,
        "latitude": 39.9087
      }
    ],
    "medical": [
      {
        "name": "北京医院",
        "type": "hospital",
        "distance": 1000,
        "address": "东单大街",
        "longitude": 116.4340,
        "latitude": 39.9087
      }
    ],
    "shopping": [
      {
        "name": "王府井商圈",
        "type": "shopping",
        "distance": 1500,
        "address": "王府井大街",
        "longitude": 116.4340,
        "latitude": 39.9087
      }
    ]
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

### 3.3 小区收藏

#### 3.3.1 收藏小区
- **接口**：POST /api/v1/communities/:id/favorite
- **描述**：收藏小区
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "favoriteId": 1,
    "communityId": 1,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "收藏成功",
  "timestamp": 1640000000000
}
```

#### 3.3.2 取消收藏
- **接口**：DELETE /api/v1/communities/:id/favorite
- **描述**：取消收藏
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "取消收藏成功",
  "timestamp": 1640000000000
}
```

#### 3.3.3 获取收藏列表
- **接口**：GET /api/v1/users/favorites
- **描述**：获取收藏列表
- **认证**：需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "favoriteId": 1,
        "communityId": 1,
        "name": "建国门小区",
        "address": "建国门外大街1号",
        "images": [
          "https://cdn.zufang.com/communities/1/1.jpg"
        ],
        "ratingAvg": 4.5,
        "commentCount": 50,
        "createdAt": "2026-02-24T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "totalPages": 1
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

---

## 4. 评论接口

### 4.1 评论列表

#### 4.1.1 获取评论列表
- **接口**：GET /api/v1/communities/:id/comments
- **描述**：获取小区评论列表
- **认证**：不需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |
| sortBy | String | 否 | 排序字段（createdAt/likeCount） |
| sortOrder | String | 否 | 排序方向（asc/desc） |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "commentId": 1,
        "userId": 1,
        "nickname": "张三",
        "avatar": "https://cdn.zufang.com/avatars/1.jpg",
        "content": "小区环境很好，交通便利，周边配套完善",
        "images": [
          "https://cdn.zufang.com/comments/1/1.jpg",
          "https://cdn.zufang.com/comments/1/2.jpg"
        ],
        "videos": [],
        "rating": 5,
        "likeCount": 10,
        "replyCount": 2,
        "isLiked": false,
        "createdAt": "2026-02-24T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

### 4.2 评论发布

#### 4.2.1 发布评论
- **接口**：POST /api/v1/comments
- **描述**：发布评论
- **认证**：需要

**请求参数**：
```json
{
  "communityId": 1,
  "content": "小区环境很好，交通便利，周边配套完善",
  "images": [
    "https://cdn.zufang.com/comments/1/1.jpg",
    "https://cdn.zufang.com/comments/1/2.jpg"
  ],
  "videos": [],
  "rating": 5
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "commentId": 1,
    "userId": 1,
    "communityId": 1,
    "content": "小区环境很好，交通便利，周边配套完善",
    "images": [
      "https://cdn.zufang.com/comments/1/1.jpg",
      "https://cdn.zufang.com/comments/1/2.jpg"
    ],
    "videos": [],
    "rating": 5,
    "likeCount": 0,
    "replyCount": 0,
    "status": 0,
    "auditStatus": 0,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "发布成功",
  "timestamp": 1640000000000
}
```

### 4.3 评论互动

#### 4.3.1 点赞评论
- **接口**：PUT /api/v1/comments/:id/like
- **描述**：点赞评论
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "commentId": 1,
    "likeCount": 11,
    "isLiked": true
  },
  "message": "点赞成功",
  "timestamp": 1640000000000
}
```

#### 4.3.2 取消点赞
- **接口**：DELETE /api/v1/comments/:id/like
- **描述**：取消点赞
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "commentId": 1,
    "likeCount": 10,
    "isLiked": false
  },
  "message": "取消点赞成功",
  "timestamp": 1640000000000
}
```

#### 4.3.3 回复评论
- **接口**：POST /api/v1/comments/:id/replies
- **描述**：回复评论
- **认证**：需要

**请求参数**：
```json
{
  "content": "确实，停车是个问题"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "replyId": 1,
    "userId": 2,
    "commentId": 1,
    "replyUserId": 1,
    "content": "确实，停车是个问题",
    "likeCount": 0,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "回复成功",
  "timestamp": 1640000000000
}
```

#### 4.3.4 获取回复列表
- **接口**：GET /api/v1/comments/:id/replies
- **描述**：获取评论回复列表
- **认证**：不需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "replyId": 1,
        "userId": 2,
        "nickname": "李四",
        "avatar": "https://cdn.zufang.com/avatars/2.jpg",
        "replyUserId": 1,
        "replyNickname": "张三",
        "content": "确实，停车是个问题",
        "likeCount": 0,
        "createdAt": "2026-02-24T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 2,
      "totalPages": 1
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 4.3.5 举报评论
- **接口**：POST /api/v1/comments/:id/report
- **描述**：举报评论
- **认证**：需要

**请求参数**：
```json
{
  "reason": "offensive",
  "description": "评论内容包含不当言论"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "reportId": 1,
    "commentId": 1,
    "reason": "offensive",
    "description": "评论内容包含不当言论",
    "status": 0,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "举报成功",
  "timestamp": 1640000000000
}
```

#### 4.3.6 删除评论
- **接口**：DELETE /api/v1/comments/:id
- **描述**：删除评论
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "删除成功",
  "timestamp": 1640000000000
}
```

### 4.4 我的评论

#### 4.4.1 获取我的评论
- **接口**：GET /api/v1/users/comments
- **描述**：获取我的评论列表
- **认证**：需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "commentId": 1,
        "communityId": 1,
        "communityName": "建国门小区",
        "content": "小区环境很好，交通便利，周边配套完善",
        "images": [
          "https://cdn.zufang.com/comments/1/1.jpg"
        ],
        "rating": 5,
        "likeCount": 10,
        "replyCount": 2,
        "status": 1,
        "auditStatus": 1,
        "createdAt": "2026-02-24T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "totalPages": 1
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

---

## 5. 文件接口

### 5.1 文件上传

#### 5.1.1 获取上传签名
- **接口**：POST /api/v1/files/oss-sign
- **描述**：获取OSS上传签名
- **认证**：需要

**请求参数**：
```json
{
  "fileName": "comment_1_1.jpg",
  "fileType": "image",
  "fileSize": 1024000
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://zufang-prod.oss-cn-hangzhou.aliyuncs.com/uploads/comments/2026/02/24/1.jpg?OSSAccessKeyId=xxx&Expires=xxx&Signature=xxx",
    "fileUrl": "https://cdn.zufang.com/uploads/comments/2026/02/24/1.jpg",
    "fileId": 1,
    "expireTime": 3600
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 5.1.2 确认上传
- **接口**：POST /api/v1/files/:id/confirm
- **描述**：确认文件上传完成
- **认证**：需要

**请求参数**：
```json
{
  "width": 1920,
  "height": 1080,
  "duration": null
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "fileId": 1,
    "fileName": "comment_1_1.jpg",
    "fileUrl": "https://cdn.zufang.com/uploads/comments/2026/02/24/1.jpg",
    "fileType": "image",
    "fileSize": 1024000,
    "mimeType": "image/jpeg",
    "width": 1920,
    "height": 1080,
    "status": 1,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "确认成功",
  "timestamp": 1640000000000
}
```

#### 5.1.3 删除文件
- **接口**：DELETE /api/v1/files/:id
- **描述**：删除文件
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "删除成功",
  "timestamp": 1640000000000
}
```

---

## 6. 搜索接口

### 6.1 全文搜索

#### 6.1.1 搜索
- **接口**：GET /api/v1/search
- **描述**：全文搜索
- **认证**：不需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | String | 是 | 搜索关键词 |
| type | String | 否 | 搜索类型（community/comment） |
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "communities": [
      {
        "communityId": 1,
        "name": "建国门小区",
        "address": "建国门外大街1号",
        "images": [
          "https://cdn.zufang.com/communities/1/1.jpg"
        ],
        "ratingAvg": 4.5,
        "commentCount": 50
      }
    ],
    "comments": [
      {
        "commentId": 1,
        "communityId": 1,
        "communityName": "建国门小区",
        "content": "小区环境很好，交通便利，周边配套完善",
        "rating": 5,
        "likeCount": 10
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 60,
      "totalPages": 3
    }
  },
  "message": "搜索成功",
  "timestamp": 1640000000000
}
```

### 6.2 搜索建议

#### 6.2.1 获取搜索建议
- **接口**：GET /api/v1/search/suggestions
- **描述**：获取搜索建议
- **认证**：不需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| keyword | String | 是 | 搜索关键词 |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "suggestions": [
      "建国门小区",
      "建国门外大街",
      "建国门小学"
    ]
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

### 6.3 搜索历史

#### 6.3.1 获取搜索历史
- **接口**：GET /api/v1/users/search-history
- **描述**：获取搜索历史
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "history": [
      {
        "keyword": "建国门小区",
        "searchType": "community",
        "resultCount": 10,
        "createdAt": "2026-02-24T00:00:00Z"
      },
      {
        "keyword": "朝阳区",
        "searchType": "community",
        "resultCount": 50,
        "createdAt": "2026-02-23T00:00:00Z"
      }
    ]
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 6.3.2 清空搜索历史
- **接口**：DELETE /api/v1/users/search-history
- **描述**：清空搜索历史
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "清空成功",
  "timestamp": 1640000000000
}
```

### 6.4 热门搜索

#### 6.4.1 获取热门搜索
- **接口**：GET /api/v1/search/hot
- **描述**：获取热门搜索
- **认证**：不需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "hotSearches": [
      {
        "keyword": "建国门小区",
        "searchCount": 1000,
        "rank": 1
      },
      {
        "keyword": "朝阳区",
        "searchCount": 800,
        "rank": 2
      },
      {
        "keyword": "学区房",
        "searchCount": 600,
        "rank": 3
      }
    ]
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

---

## 7. 合同验证接口

### 7.1 合同上传

#### 7.1.1 上传合同
- **接口**：POST /api/v1/contract-verifications
- **描述**：上传合同进行验证
- **认证**：需要

**请求参数**：
```json
{
  "communityId": 1,
  "contractImages": [
    "https://cdn.zufang.com/contracts/1/1.jpg",
    "https://cdn.zufang.com/contracts/1/2.jpg"
  ]
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "verificationId": 1,
    "userId": 1,
    "communityId": 1,
    "contractImages": [
      "https://cdn.zufang.com/contracts/1/1.jpg",
      "https://cdn.zufang.com/contracts/1/2.jpg"
    ],
    "ocrResult": {
      "landlord": "张三",
      "tenant": "李四",
      "rent": 5000,
      "startDate": "2026-01-01",
      "endDate": "2026-12-31"
    },
    "verificationResult": {
      "valid": true,
      "riskLevel": "low",
      "riskItems": []
    },
    "status": 1,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "验证成功",
  "timestamp": 1640000000000
}
```

#### 7.1.2 删除合同数据
- **接口**：DELETE /api/v1/contract-verifications/:id
- **描述**：删除合同数据
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "删除成功",
  "timestamp": 1640000000000
}
```

---

## 8. 广告接口

### 8.1 广告展示

#### 8.1.1 获取广告
- **接口**：GET /api/v1/ads/:position
- **描述**：获取指定位置的广告
- **认证**：不需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| position | String | 是 | 广告位（banner/home/detail） |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "adId": 1,
    "title": "租房好店推荐",
    "description": "精选优质商家，租房生活更便捷",
    "imageUrl": "https://cdn.zufang.com/ads/1.jpg",
    "linkUrl": "https://www.example.com",
    "position": "detail",
    "adType": "image",
    "priority": 10
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

### 8.2 广告统计

#### 8.2.1 记录广告展示
- **接口**：POST /api/v1/ads/:id/impression
- **描述**：记录广告展示
- **认证**：不需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "impressionId": 1,
    "adId": 1,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "记录成功",
  "timestamp": 1640000000000
}
```

#### 8.2.2 记录广告点击
- **接口**：POST /api/v1/ads/:id/click
- **描述**：记录广告点击
- **认证**：不需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "clickId": 1,
    "adId": 1,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "记录成功",
  "timestamp": 1640000000000
}
```

---

## 9. 消息接口

### 9.1 消息列表

#### 9.1.1 获取消息列表
- **接口**：GET /api/v1/users/messages
- **描述**：获取消息列表
- **认证**：需要

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |
| type | String | 否 | 消息类型（system/comment/like/follow） |
| isRead | Boolean | 否 | 是否已读 |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "messageId": 1,
        "type": "comment",
        "title": "您的评论有新回复",
        "content": "用户李四回复了您的评论",
        "data": {
          "commentId": 1,
          "replyId": 1
        },
        "isRead": false,
        "createdAt": "2026-02-24T00:00:00Z"
      },
      {
        "messageId": 2,
        "type": "like",
        "title": "您的评论收到新点赞",
        "content": "用户王五点赞了您的评论",
        "data": {
          "commentId": 1
        },
        "isRead": false,
        "createdAt": "2026-02-24T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "totalPages": 1
    },
    "unreadCount": 2
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

### 9.2 消息操作

#### 9.2.1 标记已读
- **接口**：PUT /api/v1/users/messages/:id/read
- **描述**：标记消息已读
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "messageId": 1,
    "isRead": true
  },
  "message": "标记成功",
  "timestamp": 1640000000000
}
```

#### 9.2.2 全部标记已读
- **接口**：PUT /api/v1/users/messages/read-all
- **描述**：全部标记已读
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "count": 10
  },
  "message": "标记成功",
  "timestamp": 1640000000000
}
```

#### 9.2.3 删除消息
- **接口**：DELETE /api/v1/users/messages/:id
- **描述**：删除消息
- **认证**：需要

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "删除成功",
  "timestamp": 1640000000000
}
```

---

## 10. 系统接口

### 10.1 健康检查

#### 10.1.1 健康检查
- **接口**：GET /api/v1/health
- **描述**：健康检查
- **认证**：不需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": 1640000000000
  },
  "message": "系统正常",
  "timestamp": 1640000000000
}
```

### 10.2 系统配置

#### 10.2.1 获取系统配置
- **接口**：GET /api/v1/system/config
- **描述**：获取系统配置
- **认证**：不需要

**响应示例**：
```json
{
  "success": true,
  "data": {
    "appName": "租房避雷",
    "appVersion": "1.0.0",
    "maxUploadSize": 10485760,
    "enableRegistration": true,
    "enableComment": true,
    "enableFavorite": true
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

---

## 11. 管理后台接口

### 11.1 用户管理

#### 11.1.1 获取用户列表
- **接口**：GET /api/v1/admin/users
- **描述**：获取用户列表
- **认证**：需要（管理员）

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |
| keyword | String | 否 | 搜索关键词 |
| status | Integer | 否 | 状态（0禁用 1正常） |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "userId": 1,
        "phone": "13800138000",
        "nickname": "张三",
        "avatar": "https://cdn.zufang.com/avatars/1.jpg",
        "role": "user",
        "status": 1,
        "createdAt": "2026-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 11.1.2 封禁用户
- **接口**：PUT /api/v1/admin/users/:id/ban
- **描述**：封禁用户
- **认证**：需要（管理员）

**响应示例**：
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "status": 0
  },
  "message": "封禁成功",
  "timestamp": 1640000000000
}
```

#### 11.1.3 解封用户
- **接口**：PUT /api/v1/admin/users/:id/unban
- **描述**：解封用户
- **认证**：需要（管理员）

**响应示例**：
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "status": 1
  },
  "message": "解封成功",
  "timestamp": 1640000000000
}
```

### 11.2 小区管理

#### 11.2.1 获取小区列表
- **接口**：GET /api/v1/admin/communities
- **描述**：获取小区列表
- **认证**：需要（管理员）

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |
| keyword | String | 否 | 搜索关键词 |
| status | Integer | 否 | 状态（0禁用 1正常 2审核中） |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "communityId": 1,
        "name": "建国门小区",
        "address": "建国门外大街1号",
        "ratingAvg": 4.5,
        "commentCount": 50,
        "status": 1,
        "createdAt": "2026-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 11.2.2 添加小区
- **接口**：POST /api/v1/admin/communities
- **描述**：添加小区
- **认证**：需要（管理员）

**请求参数**：
```json
{
  "name": "建国门小区",
  "province": "北京市",
  "city": "北京市",
  "district": "东城区",
  "address": "建国门外大街1号",
  "longitude": 116.4340,
  "latitude": 39.9087,
  "propertyType": "住宅",
  "buildYear": 2000,
  "developer": "北京房地产开发公司",
  "propertyCompany": "建国门物业",
  "propertyFee": 2.5,
  "greenRate": 35.5,
  "plotRate": 2.8,
  "totalBuildings": 10,
  "totalHouseholds": 500,
  "parkingSpaces": 300,
  "description": "位于建国门外大街，交通便利，配套设施完善",
  "images": [
    "https://cdn.zufang.com/communities/1/1.jpg",
    "https://cdn.zufang.com/communities/1/2.jpg"
  ],
  "tags": ["地铁", "商圈", "学区"]
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "communityId": 1,
    "name": "建国门小区",
    "status": 2,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "添加成功",
  "timestamp": 1640000000000
}
```

#### 11.2.3 审核小区
- **接口**：PUT /api/v1/admin/communities/:id/audit
- **描述**：审核小区
- **认证**：需要（管理员）

**请求参数**：
```json
{
  "status": 1,
  "auditResult": "审核通过"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "communityId": 1,
    "status": 1
  },
  "message": "审核成功",
  "timestamp": 1640000000000
}
```

### 11.3 评论管理

#### 11.3.1 获取评论列表
- **接口**：GET /api/v1/admin/comments
- **描述**：获取评论列表
- **认证**：需要（管理员）

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |
| keyword | String | 否 | 搜索关键词 |
| auditStatus | Integer | 否 | 审核状态（0待审核 1通过 2不通过） |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "commentId": 1,
        "userId": 1,
        "nickname": "张三",
        "communityId": 1,
        "communityName": "建国门小区",
        "content": "小区环境很好，交通便利，周边配套完善",
        "rating": 5,
        "likeCount": 10,
        "replyCount": 2,
        "status": 1,
        "auditStatus": 1,
        "createdAt": "2026-02-24T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 11.3.2 审核评论
- **接口**：PUT /api/v1/admin/comments/:id/audit
- **描述**：审核评论
- **认证**：需要（管理员）

**请求参数**：
```json
{
  "auditStatus": 1,
  "auditResult": "审核通过"
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "commentId": 1,
    "auditStatus": 1,
    "auditResult": "审核通过",
    "auditAt": "2026-02-24T00:00:00Z"
  },
  "message": "审核成功",
  "timestamp": 1640000000000
}
```

#### 11.3.3 删除评论
- **接口**：DELETE /api/v1/admin/comments/:id
- **描述**：删除评论
- **认证**：需要（管理员）

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "删除成功",
  "timestamp": 1640000000000
}
```

### 11.4 广告管理

#### 11.4.1 获取广告列表
- **接口**：GET /api/v1/admin/ads
- **描述**：获取广告列表
- **认证**：需要（管理员）

**请求参数**：
| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | Integer | 否 | 页码，默认1 |
| limit | Integer | 否 | 每页数量，默认20 |
| position | String | 否 | 广告位 |
| status | Integer | 否 | 状态（0禁用 1正常） |

**响应示例**：
```json
{
  "success": true,
  "data": {
    "list": [
      {
        "adId": 1,
        "title": "租房好店推荐",
        "description": "精选优质商家，租房生活更便捷",
        "imageUrl": "https://cdn.zufang.com/ads/1.jpg",
        "linkUrl": "https://www.example.com",
        "position": "detail",
        "adType": "image",
        "startTime": "2026-02-01T00:00:00Z",
        "endTime": "2026-12-31T23:59:59Z",
        "priority": 10,
        "impressionCount": 1000,
        "clickCount": 100,
        "ctr": 0.1,
        "status": 1,
        "createdAt": "2026-02-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "totalPages": 1
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

#### 11.4.2 添加广告
- **接口**：POST /api/v1/admin/ads
- **描述**：添加广告
- **认证**：需要（管理员）

**请求参数**：
```json
{
  "title": "租房好店推荐",
  "description": "精选优质商家，租房生活更便捷",
  "imageUrl": "https://cdn.zufang.com/ads/1.jpg",
  "linkUrl": "https://www.example.com",
  "position": "detail",
  "adType": "image",
  "startTime": "2026-02-01T00:00:00Z",
  "endTime": "2026-12-31T23:59:59Z",
  "priority": 10
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "adId": 1,
    "title": "租房好店推荐",
    "status": 1,
    "createdAt": "2026-02-24T00:00:00Z"
  },
  "message": "添加成功",
  "timestamp": 1640000000000
}
```

#### 11.4.3 编辑广告
- **接口**：PUT /api/v1/admin/ads/:id
- **描述**：编辑广告
- **认证**：需要（管理员）

**请求参数**：
```json
{
  "title": "租房好店推荐",
  "description": "精选优质商家，租房生活更便捷",
  "imageUrl": "https://cdn.zufang.com/ads/1.jpg",
  "linkUrl": "https://www.example.com",
  "position": "detail",
  "adType": "image",
  "startTime": "2026-02-01T00:00:00Z",
  "endTime": "2026-12-31T23:59:59Z",
  "priority": 10,
  "status": 1
}
```

**响应示例**：
```json
{
  "success": true,
  "data": {
    "adId": 1,
    "title": "租房好店推荐",
    "status": 1,
    "updatedAt": "2026-02-24T00:00:00Z"
  },
  "message": "编辑成功",
  "timestamp": 1640000000000
}
```

#### 11.4.4 删除广告
- **接口**：DELETE /api/v1/admin/ads/:id
- **描述**：删除广告
- **认证**：需要（管理员）

**响应示例**：
```json
{
  "success": true,
  "data": null,
  "message": "删除成功",
  "timestamp": 1640000000000
}
```

### 11.5 数据统计

#### 11.5.1 获取数据统计
- **接口**：GET /api/v1/admin/stats
- **描述**：获取数据统计
- **认证**：需要（管理员）

**响应示例**：
```json
{
  "success": true,
  "data": {
    "userStats": {
      "totalUsers": 10000,
      "newUsersToday": 100,
      "activeUsersToday": 1000
    },
    "communityStats": {
      "totalCommunities": 1000,
      "newCommunitiesToday": 10
    },
    "commentStats": {
      "totalComments": 50000,
      "newCommentsToday": 500,
      "pendingComments": 100
    },
    "adStats": {
      "totalAds": 100,
      "activeAds": 50,
      "totalImpressions": 1000000,
      "totalClicks": 100000,
      "avgCtr": 0.1
    }
  },
  "message": "获取成功",
  "timestamp": 1640000000000
}
```

---

## 12. 总结

### 12.1 API设计要点
- **RESTful风格**：遵循RESTful API设计规范
- **统一响应格式**：统一的响应格式
- **版本控制**：API版本控制
- **错误处理**：统一的错误处理
- **文档完善**：完善的API文档

### 12.2 API开发要点
- **参数验证**：严格的参数验证
- **错误处理**：完善的错误处理
- **日志记录**：完整的日志记录
- **性能优化**：API性能优化
- **安全加固**：API安全加固

---

**文档结束**
