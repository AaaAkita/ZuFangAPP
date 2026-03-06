import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-color bg-background-light/95 backdrop-blur-md px-6 py-4 lg:px-40">
            <Link to="/" className="flex items-center gap-3 text-text-main">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl">home</span>
                </div>
                <h2 className="text-text-main text-2xl font-black tracking-wider">租房避雷网</h2>
            </Link>
            <div className="hidden lg:flex flex-1 justify-end gap-8">
                <nav className="flex items-center gap-8">
                    <Link className="text-text-main hover:text-primary transition-colors text-base font-bold leading-normal" to="/">首页</Link>
                    <Link className="text-text-main hover:text-primary transition-colors text-base font-bold leading-normal" to="/community">互助社区</Link>
                    <Link className="text-text-main hover:text-primary transition-colors text-base font-bold leading-normal" to="/about">关于我们</Link>
                    <Link className="text-text-main hover:text-primary transition-colors text-base font-bold leading-normal" to="/safety">安全指南</Link>
                </nav>
                <div className="flex gap-3">
                    <Link to="/login" className="flex items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-surface-light border-2 border-border-color hover:border-primary/50 text-text-main hover:text-primary text-base font-bold transition-all duration-300">
                        <span className="truncate">登录</span>
                    </Link>
                    <Link to="/register" className="flex items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-lg shadow-primary/20 transition-all duration-300">
                        <span className="truncate">注册</span>
                    </Link>
                </div>
            </div>
            <button className="lg:hidden p-2 text-text-main rounded-full hover:bg-border-color transition-colors">
                <span className="material-symbols-outlined">menu</span>
            </button>
        </header>
    );
}
