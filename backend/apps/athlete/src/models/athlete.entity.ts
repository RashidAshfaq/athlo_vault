import { AbstractEntity } from '@app/common';
import { User } from 'apps/auth/src/models/users.entity';
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { FundingGoal } from './athlete_funding.entity';
import { AthleteFollowers } from './athlete_followers.entity';
import { Coach } from './coach.entity';

@Entity('athletes')
export class Athlete extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 100 })
  primarySport: string;

  @Column({ type: 'varchar', length: 100 })
  positionOrSpeciality: string;

  @Column({ type: 'varchar', length: 100 })
  organizationName: string;

  @Column({ type: 'int' })
  yearOfExperience: number;

  @Column({ type: 'text', nullable: true })
  keyAchievements: string;

  @Column({ type: 'text', nullable: true })
  currentPerformance: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  governmentId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  proofOfAthleteStatus: string;

  @Column({ type: 'boolean', default: false })
  felonyConviction: boolean;

  @Column({ type: 'text', nullable: true })
  felonyDescription: string;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'text', nullable: true })
  biography: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverPhoto: string;

  @Column({ type: 'text', nullable: true })
  about: string;

  @OneToOne(() => User, (user) => user.athlete, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'userId',
  })
  user: User;

  @OneToOne(() => FundingGoal, (funding) => funding.athlete, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fundingGoalId',
  })
  fundingGoal: FundingGoal;

  @OneToOne(() => AthleteFollowers, (follower) => follower.athlete, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'socialMediaId',
  })
  socialMedia: AthleteFollowers;

  @OneToOne(() => Coach, (coach) => coach.athlete, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'coachId',
  })
  coach: Coach;
}
