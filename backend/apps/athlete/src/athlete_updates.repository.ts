import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from '@app/common';
import { AthleteUpdate } from './models/athlete_updates.entity';

@Injectable()
export class AthleteUpdateRepository extends AbstractRepository<AthleteUpdate> {
  protected readonly logger = new Logger(AthleteUpdateRepository.name);

  constructor(
    @InjectRepository(AthleteUpdate)
    private readonly repo: Repository<AthleteUpdate>,
  ) {
    super(repo);
  }

  async findByAthlete(athleteId: number, limit = 5) {
    return this.repo.find({
      where: { athlete: { id: athleteId } },
      order: { created_at: 'DESC' },
      take: limit,
    });
  }
}
