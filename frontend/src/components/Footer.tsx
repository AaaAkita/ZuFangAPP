export default function Footer() {
    return (
        <footer className="bg-surface-light border-t border-border-color pt-20 pb-10 px-4 lg:px-40">
            <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                <div className="flex flex-col gap-6 max-w-sm">
                    <div className="flex items-center gap-3 text-text-main">
                        <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">home</span>
                        </div>
                        <h2 className="text-xl font-black tracking-wider">租房避雷网</h2>
                    </div>
                    <p className="text-text-muted text-base leading-relaxed font-medium">
                        建立一个透明、安全、友善的租房社区。我们通过每一条真实评价，帮助租客找到安心的家。
                    </p>
                </div>
                <div className="flex gap-16 flex-wrap">
                    <div className="flex flex-col gap-5">
                        <h3 className="text-text-main font-bold text-lg">平台服务</h3>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">搜索房源</a>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">撰写评价</a>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">互助论坛</a>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h3 className="text-text-main font-bold text-lg">资源帮助</h3>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">安全指南</a>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">租客权益</a>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">法律援助</a>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h3 className="text-text-main font-bold text-lg">关于公司</h3>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">关于我们</a>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">联系方式</a>
                        <a className="text-text-muted hover:text-primary text-base font-medium transition-colors" href="#">隐私政策</a>
                    </div>
                </div>
            </div>
            <div className="border-t border-border-color pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-text-muted text-sm font-medium">© 2023 租房避雷网. 保留所有权利。</p>
                <div className="flex gap-6">
                    <a className="text-text-muted hover:text-primary transition-colors bg-surface-light p-2 rounded-full border border-border-color hover:border-primary/30 shadow-sm" href="#"><span className="material-symbols-outlined">public</span></a>
                    <a className="text-text-muted hover:text-primary transition-colors bg-surface-light p-2 rounded-full border border-border-color hover:border-primary/30 shadow-sm" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
                </div>
            </div>
        </footer>
    );
}
