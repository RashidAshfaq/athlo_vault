import { Inject, Injectable } from '@nestjs/common';
import { Admin } from './models/admin.entity';
import {
  ATHLETE_SERVICE,
  AUTH_SERVICE,
  CustomLogger,
  INVESTOR_SERVICE,
  Response,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { AdminRepository } from './admin.repository';
import { UserDTO } from './dtos/user.dto';
import { lastValueFrom } from 'rxjs';
import { BulkUserStatusDto } from './dtos/bulk-user-status.dto';
import { response } from 'express';

@Injectable()
export class AdminService {
  constructor(
    private readonly logger: CustomLogger,
    private readonly adminRepo: AdminRepository,
    @Inject(AUTH_SERVICE)
    private readonly authServiceClient: ClientProxy,
    @Inject(ATHLETE_SERVICE)
    private readonly athleteServiceClient: ClientProxy,
    @Inject(INVESTOR_SERVICE)
    private readonly investorServiceClient: ClientProxy,
  ) {}

  async createNewAdmin(savedUser: any): Promise<Admin> {
    if (!savedUser?.id)
      throw new Error('User ID is required to create admin profile');

    const fullName = `${savedUser.firstName} ${savedUser.lastName}`;

    const admin = new Admin();
    admin.fullName = fullName;
    admin.email = savedUser.email;
    admin.user = savedUser;

    const savedAdmin = await this.adminRepo.create(admin);
    this.logger.log(`Admin created with ID: ${savedAdmin.id}`);
    return savedAdmin;
  }

  async getDashboard(dto: UserDTO) {
    const user: Response = await lastValueFrom(
      this.authServiceClient.send('get_users', dto),
    );
    if (!user.success) throw new Error(user.message);
    this.logger.log('Users Data Fetched Successfully.');

    return { data: user.data, message: user.message };
  }

  async updateUserProfile(dto: UserDTO, user: any) {
    const response: Response = await lastValueFrom(
      this.authServiceClient.send('update_profile', { dto, user }),
    );
    if (!response.success) throw new Error(response.message);
    this.logger.log('User Profile Updated Successfully.');
    return response;
  }

  async bulkStatus(performedByUserId: number, dto: BulkUserStatusDto){
    const response: Response = await lastValueFrom(
      this.authServiceClient.send('update_user_status', { dto, performedByUserId }),
    );
    if (!response.success) throw new Error(response.message);
    this.logger.log('User Profile Status Updated Successfully.');
    return response.data;
  }
}
