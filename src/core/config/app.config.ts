import { registerAs } from '@nestjs/config';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { validateConfigEnv } from './env.validation';
import { Environment } from 'src/config/enum.config';

export const AppConfig = registerAs('database', () => {
  return validateConfigEnv(AppConfigEnv);
});

export class AppConfigEnv {
  @Expose({ name: 'env' })
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @Expose({ name: 'port' })
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
}
