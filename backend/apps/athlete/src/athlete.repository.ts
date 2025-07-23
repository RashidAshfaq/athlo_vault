import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { Athlete } from "./models/athlete.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "@app/common";

@Injectable()
export class AthleteRepository extends AbstractRepository<Athlete> {
  protected readonly logger = new Logger(AthleteRepository.name);

  constructor(
    @InjectRepository(Athlete) private readonly athleteRepository: Repository<Athlete>,
  ) {
    super(athleteRepository);
  }

  async update(entity: Athlete): Promise<Athlete> {
    const saved = await this.athleteRepository.save(entity);
    return this.athleteRepository.findOne({
      where: { id: saved?.id },
      relations: ['user', 'coach', 'socialMedia', 'fundingGoal'],
    });
  }

}