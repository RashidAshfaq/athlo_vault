import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { LoggingInterceptor } from '@app/common';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) {}

  @Get()
 @Get()
  getHello() {
    const data = this.athleteService.getHello();
    return {data: data, message: 'here is your request'}
  }
}
