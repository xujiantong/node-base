import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResult } from '@/modules/auth/dto/auth.dto';
import { ApiResult } from '@/decorators/swagger.decorator';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
@ApiTags('用户登录')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResult(LoginResult)
  async login(@Body() loginForm: LoginDto, @Ip() ip: string) {
    return this.authService.login(loginForm.username, loginForm.password, ip);
  }

  @Get('logout')
  @ApiOperation({ summary: '用户登出' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('auth') // 添加Bearer认证
  logout(@Req() request: Request) {
    const token = request.headers['authorization'].replace('Bearer ', '');
    const id = request['user'].id;
    return this.authService.logout(token, id);
  }
}
