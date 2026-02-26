import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        message.success('登录模拟成功');
        navigate('/');
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gray-50 overflow-hidden">
            {/* 桌面端背景装饰元素 */}
            <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[blob_7s_infinite]"></div>
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[blob_7s_infinite_2s]"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[blob_7s_infinite_4s]"></div>
            </div>

            <div className="w-full md:max-w-md bg-white p-8 md:p-10 md:rounded-3xl md:shadow-2xl z-10 min-h-screen md:min-h-0 flex flex-col justify-center">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 mb-4 shadow-lg">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">欢迎回来</h2>
                    <p className="text-gray-500 mt-2 text-sm">登录租房避雷APP，查看真实居住体验</p>
                </div>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: '请输入手机号!' },
                            { pattern: /^1\d{10}$/, message: '请输入有效的手机号!' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="手机号码"
                            className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            type="password"
                            placeholder="登录密码"
                            className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors py-[7px]"
                        />
                    </Form.Item>

                    <div className="flex justify-between items-center mb-6 text-sm">
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">注册账号</Link>
                        <a href="#" className="text-gray-500 hover:text-gray-700">忘记密码?</a>
                    </div>

                    <Form.Item className="mb-0">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 border-none text-base font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                            登 录
                        </Button>
                    </Form.Item>
                </Form>

                <div className="mt-8 text-center text-xs text-gray-400">
                    登录即代表您同意我们的 <a href="#" className="text-indigo-500 hover:underline">服务条款</a> 和 <a href="#" className="text-indigo-500 hover:underline">隐私政策</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
