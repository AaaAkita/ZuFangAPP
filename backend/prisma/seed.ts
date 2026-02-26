import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

async function main() {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    } as any);
    console.log('🌱 开始导入演示种子数据...');

    try {
        // 1. 创建几个测试用户
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('123456', salt);

        const user1 = await prisma.user.upsert({
            where: { phone: '13800138001' },
            update: {},
            create: {
                phone: '13800138001',
                password,
                nickname: '避雷先锋小明',
                role: 'user',
                city: '北京市',
            },
        });

        const user2 = await prisma.user.upsert({
            where: { phone: '13800138002' },
            update: {},
            create: {
                phone: '13800138002',
                password,
                nickname: '朝阳群众老李',
                role: 'user',
                city: '北京市',
            },
        });

        console.log('👤 用户数据写入成功');

        // 2. 创建真实场景的小区数据
        const c1 = await prisma.community.create({
            data: {
                name: '万科星城 (演示数据)',
                province: '北京市',
                city: '北京市',
                district: '朝阳区',
                address: '朝阳北路 112 号',
                longitude: 116.5123,
                latitude: 39.9234,
                propertyType: '住宅',
                buildYear: 2018,
                developer: '万科集团',
                propertyFee: 3.5,
                facilities: {
                    subway: ['6号线青年路站', '10号线金台夕照站'],
                    school: ['朝阳第一小学'],
                },
                tags: ['近地铁', '精装修', '绿化好'],
                viewCount: 1542,
            },
        });

        const c2 = await prisma.community.create({
            data: {
                name: '老破小安置房 (演示数据)',
                province: '北京市',
                city: '北京市',
                district: '海淀区',
                address: '海淀南路 88 号',
                longitude: 116.3211,
                latitude: 39.9876,
                propertyType: '住宅',
                buildYear: 1995,
                propertyFee: 0.5,
                facilities: {
                    hospital: ['海淀医院'],
                },
                tags: ['学区房', '隔音差', '停车难'],
                viewCount: 8900,
            },
        });

        console.log('🏢 小区数据写入成功');

        // 3. 为小区填充真实的避雷评论
        await prisma.comment.create({
            data: {
                userId: user2.id,
                communityId: c2.id,
                content: '大家千万避雷这个小区的 3 号楼！二房东把隔断打得乱七八糟，晚上楼上冲马桶听得一清二楚，而且物业根本不管事。我的押金到现在都没退！',
                rating: 1,
                status: 1, // 已展示
                images: [
                    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
                    'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
                ],
                likeCount: 45,
            },
        });

        await prisma.comment.create({
            data: {
                userId: user1.id,
                communityId: c1.id,
                content: '刚搬进来半年，万科的物业确实没的说，半夜修水管随叫随到。离地铁也很近，除了房租贵点没毛病，适合不差钱的打工人。',
                rating: 5,
                status: 1,
                likeCount: 12,
            },
        });

        // 更新小区统计信息（模拟触发器）
        await prisma.community.update({
            where: { id: c2.id },
            data: { commentCount: 1, ratingAvg: 1.0 },
        });

        await prisma.community.update({
            where: { id: c1.id },
            data: { commentCount: 1, ratingAvg: 5.0 },
        });

        console.log('📝 评论避雷数据写入成功');
        console.log('✅ 数据初始化完毕，可以使用 13800138001 / 123456 登录');
    } catch (error) {
        console.error('❌ 播种过程中发生错误:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
