import { AppConfig, appRegToken, IAppConfig } from './app.config';
import {
  IRedisConfig,
  RedisConfig,
  redisRegToken
} from '@/config/redis.config';

export * from './app.config';

export interface AllConfigType {
  [appRegToken]: IAppConfig;
  [redisRegToken]: IRedisConfig;
  // [securityRegToken]: ISecurityConfig;
}
export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export default {
  AppConfig,
  RedisConfig
};
