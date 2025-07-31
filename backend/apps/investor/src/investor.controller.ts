import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InvestorService } from './investor.service';
import {
  formatUsersData,
  JwtAuthGuard,
  LoggingInterceptor,
  Roles,
  RolesGuard,
  UserRole,
} from '@app/common';
import { UpdateInvestorProfileDto } from './dtos/investor.dto';

@Controller()
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvestorController {
  constructor(private readonly investorService: InvestorService) {}

  @Roles(UserRole.INVESTOR)
  @Put('profile')
  async updateProfile(@Req() req: any, @Body() dto: UpdateInvestorProfileDto) {
    return this.investorService.updateInvestorProfile(req?.user, dto);
  }

  @Roles(UserRole.INVESTOR)
  @Get('profile')
  async getProfile(@Req() req: any) {
    const data = await formatUsersData(req?.user);
    return {
      message: 'Investor Profile Fetched Successfully.',
      data: data,
    };
  }
}
