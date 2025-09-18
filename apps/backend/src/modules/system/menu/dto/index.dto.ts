import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class MenuDto {
  id?: number;
  name?: string;
  path?: string;
  type?: number;
  component?: string;
  component_name?: string;
  redirect?: string;
  icon?: string;
  status?: number;
  parent_id?: number;
  visible?: number;
  keep_alive?: number;
  sort?: number;
  permission?: string;
  level?: string;
  children?: MenuDto[];
}
export class MenuCreateOrPatchDto {
  @ApiProperty({ description: '菜单名称' })
  name: string;
  @ApiProperty({ description: '菜单路径' })
  path: string;
  @ApiProperty({ description: '菜单类型' })
  @Type(() => Number)
  type: number;
  @ApiPropertyOptional({ description: '组件路径' })
  component?: string;
  @ApiPropertyOptional({ description: '组件名称' })
  component_name?: string;
  @ApiPropertyOptional({ description: '菜单图标' })
  icon?: string;

  @ApiPropertyOptional({ description: '菜单状态' })
  @Type(() => Number)
  status?: number;
  @ApiPropertyOptional({ description: '父级菜单ID' })
  @Type(() => Number)
  parent_id?: number;
  @ApiPropertyOptional({ description: '是否可见' })
  @Type(() => Number)
  visible?: number;
  @ApiPropertyOptional({ description: '是否缓存' })
  @Type(() => Number)
  keep_alive?: number;
  @ApiPropertyOptional({ description: '排序' })
  @Type(() => Number)
  sort?: number;
  @ApiPropertyOptional({ description: '权限' })
  permission?: string;
  @ApiPropertyOptional({ description: '菜单层级' })
  level?: string;
  @ApiPropertyOptional({ description: '跳转地址' })
  redirect?: string;
  created_by?: number;
  created_at?: Date;
  updated_by?: number;
  updated_at?: Date;
  is_deleted?: number;
}

export class MenuSortDto {
  @ApiProperty({ description: '菜单ID数组' })
  ids: number[];
}

export class MenuUpdateLevelDto {
  @ApiProperty({ description: '菜单 id' })
  id: number;
  @ApiProperty({ description: 'parent_id' })
  parent_id: number;
}
