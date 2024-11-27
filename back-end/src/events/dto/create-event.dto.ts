import { IsString, IsDate, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  readonly date: Date;

  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsArray()
  @IsOptional()
  readonly users?: Types.ObjectId[];
}
