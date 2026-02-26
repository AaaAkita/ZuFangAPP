import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import BottomNav from '../../components/layout/BottomNav';
import Footer from '../../components/layout/Footer';
import { Carousel as AntdCarousel } from 'antd';
import { ShieldAlert, ThumbsUp, Map, PlusCircle, Star, MessageSquare } from 'lucide-react';

const mockCommunities = [
    { id: 1, name: '阳光花园', rating: 4.5, comments: 128, price: 3500 },
    { id: 2, name: '绿地公馆', rating: 4.8, comments: 256, price: 5200 },
    { id: 3, name: '幸福新村', rating: 3.2, comments: 89, price: 2800 },
];

const mockWarnings = [
    { id: 1, title: '海龙源小区 3号楼', desc: '中介隐瞒漏水情况，入住后发现多处墙皮脱落', count: 12 },
    { id: 2, title: '书香门第 5号楼', desc: '隔音极差，半夜能清晰听到隔壁说话和走路声', count: 8 },
    { id: 3, title: '紫金公寓 2单元', desc: '二房东违约不退押金，已有多名租客被坑', count: 15 },
];

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            <Navbar />

            {/* Hero Banner Area */}
            <div className="relative pt-[72px] md:pt-24 px-5 md:px-10">
                <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg md:h-[400px]">
                    <AntdCarousel autoplay>
                        {/* Slide 1 */}
                        <div className="h-[200px] md:h-[400px] !flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 relative overflow-hidden group cursor-pointer p-6 md:p-16">
                            <div className="absolute inset-0 bg-[#ffffff10] mix-blend-overlay"></div>
                            <div className="relative z-10 w-full md:w-2/3">
                                <span className="inline-block px-3 py-1 bg-white/30 rounded-full text-xs font-semibold text-white mb-2 md:mb-4">官方推荐</span>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">租房避雷指南</h2>
                                <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-8">真实评论 · 合同验证 · 避免踩坑</p>
                                <button className="px-4 py-2 md:px-8 md:py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm md:text-base font-semibold transition-all backdrop-blur-sm">
                                    了解更多
                                </button>
                            </div>
                        </div>
                        {/* Slide 2 */}
                        <div className="h-[200px] md:h-[400px] !flex items-center justify-center bg-gradient-to-r from-emerald-400 to-cyan-500 relative overflow-hidden group cursor-pointer p-6 md:p-16">
                            <div className="absolute inset-0 bg-[#ffffff10] mix-blend-overlay"></div>
                            <div className="relative z-10 w-full md:w-2/3">
                                <span className="inline-block px-3 py-1 bg-white/30 rounded-full text-xs font-semibold text-white mb-2 md:mb-4">热门</span>
                                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">优质小区推荐</h2>
                                <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-8">精选高评分小区，让您的租房之旅更省心</p>
                                <button className="px-4 py-2 md:px-8 md:py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm md:text-base font-semibold transition-all backdrop-blur-sm">
                                    立即查看
                                </button>
                            </div>
                        </div>
                    </AntdCarousel>
                </div>
            </div>

            {/* Mobile Quick Actions (只在移动端展示) */}
            <div className="md:hidden grid grid-cols-4 gap-4 px-5 mt-6">
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-md group-hover:-translate-y-1 transition-transform">
                        <Map className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">找小区</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-md group-hover:-translate-y-1 transition-transform">
                        <ShieldAlert className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">避雷榜</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md group-hover:-translate-y-1 transition-transform">
                        <ThumbsUp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">推荐榜</span>
                </div>
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center shadow-md group-hover:-translate-y-1 transition-transform">
                        <PlusCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">发评论</span>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-5 md:px-10 mt-8 md:mt-16">

                {/* Main Content Areas */}
                <div className="flex justify-between items-end mb-6 text-gray-800">
                    <div>
                        <h2 className="text-xl md:text-3xl font-bold">热门小区</h2>
                        <p className="text-sm md:text-base text-gray-500 mt-1">发现附近高口碑的租房选择</p>
                    </div>
                    <a href="#" className="hidden md:block text-indigo-500 hover:text-indigo-600 font-medium text-sm">查看全部 &rarr;</a>
                </div>

                {/* Communities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {mockCommunities.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group border border-gray-100"
                            onClick={() => navigate(`/community/${item.id}`)}
                        >
                            <div className="h-40 md:h-48 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-black/10 mix-blend-overlay group-hover:scale-110 transition-transform duration-700"></div>
                                <Map className="w-12 h-12 text-indigo-300 relative z-10" />
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors mb-2">{item.name}</h3>
                                <div className="flex items-center gap-1 mb-3">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    <span className="text-amber-500 font-medium text-sm">{item.rating}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-50 pt-3">
                                    <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {item.comments}条评论</span>
                                    <span className="font-semibold text-gray-700">¥{item.price}/月起</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Banner Ad Area */}
                <div className="my-10 md:my-16 bg-gradient-to-r from-rose-400 to-orange-400 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow group">
                    <div className="absolute top-[-50%] right-[-10%] w-[100%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,transparent_70%)] rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
                    <div className="relative z-10 mb-6 md:mb-0">
                        <h3 className="text-xl md:text-3xl font-bold text-white mb-2">优质小区推流</h3>
                        <p className="text-sm md:text-base text-white/90 max-w-md">加入 VIP 会员，免费解锁全部高价值避雷报告与详细房间号</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 relative z-10">
                        <span className="px-2 py-1 bg-white/30 rounded text-xs text-white">广告</span>
                        <button className="px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-colors backdrop-blur">马上了解</button>
                    </div>
                </div>

                {/* Warning List Area */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldAlert className="w-6 h-6 text-rose-500" />
                        <h2 className="text-xl md:text-3xl font-bold text-gray-800">最新避雷</h2>
                    </div>
                    <p className="text-sm md:text-base text-gray-500 mb-6">前车之鉴，租房不踩坑</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-16">
                    {mockWarnings.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-rose-100 transition-all cursor-pointer flex items-start gap-4 md:gap-6 group"
                            onClick={() => navigate(`/community/1`)}
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ShieldAlert className="w-6 h-6 md:w-8 md:h-8 text-rose-500" />
                            </div>
                            <div className="flex-[1]">
                                <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-1.5">{item.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2 md:line-clamp-none">{item.desc}</p>
                            </div>
                            <div className="shrink-0 text-center">
                                <div className="text-lg md:text-2xl font-bold text-rose-500">{item.count}</div>
                                <div className="text-[10px] md:text-xs text-gray-400">避雷指数</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
            <BottomNav />
        </div>
    );
};

export default Home;
