import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { validateConfigEnv } from './env.validation';

export const DatabaseConfig = registerAs('database', () => {
  return validateConfigEnv(DatabaseConfigEnv);
});

enum DatabaseType {
  Postgres = 'postgres',
}

export class DatabaseConfigEnv {
  @Expose({ name: 'DATABASE_TYPE' })
  @IsEnum(DatabaseType)
  type: DatabaseType;

  @Expose({ name: 'DATABASE_HOST' })
  @IsString()
  host: string;

  @Expose({ name: 'DATABASE_PORT' })
  @IsNumber()
  port: number;

  @Expose({ name: 'DATABASE_USERNAME' })
  @IsString()
  username: string;

  @Expose({ name: 'DATABASE_PASSWORD' })
  @IsString()
  password: string;

  @Expose({ name: 'DATABASE_DATABASE' })
  @IsString()
  database: string;
}
