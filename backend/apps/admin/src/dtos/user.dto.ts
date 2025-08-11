import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UserDTO {
  @Type(() => Number)
  @IsNumber()
  @Max(1000)
  @Min(0)
  @IsOptional()
  page: number;

  @Type(() => Number)
  @IsNumber()
  @Max(1000)
  @Min(1)
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
  query: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  filter: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  phone: string;

  @Type(() => Number)
  @IsNumber()
  @Max(1000)
  @Min(1)
  @IsOptional()
  userId: number;
}
