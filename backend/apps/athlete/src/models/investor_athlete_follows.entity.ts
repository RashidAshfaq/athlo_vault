import { AbstractEntity } from '@app/common';
import { Entity, ManyToOne, Column, Unique, JoinColumn } from 'typeorm';
import { Athlete } from './athlete.entity';
import { Investor } from 'apps/investor/src/models/investor.entity';

@Entity('investor_athlete_follows')
@Unique(['investor', 'athlete'])
export class InvestorAthleteFollow extends AbstractEntity {
  @ManyToOne(() => Investor, (investor) => investor.investorFollow, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'investorId' })
  investor: Investor;

  @ManyToOne(() => Athlete, (athlete) => athlete.athleteFollow, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'athleteId' })
  athlete: Athlete;

  @Column({ type: 'enum', enum: ['follow', 'unfollow'], default: 'follow' })
  status: 'follow' | 'unfollow';
}
