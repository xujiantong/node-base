import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from '@/config';
import { RedisModule } from '@/shared/redis/redis.module';
import { PrismaModule } from '@/shared/prisma/prisma.module';
import { UserModule } from '@/modules/system/user/user.module';
import { RoleModule } from '@/modules/system/role/role.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { LogModule } from '@/modules/system/log/log.module';
import { LoggerModule } from '@/shared/logger/logger.module';
import { ExceptionModule } from '@/shared/exception';
import { AuthModule } from '@/modules/auth/auth.module';
import { SystemModule } from '@/modules/system/system.module';
import { SharedModule } from '@/shared/shared.module';
import { ScheduleModule } from '@nestjs/schedule';

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
    }),
    ScheduleModule.forRoot(),
    SharedModule,
    AuthModule,
    SystemModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
