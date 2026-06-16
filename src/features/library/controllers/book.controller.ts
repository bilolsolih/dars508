import type { Request, Response } from 'express';
import { Controller, Delete, Get, Param, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';
import argon2 from 'argon2';
import { AuthGuard } from '../../../core/guards/auth.guard';

// purchased book - Book 2

@Controller('books')
@UseGuards(AuthGuard)
export class BookController {
  @Get()
  async getAll() {
    return ['Book 1', 'Book 2', 'Book 3'];
  }

  @Get('purchased')
  async getPurchasedBooks() {
    return ['Book 2'];
  }

  @Delete('delete/:id')
  async deleteOne(@Param('id') id: number, @Req() req: Request, @Res() res: Response) {
    res.json('Book has been deleted');
  }
}