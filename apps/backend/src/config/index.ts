import { AppConfig, appRegToken, IAppConfig } from './app.config';

export * from './app.config';

export interface AllConfigType {
  [appRegToken]: IAppConfig;
  // [redisRegToken]: IRedisConfig;
  // [securityRegToken]: ISecurityConfig;
}
export type ConfigKeyPaths = RecordNamePaths<AllConfigType>;

export default {
  AppConfig
};
