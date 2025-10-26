import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('swimming_season_stats')
export class SwimmingSeasonStats extends AbstractEntity {
  @Column({ type: 'int' })
  records: number;

  @Column({ type: 'int' })
  medals: number;

  @Column({ type: 'int' })
  competitions: number;

  @Column({ type: 'float' })
  pb50m: number;

  @Column({ type: 'float' })
  pb100m: number;

  @Column({ type: 'float' })
  pb200m: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.swimmingSeasonStats , {
      onDelete: 'CASCADE',
    })
  athlete: Athlete;
}
