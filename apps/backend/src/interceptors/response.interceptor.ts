import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ResDto,
  RESPONSE_SUCCESS_CODE,
  RESPONSE_SUCCESS_MSG
} from '@/common/dto/response';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // console.log(`next-handle-pipe-map:`, data);
        // 默认正常返回 code 和 message, 如需扩展可以通过 data 进行判断
        return {
          code: RESPONSE_SUCCESS_CODE as number,
          message: RESPONSE_SUCCESS_MSG as string,
          data: data as Record<string, any> // 这里是原方法 return 的数据
        } as ResDto<Record<string, any>>;
      })
    );
  }
}
