import type { Request, Response } from 'express';
import { Controller, Delete, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../core/guards/auth.guard';

// purchased book - Book 2

@Controller('books')
export class BookController {
  @Get()
  async getAll() {
    return ['Book 1', 'Book 2', 'Book 3'];
  }

  @Get('purchased')
  @UseGuards(AuthGuard)
  async getPurchasedBooks() {
    return ['Book 2'];
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async deleteOne(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    res.json('Book has been deleted');
  }
}