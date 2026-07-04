import {IsInt, IsOptional, IsString, Max} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class PaginationFilters {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({required: false})
  page?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Max(50)
  @ApiProperty({required: false})
  size?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  search?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  orderBy?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false})
  orderMode?: string;
}
