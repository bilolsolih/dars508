import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";

export class GetAllNewsRequest {
  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  search?: string;
}