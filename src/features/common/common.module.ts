import {Module} from "@nestjs/common";
import {LanguageAdminController} from "./controllers/language/language.admin.controller";
import {LanguageAdminService} from "./services/language/language.admin.service";
import {LanguageRepository} from "./repositories/language.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Language} from "./entities/language.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Language]),
  ],
  controllers: [LanguageAdminController],
  providers: [
    LanguageRepository,
    LanguageAdminService,
  ],
})
export class CommonModule {
}