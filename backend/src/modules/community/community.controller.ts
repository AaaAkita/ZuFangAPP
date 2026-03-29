import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommunityService } from './community.service';
import { QueryCommunityDto } from './dto/query-community.dto';

@ApiTags('社区模块')
@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  @ApiOperation({ summary: '分页查询社区列表（支持关键词/城市/区域/排序）' })
  async findAll(@Query() query: QueryCommunityDto) {
    return this.communityService.findAll(query);
  }

  @Get('rankings/summary')
  @ApiOperation({ summary: '社区质量榜与风险榜摘要' })
  async getRankingSummary() {
    return this.communityService.getRankingSummary();
  }

  @Get(':id')
  @ApiOperation({ summary: '查询社区详情' })
  async findOne(@Param('id') id: string) {
    return this.communityService.findOne(Number(id));
  }
}
