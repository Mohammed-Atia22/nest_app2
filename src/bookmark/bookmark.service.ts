/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';
import { CreateBookDto } from './DTO/create-book.dto';



@Injectable()
export class BookmarkService {
    constructor(@InjectModel(Book.name) private bookModel:Model<Book>){}

    async create(bookDto:CreateBookDto){
        const createdBook = this.bookModel.create(bookDto);
        return createdBook;
    }

    async findAll():Promise<Book[]>{
        return this.bookModel.find().exec();
    }

    async findbyname(id:string):Promise<Book>{
        const book = await this.bookModel.findById({id}).exec();
        if(!book){
            throw new NotFoundException(`book with id ${id} not found`);
        }
        return book;
    }

    async update(name:string,updatedbook:CreateBookDto):Promise<Book>{
        const book = await this.bookModel.findOneAndUpdate(
            {name},
            updatedbook,
            {new:true,useFindAndModify:false}
        );
        if(!book){
            throw new NotFoundException(`book with id ${name} not found`);
        }
        return book;
    }

    async delete(name:string):Promise<Book>{
        const deletedBook = await this.bookModel.findOneAndDelete({name}).exec();
        if(!deletedBook){
            throw new NotFoundException('book with name ${name} not found');
        }
        return deletedBook;
    }
}
