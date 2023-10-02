
import { Body, Controller, Get, Param, Post, Put, Query, Delete, Patch, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, UpdateUserRoleDto, UpdateUserDto, UserSigninDto } from "./auth.dto";
import { ObjectId } from "mongoose";
import { AuthGuard } from "./auth.guard";


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    // To get data from body
    @Post('signup') signUp(@Body() user: CreateUserDto): Promise<any> {
        return this.authService.signup(user);
    }
    // To get data from body
    @Post('signin') signIn(@Body() user: UserSigninDto): Promise<any> {
        return this.authService.signIn(user);
    }

    // Here in UseGuards acts as a middleware for JWT authentication.
    @UseGuards(AuthGuard)
    // To get data from params
     @Get('getUserById/:id') getUserById(@Param('id') id: ObjectId, @Request() request:any): Promise<any> {
        return this.authService.getUserById(id);
    }

    // To get data from query string & body.
    @UseGuards(AuthGuard) @Put('updateUser') updateUserById(@Query() userId: { userId: ObjectId }, @Body() userData: UpdateUserDto): Promise<any> {
        return this.authService.updateUserById(userId.userId, userData);
    }

    @UseGuards(AuthGuard) @Patch('updateRole') updateUserRole(@Query() userData: UpdateUserRoleDto): Promise<any> {
        return this.authService.updateUserRole(userData);
    }

    @UseGuards(AuthGuard) @Delete('deleteUserById/:userId') deleteUserById(@Param('userId') userId: ObjectId): Promise<any> {
        return this.authService.deleteUserById(userId);
    }

}