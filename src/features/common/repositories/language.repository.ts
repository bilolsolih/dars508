import {BaseRepository} from "./base.repository";
import {Language} from "../entities/language.entity";
import {PaginationFilters} from "../pagination.filter";
import {FindOptionsWhere, ILike} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class LanguageRepository extends BaseRepository<Language> {
  async getAll(filters: PaginationFilters) {
    const where: FindOptionsWhere<Language> = {};

    if (filters.search)
      where.title = ILike(`%${filters.search}%`);

    return await super.getAll(filters, where);
  }
}