import { AbstractEntity } from '@app/common';
import { User } from 'apps/auth/src/models/users.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { FundingGoal } from './athlete_funding.entity';
import { AthleteFollowers } from './athlete_followers.entity';
import { Coach } from './coach.entity';
import { CareerGoal } from './career_goals.entity';
import { PurchaseRequest } from './purchase_request.entity';
import { TrackAndFieldsSeasonStats } from './track_and_fields_season_stats.entity';
import { GolfSeasonStats } from './golf_season_stats.entity';
import { TennisSeasonStats } from './tennis_season_stats.entity';
import { BaseballSeasonStats } from './baseball_season_stats.entity';
import { SoccerSeasonStats } from './soccer_season_stats.entity';
import { SwimmingSeasonStats } from './swimming_season_stats.entity';
import { BasketballSeasonStats } from './basketball_season_stats.entity';
import { FootballSeasonStats } from './football_season_stats.entity';
import { InvestmentPitch } from './investment_pitch.entity';
import { InvestorAthleteFollow } from './investor_athlete_follows.entity';
import { AthleteUpdate } from './athlete_updates.entity';
import { Investment } from 'apps/investor/src/models/investement.entity';

@Entity('athletes')
export class Athlete extends AbstractEntity {
  @Column({ type: 'varchar', length: 100, nullable: true })
  fullName: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ type: 'varchar', length: 150, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  primarySport: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  positionOrSpeciality: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  organizationName: string;

  @Column({ type: 'int', nullable: true })
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  investment_duration: string;

  @Column({ type: 'int', nullable: true })
  total_funding: number;

  @Column({ type: 'int', nullable: true })
  min_investment: number;

  @Column({ type: 'int', nullable: true })
  investment_days: number;

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

  // @OneToOne(() => AthleteFollowers, (follower) => follower.athlete, {
  //   cascade: false,
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({
  //   name: 'socialMediaId',
  // })
  // socialMedia: AthleteFollowers;
  @OneToOne(() => AthleteFollowers)
  @JoinColumn({ name: 'socialMediaId' })
  socialMedia: AthleteFollowers;

  @OneToOne(() => Coach, (coach) => coach.athlete, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'coachId',
  })
  coach: Coach;

  @OneToMany(() => CareerGoal, (careerGoal) => careerGoal.athlete, {
    cascade: true,
  })
  careerGoals: CareerGoal[];

  @OneToMany(() => PurchaseRequest, (request) => request.athlete, {
    cascade: true,
  })
  purchase_requests: PurchaseRequest[];

  @OneToMany(() => AthleteFollowers, (request) => request.athletes, {
    cascade: true,
  })
  socialMedias: AthleteFollowers[];

  @OneToMany(() => TrackAndFieldsSeasonStats, (request) => request.athlete, {
    cascade: true,
  })
  trackAndFieldsSeasonStats: TrackAndFieldsSeasonStats[];

  @OneToOne(() => TrackAndFieldsSeasonStats)
  @JoinColumn({ name: 'trackAndFieldsSeasonStatsId' })
  trackAndFieldsSeason: TrackAndFieldsSeasonStats;

  @OneToMany(() => GolfSeasonStats, (request) => request.athlete, {
    cascade: true,
  })
  golfSeasonStats: GolfSeasonStats[];

  @OneToOne(() => GolfSeasonStats)
  @JoinColumn({ name: 'golfSeasonStatsId' })
  golfSeason: GolfSeasonStats;

  @OneToMany(() => TennisSeasonStats, (request) => request.athlete, {
    cascade: true,
  })
  tennisSeasonStats: TennisSeasonStats[];

  @OneToOne(() => TennisSeasonStats)
  @JoinColumn({ name: 'tennisSeasonStatsId' })
  tennisSeason: TennisSeasonStats;

  @OneToMany(() => BaseballSeasonStats, (request) => request.athlete, {
    cascade: true,
  })
  baseballSeasonStats: BaseballSeasonStats[];

  @OneToOne(() => BaseballSeasonStats)
  @JoinColumn({ name: 'baseballSeasonStatsId' })
  baseballSeason: BaseballSeasonStats;

  @OneToMany(() => SoccerSeasonStats, (request) => request.athlete, {
    cascade: true,
  })
  soccerSeasonStats: SoccerSeasonStats[];

  @OneToOne(() => SoccerSeasonStats)
  @JoinColumn({ name: 'soccerSeasonStatsId' })
  soccerSeason: SoccerSeasonStats;

  @OneToMany(() => SwimmingSeasonStats, (request) => request.athlete, {
    cascade: true,
  })
  swimmingSeasonStats: SwimmingSeasonStats[];

  @OneToOne(() => SwimmingSeasonStats)
  @JoinColumn({ name: 'swimmingSeasonStatsId' })
  swimmingSeason: SwimmingSeasonStats;

  @OneToMany(() => BasketballSeasonStats, (request) => request.athlete, {
    cascade: true,
  })
  basketballSeasonStats: BasketballSeasonStats[];

  @OneToOne(() => BasketballSeasonStats)
  @JoinColumn({ name: 'basketballSeasonStatsId' })
  basketballSeason: BasketballSeasonStats;

  @OneToMany(() => FootballSeasonStats, (request) => request.athlete, {
    cascade: true,
  })
  footballSeasonStats: FootballSeasonStats[];

  @OneToOne(() => FootballSeasonStats)
  @JoinColumn({ name: 'footballSeasonStatsId' })
  footballSeason: FootballSeasonStats;

  @OneToMany(() => InvestmentPitch, (request) => request.athlete, {
    cascade: true,
  })
  investmentPitches: InvestmentPitch[];

  @OneToMany(() => InvestorAthleteFollow, (request) => request.athlete, {
    cascade: true,
  })
  athleteFollow: InvestorAthleteFollow[];

  @OneToMany(() => AthleteUpdate, (request) => request.athlete, {
    cascade: true,
  })
  updates: AthleteUpdate[];

  @OneToMany(() => Investment, (request) => request.athlete, {
    cascade: true,
  })
  investment: Investment[];
}
