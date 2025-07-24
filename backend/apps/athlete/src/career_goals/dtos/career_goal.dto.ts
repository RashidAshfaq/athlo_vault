import {
  IsString,
  IsOptional,
  IsInt,
  IsDateString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MilestoneDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsDateString()
  targetDate?: Date;

  @IsOptional()
  isCompleted?: boolean;

  @IsOptional()
  inProgress?: boolean;
}

export class CreateCareerGoalDto {
  @IsString()
  goalTitle: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  priority?: number;

  @IsOptional()
  @IsDateString()
  targetDate?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MilestoneDto)
  milestones?: MilestoneDto[];
}
