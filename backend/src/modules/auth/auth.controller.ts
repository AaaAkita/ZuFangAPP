import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { WechatLoginDto } from './dto/wechat-login.dto';

@ApiTags('认证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '手机号注册' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '手机号登录' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('wechat')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '微信 code 登录' })
  async wechatLogin(@Body() dto: WechatLoginDto) {
    return this.authService.wechatLogin(dto);
  }

  @Post('wechat/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '微信 refresh（仅已有微信账号）' })
  async refreshWechat(@Body() dto: WechatLoginDto) {
    return this.authService.refreshWechatToken(dto);
  }
}
