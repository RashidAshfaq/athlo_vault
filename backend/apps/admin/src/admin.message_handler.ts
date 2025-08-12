import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from '@app/common';
import { AdminService } from './admin.service';

@Controller()
export class AdminMessageHandler {
  protected readonly logger = new Logger(AdminMessageHandler.name);
  constructor(private readonly adminService: AdminService) {}

  @MessagePattern('saved_admin_profile')
  async createAdminProfile(data: any): Promise<Response> {
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };
    try {
      const user = await this.adminService.createNewAdmin(data);
      response.success = true;
      response.data = user;
      response.message = 'Admin created successfully.';
    } catch (ex) {
      response.data.error = ex;
      response.message = ex.message;
    }

    return response;
  }
}
