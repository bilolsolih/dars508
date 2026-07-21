import {ApiProperty} from "@nestjs/swagger";
import {Allow, IsString, MaxLength} from "class-validator";

export class CreateNewsRequest {
  @IsString()
  @MaxLength(512)
  @ApiProperty()
  title: string;

  @ApiProperty({type: "string", format: "binary"})
  @Allow()
  image: string;
}