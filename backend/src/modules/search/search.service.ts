import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { GlobalSearchDto } from './dto/global-search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async globalSearch(userId: number | null, dto: GlobalSearchDto) {
    const { keyword, page = 1, limit = 20, city, sort = 'default' } = dto;
    const normalizedKeyword = keyword.trim();
    const skip = (page - 1) * limit;

    if (userId && normalizedKeyword) {
      await this.saveHistory(userId, normalizedKeyword);
    }
    if (normalizedKeyword) {
      await this.incrementHotSearch(normalizedKeyword);
    }

    const where: Prisma.CommunityWhereInput = {
      status: 1,
      deletedAt: null,
      OR: [
        { name: { contains: normalizedKeyword } },
        { address: { contains: normalizedKeyword } },
        { description: { contains: normalizedKeyword } },
      ],
    };

    if (city) where.city = city;

    const orderBy = this.getOrderBy(sort);

    const [items, total] = await this.prisma.$transaction([
      this.prisma.community.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.community.count({ where }),
    ]);

    return {
      items: items.map((item) => ({
        id: Number(item.id),
        name: item.name,
        district: item.district,
        city: item.city,
        address: item.address,
        coverImage: item.coverImage,
        tags: item.tags ?? [],
        highlights: item.highlights ?? [],
        ratingAvg: Number(item.ratingAvg),
        qualityScore: Number(item.qualityScore),
        riskScore: Number(item.riskScore),
        riskReason: item.riskReason,
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getSuggestions(keyword: string) {
    const normalizedKeyword = (keyword || '').trim();
    if (!normalizedKeyword) {
      return [];
    }

    const communities = await this.prisma.community.findMany({
      where: {
        status: 1,
        deletedAt: null,
        OR: [
          { name: { contains: normalizedKeyword } },
          { district: { contains: normalizedKeyword } },
        ],
      },
      select: {
        id: true,
        name: true,
        city: true,
        district: true,
      },
      take: 10,
      orderBy: [{ qualityScore: 'desc' }, { viewCount: 'desc' }],
    });

    return communities.map((item) => ({
      id: Number(item.id),
      name: item.name,
      city: item.city,
      district: item.district,
    }));
  }

  async getHotSearches() {
    return this.prisma.hotSearch.findMany({
      orderBy: [{ searchCount: 'desc' }, { updatedAt: 'desc' }],
      take: 15,
      select: {
        keyword: true,
        searchCount: true,
      },
    });
  }

  private getOrderBy(sort: string) {
    if (sort === 'hot') {
      return [{ viewCount: 'desc' as const }, { commentCount: 'desc' as const }];
    }
    if (sort === 'new') {
      return [{ createdAt: 'desc' as const }];
    }
    if (sort === 'risk') {
      return [{ riskScore: 'desc' as const }];
    }
    return [{ qualityScore: 'desc' as const }, { ratingAvg: 'desc' as const }];
  }

  private async saveHistory(userId: number, keyword: string) {
    await this.prisma.searchHistory.create({
      data: {
        userId: BigInt(userId),
        keyword,
        resultCount: 0,
      },
    });
  }

  private async incrementHotSearch(keyword: string) {
    const existing = await this.prisma.hotSearch.findUnique({ where: { keyword } });

    if (existing) {
      await this.prisma.hotSearch.update({
        where: { keyword },
        data: { searchCount: { increment: 1 } },
      });
      return;
    }

    await this.prisma.hotSearch.create({
      data: {
        keyword,
        searchCount: 1,
        rank: 0,
      },
    });
  }
}
