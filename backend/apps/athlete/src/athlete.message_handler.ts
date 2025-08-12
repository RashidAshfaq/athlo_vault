import { Controller, Logger } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from '@app/common';

@Controller()
export class AthleteMessageHandler {
  protected readonly logger = new Logger(AthleteMessageHandler.name);
  constructor(private readonly athleteService: AthleteService) {}

  @MessagePattern('saved_athlete_profile')
  async createAthleteProfile(data: any): Promise<Response> {
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };
    try {
      const user = await this.athleteService.createNewAthlete(data);
      response.success = true;
      response.data = user;
      response.message = 'Athlete created successfully.';
    } catch (ex) {
      response.data.error = ex;
      response.message = ex.message;
    }

    return response;
  }

  @MessagePattern('get_purchase_request_pending_approval_count')
  async getPendingPurchaseRequestCount(): Promise<Response>{
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };
    try {
      const user = await this.athleteService.getPendingPurchaseRequestCount();
      response.success = true;
      response.data = user;
      response.message = 'Count Fetched successfully.';
    } catch (ex) {
      response.data.error = ex;
      response.message = ex.message;
    }

    return response;
  }

    @MessagePattern('get_purchase_request')
  async getPurchaseRequests(@Payload() dto: any): Promise<Response>{
    const {page, limit} = dto;
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };
    try {
      const user = await this.athleteService.getPurchaseRequests(page, limit);
      response.success = true;
      response.data = user;
      response.message = 'Purchase Requests Fetched successfully.';
    } catch (ex) {
      response.data.error = ex;
      response.message = ex.message;
    }

    return response;
  }

  @MessagePattern('update_purchase_request_status')
  async updatePurchaseRequests(@Payload() data: any): Promise<Response>{
    const { dto, performedByUserId} = data;
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };
    try {
      const user = await this.athleteService.updatePurchaseRequests(dto, performedByUserId);
      response.success = true;
      response.data = user;
      response.message = 'Purchase Requests Fetched successfully.';
    } catch (ex) {
      response.data.error = ex;
      response.message = ex.message;
    }

    return response;
  }


  @MessagePattern('update_athlete_profile')
  async updateAthleteProfile(@Payload() data: any): Promise<Response> {
    const response: Response = {
      success: false,
      message: '',
      data: {},
    };
    try {
      const user = await this.athleteService.updateUsingUserId(data);
      response.success = true;
      response.data = user;
      response.message = 'Athlete updated successfully.';
    } catch (ex) {
      response.data.error = ex;
      response.message = ex.message;
    }

    return response;
  }
}
