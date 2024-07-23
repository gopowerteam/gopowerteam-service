import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: configuration,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      useClass: CacheService,
    }),
    DatabaseModule,
  ],
  exports: [ConfigModule, DatabaseModule, CacheModule],
})
export class CoreModule {}
