import {Injectable, NotFoundException} from "@nestjs/common";
import {Language} from "../../../entities/language.entity";

@Injectable()
export class DeleteLanguageHandler {
  async execute(id: number) {
    const language = await Language.findOneBy({id: id});
    if (!language)
      throw new NotFoundException('Language with given id not found');

    return await Language.remove(language);
  }
}