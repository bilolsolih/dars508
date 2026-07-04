import {BaseModel} from "../../../core/base.model";
import {FindOptionsWhere, Repository} from "typeorm";
import {PaginationFilters} from "../dtos/pagination.filter";
import {PaginatedResult} from "../dtos/paginated-result.dto";

export abstract class BaseRepository<T extends BaseModel> {
  constructor(protected repo: Repository<T>) {
  }

  async getAll(filters: PaginationFilters, where: FindOptionsWhere<T> = {}) {
    const currentPage = filters.page ?? 1;
    const take = filters.size ?? 3;
    const skip = (currentPage - 1) * take;

    const totalCount = await this.repo.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const data = await this.repo.find({
      where: where,
      take: take,
      skip: skip,
    });

    return {totalCount, totalPages, data, hasPrevious, hasNext, currentPage} as PaginatedResult;
  }
}