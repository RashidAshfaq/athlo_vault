import { IsOptional, IsString, IsNumber, IsDateString, IsBoolean } from 'class-validator';

export class UpdateInvestorProfileDto {
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
  state_of_residence?: string;

  @IsOptional()
  @IsString()
  household_income?: string;

  @IsOptional()
  @IsString()
  profession?: string;

  @IsOptional()
  @IsNumber()
  expected_investment_amount?: number;

  @IsOptional()
  @IsString()
  investment_experience?: string;

  @IsOptional()
  @IsString()
  risk_tolerance?: string;

  @IsOptional()
  @IsBoolean()
  terms_of_service_check?: boolean;

  @IsOptional()
  @IsBoolean()
  privacy_policy_check?: boolean;

  @IsOptional()
  @IsBoolean()
  risk_disclosure_statement_check?: boolean;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  annual_income_range?: string;

  @IsOptional()
  @IsString()
  net_worth_range?: string;

  @IsOptional()
  @IsString()
  investment_goals?: string;

  @IsOptional()
  @IsString()
  accredited_investor_status?: string;

  @IsOptional()
  @IsString()
  citizenship?: string;

  @IsOptional()
  @IsString()
  source_of_funds?: string;

  @IsOptional()
  @IsString()
  investment_horizon?: string;

  @IsOptional()
  @IsString()
  kyc_status?: string;

  @IsOptional()
  @IsString()
  aml_status?: string;

  // For User fields
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  zip?: string;
}
