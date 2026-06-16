import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserRegisterDto {
  @IsString()
  @MaxLength(64)
  fullName: string;

  @IsString()
  @MaxLength(64)
  login: string;

  @IsString()
  @MinLength(3)
  @MaxLength(32)
  password: string;
}