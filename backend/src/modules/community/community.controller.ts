import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CommunityService } from './community.service';
import { QueryCommunityDto } from './dto/query-community.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('小区管理')
@Controller('communities')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CommunityController {
    constructor(private readonly communityService: CommunityService) { }

    @Get()
    @ApiOperation({ summary: '分页查询小区列表 (支持坐标、关键字、城市、排序)' })
    async findAll(@Query() query: QueryCommunityDto) {
        return this.communityService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: '获取小区详情' })
    async findOne(@Param('id') id: string) {
        return this.communityService.findOne(Number(id));
    }
}
