import {BaseRepository} from "./base.repository";
import {Language} from "../entities/language.entity";
import {PaginationFilters} from "../dtos/pagination.filter";
import {FindOptionsWhere, ILike, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class LanguageRepository extends BaseRepository<Language> {
  constructor(
    @InjectRepository(Language) protected repo: Repository<Language>
  ) {
    super(repo);
  }

  async getOneById(id: number) {
    return await this.repo.findOneBy({id});
  }

  async getAll(filters: PaginationFilters) {
    const where: FindOptionsWhere<Language> = {};

    if (filters.search)
      where.title = ILike(`%${filters.search}%`);

    return await super.getAll(filters, where);
  }

  async save(entity: Language) {
    return await this.repo.save(entity);
  }

  async delete(entity: Language) {
    return await this.repo.remove(entity);
  }
}