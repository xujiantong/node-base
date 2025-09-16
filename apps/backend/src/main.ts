import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyApp } from '@/adaptors/fastify.adapter';
import { setupSwagger } from '@/shared/swagger/swagger.setup';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

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
  setupSwagger(app);
  // 全局注册日志拦截器
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(process.env.PORT ?? 3700);
  const url = await app.getUrl();
  const displayUrl = url.replace('[::1]', 'localhost');
  console.log(`Application is running on: ${displayUrl}`);
  console.log(`Swagger is running on: ${displayUrl}/api`);
  console.log(`BullMQ is running on: ${displayUrl}/bullmq`);
}
bootstrap();
