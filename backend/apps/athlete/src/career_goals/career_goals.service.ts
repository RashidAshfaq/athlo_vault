import { Injectable } from '@nestjs/common';
import { MilestoneRepository } from './milestone.repository';
import { Athlete } from '../models/athlete.entity';
import { CareerGoal } from '../models/career_goals.entity';
import { Milestone } from '../models/milestone.entity';
import { CareerGoalRepository } from './career_goals.repository';
import { CreateCareerGoalDto, MilestoneDto } from './dtos/career_goal.dto';

@Injectable()
export class CareerGoalsService {
  constructor(
    private readonly goalRepo: CareerGoalRepository,
    private readonly milestoneRepo: MilestoneRepository,
  ) {}

  async createCareerGoal(dto: CreateCareerGoalDto, athlete: Athlete): Promise<CareerGoal> {
    // Create the main career goal entity
    const goal = new CareerGoal();
    goal.goalTitle = dto.goalTitle;
    goal.description = dto.description;
    goal.category = dto.category;
    goal.priority = dto.priority;
    goal.targetDate = dto.targetDate;
    goal.athlete = athlete;

    if (dto.milestones && dto.milestones.length) {
      goal.milestones = dto.milestones.map((m: MilestoneDto) => {
        const milestone = new Milestone();
        milestone.name = m.name;
        milestone.targetDate = m.targetDate ?? dto.targetDate ?? null;
        milestone.isCompleted = m.isCompleted ?? false;
        return milestone;
      });
    }

    return this.goalRepo.create(goal);
  }

  async getCareerGoalsOverview(athleteId: number) {
    const goals = await this.goalRepo.findAllByAthleteId(athleteId);

    // -- Overview calculation --
    const total = goals.length;
    let completed = 0, inProgress = 0, allProgress: number[] = [];

    const data = goals.map(goal => {
      const milestones = goal.milestones || [];
      const totalMilestones = milestones.length;

      const completedMilestones = milestones.filter(m => m.isCompleted).length;
      const inProgressMilestones = milestones.filter(m => m.inProgress).length;

      // Calculate progress %
      let progress = 0;
      if (totalMilestones > 0) {
        progress = Math.round((completedMilestones / totalMilestones) * 100);
      }
      allProgress.push(progress);

      // For overview stats
      if (progress === 100) completed++;
      else if (progress > 0) inProgress++;

      return {
        ...goal,
        progress,
        milestones,
      };
    });

    // Calculate average progress (if any goals)
    const avg_progress = allProgress.length
      ? Math.round(allProgress.reduce((a, b) => a + b, 0) / allProgress.length)
      : 0;

    return {
      overview: {
        total,
        inProgress,
        completed,
        avg_progress,
      },
      careerGoals: data,
    };
  }

   async deleteCareerGoal(goalId: number, athleteId: number): Promise<boolean> {
    return this.goalRepo.softDelete(goalId, athleteId);
  }
}
