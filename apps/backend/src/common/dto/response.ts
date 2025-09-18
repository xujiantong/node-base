import { ApiProperty } from '@nestjs/swagger';

export const RESPONSE_SUCCESS_CODE = 200;

export const RESPONSE_SUCCESS_MSG = 'success';

export class ResDto<T> {
  @ApiProperty({
    description: '状态码',
    example: RESPONSE_SUCCESS_CODE
  })
  code: number;
  @ApiProperty({
    description: '提示信息',
    example: RESPONSE_SUCCESS_MSG
  })
  message: string;
  @ApiProperty({
    description: '数据'
  })
  data: T;
}
