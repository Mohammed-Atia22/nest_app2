/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller,Get,Post,Body, Param, Patch, Delete , UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import {CreateBookDto} from './DTO/create-book.dto';
import { Book } from './book.schema';
import { JwtGuard } from '../auth/guard';

//@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService:BookmarkService){}

    @Post()
    async create(@Body() createBookDto:CreateBookDto):Promise<Book>{
        return this.bookmarkService.create(createBookDto);
    }

    @Get()
    async findAll():Promise<Book[]>{
        return this.bookmarkService.findAll();
    }

    @Get(':id')
    async findone(@Param('id') id:string):Promise<Book[]>{
        return this.bookmarkService.findAll();
    }

    @Patch(':name')
    async update(@Param('name') name:string , @Body() updatebookdto:CreateBookDto ):Promise<Book>{
        return this.bookmarkService.update(name,updatebookdto);
    }

    @Delete(':name')
    async delete(@Param('name') name:string):Promise<Book>{
        return this.bookmarkService.delete(name);
    }
}
