import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { GlobalSearchDto } from './dto/global-search.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('高级搜索模块')
@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService,
        private readonly jwtService: JwtService
    ) { }

    @Get()
    @ApiOperation({ summary: '执行全局检索 (目前支持查询小区)' })
    async search(@Req() req: any, @Query() dto: GlobalSearchDto) {
        let userId = null;
        const authHeader = req.headers?.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7, authHeader.length);
            try {
                const payload = this.jwtService.verify(token, { ignoreExpiration: false });
                userId = Number(payload.sub);
            } catch (e) {
                // 静默处理，非强鉴权接口
            }
        }
        return this.searchService.globalSearch(userId, dto);
    }

    @Get('suggestions')
    @ApiOperation({ summary: '输入实时搜索下拉联想' })
    @ApiQuery({ name: 'keyword', required: true, description: '当前输入的字符' })
    async getSuggestions(@Query('keyword') keyword: string) {
        return this.searchService.getSuggestions(keyword);
    }

    @Get('hot')
    @ApiOperation({ summary: '热搜榜单 (全量)' })
    async getHotSearches() {
        return this.searchService.getHotSearches();
    }
}
