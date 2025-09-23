import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('golf_season_stats')
export class GolfSeasonStats extends AbstractEntity {
  @Column({ type: 'float' })
  handicap: number;

  @Column({ type: 'int' })
  tournaments: number;

  @Column({ type: 'float' })
  earnings: number;

  @Column({ type: 'float' })
  avgScore: number;

  @Column({ type: 'float' })
  fairwaysHit: number;

  @Column({ type: 'float' })
  greensInReg: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.golfSeasonStats , {
      onDelete: 'CASCADE',
    })
  athlete: Athlete;
}
