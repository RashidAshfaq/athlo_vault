import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { BasketballSeasonStats } from '../models/basketball_season_stats.entity';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { AthleteUpdate } from '../models/athlete_updates.entity';

@Injectable()
export class BasketballSeasonStatsRepository extends AbstractRepository<BasketballSeasonStats> {
  protected readonly logger = new Logger(BasketballSeasonStatsRepository.name);

  constructor(
    @InjectRepository(BasketballSeasonStats)
    private readonly seasonRepository: Repository<BasketballSeasonStats>,
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
    let savedStats: BasketballSeasonStats;

    if (!existingStats) {
      const newStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(newStats);

      await AthleteUpdate.create({
        title: 'Basketball Season Stats Created',
        description: `Points ${dto.points}, Assists ${dto.assists}, Rebounds ${dto.rebounds}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else if (this.hasChanges(existingStats, dto)) {
      const updatedStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(updatedStats);

      await AthleteUpdate.create({
        title: 'Basketball Season Stats Updated',
        description: `Points ${dto.points}, Assists ${dto.assists}, Rebounds ${dto.rebounds}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else return existingStats;

    return savedStats;
  }

  private hasChanges(
    existingStats: BasketballSeasonStats,
    newStats: any,
  ): boolean {
    return Object.keys(newStats).some(
      (key) => existingStats[key] !== newStats[key],
    );
  }
}
