import { AbstractEntity } from '@app/common';
import { Entity, Column, OneToOne } from 'typeorm';
import { Athlete } from './athlete.entity';

@Entity('athlete_funding_goals')
export class FundingGoal extends AbstractEntity {
  @Column({ type: 'text' })
  fundUses: string;

  @Column({ type: 'float' })
  revenueSharePercentage: number;

  @Column({ type: 'text' })
  currentGoalsTimelines: string;

  @OneToOne(() => Athlete, (athlete) => athlete.fundingGoal, {
    cascade: true,
  })
  athlete: Athlete;
}
