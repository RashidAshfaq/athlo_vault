import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { CareerGoal } from './career_goals.entity';

@Entity('milestones')
export class Milestone extends AbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'date', nullable: true })
  targetDate: Date;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ type: 'boolean', default: false })
  inProgress: boolean;

  @ManyToOne(() => CareerGoal, (careerGoal) => careerGoal.milestones, {
    onDelete: 'CASCADE',
  })
  careerGoal: CareerGoal;
}
