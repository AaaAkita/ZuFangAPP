import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HomeService } from './home.service';

@ApiTags('首页模块')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @ApiOperation({ summary: '首页聚合数据' })
  async getHomeData() {
    return this.homeService.getHomeData();
  }
}
