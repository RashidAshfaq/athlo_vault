import { AbstractEntity } from '@app/common';
import { Entity, Column, OneToOne } from 'typeorm';
import { Athlete } from './athlete.entity';

@Entity('coaches')
export class Coach extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'int' })
  yearOfWorkTogether: number;

  @Column({ type: 'text' })
  achievementAndBackground: string;

  @OneToOne(() => Athlete, (athlete) => athlete.socialMedia, {
    cascade: true,
  })
  athlete: Athlete;
}
