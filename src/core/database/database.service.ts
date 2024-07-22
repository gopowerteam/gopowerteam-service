import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AppConfig, DatabaseConfig } from '../config';
import { ConfigType } from '@nestjs/config';
import { Environment } from 'src/config/enum.config';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>,

    @Inject(DatabaseConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof DatabaseConfig>,
  ) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    // 获取数据库配置

    return {
      ...this.databaseConfig,
      // 自动加载实体
      autoLoadEntities: this.appConfig.NODE_ENV !== Environment.Production,
      // 同步表结构
      synchronize: true,
      // 记录sql
      logging: process.env.NODE_ENV === 'production' ? ['error'] : 'all',
    };
  }
}
