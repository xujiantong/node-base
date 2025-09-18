import { DynamicModule, Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@/shared/exception/exception.filter';

@Global()
@Module({})
export class ExceptionModule {
  static forRoot(): DynamicModule {
    return {
      module: ExceptionModule,
      providers: [
        {
          provide: APP_FILTER,
          useClass: AllExceptionsFilter
        }
      ],
      exports: []
    };
  }
}
