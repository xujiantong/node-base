import { RedisKeys } from '@/types/cache';

type Prefix = 'mc';
const prefix = 'mc';

export function getRedisKey<T extends string = RedisKeys | '*'>(
  key: T,
  ...concatKeys: string[]
): `${Prefix}:${T}${string}` {
  return `${prefix}:${key}${
    concatKeys && concatKeys.length ? `:${concatKeys.join('_')}` : ''
  }`;
}

export function getRedisKeys(keys: string[]): string[] {
  return keys.map((key) => getRedisKey(key));
}
