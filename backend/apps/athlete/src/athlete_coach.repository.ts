import { Injectable, Logger } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { Coach } from './models/coach.entity';

@Injectable()
export class CoachRepository extends AbstractRepository<Coach> {
  protected readonly logger = new Logger(CoachRepository.name);

  constructor(
    @InjectRepository(Coach)
    private readonly coachRepository: Repository<Coach>,
  ) {
    super(coachRepository);
  }

  async update(entity: Coach): Promise<Coach> {
    return this.coachRepository.save(entity);
  }

    async save(entity: Coach): Promise<Coach> {
    return this.coachRepository.save(entity);
  }

  async findCoach(where: FindOptionsWhere<Coach>): Promise<Coach | null> {
    try {
      return await this.coachRepository.findOne({ where });
    } catch (error) {
      this.logger.error('Failed to find user', error);
    }
  }
}
