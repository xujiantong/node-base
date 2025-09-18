import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiResponse,
  ApiSecurity,
  getSchemaPath
} from '@nestjs/swagger';
import { ResDto } from '@/common/dto/response';

export const API_SECURITY_AUTH = 'auth';

/**
 * 为控制器类或方法添加安全认证标识
 * @example
 * - @ApiSecurityAuth()
 * - @UseGuards(JwtAuthGuard)
 * - getProfile(){}
 */
export function ApiSecurityAuth(): ClassDecorator & MethodDecorator {
  return applyDecorators(ApiSecurity(API_SECURITY_AUTH));
}

/**
 * 统一接口成功响应结构
 * @example
 * - @ApiResult(UserDto)
 * - getProfile(){}
 */
export function ApiResult<T>(dto: Type<T>) {
  return applyDecorators(
    // 向 Swagger 注册多个模型（ApiResponse 和传入的业务模型 model）
    // 这样 Swagger 才能识别并生成正确的联合类型 Schema，用于后续引用
    ApiExtraModels(ResDto, dto),
    // 定义 HTTP 200 成功响应的 Swagger 文档配置
    // 这里通过 schema 自定义响应体结构，实现对泛型 ApiResponse<T> 的准确描述
    ApiOkResponse({
      description: '请求成功',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(dto) }
            }
          }
        ]
      }
    })
  );
}
