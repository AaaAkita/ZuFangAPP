/**
 * 应用配置文件
 * 统一管理环境变量和 API 地址
 */

// 根据构建模式选择配置（避免依赖 Node.js process 类型）
const mode = (import.meta as any).env?.MODE || ''
const isDev = mode === 'development'

export const config = {
  // API 基础地址
  apiBaseUrl: isDev ? 'http://localhost:3026/api/v1' : 'https://api.example.com/api/v1',

  // 请求超时时间（毫秒）
  requestTimeout: 10000,

  // Token 存储键名
  storageKeys: {
    token: 'token',
    userInfo: 'userInfo'
  },

  // 其他配置
  env: isDev ? 'development' : 'production'
}
