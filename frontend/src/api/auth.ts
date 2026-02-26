import request from '../utils/request';

// 定义注册接口的请求载荷规范
export interface RegisterPayload {
    phone: string;
    code: string;
    password?: string; // 密码可能非必填（验证码快捷登录时），根据具体业务
    nickname?: string;
}

// 定义登录接口的请求载荷规范
export interface LoginPayload {
    phone: string;
    password?: string;
    code?: string;
}

/**
 * Auth 模块接口服务
 */
export const authApi = {
    // 1. 发送注册或登录短信验证码
    sendVerifyCode: (phone: string) => {
        return request.post('/users/send-code', { phone });
    },

    // 2. 账号注册
    register: (data: RegisterPayload) => {
        return request.post('/users/register', data);
    },

    // 3. 密码登录或验证码登录 (依据后端能力)
    login: (data: LoginPayload) => {
        return request.post<{ token: string, user: any }>('/users/login', data);
    },

    // 4. 获取当前用户配置状态
    getProfile: () => {
        return request.get('/users/profile');
    },

    // 5. 注销操作
    logout: () => {
        return request.post('/users/logout');
    }
};
