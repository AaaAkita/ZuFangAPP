import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from 'antd';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-md transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'} h-[72px] hidden md:flex items-center justify-between px-10`}>
                <div className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-primary">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                        租房避雷
                    </span>
                </div>

                <div className="flex gap-8 items-center">
                    <div className="relative text-sm font-medium text-primary hover:text-indigo-500 cursor-pointer after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 transition-colors">
                        首页
                    </div>
                    <div className="relative text-sm font-medium text-gray-500 hover:text-indigo-500 cursor-pointer transition-colors hover:after:w-full after:w-0 after:transition-all after:duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600">
                        热门小区
                    </div>
                    <div className="relative text-sm font-medium text-gray-500 hover:text-indigo-500 cursor-pointer transition-colors hover:after:w-full after:w-0 after:transition-all after:duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600">
                        避雷榜
                    </div>
                    <div className="relative text-sm font-medium text-gray-500 hover:text-indigo-500 cursor-pointer transition-colors hover:after:w-full after:w-0 after:transition-all after:duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600">
                        推荐榜
                    </div>
                </div>

                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-80 focus-within:bg-white focus-within:shadow-[0_4px_12px_rgba(102,126,234,0.15)] transition-all duration-300 group">
                    <Search className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="搜索小区名称..."
                        className="flex-1 border-none bg-transparent text-sm ml-2 outline-none text-gray-800 placeholder-gray-400"
                    />
                </div>

                <div className="flex gap-3">
                    <Button>登录</Button>
                    <Button type="primary" className="bg-gradient-to-r from-indigo-500 to-purple-600 border-none hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">注册</Button>
                </div>
            </nav>

            {/* 移动端顶部状态区/简易搜索栏 */}
            <div className="md:hidden fixed top-0 w-full z-40 bg-white px-5 py-4 shadow-sm animate-[slideDown_0.5s_ease]">
                <div className="flex items-center gap-2 mb-3 text-base font-semibold text-gray-800">
                    <MapPin className="w-4 h-4" /> 北京 <span className="text-xs ml-1">▼</span>
                </div>
                <div className="h-12 bg-gradient-to-br from-gray-50 to-gray-200 rounded-full flex items-center px-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="搜索小区名称..."
                        className="flex-1 bg-transparent border-none text-base outline-none ml-3"
                    />
                </div>
            </div>
        </>
    );
};

export default Navbar;
