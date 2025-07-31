import { Investor } from "./models/investor.entity";
import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@app/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class InvestorRepository extends AbstractRepository<Investor> {
  protected readonly logger = new Logger(InvestorRepository.name);

  constructor(
    @InjectRepository(Investor) private readonly investorRepository: Repository<Investor>,
  ) {
    super(investorRepository);
  }

  async update(entity: Investor): Promise<Investor> {
  const saved = await this.investorRepository.save(entity);
  return await this.investorRepository.findOne({
    where: { id: saved?.id},
    relations: ['user']
  })
}


}