import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { User } from 'apps/auth/src/models/users.entity'; // For approved_by (assuming this points to a User)
import { Athlete } from './athlete.entity';

export enum PurchaseRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  UNDER_REVIEW = 'under_review',
}

@Entity('purchase_requests')
export class PurchaseRequest extends AbstractEntity {
  @Column({ type: 'varchar', length: 150 })
  category: string; // Mandatory

  @Column({ type: 'float' })
  amount: number; // Mandatory

  @Column({ type: 'varchar', length: 500 })
  itemServiceDescription: string; // Mandatory

  @Column({ type: 'varchar', length: 250 })
  vendorProvider: string; // Mandatory

  @Column({ type: 'text', nullable: true })
  detailDescription: string; // Optional, text

  @Column({ type: 'varchar', length: 555 })
  careerDevelopmentJustification: string; // Mandatory

  @Column({ type: 'varchar', length: 50 })
  urgencyLevel: string;

  @ManyToOne(() => User, (admin) => admin.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'approvedBy' })
  approvedBy: User;

  @Column({ type: 'date', nullable: true })
  reviewedOn: Date;

  @Column({ type: 'text', nullable: true })
  admin_note: string;

  @Column({
    type: 'enum',
    enum: PurchaseRequestStatus,
    default: PurchaseRequestStatus.PENDING,
  })
  requestStatus: PurchaseRequestStatus;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  submitDate: Date;

  @ManyToOne(() => Athlete, (athlete) => athlete.purchase_requests, {
    onDelete: 'CASCADE',
  })
  athlete: Athlete;
}
