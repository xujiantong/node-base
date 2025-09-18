import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '@/shared/logger/logger.module';
import { ExceptionModule } from '@/shared/exception';
import { PrismaModule } from '@/shared/prisma/prisma.module';
import { EventsModule } from '@/shared/websocket/events.module';
import { RedisModule } from '@/shared/redis/redis.module';
import { TaskModule } from '@/shared/task/task.module';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot(),
    ExceptionModule.forRoot(),
    RedisModule,
    PrismaModule,
    EventsModule,
    TaskModule
  ],
  exports: [RedisModule, PrismaModule]
})
export class SharedModule {}
