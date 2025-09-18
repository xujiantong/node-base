import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from '@/modules/auth/dto/auth.dto';
import { InjectRedis } from '@/decorators/inject-redis.decorator';
import { Redis } from 'ioredis';
import { genAuthPVKey } from '@/utils/redis.util';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRedis() private redis: Redis
  ) {}

  async verifyAccessToken(token: string): Promise<IAuthUser> {
    return await this.jwtService.verifyAsync(token);
  }
  async getPwdVersion(id: number): Promise<Number> {
    return Number(this.redis.get(genAuthPVKey(id)));
  }
}
