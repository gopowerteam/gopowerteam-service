import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoetryController } from './controllers/poetry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poetry } from './entities/poetry.entity';
import { PoetryService } from './services/poetry.service';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([Poetry])],
  controllers: [AppController, PoetryController],
  providers: [AppService, PoetryService],
})
export class AppModule {}
