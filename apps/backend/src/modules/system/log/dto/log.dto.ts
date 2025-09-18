// dto/log.dto.ts
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsDate
} from 'class-validator';
export enum LogType {
  USER = 1, // 用户
  ROLE = 2, // 角色
  MENU = 3, // 菜单
  ROLE_USER_RELATION = 4, // 角色用户关系
  ROLE_MENU_RELATION = 5 // 角色菜单关系
}

export enum LogStatus {
  UNRECOVERED = 0, // 未恢复
  RECOVERED = 1 // 已恢复
}

export enum LogDeleted {
  NO = 0, // 未删除
  YES = 1 // 已删除
}

export class LogDto {
  @IsOptional()
  @IsNumber()
  id?: number; // 主键ID，自增

  @IsOptional()
  @IsEnum(LogType)
  type?: LogType; // 日志类型

  @IsOptional()
  @IsNumber()
  target_id?: number; // 基于 type 后指定的对象 id

  @IsOptional()
  @IsString()
  old_value?: string; // 变更前的值（JSON或文本）

  @IsOptional()
  @IsString()
  new_value?: string; // 变更后的值（JSON或文本）

  @IsOptional()
  @IsEnum(LogStatus)
  status?: LogStatus; // 恢复状态标识

  @IsOptional()
  @IsNumber()
  created_by?: number; // 创建人ID

  @IsOptional()
  @IsDate()
  created_at?: Date; // 创建时间

  @IsOptional()
  @IsNumber()
  updated_by?: number; // 最后更新人ID

  @IsOptional()
  @IsDate()
  updated_at?: Date; // 最后更新时间

  @IsOptional()
  @IsEnum(LogDeleted)
  id_deleted?: LogDeleted; // 是否删除标识
}
