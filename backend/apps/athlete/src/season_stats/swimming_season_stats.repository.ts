import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { SwimmingSeasonStats } from '../models/swimming_season_stats.entity';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { AthleteUpdate } from '../models/athlete_updates.entity';

@Injectable()
export class SwimmingSeasonStatsRepository extends AbstractRepository<SwimmingSeasonStats> {
  protected readonly logger = new Logger(SwimmingSeasonStatsRepository.name);

  constructor(
    @InjectRepository(SwimmingSeasonStats)
    private readonly seasonRepository: Repository<SwimmingSeasonStats>,
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
    let savedStats: SwimmingSeasonStats;

    if (!existingStats) {
      const newStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(newStats);

      await AthleteUpdate.create({
        title: 'Swimming Season Stats Created',
        description: `Records ${dto.records}, Medals ${dto.medals}, Competitions ${dto.competitions}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else if (this.hasChanges(existingStats, dto)) {
      const updatedStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(updatedStats);

      await AthleteUpdate.create({
        title: 'Swimming Season Stats Updated',
        description: `Records ${dto.records}, Medals ${dto.medals}, Competitions ${dto.competitions}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else return existingStats;

    return savedStats;
  }

  private hasChanges(
    existingStats: SwimmingSeasonStats,
    newStats: any,
  ): boolean {
    return Object.keys(newStats).some(
      (key) => existingStats[key] !== newStats[key],
    );
  }
}
