import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LanguageCreateXDto {
  @IsString()
  @MaxLength(32)
  @ApiProperty()
  title: string;

  @IsString()
  @MaxLength(6)
  @ApiProperty()
  code: string;
}