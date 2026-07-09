import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query} from "@nestjs/common";
import {CreateLanguageRequest} from "./create-language/create-language.request";
import {CreateLanguageHandler} from "./create-language/create-language.handler";
import {GetAllLanguagesRequest} from "./get-all-languages/get-all-languages.request";
import {GetAllLanguagesHandler} from "./get-all-languages/get-all-languages.handler";
import {DeleteLanguageHandler} from "@/features/shared/language/admin/delete-language/delete-language.handler";

@Controller('admin/languages')
export class LanguageAdminController {
  constructor(
    private getAllHandler: GetAllLanguagesHandler,
    private createHandler: CreateLanguageHandler,
    private deleteHandler: DeleteLanguageHandler,
  ) {
  }

  @Get('list')
  async getAll(@Query() filters: GetAllLanguagesRequest) {
    return await this.getAllHandler.execute(filters);
  }

  @Post('create')
  async create(@Body() payload: CreateLanguageRequest) {
    return await this.createHandler.execute(payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteHandler.execute(id);
  }
}