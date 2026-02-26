import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Rate, Button, Avatar, Divider, Tag } from 'antd';
import { LeftOutlined, ShareAltOutlined, EnvironmentOutlined, MessageOutlined, LikeOutlined, WarningOutlined } from '@ant-design/icons';
import { ShieldAlert, Car, Store } from 'lucide-react';

const { TabPane } = Tabs;

const CommunityDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('1');

    // 模拟小区数据
    const community = {
        name: id === '1' ? '阳光花园' : '模拟测试小区',
        address: '北京市朝阳区望京西路112号',
        rating: 4.5,
        warningIndex: 82, // 100满分
        tags: ['近地铁', '绿化好', '商圈核心'],
        price: '3500-6800',
        buildYear: '2015年'
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            {/* 沉浸式顶部 Banner (含导航) */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-indigo-500 to-purple-600">
                <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>

                {/* 导航头 */}
                <div className="absolute top-0 w-full p-4 flex justify-between items-center text-white z-10">
                    <div
                        className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex justify-center items-center cursor-pointer hover:bg-black/40 transition-colors"
                        onClick={() => navigate(-1)}
                    >
                        <LeftOutlined />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex justify-center items-center cursor-pointer hover:bg-black/40 transition-colors">
                        <ShareAltOutlined />
                    </div>
                </div>

                {/* 基础信息覆盖层 */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white z-10">
                    <div className="flex gap-2 mb-2">
                        {community.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-1">{community.name}</h1>
                    <div className="flex items-center text-sm md:text-base text-white/90">
                        <EnvironmentOutlined className="mr-1" />
                        {community.address}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto md:mt-8 px-4 md:px-0">

                {/* 数据面版 */}
                <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm p-5 md:p-8 -mt-6 relative z-20 mb-4 flex divide-x divide-gray-100">
                    <div className="flex-1 text-center">
                        <div className="text-xs md:text-sm text-gray-500 mb-1">综合评分</div>
                        <div className="text-2xl md:text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
                            {community.rating}
                            <Rate disabled defaultValue={community.rating} allowHalf className="text-sm md:text-base text-amber-500" />
                        </div>
                    </div>
                    <div className="flex-1 text-center">
                        <div className="text-xs md:text-sm text-gray-500 mb-1">避雷指数</div>
                        <div className="text-2xl md:text-3xl font-bold text-rose-500 flex justify-center items-center gap-1">
                            <ShieldAlert className="w-5 h-5 md:w-6 md:h-6" /> {community.warningIndex}
                        </div>
                    </div>
                    <div className="flex-1 text-center">
                        <div className="text-xs md:text-sm text-gray-500 mb-1">参考租金</div>
                        <div className="text-lg md:text-2xl font-bold text-primary">
                            <span className="text-sm">¥</span>{community.price}
                        </div>
                    </div>
                </div>

                {/* Tab 导航部分 */}
                <div className="bg-white rounded-xl shadow-sm mb-6 sticky top-0 z-30">
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        centered
                        size="large"
                        tabBarStyle={{ marginBottom: 0 }}
                    >
                        <TabPane tab="综合评价 (128)" key="1" />
                        <TabPane tab="避雷专区 (12)" key="2" />
                        <TabPane tab="周边配套与广告" key="3" />
                        <TabPane tab="交通设施推荐" key="4" />
                    </Tabs>
                </div>

                {/* Tab 内容区 */}
                <div className="min-h-[400px]">
                    {activeTab === '1' && (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <Avatar src={`https://api.dicebear.com/7.x/bottts/svg?seed=${i}`} />
                                            <div>
                                                <div className="font-medium text-sm">租客_{i}892</div>
                                                <div className="text-xs text-gray-400">入住: 3号楼2单元 · 2025-10</div>
                                            </div>
                                        </div>
                                        <Rate disabled defaultValue={5} className="text-sm text-amber-500" />
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        小区环境确实不错，物业响应速度也很快。就是到地铁站需要骑单车5分钟，总体性价比很高，没有碰到二房东的坑。
                                    </p>
                                    <div className="flex gap-4 text-xs text-gray-500">
                                        <span className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1"><LikeOutlined /> 12</span>
                                        <span className="cursor-pointer hover:text-primary transition-colors flex items-center gap-1"><MessageOutlined /> 3</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === '2' && (
                        <div className="space-y-4">
                            <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start gap-3">
                                <WarningOutlined className="text-rose-500 text-xl mt-1" />
                                <div>
                                    <h4 className="font-semibold text-rose-700 mb-1">重点避雷提示</h4>
                                    <p className="text-sm text-rose-600/80">根据 12 条真实租客反馈，该小区 "5号楼" 存在严重隔音问题，且附近有施工噪音干扰。</p>
                                </div>
                            </div>

                            {[1, 2].map(i => (
                                <div key={i} className="bg-white p-5 rounded-xl border-l-4 border-rose-400 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag color="error">违约二房东</Tag>
                                        <span className="text-xs text-gray-500">涉及区域：2号楼</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-3">
                                        提醒大家注意一个微信号叫xx的中介/二房东，收了定金后以各种理由不退款，并且房子存在严重漏水隐患，签约时完全没有告知。
                                    </p>
                                    <div className="text-xs text-gray-400 text-right">来自认证租客 · 1周前</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === '3' && (
                        <div className="space-y-4">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <Store className="text-indigo-500" /> 生活周边
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="text-sm font-medium mb-1">近距离商超</div>
                                        <div className="text-xs text-gray-500">距离 300m · 华联超市</div>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <div className="text-sm font-medium mb-1">医疗设施</div>
                                        <div className="text-xs text-gray-500">距离 1.2km · 市第一医院</div>
                                    </div>
                                </div>
                            </div>

                            {/* 小区详情页内的广告位 */}
                            <div className="relative rounded-xl overflow-hidden shadow-sm group cursor-pointer h-32 md:h-40 bg-gradient-to-r from-amber-400 to-orange-500 flex items-center px-6 md:px-10">
                                <div className="absolute top-0 right-0 p-2"><span className="text-[10px] bg-white/30 text-white px-2 py-0.5 rounded">广告</span></div>
                                <div className="text-white z-10 w-2/3">
                                    <h3 className="text-xl md:text-2xl font-bold mb-1">小区专属宽带特惠</h3>
                                    <p className="text-sm opacity-90">新装宽带首月免单，千兆光纤即日上门</p>
                                </div>
                                <div className="absolute right-[-10%] top-[-20%] w-[100px] h-[100px] bg-white/20 rounded-full blur-2xl"></div>
                            </div>
                        </div>
                    )}

                    {activeTab === '4' && (
                        <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
                            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                <Car className="text-blue-500" /> 地铁与公交专区
                            </h3>
                            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold">14</div>
                                    <div>
                                        <div className="text-sm font-medium">14号线 · 望京南站</div>
                                        <div className="text-xs text-gray-500">步行约 800 米 (10分钟)</div>
                                    </div>
                                </div>
                                <Tag color="processing">首选</Tag>
                            </div>
                            <div className="flex items-center justify-between pb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center font-bold">公</div>
                                    <div>
                                        <div className="text-sm font-medium">望京桥北公交站</div>
                                        <div className="text-xs text-gray-500">131路 / 404路 / 421路</div>
                                    </div>
                                </div>
                                <Tag>距离300m</Tag>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 底部悬浮操作栏（移动端适用，PC可转成普通按钮） */}
            <div className="fixed md:hidden bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center px-4 justify-between z-50">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1 cursor-pointer">
                        <ShareAltOutlined className="text-xl text-gray-500" />
                        <span className="text-[10px] text-gray-500">分享</span>
                    </div>
                    <Divider type="vertical" className="h-6 mt-1" />
                    <div className="flex flex-col items-center gap-1 cursor-pointer">
                        <WarningOutlined className="text-xl text-gray-500" />
                        <span className="text-[10px] text-gray-500">纠错</span>
                    </div>
                </div>
                <Button type="primary" size="large" className="rounded-full w-32 bg-gradient-to-r from-blue-500 to-indigo-600 border-none shadow-md">
                    去发评论
                </Button>
            </div>

        </div>
    );
};

export default CommunityDetail;
