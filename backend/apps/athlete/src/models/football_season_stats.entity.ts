import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('football_season_stats')
export class FootballSeasonStats extends AbstractEntity {
  @Column({ type: 'int' })
  yards: number;

  @Column({ type: 'int' })
  touchdowns: number;

  @Column({ type: 'int' })
  completion: number;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'int' })
  rushingYards: number;

  @Column({ type: 'int' })
  rushingTds: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.footballSeasonStats , {
      onDelete: 'CASCADE',
    })
  athlete: Athlete;
}