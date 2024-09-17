/* eslint-disable prettier/prettier */

import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document{
    @Prop({required:true})
    name:string;

    @Prop()
    releasetime:number;

    @Prop()
    author:string;
    
}

export const BookSchema = SchemaFactory.createForClass(Book);