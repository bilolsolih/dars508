import {Module} from '@nestjs/common';
import {BookController} from './controllers/book.controller';
import {BookCategoryController} from './controllers/book-category.controller';
import {BookCategoryService} from "./services/book-category.service";
import {BookCategoryRepository} from "./repositories/book-category.repository";

@Module({
  controllers: [
    BookController,
    BookCategoryController,
  ],
  providers: [
    BookCategoryService,
    BookCategoryRepository,
  ],
})
export class LibraryModule {
}