import { HttpException } from '@nestjs/common';
type BizExceptionType = {
  code: number;
  message: string;
  data?: any;
};
export class BizException extends HttpException {
  protected readonly exception: BizExceptionType;
  constructor(exception: BizExceptionType) {
    super(exception.message, exception.code);
    this.exception = exception;
  }
  getErrorInfo(): BizExceptionType {
    return this.exception;
  }
}
