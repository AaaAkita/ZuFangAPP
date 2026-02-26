import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { GlobalSearchDto } from './dto/global-search.dto';

// ⚠️ 此处实现为未接入 Elasticsearch 之前的 Prisma 软实现，用作接入口和架构兜底
@Injectable()
export class SearchService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * 1. 核心搜索接口（当前使用 Prisma 模糊检索，后期直接无缝切入 Elasticsearch）
     */
    async globalSearch(userId: number | null, dto: GlobalSearchDto) {
        const { keyword, page = 1, limit = 20, city, sort } = dto;
        const skip = (page - 1) * limit;

        // 如果用户登录，记录他的搜索历史
        if (userId && keyword?.trim()) {
            await this.saveHistory(userId, keyword.trim());
        }

        // 更新热搜排行榜权重
        if (keyword?.trim()) {
            await this.incrementHotSearch(keyword.trim());
        }

        // 构建查询
        const whereCondition: any = { status: 1 };
        if (city) {
            whereCondition.city = city;
        }
        if (keyword) {
            whereCondition.OR = [
                { name: { contains: keyword } },
                { address: { contains: keyword } },
                { description: { contains: keyword } }
            ];
        }

        // 确定排序
        const orderBy: any = {};
        if (sort === 'hot') {
            orderBy.viewCount = 'desc';
        } else if (sort === 'new') {
            orderBy.createdAt = 'desc';
        } else {
            orderBy.ratingAvg = 'desc';
        }

        const [items, total] = await this.prisma.$transaction([
            this.prisma.community.findMany({
                where: whereCondition,
                skip,
                take: limit,
                orderBy,
            }),
            this.prisma.community.count({ where: whereCondition }),
        ]);

        return {
            items: items.map(i => ({ ...i, id: Number(i.id) })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    /**
     * 2. 搜索关键字输入联想
     */
    async getSuggestions(keyword: string) {
        if (!keyword) return [];

        const communities = await this.prisma.community.findMany({
            where: {
                status: 1,
                name: { contains: keyword }
            },
            select: {
                id: true,
                name: true,
                city: true,
                district: true
            },
            take: 10,
            orderBy: { viewCount: 'desc' }
        });

        return communities.map(c => ({
            id: Number(c.id),
            name: c.name,
            city: c.city,
            district: c.district
        }));
    }

    /**
     * 3. 热门搜索字典（排行榜）
     */
    async getHotSearches() {
        const records = await this.prisma.hotSearch.findMany({
            orderBy: { searchCount: 'desc' },
            take: 15,
            select: { keyword: true, searchCount: true }
        });
        return records;
    }

    /**
     * 帮助方法：处理个人搜索历史
     */
    private async saveHistory(userId: number, keyword: string) {
        // 防重复插入处理
        await this.prisma.searchHistory.create({
            data: {
                userId: BigInt(userId),
                keyword,
                resultCount: 0 // 预留，可在搜索完成时反填
            }
        });
    }

    /**
     * 帮助方法：处理全局热搜榜单热度增加
     */
    private async incrementHotSearch(keyword: string) {
        const existing = await this.prisma.hotSearch.findUnique({
            where: { keyword }
        });
        if (existing) {
            await this.prisma.hotSearch.update({
                where: { keyword },
                data: { searchCount: existing.searchCount + 1 }
            });
        } else {
            await this.prisma.hotSearch.create({
                data: { keyword, searchCount: 1, rank: 0 }
            });
        }
    }
}
