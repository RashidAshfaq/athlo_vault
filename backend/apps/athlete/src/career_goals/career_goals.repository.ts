import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepository } from '@app/common';
import { CareerGoal } from '../models/career_goals.entity';

@Injectable()
export class CareerGoalRepository extends AbstractRepository<CareerGoal> {
  protected readonly logger = new Logger(CareerGoalRepository.name);

  constructor(
    @InjectRepository(CareerGoal)
    private readonly goalRepository: Repository<CareerGoal>,
  ) {
    super(goalRepository);
  }

  async findAllByAthleteId(athleteId: number): Promise<CareerGoal[]> {
    return this.goalRepository.find({
      where: { athlete: { id: athleteId, is_deleted: false } },
      relations: ['milestones'],
      order: { created_at: 'DESC' },
    });
  }

  async findByIdAndAthlete(
    goalId: number,
    athleteId: number,
  ): Promise<CareerGoal | null> {
    return this.goalRepository.findOne({
      where: {
        id: goalId,
        athlete: { id: athleteId },
        is_deleted: false,
      },
    });
  }

  async softDelete(goalId: number, athleteId: number): Promise<boolean> {
    const goal = await this.findByIdAndAthlete(goalId, athleteId);
    if (!goal) return false;
    goal.is_deleted = true;
    await this.goalRepository.save(goal);
    return true;
  }
}
