/* eslint-disable prettier/prettier */
import {IsNotEmpty,IsEmail} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    readonly name:string;

    @IsNotEmpty()
    readonly age:number;

    @IsNotEmpty()
    readonly address:string;

    @IsEmail()
    @IsNotEmpty()
    readonly email:string

    @IsNotEmpty()
    password:string
}