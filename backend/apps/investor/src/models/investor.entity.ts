import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { User } from 'apps/auth/src/models/users.entity';

@Entity('investors')
export class Investor extends AbstractEntity {
  @Column({ type: 'varchar', length: 100, nullable: true })
  fullName: string;
  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state_of_residence: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  household_income: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profession: string;

  @Column({ type: 'float', nullable: true })
  expected_investment_amount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  investment_experience: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  risk_tolerance: string;

  @Column({ type: 'boolean', default: false })
  terms_of_service_check: boolean;

  @Column({ type: 'boolean', default: false })
  privacy_policy_check: boolean;

  @Column({ type: 'boolean', default: false })
  risk_disclosure_statement_check: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  annual_income_range: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  net_worth_range: string;

  @Column({ type: 'text', nullable: true })
  investment_goals: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  accredited_investor_status: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  citizenship: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  source_of_funds: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  investment_horizon: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  kyc_status: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  aml_status: string;

  @OneToOne(() => User, (user) => user.investor, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;
}
