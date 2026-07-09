import {Module} from "@nestjs/common";
import {CreateLanguageHandler} from "./language/admin/create-language/create-language.handler";
import {GetAllLanguagesHandler} from "./language/admin/get-all-languages/get-all-languages.handler";
import {LanguageAdminController} from "./language/admin/language.admin.controller";
import {DeleteLanguageHandler} from "./language/admin/delete-language/delete-language.handler";

@Module({
  controllers: [LanguageAdminController],
  providers: [
    GetAllLanguagesHandler,
    CreateLanguageHandler,
    DeleteLanguageHandler,
  ]
})
export class SharedModule {
}