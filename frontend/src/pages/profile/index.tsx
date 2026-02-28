import React from 'react';
import BottomNav from '../../components/layout/BottomNav';
import { Typography, Card, Button } from 'antd';
import { User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

const Profile: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sticky top-0 z-10 shadow-md">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />我的中心
                </h1>
            </header>

            <main className="p-4 flex flex-col justify-center items-center h-[70vh] gap-4">
                <Card className="w-full text-center shadow-sm border-gray-100">
                    <Paragraph className="text-gray-400 text-lg mb-4">个人资料、发布历史以及设置中心正在施工中...</Paragraph>
                    <Button type="primary" onClick={() => navigate('/login')}>前往登录</Button>
                </Card>
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default Profile;
