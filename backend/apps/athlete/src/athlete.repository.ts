import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Athlete } from './models/athlete.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';

@Injectable()
export class AthleteRepository extends AbstractRepository<Athlete> {
  protected readonly logger = new Logger(AthleteRepository.name);

  constructor(
    @InjectRepository(Athlete)
    private readonly athleteRepository: Repository<Athlete>,
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

  async updateUsingUserId(
    userId: number,
    phone?: string,
    location?: string,
    name?: string,
  ): Promise<Athlete> {
    const athlete = await this.athleteRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!athlete) {
      throw new NotFoundException(
        `Athlete profile not found for userId ${userId}`,
      );
    }

    if (typeof phone === 'string') {
      athlete.phone = phone;
    }
    if (typeof location === 'string') {
      athlete.location = location;
    }
    if (typeof name === 'string') {
      athlete.fullName = name;
    }

    return this.athleteRepository.save(athlete);
  }
}
