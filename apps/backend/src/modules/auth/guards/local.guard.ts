import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { AuthStrategy } from '@/modules/auth/auth.constant';

@Injectable()
export class LocalGuard extends AuthGuard(AuthStrategy.LOCAL) {
  canActivate(context: ExecutionContext) {
    return true;
  }
}
