import { Response } from 'express';
import { BookService } from './book.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { BookDto, UpdateBookDto } from './dto/book.dto';

import { Query as ExpressQuery } from 'express-serve-static-core'

@Controller('book')
export class BookController {
    constructor(
        private readonly BookService: BookService
    ) { }

    @Get()
    async getAllBook(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.BookService.findAll(query);
    }

    @Post()
    async createBook(@Body() book: BookDto): Promise<Book> {
        return this.BookService.create(book)
    }

    @Get(':id')
    async getBook(@Param('id') id: string): Promise<Book> {
        return this.BookService.findbyId(id)
    }

    @Put(':id')
    async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto): Promise<Book> {
        return this.BookService.updateById(id, book)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string,): Promise<Book> {
        return this.BookService.deleteById(id)
    }
}
