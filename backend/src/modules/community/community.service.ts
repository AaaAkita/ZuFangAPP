import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QueryCommunityDto } from './dto/query-community.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommunityService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(query: QueryCommunityDto) {
        const { page = 1, limit = 20, keyword, city, district, sortBy, order } = query;
        const skip = (page - 1) * limit;

        const where: Prisma.CommunityWhereInput = {
            status: 1, // 只展示正常启用的
        };

        if (city) {
            where.city = city;
        }

        if (district) {
            where.district = district;
        }

        if (keyword) {
            where.OR = [
                { name: { contains: keyword } },
                { address: { contains: keyword } },
            ];
        }

        const orderBy: Prisma.CommunityOrderByWithRelationInput = {};
        if (sortBy && ['ratingAvg', 'commentCount', 'createdAt'].includes(sortBy)) {
            (orderBy as any)[sortBy] = order === 'asc' ? 'asc' : 'desc';
        } else {
            orderBy.createdAt = 'desc';
        }

        const [items, total] = await this.prisma.$transaction([
            this.prisma.community.findMany({
                where,
                skip,
                take: limit,
                orderBy,
            }),
            this.prisma.community.count({ where }),
        ]);

        const formattedItems = items.map((item) => {
            // 避免 BigInt 等不能直接被返回
            return {
                ...item,
                id: Number(item.id),
            };
        });

        return {
            items: formattedItems,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findOne(id: number) {
        const community = await this.prisma.community.findUnique({
            where: { id: BigInt(id) },
        });

        if (!community) {
            throw new NotFoundException('小区不存在');
        }

        // 我们在这里先直接转换一下以满足格式需要
        return {
            ...community,
            id: Number(community.id)
        };
    }
}
