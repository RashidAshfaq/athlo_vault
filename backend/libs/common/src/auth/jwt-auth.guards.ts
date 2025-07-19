import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  Logger,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/constant/services';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Response } from '@app/common'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers?.authorization;
    const startTime = Date.now();

    if (!authorizationHeader) {
      this.logger.error('Authorization header is missing');
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [, token] = authorizationHeader.split(' ');
    if (!token) {
      this.logger.error('Token is missing in the Authorization header');
      throw new UnauthorizedException(
        'Token is missing in the Authorization header',
      );
    }

    this.logger.log(`Received token: ${token}`);

    return this.authClient.send('validate_token', { token }).pipe(
      tap((response: Response) => {
        if (!response.success) {
          this.logger.error('Unable to validate token.');
          throw new UnauthorizedException(
            'You are not authorized to access this resource.',
          );
        }

        const { user } = response.data;
        const requiredRole = this.getRequiredRole(context);
        if (requiredRole && user.role !== requiredRole) {
          this.logger.error(
            `Unauthorized role access. Required: ${requiredRole}, Found: ${user.role}`,
          );
          throw new UnauthorizedException(
            'You are not authorized to access this resource',
          );
        }

        request.user = user;
      }),
      map(() => true),
      catchError((err) => {
        const executionTime = `${Date.now() - startTime} milliseconds`;
        this.logger.error(`Token validation failed: ${err.message}`);
        // Extract error details from Microservice or provide default
        const status = err instanceof HttpException ? err.getStatus() : 401;
        const errorResponse = err?.response || {
          message: 'You are not authorized to perform this action.',
        };
        this.logger.error(
          `Error Response: ${JSON.stringify({
            success: false,
            message:
              errorResponse.message ||
              'You are not authorized to perform this action.',
            executionTime: executionTime,
            error: {
              stack: err.stack,
              response: errorResponse.message,
            },
          })}`,
        );

        // Re-throw a formatted error with original details
        throw new HttpException(
          {
            success: false,
            message:
              errorResponse.message ||
              'You are not authorized to perform this action',
            executionTime: executionTime,
            error: {
              stack: err.stack,
              response: errorResponse.message,
            },
          },
          status,
        );
      }),
    );
  }

  private getRequiredRole(context: ExecutionContext): string | null {
    const handler = context.getHandler();
    const classRef = context.getClass();

    // Check metadata on the handler (method) level
    const handlerRole = Reflect.getMetadata('role', handler);
    if (handlerRole) return handlerRole;

    // Check metadata on the class level
    const classRole = Reflect.getMetadata('role', classRef);
    return classRole ?? null;
  }
}
