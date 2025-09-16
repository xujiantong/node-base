import { env, envBoolean, envNumber } from '@/utils/env';
import { ConfigType, registerAs } from '@nestjs/config';

export const appRegToken = 'app';

const globalPrefix = env('GLOBAL_PREFIX', 'api');
export const AppConfig = registerAs(appRegToken, () => ({
  name: env('APP_NAME'),
  port: envNumber('APP_PORT', 3000),
  baseUrl: env('APP_BASE_URL'),
  globalPrefix,
  locale: env('APP_LOCALE', 'zh-CN'),
  multiDeviceLogin: envBoolean('MULTI_DEVICE_LOGIN', true),
  logger: {
    level: env('LOGGER_LEVEL'),
    maxFiles: envNumber('LOGGER_MAX_FILES')
  }
}));

export type IAppConfig = ConfigType<typeof AppConfig>;

export const RouterWhiteList: string[] = [
  `${globalPrefix ? '/' : ''}${globalPrefix}/auth/captcha/img`,
  `${globalPrefix ? '/' : ''}${globalPrefix}/auth/login`
];
