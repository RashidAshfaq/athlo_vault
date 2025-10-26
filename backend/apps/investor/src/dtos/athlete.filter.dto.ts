import { Type } from 'class-transformer';
import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';

export enum AthleteSortBy {
  MOST_TRENDING = 'most_trending',
  HIGHEST_VALUATION = 'highest_valuation',
  HIGHEST_GROWTH = 'highest_growth',
  MOST_FOLLOWERS = 'most_followers',
}

export class GetAthletesFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  sport?: string;

  @IsOptional()
  @IsEnum(AthleteSortBy)
  sort_by?: AthleteSortBy;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  athleteId?: number;

  @IsOptional()
  @IsString()
  action?: string;
}
