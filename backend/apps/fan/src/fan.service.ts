import {
  ATHLETE_SERVICE,
  AUTH_SERVICE,
  CustomLogger,
  INVESTOR_SERVICE,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FanRepository } from './fan.repository';
import { Fans } from './models/fan.entity';

@Injectable()
export class FanService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly fanRepo: FanRepository,
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
    @Inject(ATHLETE_SERVICE)
    private readonly athleteServiceClient: ClientProxy,
  ) {}

  async createNewFan(savedUser: any): Promise<Fans> {
    if (!savedUser?.id)
      throw new Error('User ID is required to create fan profile');

    const fullName = `${savedUser.firstName} ${savedUser.lastName}`;

    const admin = new Fans();
    admin.fullName = fullName;
    admin.email = savedUser.email;
    admin.user = savedUser;

    const savedAdmin = await this.fanRepo.create(admin);
    this.logger.log(`Admin created with ID: ${savedAdmin.id}`);
    return savedAdmin;
  }

  async updateUsingUserId(data: any) {
    const { userId, email, name } = data;
    return await this.fanRepo.updateUsingUserId(userId, email, name);
  }
}
