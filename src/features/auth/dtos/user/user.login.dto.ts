import { IsString, MaxLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @MaxLength(64)
  login: string;

  @IsString()
  @MaxLength(32)
  password: string;
}