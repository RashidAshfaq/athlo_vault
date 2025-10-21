import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import {
  ATHLETE_SERVICE,
  CustomLogger,
  PasswordService,
  UserRole,
  Response,
  formatUsersData,
  INVESTOR_SERVICE,
  ADMIN_SERVICE,
  FAN_SERVICE,
} from '@app/common';
import { SignupDto } from './dtos/signup.dto';
import { AccountType, User } from './models/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dtos/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserDTO } from 'apps/admin/src/dtos/user.dto';
import { BulkUserStatusDto } from 'apps/admin/src/dtos/bulk-user-status.dto';
import { doesNotMatch } from 'assert';

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
    @Inject(INVESTOR_SERVICE)
    private readonly investorServiceClient: ClientProxy,
    @Inject(ADMIN_SERVICE)
    private readonly adminServiceClient: ClientProxy,
    @Inject(FAN_SERVICE)
    private readonly fanServiceClient: ClientProxy,
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
    let userData = null;
    if (savedUser.role === UserRole.ATHLETE) {
      const response: Response = await lastValueFrom(
        this.athleteServiceClient.send('saved_athlete_profile', savedUser),
      );
      if (!response?.success) throw new Error(response?.message);
      this.logger.log('Athlete Profile Saved Successfully.');
      userData = response.data;
    } else if (savedUser.role === UserRole.INVESTOR) {
      const response: Response = await lastValueFrom(
        this.investorServiceClient.send('saved_investor_profile', savedUser),
      );
      if (!response?.success) throw new Error(response?.message);
      this.logger.log('Investor Profile Saved Successfully.');
      userData = response.data;
    } else if (savedUser.role === UserRole.ADMIN) {
      const response: Response = await lastValueFrom(
        this.adminServiceClient.send('saved_admin_profile', savedUser),
      );
      if (!response?.success) throw new Error(response?.message);
      this.logger.log('Admin Profile Saved Successfully.');
      userData = response.data;
    } else if (savedUser.role === UserRole.FAN) {
      const response: Response = await lastValueFrom(
        this.fanServiceClient.send('saved_fan_profile', savedUser),
      );
      if (!response?.success) throw new Error(response?.message);
      this.logger.log('Admin Profile Saved Successfully.');
      userData = response.data;
    }
    const data = await this.getUsersData(userData);
    return {
      message: 'User created successfully',
      data: data,
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
    if (user) {
      await User.update(
        { id: user?.id },
        {
          last_active: new Date(),
        },
      );
    }
    return this.getUsersData(user);
  }

  async getUsersData(user: any) {
    const role = user.role ?? user.user?.role ?? null;
    const id = user?.user?.id ?? user?.id ?? null;

    const payload = {
      sub: id,
      role: role,
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
    const data = await formatUsersData(user);
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

  // async getUsersDashboardAndList(dto: UserDTO) {
  //   const [base, prRes, invRes] = await Promise.all([
  //     this.authRepo.getUsersDashboardAndList(dto),
  //     lastValueFrom(
  //       this.athleteServiceClient.send(
  //         'get_purchase_request_pending_approval_count',
  //         {},
  //       ),
  //     ),
  //     lastValueFrom(
  //       this.athleteServiceClient.send(
  //         'get_purchase_request',
  //         {page: dto.page, limit: dto.limit},
  //       ),
  //     ),
  //     lastValueFrom(
  //       this.investorServiceClient.send('get_total_investment', {}),
  //     ),
  //   ]);

  //   const purchase_request_count = prRes?.success
  //     ? Number(prRes.data?.count ?? prRes.data ?? 0)
  //     : 0;

  //   const total_investment = invRes?.success
  //     ? Number(invRes.data?.total ?? invRes.data ?? 0)
  //     : 0;

  //   return {
  //     ...base,
  //     summary: {
  //       ...base.summary,
  //       purchase_request_count,
  //       total_investment,
  //     },
  //   };
  // }
  async getUsersDashboardAndList(dto: UserDTO) {
    const baseP = this.authRepo.getUsersDashboardAndList(dto);
    const prCountP = lastValueFrom(
      this.athleteServiceClient.send(
        'get_purchase_request_pending_approval_count',
        {},
      ),
    );
    const totalInvP = lastValueFrom(
      this.investorServiceClient.send('get_total_investment', {}),
    );

    const prListP =
      dto.filter === 'requests'
        ? lastValueFrom(
            this.athleteServiceClient.send('get_purchase_request', {
              page: dto.page,
              limit: dto.limit,
            }),
          )
        : Promise.resolve(null);

    const [base, prCountRes, totalInvRes, prListRes] = await Promise.all([
      baseP,
      prCountP,
      totalInvP,
      prListP,
    ]);

    const purchase_request_count = prCountRes?.success
      ? Number(prCountRes.data?.count ?? prCountRes.data ?? 0)
      : 0;

    const total_investment = totalInvRes?.success
      ? Number(totalInvRes.data?.total ?? totalInvRes.data ?? 0)
      : 0;

    const summary = {
      ...base.summary,
      purchase_request_count,
      total_investment,
    };

    if (dto.filter === 'requests') {
      const requestsData = prListRes?.success
        ? (prListRes.data?.data ?? [])
        : [];
      const requestsMeta = prListRes?.success
        ? (prListRes.data?.meta ?? {})
        : {};

      return {
        summary,
        requests: {
          data: requestsData,
          meta: requestsMeta,
        },
      };
    }

    return { ...base, summary };
  }

  async updateProfileUsingId(dto: UserDTO, user: any) {
    if (!dto.userId) {
      throw new NotFoundException('userId is required');
    }
    const updatedUser = await this.authRepo.updateUserCoreById(dto, user);
    const accountType = (updatedUser as any).accountType as
      | 'athlete'
      | 'investor'
      | 'fan'
      | 'admin';
    let athleteRes: any = null;
    let investorRes: any = null;
    let fanRes: any = null;
    try {
      if (
        accountType === 'athlete' &&
        (dto.phone || dto.location || dto.name)
      ) {
        athleteRes = await lastValueFrom(
          this.athleteServiceClient.send('update_athlete_profile', {
            userId: dto.userId,
            phone: dto.phone,
            location: dto.location,
            name: dto.name,
            investment_duration: dto.investment_duration,
            total_funding: dto.total_funding,
            min_investment: dto.min_investment,
            investment_days: dto.investment_days,
          }),
        );
      } else if (
        accountType === 'investor' &&
        (dto.phone || dto.location || dto.name)
      ) {
        investorRes = await lastValueFrom(
          this.investorServiceClient.send('update_investor_profile', {
            userId: dto.userId,
            phone: dto.phone,
            location: dto.location,
            name: dto.name,
          }),
        );
      } else if (
        accountType === 'fan' &&
        (dto.phone || dto.location || dto.name)
      ) {
        fanRes = await lastValueFrom(
          this.fanServiceClient.send('update_fan_profile', {
            userId: dto.userId,
            email: dto.email,
            name: dto.name,
          }),
        );
      }
    } catch (err) {
      this.logger.error(
        `Profile RPC failed for ${accountType}: ${err?.message || err}`,
      );
    }
    return {
      message: 'Profile updated successfully.',
      data: {
        userId: updatedUser.id,
        role: accountType,
        email: updatedUser.email,
        name: `${updatedUser.firstName} ${updatedUser.lastName}`.trim(),
        status: (updatedUser as any).is_deleted
          ? 'suspended'
          : updatedUser.isApproved
            ? 'active'
            : 'pending',
        phone: dto.phone ?? null,
        location: dto.location ?? null,
        investment_duration: dto.investment_duration ?? null,
        total_funding: dto.total_funding ?? null,
        rpc: {
          athlete: athleteRes?.success ?? (athleteRes === null ? null : false),
          investor:
            investorRes?.success ?? (investorRes === null ? null : false),
          fan: fanRes?.success ?? (fanRes === null ? null : false),
        },
      },
    };
  }

  async bulkUpdateStatus(dto: BulkUserStatusDto, performedByUserId: number) {
    return await this.authRepo.bulkUpdateStatus(dto, performedByUserId);
  }
}
