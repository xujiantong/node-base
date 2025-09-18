import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ResDto } from '@/common/dto/response';
import { BizException } from '@/shared/exception/biz.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<FastifyReply>();
    let result: ResDto<any> = {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      data: null
    };
    /**
     * 错误处理
     * 1. 捕获业务错误
     * 2. 捕获HTTP错误
     * 2. 捕获系统错误
     * 3. 捕获未知错误
     */
    if (exception instanceof BizException) {
      const exceptionInfo = exception.getErrorInfo();
      result.code = exceptionInfo.code;
      result.message = exceptionInfo.message;
      result.data = exceptionInfo.data || undefined;
    } else if (exception instanceof HttpException) {
      result.code = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        if (exceptionResponse['message'] instanceof Array) {
          result.message = exceptionResponse['message'].join(',');
        } else {
          result.message = exceptionResponse['message'] as string;
        }
      }
    } else if (exception instanceof Error) {
      result.message = exception.message;
      this.logger.error(exception.stack);
    } else {
      this.logger.error('Unknown exception:', exception);
    }

    response.status(HttpStatus.OK).send(result);
  }
}
