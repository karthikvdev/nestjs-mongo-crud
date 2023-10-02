import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();


export class AuthGuard implements CanActivate {
    public jwtService =  new JwtService();
    constructor() { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest(); // get the API request.
            const token = this.extractTokenFromHeader(request);
            if (!token) {
                throw new UnauthorizedException(); // here the nestJs handles 401 unauthorized api response.
            }
            const payload = await this.jwtService?.verifyAsync(token, { secret: process.env.JWT_SECRET_CODE });
            request['user'] = payload;
        }
        catch (error) {
            throw new UnauthorizedException(error?.message);
        }
        return true; // If it doesn't returns true then it does not move to other routes similar in angular.
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}