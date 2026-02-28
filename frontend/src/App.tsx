import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Home from './pages/home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CommunityDetail from './pages/community/Detail';
import Search from './pages/search';
import Publish from './pages/publish';
import Profile from './pages/profile';

const App: React.FC = () => {
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    colorPrimary: '#3B82F6',
                    colorSuccess: '#10B981',
                    colorWarning: '#EF4444',
                    colorInfo: '#6366F1',
                    borderRadius: 8,
                },
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/publish" element={<Publish />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/community/:id" element={<CommunityDetail />} />
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
};

export default App;
