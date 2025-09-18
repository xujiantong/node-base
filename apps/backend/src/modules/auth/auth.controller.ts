import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('用户登录')
@Controller('auth')
export class AuthController {
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  login() {}

  @Get('logout')
  @ApiOperation({ summary: '用户登出' })
  logout() {}
}
