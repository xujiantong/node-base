import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { FastifyAdapter } from '@bull-board/fastify';
import { IRedisConfig } from '@/config/redis.config';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { TaskController } from '@/shared/task/task.controller';
import { TokenJob } from '@/shared/task/jobs/token.job';
import { TokenProcessor } from '@/shared/task/processors/token.processor';

const providers = [TokenJob, TokenProcessor];
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: configService.get<IRedisConfig>('redis')
      })
    }),
    BullBoardModule.forRoot({
      route: '/scheduler',
      adapter: FastifyAdapter
    }),
    BullModule.registerQueue({ name: 'token' }),
    BullBoardModule.forFeature({
      name: 'token',
      adapter: BullAdapter
    })
  ],
  controllers: [TaskController],
  providers,
  exports: [...providers]
})
export class TaskModule {}
