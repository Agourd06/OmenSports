import { IsString, IsEmail, IsOptional, IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()  
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()  
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsArray()
  @IsOptional() 
  readonly friends?: Types.ObjectId[];

  @IsArray()
  @IsOptional() 
  readonly channels?: Types.ObjectId[];

  readonly score: number;
}
