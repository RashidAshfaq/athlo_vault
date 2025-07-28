import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { PurchaseRequestStatus } from '../../models/purchase_request.entity';

export class CreatePurchaseRequestDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  itemServiceDescription: string;

  @IsString()
  @IsNotEmpty()
  vendorProvider: string;

  @IsString()
  @IsOptional()
  detailDescription?: string;

  @IsString()
  @IsNotEmpty()
  careerDevelopmentJustification: string;

  @IsString()
  @IsNotEmpty()
  urgencyLevel: string;

  @IsOptional()
  @IsDateString()
  reviewedOn?: Date;

  @IsOptional()
  @IsString()
  admin_note?: string;

  @IsOptional()
  @IsEnum(PurchaseRequestStatus)
  requestStatus?: PurchaseRequestStatus;

  @IsOptional()
  @IsDateString()
  submitDate?: Date;
}
