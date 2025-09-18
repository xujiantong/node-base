import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@/decorators/inject-redis.decorator';
import { Redis } from 'ioredis';
import { LoggerService } from '@/shared/logger/logger.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private logger: LoggerService
  ) {}
  async getHello() {
    this.logger.error('error');
    return 'metrics';
  }
}
