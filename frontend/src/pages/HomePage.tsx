import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
            <div className="px-6 pt-8 pb-4 flex items-center justify-between sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-text-main dark:text-gray-100">
                        <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
                        <span className="font-bold text-lg leading-none">北京市</span>
                        <span className="material-symbols-outlined text-sm pt-0.5 text-text-muted">expand_more</span>
                    </div>
                    <span className="text-xs text-text-muted mt-1 ml-0.5">发现身边的美好社区</span>
                </div>
                <button className="relative flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[26px] text-text-main dark:text-gray-100">notifications_none</span>
                    <span className="absolute top-2 right-2.5 h-2 w-2 bg-primary rounded-full border border-background-light dark:border-background-dark"></span>
                </button>
            </div>

            <div className="px-6 mb-8 mt-2">
                <div className="relative flex items-center w-full h-14 rounded-full bg-surface-light dark:bg-surface-dark shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary/10">
                    <div className="flex items-center justify-center pl-5 pr-3 text-text-muted dark:text-gray-400">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="w-full bg-transparent border-none focus:ring-0 text-text-main dark:text-gray-100 placeholder:text-text-muted/60 dark:placeholder:text-gray-500 font-medium text-[15px] h-full py-0" placeholder="搜索小区或避雷信息" type="text" />
                    <div className="pr-2">
                        <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">tune</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex justify-between items-end px-6 mb-5">
                    <h2 className="text-xl font-bold text-text-main dark:text-gray-100 tracking-tight">推荐小区</h2>
                    <Link className="text-text-muted text-sm font-medium hover:text-primary transition-colors flex items-center gap-0.5" to="/community">
                        查看全部 <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </Link>
                </div>
                <div className="flex overflow-x-auto gap-5 px-6 pt-4 pb-4 -mt-4 no-scrollbar snap-x snap-mandatory">
                    <div className="snap-center shrink-0 flex-1 min-w-[260px] h-[340px] rounded-[24px] overflow-hidden relative shadow-soft group bg-surface-light dark:bg-surface-dark transform transition-transform hover:-translate-y-1 duration-300">
                        <img alt="Modern apartment complex with balconies and greenery" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYGS65YhEGX-VAmU5CqyDsgWyG8gaaZiuRfx-ekQzPIVLfxpzNq1djHcEn_13Y2gPwXAcpSFMjTsHmT4MGbi4WfKWLjQf0DtKHr9tNX6Pf4SohBiRPhuLJx870V_Am05iUBZo26_kmAtdd5ciku3xJA-cjgsuQYaGmr1g7Cd1wS3x9IjwLmrOwNOspzkjYUkqs3DdlU3ieyGSg7ycg0_unOdNX39XFQl0aqJ8S4Q__lfTOvih-8eZCo0sKlg8STlsvJZoxpaVnPQ" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-yellow-500 text-[16px] fill-1">star</span>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">4.9</span>
                        </div>
                        <div className="absolute bottom-6 left-5 right-5 text-white">
                            <h3 className="font-bold text-xl mb-1 tracking-wide">阳光锦城</h3>
                            <p className="text-sm opacity-90 font-medium mb-3 line-clamp-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">location_on</span> 朝阳区 · 建国路
                            </p>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-bold bg-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-400/30 text-emerald-100">绿化好</span>
                                <span className="text-[10px] font-bold bg-orange-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-orange-400/30 text-orange-100">近地铁</span>
                            </div>
                        </div>
                    </div>
                    <div className="snap-center shrink-0 flex-1 min-w-[260px] h-[340px] rounded-[24px] overflow-hidden relative shadow-soft group bg-surface-light dark:bg-surface-dark transform transition-transform hover:-translate-y-1 duration-300">
                        <img alt="Bright high-rise apartment building against blue sky" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYELfyEv7EK1UlHySb9Jpg-m9ses9RZ9ULQIVVVrABL76qXIokTpeSaFhOU6R8YyfWcpq2b1qPA5-r7xwhoAWIQPcTxvDektfOL0fgWGINGjJcjXzogA6koV8qBFTAfIBSBdDuvr-RhWaSWTNM8fW3Ao1VCSXbazPJ_Y9hwus34kys0VkAt3HFANJD2w06gXovGDY95Wlop7c_xexIdDv3I3WTcJ83bY7CrWcPker_MrF5fqEjtYiOmmgIRfJT-NEIPBL0ddkb3g" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-yellow-500 text-[16px] fill-1">star</span>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">4.7</span>
                        </div>
                        <div className="absolute bottom-6 left-5 right-5 text-white">
                            <h3 className="font-bold text-xl mb-1 tracking-wide">云尚国际</h3>
                            <p className="text-sm opacity-90 font-medium mb-3 line-clamp-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">location_on</span> 海淀区 · 中关村
                            </p>
                            <div className="flex gap-2">
                                <span className="text-[10px] font-bold bg-blue-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-blue-400/30 text-blue-100">安保严</span>
                                <span className="text-[10px] font-bold bg-purple-500/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-400/30 text-purple-100">设施新</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 mb-8">
                <div className="bg-[#fcf3eb] rounded-[24px] p-5 shadow-sm flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10 w-2/3">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold mb-2">
                            <span className="material-symbols-outlined text-[12px]">loyalty</span> 搬家特惠
                        </div>
                        <h3 className="font-bold text-[#8a5d3b] text-lg mb-1">省心搬家服务</h3>
                        <p className="text-xs text-[#a6866f] font-medium">专业团队，轻拿轻放，温馨送到家</p>
                        <button className="mt-3 bg-[#e69f69] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm hover:bg-[#d98b53] transition-colors">
                            立即预约
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-0 w-32 h-32 bg-no-repeat bg-contain bg-right-bottom opacity-90" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBJ-0S8s3_G7aKFKFWwm8wLEob_K3PVbXuqi3HKxKgmypBMVDdMTfoO3NEabxKb9vLXrXt1SpvMYyKsioqJ0CfBOZzM_pkRPMP4Hg6AmkMuvGNj7MuNfNrKlUcX29WtN8KpVUnCANpwWyZoFALStXxBezN00PMzCbYekUdHQDfjrUssfEY7fNQfuFfgxLig3TDagkXxMBKurT_AickewsyiXZCZKRITHaFK7oRdFEAwoxohxhkFk5LUOFEfoNrBYHnUOomm0vzUSw')" }}></div>
                </div>
            </div>

            <div className="px-6 mb-10">
                <h2 className="text-xl font-bold text-text-main dark:text-gray-100 mb-5 tracking-tight flex items-center gap-2">
                    租房避雷信息
                    <span className="material-symbols-outlined text-primary text-[20px]">warning</span>
                </h2>
                <div className="flex flex-col gap-4">
                    <div className="p-4 bg-surface-light dark:bg-surface-dark rounded-[20px] shadow-sm border border-[#f5e6d8] dark:border-gray-800">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500">
                                <span className="material-symbols-outlined text-[20px]">volume_off</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-text-main dark:text-gray-100 text-[15px]">时代绿洲小区</h4>
                                    <span className="text-[10px] text-text-muted">刚刚</span>
                                </div>
                                <p className="text-xs text-text-muted mb-2">3号楼</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug mb-3">
                                    墙壁薄得像纸一样，邻居晚上说话都能听得一清二楚，严重影响睡眠质量。看房时一定要注意隔音问题！
                                </p>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#fff0e6] text-[#e67326] border border-[#fcd5ba]">
                                        <span className="material-symbols-outlined text-[12px]">campaign</span> 隔音极差
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-surface-light dark:bg-surface-dark rounded-[20px] shadow-sm border border-[#f5e6d8] dark:border-gray-800">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                                <span className="material-symbols-outlined text-[20px]">gpp_bad</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-text-main dark:text-gray-100 text-[15px]">天诚家园附近</h4>
                                    <span className="text-[10px] text-text-muted">3小时前</span>
                                </div>
                                <p className="text-xs text-text-muted mb-2">黑中介曝光</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug mb-3">
                                    照片看着精装修，实地看房完全是另一个破旧的房子，还要求先交看房费。大家遇到这种直接拉黑！
                                </p>
                                <div className="flex gap-2">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#fff0e6] text-[#e67326] border border-[#fcd5ba]">
                                        <span className="material-symbols-outlined text-[12px]">photo_camera_back</span> 虚假房源
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#fff0e6] text-[#e67326] border border-[#fcd5ba]">
                                        <span className="material-symbols-outlined text-[12px]">report</span> 黑中介
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6">
                <h2 className="text-xl font-bold text-text-main dark:text-gray-100 mb-6 tracking-tight flex items-center gap-2">
                    最新评价
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                </h2>
                <div className="flex flex-col gap-5">
                    <div className="p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-card hover:shadow-md transition-shadow duration-300">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 relative">
                                <img alt="Profile picture of a smiling woman" className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-emerald-100 dark:ring-emerald-900 ring-offset-surface-light dark:ring-offset-surface-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk3In2cF6gSAIk-JJ1HCm-k5SrDYH4uZGtAb0WOPyieHEMcYSrpr1CXJmod2P29SybVs-Va1F85zBHbCFeBt3kjlrMmJJCzwwM4IMafJ-ZfKuYMtTp0j78U67ZO5t1WQfHuB6hsSAAGeAc64xELohV02BN0EhWU1DzaPIsu44W7wqGACNf1WhYaZBT5qobukutSsxRwUHx3_r0mNoHPA32z3MQmSup622a53jCODo7P_V7Gqqdhj2JvzwuFAzhWvY8DUZjl3WIAA" />
                                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full border-2 border-white dark:border-surface-dark">
                                    <span className="material-symbols-outlined text-[10px] block">verified</span>
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1.5">
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-gray-100 text-[15px]">陈静</h4>
                                        <p className="text-xs text-text-muted mt-0.5">评价了 <span className="font-semibold text-primary">香樟花园</span></p>
                                    </div>
                                    <span className="text-xs text-text-muted bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-lg">2小时前</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                    住这里最大的感受就是安全感满满。物业非常负责，进出都需要门禁卡，晚上保安巡逻也很勤快。绿化环境特别好，适合散步。
                                </p>
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800/30">
                                        <span className="material-symbols-outlined text-[14px]">shield</span> 安全系数高
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-lime-50 text-lime-600 dark:bg-lime-900/20 dark:text-lime-300 border border-lime-100 dark:border-lime-800/30">
                                        <span className="material-symbols-outlined text-[14px]">park</span> 环境优美
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
