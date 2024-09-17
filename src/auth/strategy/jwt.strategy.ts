/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt , Strategy } from "passport-jwt";
// import { User } from '../User.schema';
// import { Model } from 'mongoose';
import { UserService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(config:ConfigService,private userService:UserService){
        super({
            jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:config.get('JWT_SECRET'),
        })
    }
    async validate(payload:{
        sub:string;
        email:string;
    }){
        const user = await this.userService.findById(payload.sub);
        return user;
    }
}