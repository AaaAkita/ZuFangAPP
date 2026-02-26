import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('用户管理')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '获取当前登录用户的信息' })
    async getProfile(@CurrentUser() user: any) {
        return this.userService.findOne(Number(user.userId));
    }
}
