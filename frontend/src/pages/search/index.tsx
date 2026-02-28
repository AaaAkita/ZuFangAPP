import React from 'react';
import BottomNav from '../../components/layout/BottomNav';
import { Typography, Card } from 'antd';
import { Map as MapIcon } from 'lucide-react';

const { Paragraph } = Typography;

const Search: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sticky top-0 z-10 shadow-md">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <MapIcon className="w-5 h-5" />找小区
                </h1>
            </header>

            <main className="p-4 flex justify-center items-center h-[70vh]">
                <Card className="w-full text-center shadow-sm border-gray-100">
                    <Paragraph className="text-gray-400 text-lg mb-0">更强大的小区找寻地图与列表筛选功能正在赶来路上...</Paragraph>
                </Card>
            </main>

            {/* Bottom Navigation */}
            <BottomNav />
        </div>
    );
};

export default Search;
