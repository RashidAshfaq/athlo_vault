import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators';
import { UserRole } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role)
      throw new ForbiddenException('User not authenticated');

    const userRoles = [user.role];
    const hasAccess = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasAccess) throw new ForbiddenException('Insufficient permissions');

    return true;
  }
}
