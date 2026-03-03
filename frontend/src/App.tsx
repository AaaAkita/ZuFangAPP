
export default function App() {
    return (
        <>

            <div className="layout-container flex h-full grow flex-col">
                <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border-color bg-background-light/95 backdrop-blur-md px-6 py-4 lg:px-40">
                    <div className="flex items-center gap-3 text-text-main">
                        <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">home</span>
                        </div>
                        <h2 className="text-text-main text-2xl font-black tracking-wider">租房避雷网</h2>
                    </div>
                    <div className="hidden lg:flex flex-1 justify-end gap-8">
                        <nav className="flex items-center gap-8">
                            <a className="text-text-main hover:text-primary transition-colors text-base font-bold leading-normal" href="#">首页</a>
                            <a className="text-text-main hover:text-primary transition-colors text-base font-bold leading-normal" href="#">互助社区</a>
                            <a className="text-text-main hover:text-primary transition-colors text-base font-bold leading-normal" href="#">关于我们</a>
                            <a className="text-text-main hover:text-primary transition-colors text-base font-bold leading-normal" href="#">安全指南</a>
                        </nav>
                        <div className="flex gap-3">
                            <button className="flex items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-surface-light border-2 border-border-color hover:border-primary/50 text-text-main hover:text-primary text-base font-bold transition-all duration-300">
                                <span className="truncate">登录</span>
                            </button>
                            <button className="flex items-center justify-center overflow-hidden rounded-full h-11 px-6 bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-lg shadow-primary/20 transition-all duration-300">
                                <span className="truncate">注册</span>
                            </button>
                        </div>
                    </div>
                    <button className="lg:hidden p-2 text-text-main rounded-full hover:bg-border-color transition-colors">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </header>
                <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 lg:px-40 py-8">
                    <div className="relative w-full rounded-3xl overflow-hidden min-h-[560px] flex items-center justify-center p-8 lg:p-12 mb-16 shadow-soft group border border-border-color/50" style={{ "background": "linear-gradient(135deg, rgba(242, 140, 75, 0.08) 0%, rgba(254, 250, 246, 1) 50%, rgba(168, 123, 93, 0.08) 100%)" }}>
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                            <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[80px]"></div>
                            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[60px]"></div>
                            <div className="absolute bottom-[10%] left-[20%] w-[25%] h-[25%] rounded-full bg-primary/10 blur-[70px]"></div>
                        </div>
                        <div className="relative z-10 flex flex-col gap-8 max-w-3xl items-center text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white shadow-sm">
                                <span className="material-symbols-outlined text-primary text-lg">favorite</span>
                                <span className="text-secondary text-sm font-bold tracking-wide">超过 50,000 名租客信赖</span>
                            </div>
                            <h1 className="text-text-main text-5xl lg:text-7xl font-black leading-tight tracking-normal">
                                一起寻找<span className="text-primary relative inline-block">安全的家
                                    <svg className="absolute w-full h-4 -bottom-1 left-0 text-primary/30 z-[-1]" fill="currentColor" viewBox="0 0 100 10"><path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z"></path></svg>
                                </span>
                            </h1>
                            <p className="text-text-muted text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
                                加入互助社区，避开租房陷阱，发现安全、温馨的居住空间。你的安心，从这里开始。
                            </p>
                            <div className="w-full max-w-xl mt-4">
                                <label className="relative flex items-center w-full h-16 rounded-full shadow-soft bg-white group-focus-within:ring-4 ring-primary/20 transition-all duration-300 border border-border-color/50">
                                    <div className="flex items-center justify-center pl-6 text-primary">
                                        <span className="material-symbols-outlined text-2xl">search</span>
                                    </div>
                                    <input className="w-full h-full bg-transparent border-none text-text-main placeholder:text-text-muted/60 text-lg px-4 focus:ring-0 focus:outline-none" placeholder="输入小区名、地址或房东姓名" type="text" />
                                    <div className="pr-2">
                                        <button className="h-12 px-8 rounded-full bg-primary hover:bg-primary-hover text-white text-base font-bold shadow-md shadow-primary/30 transition-all duration-300 flex items-center gap-2">
                                            <span>搜索</span>
                                        </button>
                                    </div>
                                </label>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3 mt-4 items-center">
                                <span className="text-sm font-bold text-text-muted tracking-wide mr-2">热门搜索:</span>
                                <a className="px-5 py-2 rounded-full bg-white/60 hover:bg-white border-2 border-transparent hover:border-primary/30 text-sm font-medium text-secondary transition-all shadow-sm" href="#">#靠谱房东</a>
                                <a className="px-5 py-2 rounded-full bg-white/60 hover:bg-white border-2 border-transparent hover:border-primary/30 text-sm font-medium text-secondary transition-all shadow-sm" href="#">#押金退还</a>
                                <a className="px-5 py-2 rounded-full bg-white/60 hover:bg-white border-2 border-transparent hover:border-primary/30 text-sm font-medium text-secondary transition-all shadow-sm" href="#">#合同审核</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-12 py-12">
                        <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
                            <h2 className="text-text-main text-3xl lg:text-4xl font-black tracking-normal">为什么选择租房避雷网？</h2>
                            <p className="text-text-muted text-lg font-medium">
                                我们坚信透明与善意。分享你的经历，帮助他人在城市中找到避风港。
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="group flex flex-col items-center text-center gap-5 p-10 rounded-3xl bg-surface-light border-2 border-border-color hover:border-primary/30 shadow-sm hover:shadow-soft transition-all duration-300">
                                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl">verified</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-text-main text-xl font-bold">社区真实认证</h3>
                                    <p className="text-text-muted leading-relaxed font-medium">每条评价均由社区成员审核，确保内容真实有用，过滤虚假信息。</p>
                                </div>
                            </div>
                            <div className="group flex flex-col items-center text-center gap-5 p-10 rounded-3xl bg-surface-light border-2 border-border-color hover:border-primary/30 shadow-sm hover:shadow-soft transition-all duration-300">
                                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl">shield_locked</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-text-main text-xl font-bold">安全且匿名</h3>
                                    <p className="text-text-muted leading-relaxed font-medium">无所畏惧地分享你的故事。提供匿名发布选项，你的隐私安全是我们的首要任务。</p>
                                </div>
                            </div>
                            <div className="group flex flex-col items-center text-center gap-5 p-10 rounded-3xl bg-surface-light border-2 border-border-color hover:border-primary/30 shadow-sm hover:shadow-soft transition-all duration-300">
                                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-text-main text-xl font-bold">温暖互助网络</h3>
                                    <p className="text-text-muted leading-relaxed font-medium">与有相似经历的人建立联系。获取建议、法律援助以及情感支持。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-16">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10 px-4">
                            <div>
                                <h2 className="text-text-main text-3xl lg:text-4xl font-black tracking-normal mb-3">最新避雷提醒</h2>
                                <p className="text-text-muted text-lg font-medium">了解您所在地区最近的租房报告。</p>
                            </div>
                            <a className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-hover transition-colors px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20" href="#">
                                查看所有报告
                                <span className="material-symbols-outlined text-xl">arrow_forward</span>
                            </a>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="flex flex-col sm:flex-row items-stretch bg-surface-light rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 border-2 border-border-color group">
                                <div className="sm:w-2/5 min-h-[220px] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Modern apartment building facade with balconies" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjZyljFEwJmaURBEjfFA0msvj6moPFnplwBURH3z77vozc9aoOZg6C2FxC8BItb4LME7_i7kCZmKvzLddwyTN0AFHkHa1V1IpJerVZocNhlMYFfwjHd68kwUR5JITCpzzNryE2q6RcLar7K0Y61s9DS3Tz_JPWVxt7IuLxA1ixvauTWDQzKotoxjPfB_CRW1gmn6HR-QtEuNJh1Cz5vkWGHKwT96HnBUq2GjJFZstJLR_ytgsGQGUxzpRWd9jxvj98M61whdVL8w')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-l opacity-60"></div>
                                    <div className="absolute top-4 left-4 bg-red-50 text-red-600 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-base">plumbing</span>
                                        设施维修
                                    </div>
                                </div>
                                <div className="flex-1 p-8 flex flex-col justify-between gap-5">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-text-muted font-medium flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-base">schedule</span> 2小时前
                                            </span>
                                            <span className="text-sm text-secondary font-bold bg-secondary/10 px-3 py-1.5 rounded-full">朝阳区, 北京</span>
                                        </div>
                                        <h3 className="text-text-main text-xl font-bold leading-tight mb-3">阳光海岸小区 3号楼</h3>
                                        <p className="text-text-muted text-base line-clamp-2 leading-relaxed">卫生间持续漏水，多次书面请求房东维修均遭到无视或拖延，严重影响正常生活...</p>
                                    </div>
                                    <button className="self-start text-primary text-base font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all bg-primary/5 hover:bg-primary/10 px-5 py-2.5 rounded-full">
                                        阅读完整报告 <span className="material-symbols-outlined text-base">arrow_right_alt</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch bg-surface-light rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 border-2 border-border-color group">
                                <div className="sm:w-2/5 min-h-[220px] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Interior of a cozy living room with sunlight" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDyPc_vTUDVGTH30sOcAsPvq7ZwlsgxX2UiyotzD6pPb-Ts9vORLtxf9CKgaMcJqkAXRS7WWyx55wPo99TNJxDKYgnH36PLvqXU8sAKivJRriXl8wkmcgod2wWtONMirR2C4uS5kxBAMbEohWsySGtP9WmYxr_Qe2Ua0rkcjeai5MVEsr8npd4uG0Zb1im6cQ8cxiMhibr-S9dT8FsNFsDUwEsGquklTiV7HfmI4FgwkIXaRQav0csnyPek-w9oUyPQ3Wea43PSEg')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-l opacity-60"></div>
                                    <div className="absolute top-4 left-4 bg-orange-50 text-orange-600 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-base">payments</span>
                                        押金纠纷
                                    </div>
                                </div>
                                <div className="flex-1 p-8 flex flex-col justify-between gap-5">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-text-muted font-medium flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-base">schedule</span> 5小时前
                                            </span>
                                            <span className="text-sm text-secondary font-bold bg-secondary/10 px-3 py-1.5 rounded-full">南山区, 深圳</span>
                                        </div>
                                        <h3 className="text-text-main text-xl font-bold leading-tight mb-3">科技园人才公寓</h3>
                                        <p className="text-text-muted text-base line-clamp-2 leading-relaxed">退房时房东以各种不合理的理由克扣押金，将入住前已存在的划痕归咎于我...</p>
                                    </div>
                                    <button className="self-start text-primary text-base font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all bg-primary/5 hover:bg-primary/10 px-5 py-2.5 rounded-full">
                                        阅读完整报告 <span className="material-symbols-outlined text-base">arrow_right_alt</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch bg-surface-light rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 border-2 border-border-color group">
                                <div className="sm:w-2/5 min-h-[220px] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Kitchen area with modern appliances" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDha02CezCE_Fa0zZGKsA6w82YqtscW-XRwFtKP31vFJhsVJvOHUCTpQsakEqXLEDAONvEzqxQ01dUBxxiuB3Tm4do_UhQOH8Ec-kNOrm2UjSee1TDdZGKS72ble85ngGBRpTsE-eydRX1h0ROvpD20fRhuDhNM1mrV53EmKwqBmW8IgeD-5rBsAV-bmdq3lL3VJUDH4fojXPq9OAv-wo3pPjZOAAY83EiaqXuixihE5LodV_gZW9h74EBvjGbROvIXFZMGwZyXeA')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-l opacity-60"></div>
                                    <div className="absolute top-4 left-4 bg-yellow-50 text-yellow-700 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-base">bug_report</span>
                                        虫害问题
                                    </div>
                                </div>
                                <div className="flex-1 p-8 flex flex-col justify-between gap-5">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-text-muted font-medium flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-base">schedule</span> 1天前
                                            </span>
                                            <span className="text-sm text-secondary font-bold bg-secondary/10 px-3 py-1.5 rounded-full">黄浦区, 上海</span>
                                        </div>
                                        <h3 className="text-text-main text-xl font-bold leading-tight mb-3">老弄堂改造单间</h3>
                                        <p className="text-text-muted text-base line-clamp-2 leading-relaxed">整栋楼存在严重的蟑螂问题。物业虽然叫过几次杀虫，但根本无法彻底解决问题。</p>
                                    </div>
                                    <button className="self-start text-primary text-base font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all bg-primary/5 hover:bg-primary/10 px-5 py-2.5 rounded-full">
                                        阅读完整报告 <span className="material-symbols-outlined text-base">arrow_right_alt</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-stretch bg-surface-light rounded-3xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 border-2 border-border-color group">
                                <div className="sm:w-2/5 min-h-[220px] relative overflow-hidden">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Small cozy bedroom with window" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCd49bk-74DhiLOSPmZvU-yRpM7Y00880MF1p9o2Utn4_LZg0EqE0R1-7pl9Ytat0sjNwP7MttaWEspzZH9Exog2abZb2G8ur6jXI_2m-pYh4_ZOJxWdhFl0Ldq-p3jabkjBkjRExtf9tGIbJkzLXx2bX95onic5JztdMbupD55RzA-0vU2VRyZ-8M7wH1u4HLJR8HGZUs5lAjnPQ8SZbIZ3b3Y0N0VSz_zfxUwR7qMQwlJbuR87uRLHhiaDPOLcz_wYFh9FDHPYg')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent sm:bg-gradient-to-l opacity-60"></div>
                                    <div className="absolute top-4 left-4 bg-blue-50 text-blue-600 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-base">gavel</span>
                                        法律违规
                                    </div>
                                </div>
                                <div className="flex-1 p-8 flex flex-col justify-between gap-5">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-text-muted font-medium flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-base">schedule</span> 2天前
                                            </span>
                                            <span className="text-sm text-secondary font-bold bg-secondary/10 px-3 py-1.5 rounded-full">天河区, 广州</span>
                                        </div>
                                        <h3 className="text-text-main text-xl font-bold leading-tight mb-3">绿湖花园合租房</h3>
                                        <p className="text-text-muted text-base line-clamp-2 leading-relaxed">房东在未提前通知的情况下多次擅自进入出租屋，严重侵犯隐私权并违反租赁合同。</p>
                                    </div>
                                    <button className="self-start text-primary text-base font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all bg-primary/5 hover:bg-primary/10 px-5 py-2.5 rounded-full">
                                        阅读完整报告 <span className="material-symbols-outlined text-base">arrow_right_alt</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 text-center">
                            <button className="px-10 py-4 rounded-full bg-surface-light border-2 border-border-color text-text-main font-bold hover:bg-white hover:text-primary hover:border-primary/50 hover:shadow-md transition-all">
                                加载更多报告
                            </button>
                        </div>
                    </div>
                    <div className="rounded-[3rem] bg-gradient-to-br from-[#f28c4b] to-[#e06d2c] relative overflow-hidden text-white p-16 lg:p-24 text-center mb-12 shadow-2xl shadow-primary/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md mb-2 shadow-inner border border-white/30">
                                <span className="material-symbols-outlined text-5xl">edit_square</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black tracking-normal">有故事想分享？</h2>
                            <p className="text-xl lg:text-2xl font-medium max-w-3xl opacity-95 leading-relaxed">
                                你的经验可能会让别人免受一场租房噩梦。加入我们的社区，帮助每个人创造一个更安全的租房市场。
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 mt-6">
                                <button className="px-10 py-4 rounded-full bg-white text-primary text-lg font-black shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                    撰写评价
                                </button>
                                <button className="px-10 py-4 rounded-full bg-transparent border-2 border-white/80 text-white text-lg font-black hover:bg-white/10 transition-all duration-300">
                                    加入社区
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
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
            </div>

        </>
    );
}
