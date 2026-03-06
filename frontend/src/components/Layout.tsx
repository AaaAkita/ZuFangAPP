import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <div className="layout-container flex h-full grow flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}
