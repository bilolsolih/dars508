import { IsOptional, IsString } from 'class-validator';

export class BookCategoryUpdateDto {
  @IsString()
  @IsOptional()
  title?: string;
}