import { AbstractEntity, UserRole } from '@app/common';
import { Athlete } from 'apps/athlete/src/models/athlete.entity';
import { PurchaseRequest } from 'apps/athlete/src/models/purchase_request.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
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

  @ManyToOne(() => User, (user) => user.approvedUsers, { nullable: true })
  @JoinColumn({ name: 'approved_by' })
  approved_by: User | null;

  @OneToMany(() => User, (user) => user.approved_by)
  approvedUsers: User[];

  @OneToOne(() => Athlete, (athlete) => athlete.user, {
    cascade: true,
  })
  athlete: Athlete;

  @OneToMany(() => PurchaseRequest, (user) => user.approvedBy, {
    cascade: true,
  })
  user: PurchaseRequest[];
}
