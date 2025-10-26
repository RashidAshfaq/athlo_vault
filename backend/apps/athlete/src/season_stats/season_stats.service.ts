import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { BaseballSeasonStatsRepository } from './baseball_season_stats.repository';
import { BasketballSeasonStatsRepository } from './basketball_season_stats.repository';
import { FootballSeasonStatsRepository } from './football_season_stats.repository';
import { GolfSeasonStatsRepository } from './golf_season_stats.repository';
import { SoccerSeasonStatsRepository } from './soccer_season_stats.repository';
import { SwimmingSeasonStatsRepository } from './swimming_season_stats.repository';
import { TennisSeasonStatsRepository } from './tennis_season_stats.repository';
import { TrackAndFieldsRepository } from './track_and_fields_season_stats.repository';
import { AthleteRepository } from '../athlete.repository';

@Injectable()
export class SeasonStatsService {
  constructor(
    private readonly baseballSeasonRepo: BaseballSeasonStatsRepository,
    private readonly basketballSeasonRepo: BasketballSeasonStatsRepository,
    private readonly footballSeasonRepo: FootballSeasonStatsRepository,
    private readonly golfSeasonRepo: GolfSeasonStatsRepository,
    private readonly soccerSeasonRepo: SoccerSeasonStatsRepository,
    private readonly swimmingSeasonRepo: SwimmingSeasonStatsRepository,
    private readonly tennisSeasonRepo: TennisSeasonStatsRepository,
    private readonly trackAndFieldSeasonRepo: TrackAndFieldsRepository,
    private readonly athleteRepo: AthleteRepository,
  ) {}

  async updateSeasonStats(
    athleteId: number,
    primarySport: string,
    dto: UpdateSeasonStatsDto,
  ) {
    let currentSeasonStats: any;
    switch (primarySport.toLowerCase()) {
      case 'football':
        currentSeasonStats = await this.footballSeasonRepo.createOrUpdate(athleteId, dto);
        break; 
      case 'basketball':
        currentSeasonStats = await this.basketballSeasonRepo.createOrUpdate(athleteId, dto);
        break; 
      case 'swimming':
        currentSeasonStats = await this.swimmingSeasonRepo.createOrUpdate(athleteId, dto);
        break; 
      case 'soccer':
        currentSeasonStats = await this.soccerSeasonRepo.createOrUpdate(athleteId, dto);
        break; 
      case 'baseball':
        currentSeasonStats = await this.baseballSeasonRepo.createOrUpdate(athleteId, dto);
        break; 
      case 'tennis':
        currentSeasonStats = await this.tennisSeasonRepo.createOrUpdate(athleteId, dto);
        break; 
      case 'golf':
        currentSeasonStats = await this.golfSeasonRepo.createOrUpdate(athleteId, dto);
        break; 
      case 'track and field':
        currentSeasonStats = await this.trackAndFieldSeasonRepo.createOrUpdate(athleteId, dto);
        break; 
      default:
        throw new NotFoundException('Sport not recognized');
    }

    if (currentSeasonStats) {
      await this.athleteRepo.updateSeasonStatsId(athleteId, currentSeasonStats, primarySport);
    }
    
    return {data: currentSeasonStats, message: 'Athlete Season Stats Updated Successfully.'};
  }


}
