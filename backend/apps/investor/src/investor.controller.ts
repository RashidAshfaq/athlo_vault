import {
  Body,
  Controller,
  Get,
  Put,
  Query,
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
import { GetAthletesFilterDto } from './dtos/athlete.filter.dto';

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

  @Roles(UserRole.INVESTOR)
  @Get('athletes')
  async getAthletes(@Query() filters: GetAthletesFilterDto) {
    const data = await this.investorService.fetchAthletes(filters);
    return {
      success: true,
      message: 'Athletes fetched successfully',
      data,
    };
  }

  @Roles(UserRole.INVESTOR)
  @Get('follow')
  async followOrUnfollowAthlete(@Req() req: any, @Query() dto: GetAthletesFilterDto) {
    const investorId = req.user?.investor?.id;
    return this.investorService.followOrUnfollowAthlete(investorId, dto);
  }
}
