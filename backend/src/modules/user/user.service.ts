import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async findByPhone(phone: string) {
        return this.prisma.user.findUnique({ where: { phone } });
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id: BigInt(id) } });
        if (!user) {
            throw new NotFoundException('用户不存在');
        }
        // 隐藏密码返回
        const { password, ...result } = user;
        // Prisma 中如果是 BigInt，返回前端会触发 JSON 序列化报错，我们在拦截器或代码这里需要处理，或者转换
        return {
            ...result,
            id: Number(result.id),
            // 其它包含 BigInt 的也可以这里转，或者全局加一个 JSON replacer
        };
    }
}
