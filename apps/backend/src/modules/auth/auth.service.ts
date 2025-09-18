import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthUser } from '@/modules/auth/dto/auth.dto';
import { InjectRedis } from '@/decorators/inject-redis.decorator';
import { Redis } from 'ioredis';
import { genAuthPVKey, genAuthTokenKey } from '@/utils/redis.util';
import { UserService } from '@/modules/system/user/user.service';
import { isEmpty } from 'lodash';
import { BizException } from '@/shared/exception';
import { Errors } from '@/shared/exception/exception.const';
import { CryptoUtil } from '@/utils/crypto.util';
import { sys_user } from '@prisma/client';
import { ISecurityConfig, SecurityConfig } from '@/config';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '@/shared/prisma/prisma.service';
import dayjs from 'dayjs';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
    @InjectRedis() private redis: Redis,
    @Inject(SecurityConfig.KEY) private securityConfig: ISecurityConfig
  ) {}

  async login(account: string, pwd: string, ip: string) {
    const user = await this.userService.findUserByAccount(account);
    if (isEmpty(user)) {
      throw new BizException(Errors.USER_NOT_FOUND);
    }
    const pwdCompared = CryptoUtil.decrypt(user.password) === pwd;
    if (!pwdCompared) {
      throw new BizException(Errors.USER_PWD_INCORRECT);
    }
    const accessToken = await this.genAccessToken(user, ip);
    // 缓存 accessToken
    await this.redis.set(
      genAuthTokenKey(user.id),
      accessToken,
      'EX',
      this.securityConfig.jwtExprire
    );
    // 设置密码版本号,当密码修改时, 版本号+1
    await this.redis.set(genAuthPVKey(user.id), 1);
    await this.userService.update(user.id, {
      last_login_ip: ip,
      last_login_at: new Date()
    });
    const { password, ...safeUser } = user;
    return {
      token: accessToken,
      user: safeUser
    };
  }
  async logout(token: string, id: number) {
    await this.removeToken(token);
    await this.redis.del(genAuthTokenKey(id));
  }
  async resetToken(id: number, ip: string) {
    const user = await this.userService.findOne(id);
    if (isEmpty(user)) {
      throw new BizException(Errors.USER_NOT_FOUND);
    }
    const accessToken = await this.genAccessToken(user, ip);
    // 缓存 accessToken
    await this.redis.set(
      genAuthTokenKey(user.id),
      accessToken,
      'EX',
      this.securityConfig.jwtExprire
    );
    // 设置密码版本号,当密码修改时, 版本号+1
    await this.redis.set(genAuthPVKey(user.id), 1);
    const { password, ...safeUser } = user;
    return {
      token: accessToken,
      user: safeUser
    };
  }
  // 生成 accessToken
  async genAccessToken(user: sys_user, ip: string) {
    const payload: IAuthUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      mobile: user.mobile,
      ip: ip,
      pv: 1
    };
    const accessTokenSign = await this.jwtService.signAsync(payload);
    await this.genRefreshToken(accessTokenSign);
    return accessTokenSign;
  }
  async genRefreshToken(accessToken: string) {
    const uuid = uuidv4();
    const payload = {
      uuid
    };
    const refreshTokenSign = await this.jwtService.signAsync(payload, {
      secret: this.securityConfig.refreshSecret
    });
    await this.prisma.sys_refresh_token.create({
      data: {
        id: uuid,
        value: refreshTokenSign,
        expired_at: dayjs()
          .add(this.securityConfig.refreshExpire, 'second')
          .toDate(),
        access_token: accessToken
      }
    });
  }

  async getRefreshToken(accessToken: string) {
    return this.prisma.sys_refresh_token.findUnique({
      where: {
        access_token: accessToken
      }
    });
  }

  // 验证 accessToken 并解析 payload
  async verifyAccessToken(token: string): Promise<IAuthUser> {
    return await this.jwtService.verifyAsync(token);
  }
  async verifyRefreshToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
  async getPwdVersion(id: number): Promise<Number> {
    return Number(await this.redis.get(genAuthPVKey(id)));
  }
  // 清理失效 refreshToken
  async removeToken(token: string) {
    await this.prisma.sys_refresh_token.delete({
      where: {
        access_token: token
      }
    });
  }
}
