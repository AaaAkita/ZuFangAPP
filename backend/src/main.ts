import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  // 解决 BigInt 序列化导致 JSON.stringify 报错的问题
  (BigInt.prototype as any).toJSON = function () {
    return Number(this);
  };

  const app = await NestFactory.create(AppModule);

  // 全局 API 前缀
  app.setGlobalPrefix('api/v1');

  // CORS 允许跨域
  app.enableCors();

  // 全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // 全局过滤器和拦截器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Swagger 配置
  const config = new DocumentBuilder()
    .setTitle('租房避雷 App API')
    .setDescription('提供租房信息、评论、合同验证等功能接口')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
