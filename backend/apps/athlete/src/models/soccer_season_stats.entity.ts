import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('soccer_season_stats')
export class SoccerSeasonStats extends AbstractEntity {
  @Column({ type: 'int' })
  goals: number;

  @Column({ type: 'int' })
  assists: number;

  @Column({ type: 'int' })
  matches: number;

  @Column({ type: 'int' })
  shotOnTarget: number;

  @Column({ type: 'float' })
  passAccuracy: number;

  @Column({ type: 'float' })
  dribbleSuccess: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.soccerSeasonStats , {
      onDelete: 'CASCADE',
    })
  athlete: Athlete;
}
