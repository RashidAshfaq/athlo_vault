import { Investor } from './models/investor.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InvestorRepository extends AbstractRepository<Investor> {
  protected readonly logger = new Logger(InvestorRepository.name);

  constructor(
    @InjectRepository(Investor)
    private readonly investorRepository: Repository<Investor>,
  ) {
    super(investorRepository);
  }

  async update(entity: Investor): Promise<Investor> {
    const saved = await this.investorRepository.save(entity);
    return await this.investorRepository.findOne({
      where: { id: saved?.id },
      relations: ['user'],
    });
  }
  async updateUsingUserId(
    userId: number,
    phone?: string,
    address?: string,
    name?: string,
  ): Promise<Investor> {
    const investor = await this.investorRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!investor) {
      throw new NotFoundException(
        `Investor profile not found for userId ${userId}`,
      );
    }

    if (typeof phone === 'string') {
      investor.phone = phone;
    }
    if (typeof address === 'string') {
      investor.address = address;
    }
    if (typeof name === 'string') {
      investor.fullName = name;
    }

    return this.investorRepository.save(investor);
  }
}
