export const RESPONSE_SUCCESS_CODE = 200;

export const RESPONSE_SUCCESS_MSG = 'success';

export class ResDto<T> {
  code: number;
  message: string;
  data: T;
}
