import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PageSearchDto<T = Record<string, any>> {
  @ApiPropertyOptional({ description: '页码，默认1', example: 1 })
  @IsOptional()
  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码最小值为1' })
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ description: '每页数量，默认10', example: 10 })
  @IsOptional()
  @IsInt({ message: '每页条数必须是整数' })
  @Min(1, { message: '每页条数最小值为1' })
  @Type(() => Number)
  size?: number = 10;
  // 其它查询条件和排序条件
  [key: string]: any;
}
