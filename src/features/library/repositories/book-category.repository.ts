import {BookCategory} from "../entities/book-category.entity";
import {FindOptionsOrder, FindOptionsWhere, ILike} from "typeorm";
import {Injectable} from "@nestjs/common";
import {PaginationFilters} from "../../common/dtos/pagination.filter";
import {PaginatedResult} from "../../common/dtos/paginated-result.dto";
import {BookCategoryListDto} from "../dtos/book-category/book-category.list.dto";
import {BaseRepository} from "../../common/repositories/base.repository";


@Injectable()
export class BookCategoryRepository extends BaseRepository<BookCategory> {
  async getAll(filters: PaginationFilters) {
    const where: FindOptionsWhere<BookCategory> = {};

    if (filters.search)
      where.title = ILike(`%${filters.search}%`);

    return super.getAll(filters, where);
  }


  async create(title: string) {
    return await BookCategory.save(BookCategory.create({title: title}));
  }

  async existsByTitle(title: string) {
    return await BookCategory.existsBy({title: ILike(title)})
  }
}