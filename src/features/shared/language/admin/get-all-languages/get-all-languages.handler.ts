import {GetAllLanguagesRequest} from "./get-all-languages.request";
import {Language} from "@/features/shared/entities/language.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
export class GetAllLanguagesHandler {
  async execute(filters: GetAllLanguagesRequest) {
    return await Language.find();
  }
}