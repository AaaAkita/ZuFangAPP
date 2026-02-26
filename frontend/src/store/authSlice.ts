import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    token: string | null;
    userInfo: {
        id?: number;
        phone?: string;
        nickname?: string;
        avatar?: string;
    } | null;
    isAuthenticated: boolean;
}

// 尝试从 localStorage 初始化状态
const getInitialState = (): AuthState => {
    try {
        const local = localStorage.getItem('auth-storage');
        if (local) {
            const { state } = JSON.parse(local);
            return {
                ...state,
                isAuthenticated: !!state.token
            };
        }
    } catch (error) {
        console.error('Redux init auth state parse error', error);
    }

    return {
        token: null,
        userInfo: null,
        isAuthenticated: false
    };
};

const authSlice = createSlice({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ token: string; user: any }>
        ) => {
            state.token = action.payload.token;
            state.userInfo = action.payload.user;
            state.isAuthenticated = true;

            // 持久化到 localStorage 供 request.ts 拦截器使用
            localStorage.setItem('auth-storage', JSON.stringify({ state }));
        },
        logout: (state) => {
            state.token = null;
            state.userInfo = null;
            state.isAuthenticated = false;
            localStorage.removeItem('auth-storage');
        },
        updateUserInfo: (state, action: PayloadAction<any>) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
            localStorage.setItem('auth-storage', JSON.stringify({ state }));
        }
    }
});

export const { setCredentials, logout, updateUserInfo } = authSlice.actions;

export default authSlice.reducer;
