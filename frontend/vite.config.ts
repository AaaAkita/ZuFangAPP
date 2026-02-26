import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // 假设后端 NestJS 运行在 3000 端口
                changeOrigin: true,
                // 如果后端接口没有统一带 /api 前缀，需要配置重写规则；如果后端如上设计就是 /users/...，可以在这里写 rewrite 消除
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
})
