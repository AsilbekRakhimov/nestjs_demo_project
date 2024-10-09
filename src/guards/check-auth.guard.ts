import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Protected } from 'src/decorators';

export declare interface RequestInterface extends Request {
  userId: string | undefined;
  role: string | undefined;
}

@Injectable()
export class CheckAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const isProtected = this.reflector.get<boolean>(
        Protected,
        context.getHandler(),
      );
      const request = context.switchToHttp().getRequest<RequestInterface>();

      if (!isProtected) {
        request.role = 'user';
        return true;
      }

      const token: string = context.switchToHttp().getRequest().headers[
        'authorization'
      ];

      if (!token.startsWith('Bearer') || !token.split(' ')[1]) {
        return false;
      }

      const extendedToken = token.split(' ')[1];

      const data = this.jwtService.verify(extendedToken, {
        secret: process.env.JWT_ACCESS_SECRET_KEY,
      });
      request.role = data.role;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Token is expired');
      } else {
        throw new UnauthorizedException('Token is invalid');
      }
    }
  }
}
