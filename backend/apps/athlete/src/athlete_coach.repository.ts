import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
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
}
