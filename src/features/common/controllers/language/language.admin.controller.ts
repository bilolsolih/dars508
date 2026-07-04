import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from "@nestjs/common";
import {PaginationFilters} from "../../dtos/pagination.filter";
import {LanguageAdminService} from "../../services/language/language.admin.service";
import {LanguageCreateXDto} from "../../dtos/language/admin/language.create.dto";
import {LanguageUpdateXDto} from "../../dtos/language/admin/language.update.dto";
import {Roles} from "../../../../core/decorators/roles.decorator";
import {Role} from "../../../../core/enums/role.enum";
import {ApiBearerAuth} from "@nestjs/swagger";

@Controller('admin/languages')
@Roles(Role.Admin)
@ApiBearerAuth()
export class LanguageAdminController {
  constructor(private service: LanguageAdminService) {
  }

  @Get('list')
  async getAll(@Query() filters: PaginationFilters) {
    return await this.service.getAll(filters);
  }

  @Post('create')
  async create(@Body() payload: LanguageCreateXDto) {
    return await this.service.create(payload);
  }

  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() payload: LanguageUpdateXDto) {
    return await this.service.update(id, payload);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(id);
  }
}