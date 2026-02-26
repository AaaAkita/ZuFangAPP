# 租房避雷 App - API 接口文档

*(注：当前后端主要完成了基础架构搭建与 Auth 认证模块，其他模块暂未生成控制器)*

## 1. 用户认证模块 (Auth)
**基础路径**: `/users`

### 1.1 发送验证码
- **接口路径**: `POST /users/send-code`
- **功能说明**: 发送手机验证码 (有效时间 5 分钟)
- **请求体 (Body)**:
  ```json
  {
    "phone": "string"
  }
  ```

### 1.2 用户注册
- **接口路径**: `POST /users/register`
- **功能说明**: 用户通过手机号、验证码、密码进行注册
- **请求体 (Body)**:
  ```json
  {
    "phone": "string",
    "code": "string",
    "password": "string",
    "nickname": "string (可选)"
  }
  ```

### 1.3 用户登录
- **接口路径**: `POST /users/login`
- **功能说明**: 用户通过手机号和密码登录获取 JWT Token
- **请求体 (Body)**:
  ```json
  {
    "phone": "string",
    "password": "string"
  }
  ```

### 1.4 用户登出
- **接口路径**: `POST /users/logout`
- **请求头**: `Authorization: Bearer <token>`
- **功能说明**: 让当前用户登录凭证失效（基于 JWT，通常主要由前端清除，服务端也可作黑名单处理）

### 1.5 获取用户信息
- **接口路径**: `GET /users/profile`
- **请求头**: `Authorization: Bearer <token>`
- **功能说明**: 解析 Token 并获取当前登录用户的基本信息
