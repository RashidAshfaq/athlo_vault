import {
  Controller,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  JwtAuthGuard,
  LoggingInterceptor,
  Roles,
  RolesGuard,
  UserRole,
} from '@app/common';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { SeasonStatsService } from './season_stats.service';

@Controller('season-stats')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class SeasonStatsController {
  constructor(private readonly seasonStatsService: SeasonStatsService) {}

  @Roles(UserRole.ATHLETE)
  @Put('update_stats')
  async updateSeasonStats(
    @Body() updateSeasonStatsDto: UpdateSeasonStatsDto,
    @Req() req: any,
  ) {
    const athleteId = req?.user?.athlete?.id;
    const primarySport = req?.user?.athlete?.primarySport;
    return this.seasonStatsService.updateSeasonStats(
      athleteId,
      primarySport,
      updateSeasonStatsDto,
    );
  }
}
