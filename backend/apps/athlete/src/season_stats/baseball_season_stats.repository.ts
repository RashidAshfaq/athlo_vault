import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { BaseballSeasonStats } from '../models/baseball_season_stats.entity';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { AthleteUpdate } from '../models/athlete_updates.entity';

@Injectable()
export class BaseballSeasonStatsRepository extends AbstractRepository<BaseballSeasonStats> {
  protected readonly logger = new Logger(BaseballSeasonStatsRepository.name);

  constructor(
    @InjectRepository(BaseballSeasonStats)
    private readonly seasonRepository: Repository<BaseballSeasonStats>,
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

    if (!existingStats) {
      const newStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });

      AthleteUpdate.create({
        title: 'Baseball Season Stats Created',
        description: `Athlete created baseball stats: ERA ${dto.era}, Strikeouts ${dto.strikeouts}, Wins ${dto.wins}`,
        athlete: { id: athleteId } as any,
      }).save();
      return await this.seasonRepository.save(newStats);
    }

    if (this.hasChanges(existingStats, dto)) {
      const updatedStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });

      AthleteUpdate.create({
        title: 'Baseball Season Stats Updated',
        description: `Athlete updated baseball stats: ERA ${dto.era}, Strikeouts ${dto.strikeouts}, Wins ${dto.wins}`,
        athlete: { id: athleteId } as any,
      }).save();
      return await this.seasonRepository.save(updatedStats);
    }

    return existingStats;
  }

  private hasChanges(
    existingStats: BaseballSeasonStats,
    newStats: any,
  ): boolean {
    return Object.keys(newStats).some(
      (key) => existingStats[key] !== newStats[key],
    );
  }
}
