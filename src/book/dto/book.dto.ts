import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from './../schemas/book.schema';

export class BookDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, { message: 'Please enter correct category' })
    readonly category: Category
}



export class UpdateBookDto {
    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsNumber()
    readonly price: number;
    
    @IsOptional()
    @IsEnum(Category, { message: 'Please enter correct category' })
    readonly category: Category
}
