import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserDto } from '@/modules/system/user/dto/user.dto';

export interface IAuthUser {
  id: number;
  username?: string;
  email?: string;
  mobile?: string;
  /** 登录 ip */
  ip: string;
  /** 密码版本 */
  pv: number;
  /** 过期时间,秒（Unix 时间戳，UTC 时间）*/
  exp?: number;
  /** 签发时间,秒（Unix 时间戳，UTC 时间）*/
  iat?: number;
}

export class LoginDto {
  @ApiProperty({ description: '手机号/邮箱/账号', example: 'admin' })
  @IsString()
  username: string;
  @ApiProperty({ description: '密码', example: 'z1RvExRQ' })
  @IsString()
  password: string;
}

export class LoginResult {
  token: string;
  user: UserDto;
}
