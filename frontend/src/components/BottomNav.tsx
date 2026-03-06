import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: 'home', label: '首页' },
        { path: '/community', icon: 'explore', label: '发现' },
        { path: '/publish', icon: 'add', label: '发布', isCenter: true },
        { path: '/messages', icon: 'chat_bubble', label: '消息' },
        { path: '/login', icon: 'person', label: '我的' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light/95 dark:bg-surface-dark/95 border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 backdrop-blur-lg w-full">
            <div className="flex justify-around items-end px-2 pb-4 pt-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    if (item.isCenter) {
                        return (
                            <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1 flex-1 -mt-8 group">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_20px_-6px_rgba(238,124,43,0.5)] group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                                </div>
                                <span className="text-[10px] font-medium text-text-muted mt-1">{item.label}</span>
                            </Link>
                        );
                    }

                    return (
                        <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1 flex-1 group">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'text-text-muted group-hover:bg-gray-50 dark:group-hover:bg-white/5'}`}>
                                <span className={`material-symbols-outlined text-[24px] ${isActive ? 'fill-1' : ''}`}>{item.icon}</span>
                            </div>
                            <span className={`text-[10px] ${isActive ? 'font-bold text-primary' : 'font-medium text-text-muted'}`}>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
