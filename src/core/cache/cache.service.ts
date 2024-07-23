import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CacheConfig } from '../config';
import { ConfigType } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class CacheService implements CacheOptionsFactory {
  constructor(
    @Inject(CacheConfig.KEY)
    private readonly cacheConfig: ConfigType<typeof CacheConfig>,
  ) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      ...this.cacheConfig,
      store: redisStore,
    };
  }
}
