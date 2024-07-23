import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { validateConfigEnv } from './env.validation';

export const CacheConfig = registerAs('cache', () => {
  return validateConfigEnv(CacheConfigEnv);
});

export class CacheConfigEnv {
  @Expose({ name: 'REDIS_HOST' })
  @IsString()
  host: string;

  @Expose({ name: 'REDIS_PORT' })
  @IsNumber()
  port: number;

  @Expose({ name: 'REDIS_PASSWORD' })
  @IsString()
  password: string;

  @Expose({ name: 'REDIS_TTL' })
  @IsNumber()
  ttl: number;

  @Expose({ name: 'REDIS_DB' })
  @IsNumber()
  db: number;
}
