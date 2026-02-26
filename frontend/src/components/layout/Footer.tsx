import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="hidden md:block bg-gray-800 text-white py-16 px-10 mt-16">
            <div className="max-w-6xl mx-auto grid grid-cols-4 gap-10">
                <div>
                    <h3 className="text-lg font-semibold mb-5">关于我们</h3>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">平台介绍</a>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">联系方式</a>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">加入我们</a>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-5">帮助中心</h3>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">使用指南</a>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">常见问题</a>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">意见反馈</a>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-5">法律声明</h3>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">服务协议</a>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">隐私政策</a>
                    <a href="#" className="block text-gray-400 hover:text-white mb-3 text-sm transition-colors">免责声明</a>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-5">关注我们</h3>
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                            WX
                        </div>
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                            WB
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-10 pt-10 border-t border-gray-700 text-center text-gray-400 text-sm">
                <p>© 2026 租房避雷APP. All rights reserved.</p>
                <p className="mt-2">京ICP备XXXXXXX号-1</p>
            </div>
        </footer>
    );
};

export default Footer;
