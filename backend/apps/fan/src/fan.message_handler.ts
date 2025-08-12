import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from '@app/common';
import { FanService } from './fan.service';

@Controller()
export class FanMessageHandler {
  protected readonly logger = new Logger(FanMessageHandler.name);
  constructor(private readonly fanService: FanService) {}

  @MessagePattern('saved_fan_profile')
  async createFanProfile(data: any): Promise<Response> {
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };
    try {
      const user = await this.fanService.createNewFan(data);
      response.success = true;
      response.data = user;
      response.message = 'Fan created successfully.';
    } catch (ex) {
      response.data.error = ex;
      response.message = ex.message;
    }

    return response;
  }

  @MessagePattern('update_fan_profile')
  async updateFanProfile(@Payload() data: any): Promise<Response> {
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };
    try {
      const user = await this.fanService.updateUsingUserId(data);
      response.success = true;
      response.data = user;
      response.message = 'Fan updated successfully.';
    } catch (ex) {
      response.data.error = ex;
      response.message = ex.message;
    }

    return response;
  }
}
