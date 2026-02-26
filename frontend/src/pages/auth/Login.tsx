import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../api/auth';
import { useAppDispatch } from '../../store';
import { setCredentials } from '../../store/authSlice';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState('password'); // password | code
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await authApi.login({
                phone: values.phone,
                password: loginType === 'password' ? values.password : undefined,
                code: loginType === 'code' ? values.code : undefined,
            });

            // 解压数据适配拦截层
            const token = response.data?.token || (response as any).token;
            const user = response.data?.user || (response as any).user;

            if (token) {
                dispatch(setCredentials({ token, user }));
                message.success('登录成功，欢迎回来！');
                navigate('/', { replace: true });
            } else {
                message.error('凭据验证异常，未能获得登录态');
            }
        } catch (e: any) {
            console.error('Login process failed', e);
        } finally {
            setLoading(false);
        }
    };

    const handleSendCode = async () => {
        try {
            const phoneStr = form.getFieldValue('phone');
            if (!phoneStr || !/^1\d{10}$/.test(phoneStr)) {
                message.warning('请先输入正确的手机号');
                return;
            }
            await authApi.sendVerifyCode(phoneStr);
            message.success('验证码已发送，请注意查收');
        } catch (e) {
            console.error('Failed to send code', e);
        }
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
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size="large"
                >
                    <div className="flex justify-center gap-6 mb-6 text-base">
                        <span
                            className={`cursor-pointer pb-2 ${loginType === 'password' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'text-gray-500'}`}
                            onClick={() => setLoginType('password')}
                        >密码登录</span>
                        <span
                            className={`cursor-pointer pb-2 ${loginType === 'code' ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold' : 'text-gray-500'}`}
                            onClick={() => setLoginType('code')}
                        >验证码快捷登录</span>
                    </div>
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

                    {loginType === 'password' ? (
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
                    ) : (
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '请输入短信验证码!' }]}
                        >
                            <div className="flex gap-2">
                                <Input
                                    prefix={<MessageOutlined className="text-gray-400" />}
                                    placeholder="6位验证码"
                                    className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white flex-1 py-2.5"
                                />
                                <Button className="h-full rounded-xl shrink-0" style={{ height: '46px' }} onClick={handleSendCode}>
                                    获取验证码
                                </Button>
                            </div>
                        </Form.Item>
                    )}

                    <div className="flex justify-between items-center mb-6 text-sm">
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">注册账号</Link>
                        <a href="#" className="text-gray-500 hover:text-gray-700">忘记密码?</a>
                    </div>

                    <Form.Item className="mb-0">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
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
