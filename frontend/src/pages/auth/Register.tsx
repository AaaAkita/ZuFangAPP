import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../api/auth';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            await authApi.register({
                phone: values.phone,
                code: values.verificationCode,
                password: values.password
            });

            message.success('账号注册成功，即将跳转登录！');
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 1500);
        } catch (e: any) {
            console.error('Register failed', e);
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
            {/* 桌面端背景装饰结构同登录页复用 */}
            <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[blob_7s_infinite]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-[blob_7s_infinite_4s]"></div>
            </div>

            <div className="w-full md:max-w-md bg-white p-8 md:p-10 md:rounded-3xl md:shadow-2xl z-10 min-h-screen md:min-h-0 flex flex-col justify-center">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 mb-4 shadow-lg">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-white">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">创建新账号</h2>
                    <p className="text-gray-500 mt-2 text-sm">三十秒快速加入，共建真实互助社区</p>
                </div>

                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    size="large"
                    layout="vertical"
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
                            className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white py-2.5"
                        />
                    </Form.Item>

                    <Form.Item
                        name="verificationCode"
                        rules={[{ required: true, message: '请输入验证码!' }]}
                    >
                        <div className="flex gap-2">
                            <Input
                                prefix={<MessageOutlined className="text-gray-400" />}
                                placeholder="6位验证码"
                                className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white flex-1 py-2.5"
                            />
                            <Button className="h-full rounded-xl shrink-0" style={{ height: '46px' }} onClick={handleSendCode}>获取验证码</Button>
                        </div>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: '请输入密码!' },
                            { min: 6, message: '密码不能少于6位!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            type="password"
                            placeholder="设置密码 (至少6位)"
                            className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white py-[7px]"
                        />
                    </Form.Item>

                    <Form.Item className="mb-4 mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-none text-base font-semibold shadow-md hover:shadow-lg transition-all"
                        >
                            立 即 注 册
                        </Button>
                    </Form.Item>

                    <div className="text-center text-sm mt-4">
                        <span className="text-gray-500">已有账号？</span>
                        <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-medium ml-1">直接登录</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
