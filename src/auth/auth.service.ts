/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './DTO/create-user.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>,
        private jwt:JwtService,
        private config:ConfigService
    ){}

    async create(userDto:CreateUserDto):Promise<{token:string}>{
        try {
            const hash = await argon.hash(userDto.password);
            userDto.password = hash;
            const createdUser = await this.userModel.create(userDto);
            return this.singToken(createdUser.id,createdUser.email)
        } catch (error) {
            return error;
        }
    }

    async findAll():Promise<User[]>{
        try {
            return this.userModel.find().exec();
        } catch (error) {
            return error;
        }
    }
    async signin(){
        try {
            return 'sign in';
        } catch (error) {
            return error;
        }
    }

    async findById(id:string):Promise<User>{
        const user = await this.userModel.findById(id).exec();
        if(!user){
            throw new NotFoundException(`user with id ${id} not found`);
        }
        return user;
    }

    async update(id:string,updateduser:CreateUserDto):Promise<User>{
        const user = await this.userModel.findByIdAndUpdate(
            id,
            updateduser,
            {new:true,useFindAndModify:false}
        ).exec();
        if(!user){
            throw new NotFoundException(`user with id ${id} not found`);
        }
        return user;
    }

    async delete(id:string):Promise<User>{
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if(!user){
            throw new NotFoundException(`user with id ${user} not found`);
        }
        return user;
    }

    async singToken(
        userId:string,
        email:string,
    ):Promise<{token:string}>{
        const payload = {
            sub:userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload,{
            expiresIn:'15m',
            secret:secret,
        });
        return {
            token:token
        };
    }
}
