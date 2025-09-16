import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '@/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // 允许 .env 文件中的变量互相引用
      expandVariables: true,
      // 指定多个 env 文件时，第一个优先级最高
      envFilePath: [
        '.env.local',
        '.env',
        '.env.development.local',
        '.env.development'
      ],
      // 加载自定义配置文件
      load: [...Object.values(config)]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
