import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { Response } from '@app/common';
import { AuthRepository } from './auth.repository';

@Controller()
export class AuthMessageHandler {
  protected readonly logger = new Logger(AuthMessageHandler.name);
  constructor(private readonly authService: AuthService, private readonly authRepo: AuthRepository) {}

  @MessagePattern('validate_token')
  async validateToken(data: { token: string }): Promise<Response> {
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };

    try {
      const user = await this.authService.validateToken(data.token);
      response.success = true;
      response.message = 'Token validated successfully.';
      response.data = { user };
    } catch (error) {
      response.data.error = error;
      response.message = error.message;
    }
    return response;
  }

  @MessagePattern('update_user_profile')
  async updateUserProfile(data: any): Promise<Response> {
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };

    try {
      const user = await this.authRepo.update(data);
      response.success = true;
      response.message = 'User Updated successfully.';
      response.data = { user };
    } catch (error) {
      response.data.error = error;
      response.message = error.message;
    }
    return response;
  }
}
