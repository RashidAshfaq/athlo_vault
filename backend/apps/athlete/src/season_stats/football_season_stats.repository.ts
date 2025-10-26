import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { FootballSeasonStats } from '../models/football_season_stats.entity';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { AthleteUpdate } from '../models/athlete_updates.entity';

@Injectable()
export class FootballSeasonStatsRepository extends AbstractRepository<FootballSeasonStats> {
  protected readonly logger = new Logger(FootballSeasonStatsRepository.name);

  constructor(
    @InjectRepository(FootballSeasonStats)
    private readonly seasonRepository: Repository<FootballSeasonStats>,
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

      const saved = await this.seasonRepository.save(newStats);

      await AthleteUpdate.create({
        title: 'Season Stats Created',
        description: `Athlete added new Football Season Stats: ${dto.yards} yards, ${dto.touchdowns} TDs, rating ${dto.rating}.`,
        athlete: { id: athleteId } as any,
      }).save();

      return saved;
    }

    if (this.hasChanges(existingStats, dto)) {
      const updatedStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });

      const update = await this.seasonRepository.save(updatedStats);
      await AthleteUpdate.create({
        title: 'Season Stats Updated',
        description: `Athlete updated Football Season Stats: ${dto.yards} yards, ${dto.touchdowns} TDs, rating ${dto.rating}.`,
        athlete: { id: athleteId } as any,
      }).save();
      return update;
    }

    return existingStats;
  }

  private hasChanges(
    existingStats: FootballSeasonStats,
    newStats: any,
  ): boolean {
    return Object.keys(newStats).some(
      (key) => existingStats[key] !== newStats[key],
    );
  }
}
