import {IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LanguageUpdateXDto {
  @IsString()
  @MaxLength(32)
  @IsOptional()
  @ApiProperty()
  title?: string;

  @IsString()
  @MaxLength(6)
  @IsOptional()
  @ApiProperty()
  code?: string;
}