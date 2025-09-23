import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { GolfSeasonStats } from '../models/golf_season_stats.entity';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { AthleteUpdate } from '../models/athlete_updates.entity';

@Injectable()
export class GolfSeasonStatsRepository extends AbstractRepository<GolfSeasonStats> {
  protected readonly logger = new Logger(GolfSeasonStatsRepository.name);

  constructor(
    @InjectRepository(GolfSeasonStats)
    private readonly seasonRepository: Repository<GolfSeasonStats>,
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
    let savedStats: GolfSeasonStats;

    if (!existingStats) {
      const newStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(newStats);

      await AthleteUpdate.create({
        title: 'Golf Season Stats Created',
        description: `Handicap ${dto.handicap}, Avg Score ${dto.avgScore}, Tournaments ${dto.tournaments}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else if (this.hasChanges(existingStats, dto)) {
      const updatedStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(updatedStats);

      await AthleteUpdate.create({
        title: 'Golf Season Stats Updated',
        description: `Handicap ${dto.handicap}, Avg Score ${dto.avgScore}, Tournaments ${dto.tournaments}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else return existingStats;

    return savedStats;
  }

  private hasChanges(existingStats: GolfSeasonStats, newStats: any): boolean {
    return Object.keys(newStats).some(
      (key) => existingStats[key] !== newStats[key],
    );
  }
}
