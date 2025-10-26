import { IsOptional, IsString, IsInt, IsNumber, IsDateString } from 'class-validator';

export class UpdateSeasonStatsDto {

  // football
  @IsOptional()
  @IsNumber()
  yards?: number;

  @IsOptional()
  @IsNumber()
  touchdowns?: number;

  @IsOptional()
  @IsNumber()
  completion?: number;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsNumber()
  rushingYards?: number;

  @IsOptional()
  @IsNumber()
  rushingTds?: number;

  // basketball
  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsNumber()
  assists?: number;

  @IsOptional()
  @IsNumber()
  rebounds?: number;

  @IsOptional()
  @IsNumber()
  fieldGoal?: number;

  @IsOptional()
  @IsNumber()
  threePoint?: number;

  @IsOptional()
  @IsNumber()
  freeThrow?: number;

  // swimming 

  @IsOptional()
  @IsNumber()
  records?: number;

  @IsOptional()
  @IsNumber()
  medals?: number;

  @IsOptional()
  @IsNumber()
  competitions?: number;

  @IsOptional()
  @IsNumber()
  pb50m?: number;

  @IsOptional()
  @IsNumber()
  pb100m?: number;

  @IsOptional()
  @IsNumber()
  pb200m?: number;

  // soccer 
  @IsOptional()
  @IsNumber()
  goals?: number;

  @IsOptional()
  @IsNumber()
  assistsSoccer?: number;

  @IsOptional()
  @IsNumber()
  matches?: number;

  @IsOptional()
  @IsNumber()
  shotOnTarget?: number;

  @IsOptional()
  @IsNumber()
  passAccuracy?: number;

  @IsOptional()
  @IsNumber()
  dribbleSuccess?: number;

  // baseball
  @IsOptional()
  @IsNumber()
  era?: number;

  @IsOptional()
  @IsNumber()
  strikeouts?: number;

  @IsOptional()
  @IsNumber()
  wins?: number;

  @IsOptional()
  @IsNumber()
  whip?: number;

  @IsOptional()
  @IsNumber()
  innings?: number;

  @IsOptional()
  @IsNumber()
  saves?: number;

  // tennis
  @IsOptional()
  @IsNumber()
  ranking?: number;

  @IsOptional()
  @IsNumber()
  winsTennis?: number;

  @IsOptional()
  @IsNumber()
  tournaments?: number;

  @IsOptional()
  @IsNumber()
  winPercentage?: number;

  @IsOptional()
  @IsNumber()
  aces?: number;

  @IsOptional()
  @IsNumber()
  breakPoints?: number;

  // golf
  @IsOptional()
  @IsNumber()
  handicap?: number;

  @IsOptional()
  @IsNumber()
  tournamentsGolf?: number;

  @IsOptional()
  @IsNumber()
  earnings?: number;

  @IsOptional()
  @IsNumber()
  avgScore?: number;

  @IsOptional()
  @IsNumber()
  fairwaysHit?: number;

  @IsOptional()
  @IsNumber()
  greensInReg?: number;

  // track and fields
  @IsOptional()
  @IsNumber()
  worldRankings?: number;

    @IsOptional()
  @IsNumber()
  seasonBest?: number;

  @IsOptional()
  @IsInt()
  athleteId: number;
}
