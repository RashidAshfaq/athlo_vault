import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { ATHLETE_SERVICE, CustomLogger, PasswordService, UserRole, Response, formatUsersData } from '@app/common';
import { SignupDto } from './dtos/signup.dto';
import { AccountType, User } from './models/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dtos/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

const roleMap: Record<AccountType, UserRole> = {
  [AccountType.ATHLETE]: UserRole.ATHLETE,
  [AccountType.INVESTOR]: UserRole.INVESTOR,
  [AccountType.ADMIN]: UserRole.ADMIN,
  [AccountType.FAN]: UserRole.FAN,
};
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly logger: CustomLogger,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(ATHLETE_SERVICE)
    private readonly athleteServiceClient: ClientProxy,
  ) {}

  async signup(dto: SignupDto): Promise<any> {
    const existing = await this.authRepo.findUser({ email: dto.email });
    if (existing) {
      throw new BadRequestException('User already exists with this email');
    }

    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.accountType = dto.accountType;
    user.role = roleMap[dto.accountType];
    user.password = await this.passwordService.hashPassword(dto.password);
    user.isApproved = false;
    user.isProfileCompleted = false;

    const savedUser = await this.authRepo.create(user);
    if(savedUser.role === UserRole.ATHLETE) {
    const athlete: Response = await lastValueFrom(
        this.athleteServiceClient.send('saved_athlete_profile', savedUser),
      );
    if (!athlete.success) throw new Error(athlete.message);
    this.logger.log('Athlete Profile Saved Successfully.')
    }
    return {
      message: 'User created successfully',
      data: savedUser,
    };
  }

  async login(dto: LoginDto) {
    const { email, password, role } = dto;

    const user = await this.authRepo.findOneWhere({ email, role });
    if (!user)
      throw new UnauthorizedException('Invalid email or role combination');

    const validPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!validPassword) throw new UnauthorizedException('Invalid credentials');
    return this.getUsersData(user);
  }

  async getUsersData(user: User) {
    const payload = {
      sub: user.id,
      role: user.role,
      is_deleted: false,
    };

    const secret = this.configService.get('JWT_SECRET');
    const expiresIn = this.configService.get('JWT_EXPIRATION');
    const refreshIn = this.configService.get('REFRESH_JWT_EXPIRATION');

    const access_token = this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret,
      expiresIn: refreshIn,
    });
    const data =  await formatUsersData(user);
    return {
      ...data,
      access_token,
      refresh_token,
    };
  }

  async validateToken(token: string): Promise<User> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }); // Verify and decode the token

      if (!payload || !payload.role) {
        throw new UnauthorizedException(
          'Invalid token or missing role in payload',
        );
      }
      // Fetch user by ID
      const user = await this.authRepo.findOneWhere({
        id: parseInt(payload.sub, 10),
      });

      if (!user) {
        this.logger.warn(`User with ID ${payload.sub} not found`);
        throw new UnauthorizedException();
      }

      if (user.is_deleted) {
        this.logger.warn(`User with ID ${payload.sub} is deleted`);
        throw new UnauthorizedException();
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action.',
      );
    }
  }

    async refreshAccessToken(refreshToken: string): Promise<any> {
    try {
      const token = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      if (!token || !token.sub || !token.role) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.authRepo.findUser({
        id: token.sub,
        role: token.role,
      });

      if (!user) throw new UnauthorizedException('Invalid refresh token.');

      const payload = {
        sub: user.id,
        role: user.role,
        is_deleted: false,
      };

      const access_token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
      });

      const refresh_token = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('REFRESH_JWT_EXPIRATION'),
      });

      return { access_token, refresh_token };
    } catch (error) {
      throw new UnauthorizedException('Refresh token invalid or expired.');
    }
  }
}
