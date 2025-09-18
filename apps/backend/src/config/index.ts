import { AppConfig, appRegToken, IAppConfig } from './app.config';
import {
  IRedisConfig,
  RedisConfig,
  redisRegToken
} from '@/config/redis.config';
import {
  ISecurityConfig,
  SecurityConfig,
  securityRegToken
} from '@/config/security.config';

export * from './app.config';
export * from './security.config';

export interface AllConfigType {
  [appRegToken]: IAppConfig;
  [redisRegToken]: IRedisConfig;
  [securityRegToken]: ISecurityConfig;
}
export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export default {
  AppConfig,
  RedisConfig,
  SecurityConfig
};
