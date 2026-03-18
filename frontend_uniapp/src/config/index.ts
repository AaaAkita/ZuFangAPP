/**
 * 应用配置文件
 * 统一管理环境变量和 API 地址
 */

// 根据环境自动选择配置
// uni-app 在 H5 开发模式下，NODE_ENV 可能不是 development
// 所以我们使用更多条件判断
const isDev = process.env.NODE_ENV === 'development' || process.env.UNI_PLATFORM === 'h5'

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
