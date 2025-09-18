import { IsString, IsInt, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
export enum UserStatus {
  ENABLED = 0,
  DISABLED = 1
}

export class UserDto {
  @ApiHideProperty()
  id?: number;

  @ApiProperty({ description: '用户名' })
  @IsString()
  username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string;

  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '手机号', required: false })
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiProperty({
    description: '性别（0: 未知, 1: 男, 2: 女）',
    required: false
  })
  @IsOptional()
  @IsEnum([0, 1, 2])
  gender?: number;

  @ApiProperty({ description: '头像URL', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: '状态', default: 0 })
  @IsInt()
  status: UserStatus;

  @ApiProperty({ description: '昵称', required: false })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiHideProperty()
  last_login_ip?: string;

  @ApiHideProperty()
  last_login_at?: Date;

  @ApiHideProperty()
  created_by?: number;

  @ApiHideProperty()
  updated_by?: number;

  @ApiHideProperty()
  created_at?: Date;

  @ApiHideProperty()
  updated_at?: Date;

  @ApiHideProperty()
  is_deleted?: number;
}
export class UserPatchDto {
  @ApiHideProperty()
  id?: number;

  @ApiProperty({ description: '用户名' })
  @IsString()
  username?: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  password?: string;

  @ApiProperty({ description: '邮箱' })
  @IsEmail()
  email?: string;

  @ApiProperty({ description: '手机号', required: false })
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiProperty({
    description: '性别（0: 未知, 1: 男, 2: 女）',
    required: false
  })
  @IsOptional()
  @IsEnum([0, 1, 2])
  gender?: number;

  @ApiProperty({ description: '头像URL', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: '状态', default: 0 })
  @IsInt()
  status?: UserStatus;

  @ApiProperty({ description: '昵称', required: false })
  @IsOptional()
  @IsString()
  nickname?: string;

  @ApiProperty({ description: '备注', required: false })
  @IsOptional()
  @IsString()
  remark?: string;

  last_login_ip?: string;

  last_login_at?: Date;
}
