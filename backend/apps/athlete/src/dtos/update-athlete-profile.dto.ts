import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CoachDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearOfWorkTogether?: number;

  @IsOptional()
  @IsString()
  achievementAndBackground?: string;
}

export class FollowersDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  twitterFollowers?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  instagramFollowers?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  linkedFollowers?: number;

  @IsOptional()
  @IsString()
  personalWebsiteUrl?: string;
}

export class FundingGoalDto {
  @IsOptional()
  @IsString()
  fundUses?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  revenueSharePercentage?: number;

  @IsOptional()
  @IsString()
  currentGoalsTimelines?: string;
}

export class UpdateAthleteProfileDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDateString()
  dob?: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  primarySport?: string;

  @IsOptional()
  @IsString()
  positionOrSpeciality?: string;

  @IsOptional()
  @IsString()
  organizationName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  yearOfExperience?: number;

  @IsOptional()
  @IsString()
  keyAchievements?: string;

  @IsOptional()
  @IsString()
  currentPerformance?: string;

  @IsOptional()
  @IsString()
  governmentId?: string;

  @IsOptional()
  @IsString()
  coverPhoto?: string;

  @IsOptional()
  @IsString()
  proofOfAthleteStatus?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  felonyConviction?: boolean;

  @IsOptional()
  @IsString()
  felonyDescription?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  height?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoachDto)
  coach?: CoachDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FollowersDto)
  socialMedia?: FollowersDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => FundingGoalDto)
  fundingGoal?: FundingGoalDto;
}
