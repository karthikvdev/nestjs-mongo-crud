import { IsEmail, IsEnum, IsNotEmpty, IsString, IsOptional, IsMongoId } from "class-validator";
import { Role } from "mongo/auth.schema";
import { ObjectId } from 'mongodb';

export class CreateUserDto {
    @IsNotEmpty() @IsString() readonly name: string;
    @IsNotEmpty() @IsEmail({}, { message: "Provide Valid email" }) readonly email: string; // We can give custom validations.
    @IsNotEmpty() @IsString() readonly mobile: string;
    @IsNotEmpty() @IsString() readonly password: string;
    @IsNotEmpty() @IsString() @IsEnum(Role) readonly role: Role // Here IsEnum will validate only the enum values available in it.
}

export class UpdateUserRoleDto {
    @IsMongoId() readonly userId: ObjectId;
    @IsNotEmpty() @IsString() @IsEnum(Role) readonly role: Role

}

export class UpdateUserDto {
    @IsOptional() @IsString() readonly name: string;
    @IsOptional() @IsEmail({}, { message: "Provide Valid email" }) readonly email: string;
    @IsOptional() @IsString() readonly mobile: string;
    @IsOptional() @IsString() @IsEnum(Role) readonly role: Role
}

export class UserSigninDto {
    @IsNotEmpty() @IsEmail({}, { message: "Provide Valid email" }) readonly email: string;
    @IsNotEmpty() @IsString() readonly password: string;
}
