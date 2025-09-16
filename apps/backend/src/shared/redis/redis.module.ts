import { Module, Provider } from '@nestjs/common';
import {
  RedisModule as NestRedisModule,
  RedisService
} from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKeyPaths } from '@/config';
import { IRedisConfig } from '@/config/redis.config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from 'ioredis';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheService } from './cache.service';
import { REDIS_PUBSUB } from '@/shared/redis/redis.constant';
import { RedisSubPub } from '@/shared/redis/redis-subpub';
import { RedisPubSubService } from '@/shared/redis/subpub.service';
import { REDIS_CLIENT } from '@/decorators/inject-redis.decorator';
const providers: Provider[] = [
  CacheService,
  {
    provide: REDIS_PUBSUB,
    useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
      const redisOptions: RedisOptions =
        configService.get<IRedisConfig>('redis')!;
      return new RedisSubPub(redisOptions);
    },
    inject: [ConfigService]
  },
  RedisPubSubService,
  {
    provide: REDIS_CLIENT,
    useFactory: (redisService: RedisService) => {
      return redisService.getOrThrow();
    },
    inject: [RedisService] // 注入 RedisService
  }
];
@Module({
  imports: [
    // cache
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => {
        const redisOptions: RedisOptions =
          configService.get<IRedisConfig>('redis')!;

        return {
          isGlobal: true,
          store: redisStore,
          isCacheableValue: () => true,
          ...redisOptions
        };
      },
      inject: [ConfigService]
    }),
    NestRedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigKeyPaths>) => ({
        readyLog: true,
        config: configService.get<IRedisConfig>('redis')
      }),
      inject: [ConfigService]
    })
  ],
  providers,
  exports: [...providers, CacheModule]
})
export class RedisModule {}
