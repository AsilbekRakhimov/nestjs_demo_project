import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV.trim() == 'development') {
    app.use(morgan('tiny'));
  }

  const config = new DocumentBuilder()
    .setTitle('Auth')
    .setDescription('Learn how to auth and use guards')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const appPort = configService.getOrThrow<number>('APP_PORT');
  await app.listen(appPort, () => {
    console.log(`Server is running on port: ${appPort}`);
  });
}
bootstrap();
