import React, { useEffect, useState } from 'react';
import { Home as HomeIcon, Map as MapIcon, PlusSquare, User as UserIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('home');

    // Sync current URL path to active Tab highlight
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setActiveTab('home');
        else if (path.startsWith('/search')) setActiveTab('search');
        else if (path.startsWith('/publish')) setActiveTab('publish');
        else if (path.startsWith('/profile') || path.startsWith('/login') || path.startsWith('/register')) setActiveTab('user');
    }, [location.pathname]);

    const handleNavigation = (tab: string, route: string) => {
        setActiveTab(tab);
        navigate(route);
    };

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50">
            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => handleNavigation('home', '/')}
            >
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 h-[3px] rounded-sm transition-all duration-300 ${activeTab === 'home' ? 'w-10 bg-gradient-to-r from-blue-500 to-purple-500' : 'w-0'}`}></div>
                <HomeIcon className={`w-6 h-6 transition-all duration-300 ${activeTab === 'home' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-xs transition-colors duration-300 ${activeTab === 'home' ? 'text-primary' : 'text-gray-400'}`}>首页</span>
            </div>

            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => handleNavigation('search', '/search')}
            >
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 h-[3px] rounded-sm transition-all duration-300 ${activeTab === 'search' ? 'w-10 bg-gradient-to-r from-blue-500 to-purple-500' : 'w-0'}`}></div>
                <MapIcon className={`w-6 h-6 transition-all duration-300 ${activeTab === 'search' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-xs transition-colors duration-300 ${activeTab === 'search' ? 'text-primary' : 'text-gray-400'}`}>找小区</span>
            </div>

            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => handleNavigation('publish', '/publish')}
            >
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 h-[3px] rounded-sm transition-all duration-300 ${activeTab === 'publish' ? 'w-10 bg-gradient-to-r from-blue-500 to-purple-500' : 'w-0'}`}></div>
                <PlusSquare className={`w-6 h-6 transition-all duration-300 ${activeTab === 'publish' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-xs transition-colors duration-300 ${activeTab === 'publish' ? 'text-primary' : 'text-gray-400'}`}>发评论</span>
            </div>

            <div
                className="relative flex flex-col items-center gap-1 cursor-pointer"
                onClick={() => handleNavigation('user', '/profile')}
            >
                <div className={`absolute -top-2 left-1/2 -translate-x-1/2 h-[3px] rounded-sm transition-all duration-300 ${activeTab === 'user' ? 'w-10 bg-gradient-to-r from-blue-500 to-purple-500' : 'w-0'}`}></div>
                <UserIcon className={`w-6 h-6 transition-all duration-300 ${activeTab === 'user' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-xs transition-colors duration-300 ${activeTab === 'user' ? 'text-primary' : 'text-gray-400'}`}>我的</span>
            </div>
        </div>
    );
};

export default BottomNav;
