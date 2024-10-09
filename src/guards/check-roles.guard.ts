import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessedRoles } from 'src/decorators/roles.decorator';
import { RequestInterface } from './check-auth.guard';

@Injectable()
export class CheckRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reqRole = context.switchToHttp().getRequest().roles;
    const roles =
      this.reflector.get<string[]>(AccessedRoles, context.getHandler()) || [];
    const request = context.switchToHttp().getRequest<RequestInterface>();
    // console.log(request.role, roles);

    if (request.role == 'user' && roles.length == 0) {
      return true;
    }

    if (!roles || !roles.includes(request.role)) {
      throw new NotAcceptableException(
        "User don't have permission to this endpoint",
      );
    }

    return true;
  }
}
