import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-text-main dark:text-gray-100 min-h-screen flex flex-col antialiased">
            <main className="flex-1 w-full relative pb-28">
                <Outlet />
            </main>
            <BottomNav />
        </div>
    );
};

export default Layout;
