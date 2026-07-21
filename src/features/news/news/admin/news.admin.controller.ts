import {Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {CreateNewsRequest} from "./create-news/create-news.request";
import {CreateNewsHandler} from "./create-news/create-news.handler";
import {ApiConsumes} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "@/core/configs/multer.config";
import {GetAllNewsRequest} from "@/features/news/news/admin/get-all-news/get-all-news.request";
import {GetAllNewsHandler} from "@/features/news/news/admin/get-all-news/get-all-news.handler";

@Controller("admin/news")
export class NewsAdminController {
  constructor(
    private createHandler: CreateNewsHandler,
    private getAllHandler: GetAllNewsHandler,
  ) {
  }

  @Get("list")
  async getAll(@Query() filters: GetAllNewsRequest) {
    return await this.getAllHandler.execute(filters);
  }


  @Post("create")
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("image", multerOptions))
  async create(@Body() payload: CreateNewsRequest, @UploadedFile() image: Express.Multer.File) {
    return await this.createHandler.execute(payload, image);
  }
}