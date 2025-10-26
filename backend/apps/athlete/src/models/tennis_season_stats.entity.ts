import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('tennis_season_stats')
export class TennisSeasonStats extends AbstractEntity {
  @Column({ type: 'int' })
  ranking: number;

  @Column({ type: 'int' })
  wins: number;

  @Column({ type: 'int' })
  tournaments: number;

  @Column({ type: 'float' })
  winPercentage: number;

  @Column({ type: 'int' })
  aces: number;

  @Column({ type: 'int' })
  breakPoints: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.tennisSeasonStats , {
      onDelete: 'CASCADE',
    })
  athlete: Athlete;
}
