import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Athlete } from './athlete.entity';

@Entity('investment_pitch')
export class InvestmentPitch extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @ManyToOne(() => Athlete, (athlete) => athlete.investmentPitches, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'athleteId' })
  athlete: Athlete;

  @Column()
  athleteId: number;
}
