import { IsArray, ArrayNotEmpty, IsInt, Min, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class SendUserMessageDto {
  @IsString()
  @Length(1, 5000)
  message: string;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  userIds: number[];
}
