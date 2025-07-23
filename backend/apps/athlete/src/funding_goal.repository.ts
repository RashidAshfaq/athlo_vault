import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { FundingGoal } from './models/athlete_funding.entity';

@Injectable()
export class FundingGoalRepository extends AbstractRepository<FundingGoal> {
  protected readonly logger = new Logger(FundingGoalRepository.name);

  constructor(
    @InjectRepository(FundingGoal)
    private readonly goalRepository: Repository<FundingGoal>,
  ) {
    super(goalRepository);
  }

  async update(entity: FundingGoal): Promise<FundingGoal> {
    return this.goalRepository.save(entity);
  }
}
