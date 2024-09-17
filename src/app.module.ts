/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthmoduleModule} from './auth/authmodule.module';
import { UsersModule } from './users/users.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthmoduleModule, UsersModule, BookmarkModule,ConfigModule.forRoot({isGlobal:true,}),MongooseModule.forRootAsync({
    imports:[ConfigModule],
    useFactory:(configService:ConfigService)=>({
      uri:configService.get<string>('LINK'),
    }),
    inject:[ConfigService],
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}




// MongooseModule.forRoot('mongodb://localhost/bookmark',{
//   //useNewUrlParser:true,
//   //useUnifiedTopology:true,
// }),BookmarkModule]