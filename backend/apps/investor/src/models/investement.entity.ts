import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Investor } from './investor.entity';
import { Athlete } from 'apps/athlete/src/models/athlete.entity';
import { Admin } from 'apps/admin/src/models/admin.entity';

export enum InvestmentStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

@Entity('investments')
export class Investment extends AbstractEntity {
  @Column({ type: 'float' })
  investment_amount: number;

  @ManyToOne(() => Investor, (invest) => invest.investment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'investorId' })
  investor: Investor;

  @ManyToOne(() => Athlete, (athlete) => athlete.investment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'athleteId' })
  athlete: Athlete;

  @ManyToOne(() => Admin, (admin) => admin.investment, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approved_by: Admin;

  @Column({
    type: 'enum',
    enum: InvestmentStatus,
    default: InvestmentStatus.PENDING,
  })
  investment_status: InvestmentStatus;
}
