/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { MongooseModule } from '@nestjs/mongoose';
import {Book,BookSchema} from './book.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Book.name,schema:BookSchema}])
    ],
    controllers: [BookmarkController],
    providers: [BookmarkService]
})
export class BookmarkModule {}
