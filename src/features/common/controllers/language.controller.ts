import {Controller, Get, Query} from "@nestjs/common";
import {FindOptionsOrder, FindOptionsWhere, ILike} from "typeorm";
import {plainToInstance} from "class-transformer";
import {PaginatedResult} from "../dtos/paginated-result.dto";
import {PaginationFilters} from "../pagination.filter";
import {Language} from "../entities/language.entity";
import {LanguageListDto} from "../dtos/language/language.list.dto";

@Controller('languages')
export class LanguageController {
  @Get('list')
  async getAll(@Query() filters: PaginationFilters) {
    const currentPage = filters.page ?? 1;
    const take = filters.size ?? 3;
    const skip = (currentPage - 1) * take;

    const where: FindOptionsWhere<Language> = {};

    if (filters.search)
      where.title = ILike(`%${filters.search}%`);

    const totalCount = await Language.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const order: FindOptionsOrder<Language> = {};
    if (filters.orderBy)
      order[filters.orderBy] = filters.orderMode?.toLowerCase() ?? 'asc';

    const languages = await Language.find({
      where: where,
      take: take,
      skip: skip,
      order: order,
    });

    const data = plainToInstance(LanguageListDto, languages, {excludeExtraneousValues: true});
    return {totalCount, totalPages, data, hasPrevious, hasNext, currentPage} as PaginatedResult<LanguageListDto>
  }
}