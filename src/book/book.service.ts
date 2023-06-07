import { BadRequestException, Injectable,  NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { Query } from 'express-serve-static-core'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name)
    private bookModel: Model<Book>,
        private eventEmitter: EventEmitter2
    ) { }

    async findAll(query: Query): Promise<Book[]> {

        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;

        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i'
            }
        } : {}

        const books = await this.bookModel.find({ ...keyword }).limit(resPerPage).skip(skip);
        return books;
    }

    async create(book: Book): Promise<Book> {
        const bookData = await this.bookModel.create(book);

        this.eventEmitter.emit('book.created', { bookData });
        return bookData;
    }

    @OnEvent('book.created')
    handleOrderCreatedEvent(book: Book) {
        // handle and process "OrderCreatedEvent" event
        console.log(book)
    }



    async findbyId(id: string): Promise<Book> {

        const isValidId = mongoose.isValidObjectId(id)

        if (!isValidId) {
            throw new BadRequestException('Please Enter correct Id.')
        }

        const singleBook = await this.bookModel.findById(id)

        if (!singleBook) {
            throw new NotFoundException("Book not found.")
        }
        return singleBook;

    }

    async updateById(id: string, book: Book): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
        })
    }

    async deleteById(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id);
    }
}