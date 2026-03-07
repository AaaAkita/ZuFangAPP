/**
 * 基础 API 请求封装 (uni.request)
 */
const BASE_URL = 'http://localhost:3000/api'; // 请根据实际后端地址修改

export function request<T>(options: UniApp.RequestOptions): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      url: options.url.startsWith('http') ? options.url : `${BASE_URL}${options.url}`,
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

export default {
  get: <T>(url: string, data?: any) => request<T>({ url, method: 'GET', data }),
  post: <T>(url: string, data?: any) => request<T>({ url, method: 'POST', data }),
  put: <T>(url: string, data?: any) => request<T>({ url, method: 'PUT', data }),
  delete: <T>(url: string, data?: any) => request<T>({ url, method: 'DELETE', data }),
};
