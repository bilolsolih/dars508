import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {PaginationFilters} from "../../common/dtos/pagination.filter";
import {Not} from "typeorm";
import {BookCategory} from "../entities/book-category.entity";
import {plainToInstance} from "class-transformer";
import {BookCategoryListDto} from "../dtos/book-category/book-category.list.dto";
import {BookCategoryCreateDto} from "../dtos/book-category/book-category.create.dto";
import {BookCategoryUpdateDto} from "../dtos/book-category/book-category.update.dto";
import {BookCategoryRepository} from "../repositories/book-category.repository";

@Injectable()
export class BookCategoryService {
  constructor(private repo: BookCategoryRepository) {
  }

  async getAll(filters: PaginationFilters) {
    const result = await this.repo.getAll(filters);
    result.data = plainToInstance(BookCategoryListDto, result.data, {excludeExtraneousValues: true});
    return result;
  }

  async create(payload: BookCategoryCreateDto) {
    const alreadyExists = await this.repo.existsByTitle(payload.title);
    if (alreadyExists)
      throw new BadRequestException('Book Category already exists');

    return await this.repo.create(payload.title);
  }

  async update(id: number, payload: BookCategoryUpdateDto) {
    const category = await BookCategory.findOneBy({id: id});
    if (!category)
      throw new NotFoundException('Book Category not found');

    if (payload.title)
      category.title = payload.title;

    const alreadyExists = await BookCategory.findOneBy({id: Not(category.id), title: payload.title});
    if (alreadyExists)
      throw new BadRequestException('Book Category already exists');

    await BookCategory.save(category);

    return category;
  }
}