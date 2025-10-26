import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestorAthleteFollow } from './models/investor_athlete_follows.entity';

@Injectable()
export class InvestorAthleteFollowRepository extends AbstractRepository<InvestorAthleteFollow> {
  protected readonly logger = new Logger(InvestorAthleteFollowRepository.name);

  constructor(
    @InjectRepository(InvestorAthleteFollow)
    private readonly followRepo: Repository<InvestorAthleteFollow>,
  ) {
    super(followRepo);
  }

  async findByInvestorAndAthlete(
    investorId: number,
    athleteId: number,
  ): Promise<InvestorAthleteFollow | null> {
    return await this.followRepo.findOne({
      where: {
        investor: { id: investorId },
        athlete: { id: athleteId },
      },
    });
  }

  async toggleFollow(
    data: Partial<InvestorAthleteFollow>,
  ): Promise<InvestorAthleteFollow> {
    const entity = this.followRepo.create(data);
    this.logger.log(`Toggling follow status: ${JSON.stringify(entity)}`);
    return await this.followRepo.save(entity);
  }
}
