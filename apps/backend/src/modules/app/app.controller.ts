import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { BizException } from '@/shared/exception/biz.exception';
import { Errors } from '@/shared/exception/exception.const';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { InjectRedis } from '@/decorators/inject-redis.decorator';
import { Redis } from 'ioredis';

@ApiTags('APP')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('auth') // 添加Bearer认证
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRedis() private readonly redis: Redis
  ) {}
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('metrics')
  meta() {
    return this.appService.getHello();
  }
}
