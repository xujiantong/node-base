import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export enum RoleStatus {
  DISABLED = 1, // 停用
  ENABLED = 0 // 正常
}
export enum Code {
  ADMIN = 'admin',
  USER = 'user'
}
export class RoleDto {
  id?: number;
  code: Code;
  name: string;
  status: RoleStatus;
  remark?: string;
  created_by?: number;
  created_at?: Date;
  updated_by?: number;
  updated_at?: Date;
  is_deleted?: number;
}
export class RoleCreateOrPatchDto {
  @ApiProperty({ description: '角色代码', example: '' })
  @IsString()
  @MaxLength(100)
  code: Code;

  @ApiProperty({ description: '角色名称', example: '' })
  @IsString()
  @MaxLength(30)
  name: string;

  @ApiProperty({ description: '角色状态', example: '' })
  @IsInt()
  @Type(() => Number)
  status: RoleStatus;

  @ApiPropertyOptional({ description: '备注', example: '' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  remark?: string;

  created_by?: number;
  created_at?: Date;
  updated_by?: number;
  updated_at?: Date;
  is_deleted?: number;
}

export class RoleQueryDto {
  @ApiPropertyOptional({ description: '角色名称', example: '' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: '角色编码', example: '' })
  @IsOptional()
  @IsString()
  code?: Code;

  @ApiPropertyOptional({ description: '角色状态', example: '' })
  @IsOptional()
  @Type(() => Number)
  status?: RoleStatus;

  @ApiProperty({ description: '页码，默认1', example: 1 })
  @IsOptional()
  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码最小值为1' })
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({ description: '每页数量，默认10', example: 10 })
  @IsOptional()
  @IsInt({ message: '每页条数必须是整数' })
  @Min(1, { message: '每页条数最小值为1' })
  @Type(() => Number)
  size: number = 10;
}

export class RoleMenuDto {
  id?: number;
  role_id?: number;
}

export class RoleMenuAssignDto {
  @ApiProperty({ description: '角色id', type: Number })
  @Type(() => Number)
  roleId: number;
  @ApiProperty({ description: '菜单 id 集合', type: [Number] })
  menuIds: number[];
}
export class RoleUserAssignDto {
  @ApiProperty({ description: '角色id', type: Number })
  @Type(() => Number)
  roleId: number;
  @ApiProperty({ description: '用户 id 集合', type: [Number] })
  userIds: number[];
}
