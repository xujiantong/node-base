import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';

export function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME as string)
    .setDescription(process.env.APP_DESCRIPTION as string)
    .setVersion('1.0')
    .addBearerAuth(
      {
        // ⚡ 添加 Authorization 支持
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'auth',
        in: 'header'
      },
      'auth'
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      // 添加持久化的token，防止刷新token失效
      persistAuthorization: true
    }
  });
}
