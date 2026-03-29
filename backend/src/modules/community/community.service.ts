import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { QueryCommunityDto } from './dto/query-community.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryCommunityDto) {
    const { page = 1, limit = 20, keyword, city, district, sortBy, order } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.CommunityWhereInput = {
      status: 1,
      deletedAt: null,
    };

    if (city) where.city = city;
    if (district) where.district = district;
    if (keyword) {
      where.OR = [
        { name: { contains: keyword } },
        { address: { contains: keyword } },
        { description: { contains: keyword } },
      ];
    }

    const sortableMap: Record<
      string,
      keyof Prisma.CommunityOrderByWithRelationInput
    > = {
      ratingAvg: 'ratingAvg',
      commentCount: 'commentCount',
      createdAt: 'createdAt',
      qualityScore: 'qualityScore',
      riskScore: 'riskScore',
      viewCount: 'viewCount',
    };

    const orderByField = sortBy ? sortableMap[sortBy] : undefined;
    const orderBy: Prisma.CommunityOrderByWithRelationInput = orderByField
      ? { [orderByField]: order === 'asc' ? 'asc' : 'desc' }
      : { createdAt: 'desc' };

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
      items: items.map((item) => this.serializeCommunity(item)),
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

    if (!community || community.status !== 1 || community.deletedAt) {
      throw new NotFoundException('社区不存在');
    }

    return this.serializeCommunity(community);
  }

  async getRankingSummary() {
    const [qualityRanking, riskRanking] = await this.prisma.$transaction([
      this.prisma.community.findMany({
        where: { status: 1, deletedAt: null },
        orderBy: [{ qualityScore: 'desc' }, { commentCount: 'desc' }],
        take: 5,
      }),
      this.prisma.community.findMany({
        where: { status: 1, deletedAt: null },
        orderBy: [{ riskScore: 'desc' }, { commentCount: 'desc' }],
        take: 5,
      }),
    ]);

    return {
      qualityRanking: qualityRanking.map((item) => this.serializeCommunity(item)),
      riskRanking: riskRanking.map((item) => this.serializeCommunity(item)),
    };
  }

  private serializeCommunity(item: Prisma.CommunityGetPayload<Record<string, never>>) {
    return {
      id: Number(item.id),
      name: item.name,
      province: item.province,
      city: item.city,
      district: item.district,
      address: item.address,
      longitude: Number(item.longitude),
      latitude: Number(item.latitude),
      propertyType: item.propertyType,
      buildYear: item.buildYear,
      developer: item.developer,
      propertyCompany: item.propertyCompany,
      propertyFee: item.propertyFee ? Number(item.propertyFee) : null,
      greenRate: item.greenRate ? Number(item.greenRate) : null,
      plotRate: item.plotRate ? Number(item.plotRate) : null,
      totalBuildings: item.totalBuildings,
      totalHouseholds: item.totalHouseholds,
      parkingSpaces: item.parkingSpaces,
      description: item.description,
      coverImage: item.coverImage,
      images: item.images,
      tags: item.tags,
      highlights: item.highlights,
      facilities: item.facilities,
      qualityScore: Number(item.qualityScore),
      riskScore: Number(item.riskScore),
      riskReason: item.riskReason,
      safetyScore: Number(item.safetyScore),
      quietnessScore: Number(item.quietnessScore),
      valueScore: Number(item.valueScore),
      ratingAvg: Number(item.ratingAvg),
      ratingCount: item.ratingCount,
      commentCount: item.commentCount,
      viewCount: item.viewCount,
      favoriteCount: item.favoriteCount,
      isRecommended: item.isRecommended,
      recommendOrder: item.recommendOrder,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
