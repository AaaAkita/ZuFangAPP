import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET', 'zufang_secret_key'),
        });
    }

    async validate(payload: any) {
        // payload 是加密进去的 { sub: userId, phone: string, role: string }
        if (!payload || !payload.sub) {
            throw new UnauthorizedException('无效的 Token');
        }
        return { userId: payload.sub, phone: payload.phone, role: payload.role };
    }
}
