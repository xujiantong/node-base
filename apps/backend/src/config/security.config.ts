import { env, envNumber } from '@/utils/env';
import { ConfigType, registerAs } from '@nestjs/config';

export const securityRegToken = 'security';

export const SecurityConfig = registerAs(securityRegToken, () => ({
  jwtSecret: env('JWT_SECRET'),
  jwtExprire: envNumber('JWT_EXPIRE'),
  refreshSecret: env('REFRESH_TOKEN_SECRET'),
  refreshExpire: envNumber('REFRESH_TOKEN_EXPIRE')
}));

export type ISecurityConfig = ConfigType<typeof SecurityConfig>;
