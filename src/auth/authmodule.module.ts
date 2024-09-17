/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserController } from './auth.controller';
import { UserService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import {User,UserSchema} from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),
        JwtModule.register({})
    ],
    controllers: [UserController],
    providers: [UserService,JwtStrategy]
})
export class AuthmoduleModule {}
