import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@/decorators/inject-redis.decorator';
import { Redis } from 'ioredis';
import { RedisKeys } from '@/types/cache';

@Injectable()
export class AppService {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async getHello() {
    this.redis.set(`${RedisKeys.TEST_PREFIX}ping`, 'pong');
    return 200;
  }
}
