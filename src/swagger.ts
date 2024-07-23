import { NestApplication } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: NestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API接口文档')
    .setDescription('API description')
    .setVersion('1.0')
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'access-token',
    // )
    .addTag('poetry', '诗词')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document);

  const adapter = app.getHttpAdapter();
  // 设置OPENAPI接口地址
  adapter.get('/swagger/api-docs', function (req, res) {
    res.send(JSON.stringify(document));
  });
}
