/* eslint-disable prettier/prettier */
import { Controller,Get,Patch,UseGuards } from '@nestjs/common';
//import { AuthGuard } from '@nestjs/passport';
//import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import {CreateUserDto} from '../auth/DTO/create-user.dto'

@Controller('users')
export class UsersController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser('') user:CreateUserDto){
        // console.log({
        //     user:req.user
        // })
        return user;
    }

    @Patch()
    editUser(){}
}
