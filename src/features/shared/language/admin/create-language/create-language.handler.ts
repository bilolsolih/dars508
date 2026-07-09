import {Language} from "../../../entities/language.entity";
import {ILike} from "typeorm";
import {ConflictException, Injectable} from "@nestjs/common";
import {CreateLanguageRequest} from "./create-language.request";

@Injectable()
export class CreateLanguageHandler {
  async execute(payload: CreateLanguageRequest) {
    const titleExists = await Language.existsBy({title: ILike(payload.title)});
    if (titleExists)
      throw new ConflictException('Title already exists');

    const codeExists = await Language.existsBy({code: ILike(payload.code)});
    if (codeExists)
      throw new ConflictException('Code already exists');

    const newLanguage = {title: payload.title, code: payload.code} as Language;
    return await Language.save(newLanguage);
  }
}