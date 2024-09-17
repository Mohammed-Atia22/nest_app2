/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller,Get,Post,Body, Param, Patch, Delete} from '@nestjs/common';
import { UserService } from './auth.service';
import {CreateUserDto} from './DTO/create-User.dto';
import { User } from './User.schema';


@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post()
    async create(@Body() createBookDto:CreateUserDto){
        return this.userService.create(createBookDto);
    }

    @Get()
    async findAll():Promise<User[]>{
        return this.userService.findAll();
    }
    @Get('signin')
    async signin(){
        return this.userService.signin();
    }

    @Get(':id')
    async findone(@Param('id') id:string):Promise<User>{
        return this.userService.findById(id);
    }

    @Patch(':id')
    async update(@Param('id') id:string ,@Body() updateuserdto:CreateUserDto ):Promise<User>{
        return this.userService.update(id,updateuserdto);
    }

    @Delete(':id')
    async delete(@Param('id') id:string):Promise<User>{
        return this.userService.delete(id);
    }
}

