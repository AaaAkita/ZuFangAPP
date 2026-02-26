import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { message } from 'antd';

// 创建 Axios 实例
const request = axios.create({
    // Vite 开发环境配置了 Proxy 代理，所有接口走向 /api
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器
request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 从本地存储或状态树中获取 Token
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            try {
                const { state } = JSON.parse(authStorage);
                if (state && state.token) {
                    // NestJS Passport JWT 通常使用 Bearer scheme
                    config.headers.Authorization = `Bearer ${state.token}`;
                }
            } catch (e) {
                console.error('Failed to parse auth token from local storage', e);
            }
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
        // 这里根据后端 NestJS 实际返回格式解析，如果规范统一返回 { code, data, message }，也可在此解构
        return response.data;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { status, data } = error.response;

            // 处理后端返回的带信息错误 (如 NestJS ValidationPipe 抛出的异常)
            const errorMsg = (data as any)?.message || '服务器发生未知错误';

            switch (status) {
                case 400:
                    // 400 通常是参数校验失败
                    if (Array.isArray(errorMsg)) {
                        message.error(errorMsg[0]); // 取第一条错误栈
                    } else {
                        message.error(errorMsg);
                    }
                    break;
                case 401:
                    // 401 Unauthorized 未登录或 Token 过期
                    message.error('登录状态已失效，请重新登录');
                    localStorage.removeItem('auth-storage');
                    // 并发拦截时避免重复弹转，可以使用防抖或状态位控制（此处简写直接刷新让 Router 重定向）
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1500);
                    break;
                case 403:
                    message.error('抱歉，您没有权限操作此功能');
                    break;
                case 404:
                    message.error('请求的接口不存在');
                    break;
                case 500:
                    message.error('服务器内部错误，请稍后再试');
                    break;
                default:
                    message.error(typeof errorMsg === 'string' ? errorMsg : '网络出现异常');
            }
        } else if (error.request) {
            // 请求已发出但未收到响应 (可能是断网/后端宕机)
            message.error('网络连接失败，请检查您的网络或者服务器状态');
        } else {
            // 发送请求时发生了一些严重的问题
            message.error(error.message);
        }
        return Promise.reject(error);
    }
);

export default request;
