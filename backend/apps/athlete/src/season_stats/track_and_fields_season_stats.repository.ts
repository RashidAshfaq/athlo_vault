import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { TrackAndFieldsSeasonStats } from '../models/track_and_fields_season_stats.entity';
import { UpdateSeasonStatsDto } from './dtos/update-season-stats.dto';
import { AthleteUpdate } from '../models/athlete_updates.entity';
@Injectable()
export class TrackAndFieldsRepository extends AbstractRepository<TrackAndFieldsSeasonStats> {
  protected readonly logger = new Logger(TrackAndFieldsRepository.name);

  constructor(
    @InjectRepository(TrackAndFieldsSeasonStats)
    private readonly seasonRepository: Repository<TrackAndFieldsSeasonStats>,
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
    let savedStats: TrackAndFieldsSeasonStats;

    if (!existingStats) {
      const newStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(newStats);

      await AthleteUpdate.create({
        title: 'Track & Fields Season Stats Created',
        description: `PB100m ${dto.pb100m}, PB200m ${dto.pb200m}, Medals ${dto.medals}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else if (this.hasChanges(existingStats, dto)) {
      const updatedStats = this.seasonRepository.create({
        athlete: { id: athleteId },
        ...dto,
      });
      savedStats = await this.seasonRepository.save(updatedStats);

      await AthleteUpdate.create({
        title: 'Track & Fields Season Stats Updated',
        description: `PB100m ${dto.pb100m}, PB200m ${dto.pb200m}, Medals ${dto.medals}`,
        athlete: { id: athleteId } as any,
      }).save();
    } else return existingStats;

    return savedStats;
  }

  private hasChanges(
    existingStats: TrackAndFieldsSeasonStats,
    newStats: any,
  ): boolean {
    return Object.keys(newStats).some(
      (key) => existingStats[key] !== newStats[key],
    );
  }
}
