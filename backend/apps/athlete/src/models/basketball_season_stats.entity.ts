import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('basketball_season_stats')
export class BasketballSeasonStats extends AbstractEntity {
  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'int' })
  assists: number;

  @Column({ type: 'int' })
  rebounds: number;

  @Column({ type: 'float' })
  fieldGoal: number;

  @Column({ type: 'float' })
  threePoint: number;

  @Column({ type: 'float' })
  freeThrow: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.basketballSeasonStats , {
      onDelete: 'CASCADE',
    })
  athlete: Athlete;
}
