import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { SoccerSeasonStats } from '../models/soccer_season_stats.entity';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { AthleteUpdate } from '../models/athlete_updates.entity';

@Injectable()
export class SoccerSeasonStatsRepository extends AbstractRepository<SoccerSeasonStats> {
  protected readonly logger = new Logger(SoccerSeasonStatsRepository.name);

  constructor(
    @InjectRepository(SoccerSeasonStats)
    private readonly seasonRepository: Repository<SoccerSeasonStats>,
  ) {
    super(seasonRepository);
  }

  async searchExisting(athleteId: number) {
    return await this.seasonRepository.findOne({
      where: { athlete: { id: athleteId } },
      order: { created_at: 'DESC' },
    });
  }

  async createOrUpdate(athleteId: number, dto: UpdateSeasonStatsDto) {
    const existingStats = await this.searchExisting(athleteId);
    let savedStats: SoccerSeasonStats;

    if (!existingStats) {
      const newStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(newStats);

      await AthleteUpdate.create({
        title: 'Soccer Season Stats Created',
        description: `Goals ${dto.goals}, Assists ${dto.assists}, Matches ${dto.matches}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else if (this.hasChanges(existingStats, dto)) {
      const updatedStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(updatedStats);

      await AthleteUpdate.create({
        title: 'Soccer Season Stats Updated',
        description: `Goals ${dto.goals}, Assists ${dto.assists}, Matches ${dto.matches}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else return existingStats;

    return savedStats;
  }

  private hasChanges(existingStats: SoccerSeasonStats, newStats: any): boolean {
    return Object.keys(newStats).some(
      (key) => existingStats[key] !== newStats[key],
    );
  }
}
