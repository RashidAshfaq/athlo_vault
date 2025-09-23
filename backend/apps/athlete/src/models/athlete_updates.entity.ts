import { AbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Athlete } from './athlete.entity';

@Entity('athlete_updates')
export class AthleteUpdate extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Athlete, (athlete) => athlete.updates, { onDelete: 'CASCADE' })
  athlete: Athlete;
}
