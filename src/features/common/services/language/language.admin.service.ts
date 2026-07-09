import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {PaginationFilters} from "../../dtos/pagination.filter";
import {LanguageRepository} from "../../repositories/language.repository";
import {plainToInstance} from "class-transformer";
import {LanguageListXDto} from "../../dtos/language/admin/language.list.dto";
import {LanguageCreateXDto} from "../../dtos/language/admin/language.create.dto";
import {Language} from "../../../shared/entities/language.entity";
import {LanguageUpdateXDto} from "../../dtos/language/admin/language.update.dto";
import {ILike} from "typeorm";

@Injectable()
export class LanguageAdminService {
  constructor(private repo: LanguageRepository) {
  }

  async create(payload: LanguageCreateXDto) {
    const titleExists = await Language.existsBy({title: ILike(payload.title)});
    if (titleExists)
      throw new ConflictException('Title already exists');

    const codeExists = await Language.existsBy({code: ILike(payload.code)});
    if (codeExists)
      throw new ConflictException('Code already exists');

    const newLanguage = {title: payload.title, code: payload.code} as Language;
    return await this.repo.save(newLanguage);
  }

  async getAll(filters: PaginationFilters) {
    const result = await this.repo.getAll(filters);
    result.data = plainToInstance(LanguageListXDto, result.data, {excludeExtraneousValues: true});
    return result;
  }

  async update(id: number, payload: LanguageUpdateXDto) {
    const language = await this.repo.getOneById(id);
    if (!language)
      throw new NotFoundException('Language with given id not found');

    if (payload.title)
      language.title = payload.title;

    if (payload.code)
      language.code = payload.code;

    //TODO: code va title unique ekanini tekshirib qo'yish kerak

    return await this.repo.save(language);
  }

  async delete(id: number) {
    const language = await this.repo.getOneById(id);
    if (!language)
      throw new NotFoundException('Language with given id not found');

    return await this.repo.delete(language);
  }
}