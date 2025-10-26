import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvestmentDto {
  @IsNumber()
  @IsNotEmpty()
  athleteId: number;

  @IsNumber()
  @IsNotEmpty()
  investment_amount: number;
}
