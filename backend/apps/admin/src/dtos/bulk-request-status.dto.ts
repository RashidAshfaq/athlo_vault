import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum BulkRequestStatusAction {
  ACTIVATE = 'approved',
  SUSPEND = 'rejected',
}

export class BulkRequestsStatusDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  purchaseIds: number[];

  @IsEnum(BulkRequestStatusAction)
  status: BulkRequestStatusAction;

  @IsString()
  @Length(1, 4000)
  note: string;
}
