import { ArrayNotEmpty, IsArray, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum BulkUserStatusAction {
  ACTIVATE = 'activate',
  SUSPEND = 'suspend',
}

export class BulkUserStatusDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  userIds: number[];

  @IsEnum(BulkUserStatusAction)
  status: BulkUserStatusAction;
}