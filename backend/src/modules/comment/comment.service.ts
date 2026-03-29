import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateCommentDto) {
    const community = await this.prisma.community.findUnique({
      where: { id: BigInt(dto.communityId) },
    });

    if (!community || community.status !== 1 || community.deletedAt) {
      throw new NotFoundException('社区不存在');
    }

    return this.prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: {
          userId: BigInt(userId),
          communityId: BigInt(dto.communityId),
          content: dto.content,
          tags: dto.tags ?? [],
          images: dto.images ?? [],
          videos: dto.videos ?? [],
          rating: dto.rating,
          isAnonymous: dto.isAnonymous ?? false,
          status: 1,
        },
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              avatar: true,
            },
          },
        },
      });

      const oldRatingAvg = Number(community.ratingAvg);
      const oldCommentCount = community.commentCount;
      const newCommentCount = oldCommentCount + 1;
      const newRatingAvg =
        (oldRatingAvg * oldCommentCount + dto.rating) / newCommentCount;

      await tx.community.update({
        where: { id: BigInt(dto.communityId) },
        data: {
          commentCount: newCommentCount,
          ratingCount: community.ratingCount + 1,
          ratingAvg: newRatingAvg,
        },
      });

      return this.serializeComment(comment);
    });
  }

  async findAll(query: QueryCommentDto) {
    const { page = 1, limit = 20, communityId, sortBy = 'createdAt', order = 'desc' } =
      query;
    const skip = (page - 1) * limit;

    const where: Prisma.CommentWhereInput = {
      status: 1,
      parentId: null,
      deletedAt: null,
    };

    if (communityId) {
      where.communityId = BigInt(communityId);
    }

    const orderBy: Prisma.CommentOrderByWithRelationInput = {
      [sortBy]: order,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              avatar: true,
            },
          },
          community: {
            select: {
              id: true,
              name: true,
              district: true,
            },
          },
        },
      }),
      this.prisma.comment.count({ where }),
    ]);

    return {
      items: items.map((item) => this.serializeComment(item)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private serializeComment(item: any) {
    return {
      id: Number(item.id),
      userId: Number(item.userId),
      communityId: Number(item.communityId),
      content: item.content,
      tags: item.tags ?? [],
      images: item.images ?? [],
      videos: item.videos ?? [],
      rating: item.rating,
      likeCount: item.likeCount,
      replyCount: item.replyCount,
      reportCount: item.reportCount,
      status: item.status,
      isAnonymous: item.isAnonymous,
      isVerified: item.isVerified,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      user: item.user
        ? {
            id: Number(item.user.id),
            nickname: item.user.nickname,
            avatar: item.user.avatar,
          }
        : null,
      community: item.community
        ? {
            id: Number(item.community.id),
            name: item.community.name,
            district: item.community.district,
          }
        : null,
    };
  }
}
