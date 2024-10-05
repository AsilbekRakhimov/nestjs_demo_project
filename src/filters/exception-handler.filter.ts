import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: any | HttpStatus, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();

      res.status(status).send({
        message,
        time: new Date().toISOString(),
        path: req.url,
      });
    } else {
      res.status(500).send({
        message: "Server bilan bog'liq xatolik!",
        time: new Date().toISOString(),
        path: req.url,
      });
    }
  }
}
