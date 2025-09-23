import { Entity, Column, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('track_and_fields_season_stats')
export class TrackAndFieldsSeasonStats extends AbstractEntity {
  @Column({ type: 'float' })
  pb100m: number;

  @Column({ type: 'float' })
  pb200m: number;

  @Column({ type: 'int' })
  medals: number;

  @Column({ type: 'int' })
  competitions: number;

  @Column({ type: 'int' })
  worldRankings: number;

  @Column({ type: 'float' })
  seasonBest: number;

  @ManyToOne(() => Athlete, (athlete) => athlete.trackAndFieldsSeasonStats , {
      onDelete: 'CASCADE',
    })
  athlete: Athlete;
}
