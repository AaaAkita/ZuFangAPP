import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { SearchService } from './search.service';
import { GlobalSearchDto } from './dto/global-search.dto';

@ApiTags('搜索模块')
@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  @ApiOperation({ summary: '全局搜索（当前以社区为主）' })
  async search(@Req() req: any, @Query() dto: GlobalSearchDto) {
    let userId: number | null = null;
    const authHeader = req.headers?.authorization as string | undefined;

    if (authHeader?.startsWith('Bearer ')) {
      try {
        const payload = this.jwtService.decode(authHeader.slice(7)) as
          | { sub?: number | string }
          | null;
        if (payload?.sub) {
          userId = Number(payload.sub);
        }
      } catch {
        userId = null;
      }
    }

    return this.searchService.globalSearch(userId, dto);
  }

  @Get('suggestions')
  @ApiOperation({ summary: '搜索联想词' })
  @ApiQuery({ name: 'keyword', required: true, description: '输入关键词' })
  async getSuggestions(@Query('keyword') keyword: string) {
    return this.searchService.getSuggestions(keyword);
  }

  @Get('hot')
  @ApiOperation({ summary: '热门搜索榜单' })
  async getHotSearches() {
    return this.searchService.getHotSearches();
  }
}
