import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExceptionHandler } from './filters';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './middlewares';
import {
  AuthModule,
  ImageUploadModule,
  ItemModule,
  ItemTableModel,
  UsersModel,
} from './modules';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { CheckAuthGuard, CheckRolesGuard } from './guards';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './uploads',
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
      },
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: parseInt(process.env.DB_PORT) || 5432,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME,
      models: [UsersModel, ItemTableModel],
      synchronize: true,
      autoLoadModels: true,
      logging: false,
    }),
    AuthModule,
    ItemModule,
    ImageUploadModule,
  ],
  providers: [
    {
      useClass: ExceptionHandler,
      provide: APP_FILTER,
    },
    {
      useClass: CheckAuthGuard,
      provide: APP_GUARD,
    },
    {
      useClass: CheckRolesGuard,
      provide: APP_GUARD,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
