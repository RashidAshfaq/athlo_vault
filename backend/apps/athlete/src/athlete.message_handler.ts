import { Controller, Logger } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { MessagePattern } from '@nestjs/microservices';
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
}
