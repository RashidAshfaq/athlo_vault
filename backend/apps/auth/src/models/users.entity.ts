import { AbstractEntity, UserRole } from '@app/common';
import { Admin } from 'apps/admin/src/models/admin.entity';
import { UserMessage } from 'apps/admin/src/models/user_message.entity';
import { Athlete } from 'apps/athlete/src/models/athlete.entity';
import { PurchaseRequest } from 'apps/athlete/src/models/purchase_request.entity';
import { Investor } from 'apps/investor/src/models/investor.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
} from 'typeorm';

export enum AccountType {
  ATHLETE = 'athlete',
  INVESTOR = 'investor',
  ADMIN = 'admin',
  FAN = 'fan',
}

@Entity('users')
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: AccountType,
    default: null,
  })
  accountType: AccountType;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  profile_picture: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zip: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: false })
  isApproved: boolean;

  @Column({ type: 'int', nullable: true })
  deleted_by: number;

  @Column({ type: 'boolean', default: false })
  isProfileCompleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_active: Date;

  @ManyToOne(() => User, (user) => user.approvedUsers, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approved_by: User | null;

  @OneToMany(() => User, (user) => user.approved_by)
  approvedUsers: User[];

  @OneToOne(() => Athlete, (athlete) => athlete.user, {
    cascade: true,
  })
  athlete: Athlete;

  @OneToOne(() => Investor, (athlete) => athlete.user, {
    cascade: true,
  })
  investor: Investor;

  @OneToOne(() => Admin, (admin) => admin.user, {
    cascade: true,
  })
  admin: Admin;

  @OneToMany(() => PurchaseRequest, (user) => user.approvedBy, {
    cascade: true,
  })
  user: PurchaseRequest[];

  @ManyToMany(() => UserMessage, (m) => m.recipients)
  receivedMessages: UserMessage[];
}
