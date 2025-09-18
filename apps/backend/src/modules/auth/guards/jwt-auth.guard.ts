import {
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { FastifyReply, FastifyRequest } from 'fastify';
import Redis from 'ioredis';
import { isEmpty, isNil } from 'lodash';
import { ExtractJwt } from 'passport-jwt';
import { AuthStrategy, PUBLIC_KEY } from '../auth.constant';
import { AppConfig, IAppConfig, RouterWhiteList } from '@/config';
import { InjectRedis } from '@/decorators/inject-redis.decorator';

import { LoggerService } from '@/shared/logger/logger.service';
import { AuthService } from '@/modules/auth/auth.service';
import { genAuthTokenKey, genTokenBlacklistKey } from '@/utils/redis.util';
import { BizException } from '@/shared/exception';
import { Errors } from '@/shared/exception/exception.const';
import { IAuthUser } from '@/modules/auth/dto/auth.dto';
import dayjs from 'dayjs';

/** @type {import('fastify').RequestGenericInterface} */
interface RequestType {
  Params: {
    uid?: string;
  };
  Querystring: {
    token?: string;
  };
}

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthStrategy.JWT) {
  //@ts-ignore
  jwtFromRequestFn = ExtractJwt.fromAuthHeaderAsBearerToken();

  constructor(
    private reflector: Reflector,
    private logger: LoggerService,
    private authService: AuthService,
    @InjectRedis() private redis: Redis,
    @Inject(AppConfig.KEY) private appConfig: IAppConfig
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    const request = context
      .switchToHttp()
      .getRequest<FastifyRequest<RequestType> & { user?: IAuthUser }>();
    const response: FastifyReply = context.switchToHttp().getResponse();

    if (RouterWhiteList.includes(request.routeOptions.url)) return true;

    const isSse = request.headers.accept === 'text/event-stream';

    if (isSse && !request.headers.authorization?.startsWith('Bearer ')) {
      const { token } = request.query;
      if (token) request.headers.authorization = `Bearer ${token}`;
    }
    // 获取当前登录 token
    const token =
      (this.jwtFromRequestFn as (req: Request) => string | null)(
        request as any
      ) ?? '';
    // 判断 token 是否在黑名单
    if (await this.redis.get(genTokenBlacklistKey(token))) {
      throw new BizException(Errors.TOKEN_BLACKLISTED);
    }

    let result: boolean = false;
    try {
      // 解析 token 并挂载
      request.user = await this.authService.verifyAccessToken(token);
      result = (await super.canActivate(context)) as boolean;
      // this.logger.debug(request.user);
    } catch (err) {
      this.logger.error(err);
      if (isPublic) return true;
      const isValid = isNil(token) && undefined;
      if (!isValid || isEmpty(token) || err instanceof UnauthorizedException) {
        throw new BizException(Errors.INVALID_LOGIN);
      }
    }
    // 判断 Token 是否有效
    const redisToken = await this.redis.get(genAuthTokenKey(request.user.id));
    if (!redisToken) {
      throw new BizException(Errors.INVALID_TOKEN);
    }

    //是否可以异地登录
    // if (token !== redisToken) {
    //   throw new BizException(Errors.INVALID_TOKEN);
    // }

    // 判断 token 是否过期
    const now = dayjs().unix();
    if (now > request.user.exp) {
      const refreshTokenRaw = await this.authService.getRefreshToken(token);
      const refreshToken = await this.authService.verifyRefreshToken(
        refreshTokenRaw.value
      );
      if (now > refreshToken.exp) {
        throw new BizException(Errors.TOKEN_EXPIRED);
      } else {
        const { token } = await this.authService.resetToken(
          request.user.id,
          request.user.ip
        );
        // 前端响应拦截存在 X-Access-Token 替换
        response.header('X-Access-Token', token);
      }
    }

    // 密码版本判断: 登录期间更改过密码
    // 登录时密码版本默认是1, 修改后是 pv+1
    const pv = await this.authService.getPwdVersion(request.user.id);
    if (pv !== request.user.pv) {
      throw new BizException(Errors.PASSWORD_CHANGED);
    }
    return result;
  }
  handleRequest(err, user, info) {
    if (err || !user) throw err || new UnauthorizedException();
    return user;
  }
}
