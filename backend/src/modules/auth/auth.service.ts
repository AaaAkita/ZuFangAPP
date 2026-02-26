import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (existingUser) {
      throw new ConflictException('手机号已被注册');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        password: hashedPassword,
        nickname: dto.nickname || `用户${dto.phone.substring(7)}`,
      },
    });

    const payload = { sub: user.id, phone: user.phone, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      userId: Number(user.id),
      nickname: user.nickname,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user) {
      throw new UnauthorizedException('手机号或密码错误');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('手机号或密码错误');
    }

    const payload = { sub: user.id, phone: user.phone, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      userId: Number(user.id),
      nickname: user.nickname,
      avatar: user.avatar,
      role: user.role,
    };
  }
}
