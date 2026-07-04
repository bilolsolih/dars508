import {ApiProperty} from "@nestjs/swagger";
import {Type as NestType} from '@nestjs/common'

export class PaginatedResult<T> {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
}


export function PaginatedResultDto<T>(Dto: NestType<T>) {
  class PaginatedResult<T> {
    @ApiProperty()
    totalCount: number;

    @ApiProperty()
    totalPages: number;

    @ApiProperty()
    currentPage: number;

    @ApiProperty()
    hasPrevious: boolean;

    @ApiProperty()
    hasNext: boolean;

    @ApiProperty({type: [Dto]})
    data: T[];
  }

  return PaginatedResult;
}