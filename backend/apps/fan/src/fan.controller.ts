import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { FanService } from './fan.service';
import { JwtAuthGuard, LoggingInterceptor, RolesGuard } from '@app/common';

@Controller()
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class FanController {
  constructor(private readonly fanService: FanService) {}
}
