import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional() 
  readonly username?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsArray()
  @IsOptional()
  readonly friends?: string[];
  
  @IsArray()
  @IsOptional() 
  readonly channels?: string[];

  @IsOptional()
  readonly score?: number;
}
