import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('baseball_season_stats')
export class BaseballSeasonStats extends AbstractEntity {
  @Column({ type: 'float' })
  era: number;

  @Column({ type: 'int' })
  strikeouts: number;

  @Column({ type: 'int' })
  wins: number;

  @Column({ type: 'float' })
  whip: number;

  @Column({ type: 'int' })
  innings: number;

  @Column({ type: 'int' })
  saves: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.baseballSeasonStats, {
      onDelete: 'CASCADE',
    })
  athlete: Athlete;
}
