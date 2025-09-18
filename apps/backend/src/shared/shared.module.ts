import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '@/shared/logger/logger.module';
import { ExceptionModule } from '@/shared/exception';
import { PrismaModule } from '@/shared/prisma/prisma.module';
import { EventsModule } from '@/shared/websocket/events.module';
import { RedisModule } from '@/shared/redis/redis.module';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot(),
    ExceptionModule.forRoot(),
    RedisModule,
    PrismaModule,
    EventsModule
  ],
  exports: [RedisModule, PrismaModule]
})
export class SharedModule {}
