import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger';

//
async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  // 配置Swagger
  setupSwagger(app);

  return app;
}

/**
 * 启动应用
 * @param app
 */
async function launch(app: NestApplication) {
  const config = app.get(ConfigService);
  const port = await config.get('PORT');
  console.log(port);
  await app.listen(port, '0.0.0.0');
}

bootstrap().then(launch);
