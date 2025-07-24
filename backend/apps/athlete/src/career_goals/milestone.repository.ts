import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { Milestone } from '../models/milestone.entity';

@Injectable()
export class MilestoneRepository extends AbstractRepository<Milestone> {
  protected readonly logger = new Logger(MilestoneRepository.name);

  constructor(
    @InjectRepository(Milestone)
    private readonly milestoneRepository: Repository<Milestone>,
  ) {
    super(milestoneRepository);
  }
}
