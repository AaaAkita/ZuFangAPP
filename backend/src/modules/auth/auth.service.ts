import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { WechatLoginDto } from './dto/wechat-login.dto';

type WechatSessionResult = {
  openid?: string;
  unionid?: string;
  session_key?: string;
  errcode?: number;
  errmsg?: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (existingUser) {
      throw new ConflictException('手机号已注册');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        password: hashedPassword,
        nickname: dto.nickname || `用户${dto.phone.substring(7)}`,
      },
    });

    return {
      token: this.signUserToken(user.id, user.phone, user.role),
      userId: Number(user.id),
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('手机号或密码错误');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('手机号或密码错误');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      token: this.signUserToken(user.id, user.phone, user.role),
      userId: Number(user.id),
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
    };
  }

  async wechatLogin(dto: WechatLoginDto) {
    return this.handleWechatAuth(dto, true);
  }

  async refreshWechatToken(dto: WechatLoginDto) {
    return this.handleWechatAuth(dto, false);
  }

  private async handleWechatAuth(dto: WechatLoginDto, allowCreate: boolean) {
    const session = await this.fetchWechatSession(dto.code);
    const openid = session.openid;

    if (!openid) {
      throw new UnauthorizedException('微信登录失败，请重试');
    }

    let user = await this.prisma.user.findUnique({
      where: { wechatOpenid: openid },
    });

    if (!user && !allowCreate) {
      throw new UnauthorizedException('微信会话已过期，请重新登录');
    }

    if (!user) {
      const fallbackNick = `wx_${openid.slice(-6)}`;
      user = await this.prisma.user.create({
        data: {
          wechatOpenid: openid,
          nickname: dto.userInfo?.nickname || fallbackNick,
          avatar: dto.userInfo?.avatar,
          gender: dto.userInfo?.gender ?? 0,
          province: dto.userInfo?.province,
          city: dto.userInfo?.city,
          role: 'user',
          status: 1,
        },
      });
    } else if (dto.userInfo) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          nickname: dto.userInfo.nickname || user.nickname,
          avatar: dto.userInfo.avatar || user.avatar,
          province: dto.userInfo.province || user.province,
          city: dto.userInfo.city || user.city,
          gender: dto.userInfo.gender ?? user.gender,
        },
      });
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      token: this.signUserToken(user.id, user.phone, user.role),
      user: {
        id: Number(user.id),
        phone: user.phone || '',
        nickname: user.nickname || '',
        avatar: user.avatar || '',
      },
    };
  }

  private signUserToken(
    userId: bigint | number,
    phone: string | null,
    role: string,
  ) {
    return this.jwtService.sign({
      sub: Number(userId),
      phone: phone || '',
      role,
    });
  }

  private async fetchWechatSession(code: string): Promise<WechatSessionResult> {
    const appId = this.configService.get<string>('WECHAT_APP_ID', '').trim();
    const appSecret = this.configService
      .get<string>('WECHAT_APP_SECRET', '')
      .trim();

    if (!appId || !appSecret) {
      throw new BadRequestException('微信登录未配置 WECHAT_APP_ID/WECHAT_APP_SECRET');
    }

    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${encodeURIComponent(appId)}&secret=${encodeURIComponent(appSecret)}&js_code=${encodeURIComponent(code)}&grant_type=authorization_code`;

    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new BadGatewayException('微信服务不可用');
    }

    const data = (await response.json()) as WechatSessionResult;
    if (data.errcode) {
      throw new UnauthorizedException(
        `微信登录失败: ${data.errmsg || data.errcode}`,
      );
    }

    return data;
  }
}
