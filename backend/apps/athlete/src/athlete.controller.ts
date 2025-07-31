import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AthleteService } from './athlete.service';
import {
  formatUsersData,
  JwtAuthGuard,
  LoggingInterceptor,
  Roles,
  RolesGuard,
  UserRole,
} from '@app/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UpdateAthleteProfileDto } from './dtos/update-athlete-profile.dto';

@Controller()
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) {}

  @Roles(UserRole.ATHLETE)
  @Put('profile')
  @UseInterceptors(AnyFilesInterceptor())
  async updateProfile(
    @Req() req: any,
    @Body() dto: UpdateAthleteProfileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const athlete = req?.user?.athlete;
    return this.athleteService.updateFullProfile(athlete, dto, files);
  }

  @Roles(UserRole.ATHLETE)
  @Get('profile')
  async getProfile(@Req() req: any) {
    const data = await formatUsersData(req?.user);
    return {
      message: 'Athlete Profile Fetched Successfully.',
      data: data,
    };
  }

  @Roles(UserRole.ATHLETE)
  @Get('dashboard')
  async getDashboard(@Req() req: any) {
    const athlete = req?.user?.athlete;
    if (!athlete) throw new Error('Athlete not found');

    const data = await this.athleteService.getAthleteDashboard(athlete);
    return {
      message: 'Athlete Dashboard Fetched Successfully.',
      data,
    };
  }
}
