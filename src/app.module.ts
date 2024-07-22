import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './core/config';
import { DatabaseModule } from './core/database/database.module';
import { PoetryController } from './controllers/poetry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poetry } from './entities/poetry.entity';
import { PoetryService } from './services/poetry.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: configuration,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Poetry]),
  ],
  controllers: [AppController, PoetryController],
  providers: [AppService, PoetryService],
})
export class AppModule {}
