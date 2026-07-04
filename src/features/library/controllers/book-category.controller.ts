import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {BookCategoryCreateDto} from '../dtos/book-category/book-category.create.dto';
import {BookCategoryUpdateDto} from '../dtos/book-category/book-category.update.dto';
import {ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {BookCategoryListDto} from '../dtos/book-category/book-category.list.dto';
import {PaginationFilters} from "../../common/dtos/pagination.filter";
import {PaginatedResultDto} from "../../common/dtos/paginated-result.dto";
import {BookCategoryService} from "../services/book-category.service";
import {Roles} from "../../../core/decorators/roles.decorator";
import {Role} from "../../../core/enums/role.enum";


@Controller('book-categories')
@ApiBearerAuth()
export class BookCategoryController {
  constructor(private readonly service: BookCategoryService) {
  }

  @Get('list')
  @ApiOkResponse({type: PaginatedResultDto(BookCategoryListDto)})
  async getAll(@Query() filters: PaginationFilters) {
    return await this.service.getAll(filters);
  }

  @Post('create')
  @Roles(Role.Admin, Role.SuperAdmin)
  async create(@Body() payload: BookCategoryCreateDto) {
    return await this.service.create(payload);
  }

  @Patch('update/:id')
  @Roles(Role.Admin, Role.SuperAdmin)
  async update(@Param('id') id: number, @Body() payload: BookCategoryUpdateDto) {
    return await this.service.update(id, payload);
  }
}