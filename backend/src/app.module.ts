import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { UserModule } from './modules/user/user.module';
import { CommunityModule } from './modules/community/community.module';
import { CommentModule } from './modules/comment/comment.module';
import { SearchModule } from './modules/search/search.module';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    RedisModule,
    UserModule,
    CommunityModule,
    CommentModule,
    SearchModule,
    AuthModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
