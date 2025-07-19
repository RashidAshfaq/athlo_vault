import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        const token = req.token; // Extract the token from the request object set by JwtAuthGuard
        if (!token) {
          this.logger.error('No token found on the request object');
        }
        return token;
      },
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (!payload) {
      this.logger.error('Invalid token payload');
      throw new UnauthorizedException('Invalid token payload');
    }
    this.logger.log(`Token payload validated: ${JSON.stringify(payload)}`);
    return { userId: payload.sub, role: payload.role };
  }
}
