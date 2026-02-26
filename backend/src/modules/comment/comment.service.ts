import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService) { }

    async create(userId: number, dto: CreateCommentDto) {
        const community = await this.prisma.community.findUnique({
            where: { id: BigInt(dto.communityId) },
        });

        if (!community) {
            throw new NotFoundException('找不到指定的小区信息');
        }

        return await this.prisma.$transaction(async (tx) => {
            // 插入评论
            const comment = await tx.comment.create({
                data: {
                    userId: BigInt(userId),
                    communityId: BigInt(dto.communityId),
                    content: dto.content,
                    images: dto.images ?? [],
                    videos: dto.videos ?? [],
                    rating: dto.rating,
                    status: 1, // 默认发布成功
                },
            });

            // 更新小区维度的统计：commentCount+1, ratingAvg重新算一遍或按照加权平均更合理
            const oldRatingAvg = Number(community.ratingAvg);
            const oldCommentCount = community.commentCount;
            const newCommentCount = oldCommentCount + 1;

            const newRatingAvg =
                (oldRatingAvg * oldCommentCount + dto.rating) / newCommentCount;

            await tx.community.update({
                where: { id: BigInt(dto.communityId) },
                data: {
                    commentCount: newCommentCount,
                    ratingAvg: newRatingAvg,
                },
            });

            return {
                ...comment,
                id: Number(comment.id),
                userId: Number(comment.userId),
                communityId: Number(comment.communityId),
            };
        });
    }

    async findAll(query: QueryCommentDto) {
        const { page = 1, limit = 20, communityId } = query;
        const skip = (page - 1) * limit;

        const where: Prisma.CommentWhereInput = {
            status: 1, // 正常显示的
            parentId: null, // 我们目前只查根评论
        };

        if (communityId) {
            where.communityId = BigInt(communityId);
        }

        const [items, total] = await this.prisma.$transaction([
            this.prisma.comment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            nickname: true,
                            avatar: true,
                        },
                    },
                },
            }),
            this.prisma.comment.count({ where }),
        ]);

        const formattedItems = items.map((item) => ({
            ...item,
            id: Number(item.id),
            userId: Number(item.userId),
            communityId: Number(item.communityId),
            user: item.user
                ? { ...item.user, id: Number(item.user.id) }
                : null,
        }));

        return {
            items: formattedItems,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
}
