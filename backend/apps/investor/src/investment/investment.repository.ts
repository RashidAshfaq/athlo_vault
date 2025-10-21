import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { Investment } from '../models/investement.entity';

@Injectable()
export class InvestmentRepository extends AbstractRepository<Investment> {
  protected readonly logger = new Logger(InvestmentRepository.name);

  constructor(
    @InjectRepository(Investment)
    private readonly investmentRepository: Repository<Investment>,
  ) {
    super(investmentRepository);
  }

}
