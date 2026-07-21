import {Module} from "@nestjs/common";
import {CreateNewsHandler} from "./news/admin/create-news/create-news.handler";
import {NewsAdminController} from "./news/admin/news.admin.controller";
import {GetAllNewsHandler} from "./news/admin/get-all-news/get-all-news.handler";

@Module({
  controllers: [NewsAdminController],
  providers: [
    CreateNewsHandler,
    GetAllNewsHandler,
  ],
})
export class NewsModule {
}