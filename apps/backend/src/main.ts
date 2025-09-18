import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyApp } from '@/adaptors/fastify.adapter';
import { setupSwagger } from '@/shared/swagger/swagger.setup';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ResponseInterceptor } from '@/interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      bufferLogs: true, // 缓存日志
      snapshot: true // 快照模式
    }
  );

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // 明确允许方法
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'] // 按需配置允许的请求头
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true // 自动类型转换
      // whitelist: true, // 去掉 DTO 没有的字段
    })
  );
  // 全局注册日志拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());
  // 全局注册响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3700);
  const url = await app.getUrl();
  const displayUrl = url.replace('[::1]', 'localhost');
  console.log(`Application is running on: ${displayUrl}`);
  console.log(`Swagger is running on: ${displayUrl}/api`);
  console.log(`BullMQ is running on: ${displayUrl}/bullmq`);
  console.log(`Frontend is running on: http://localhost:5173`);
}
bootstrap();
