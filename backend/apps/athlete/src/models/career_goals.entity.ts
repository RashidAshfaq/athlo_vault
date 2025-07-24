import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from '../models/athlete.entity';
import { Milestone } from './milestone.entity';

@Entity('career_goals')
export class CareerGoal extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  goalTitle: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: string;

  @Column({ type: 'varchar', nullable: true })
  priority: number;

  @Column({ type: 'date', nullable: true })
  targetDate: Date;

  @ManyToOne(() => Athlete, (athlete) => athlete.careerGoals, {
    onDelete: 'CASCADE',
  })
  athlete: Athlete;

  @OneToMany(() => Milestone, (milestone) => milestone.careerGoal, {
    cascade: true,
  })
  milestones: Milestone[];
}
