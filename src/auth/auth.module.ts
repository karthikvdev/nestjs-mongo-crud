import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "mongo/auth.schema";
import { CommonService } from "src/common/common.controller";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from 'dotenv';
dotenv.config();

export const SCHEMAS: ModelDefinition[] = [
    {
        name: "UserModel",
        schema: UserSchema
    }
]

// list of imports for auth modules
const AUTH_MODULE_IMPORTS = [
    MongooseModule.forFeature(SCHEMAS),
    JwtModule.register({  //Importing JWT module.
        global: true,
        secret: process.env.JWT_SECRET_CODE,
        signOptions: { expiresIn: '2h' }, // here the jwt token expires in 2h
    })
]

// list of controllers for auth modules
const AUTH_MODULE_CONTROLLERS = [
    AuthController,
]

// list of providers or service  for auth modules
const AUTH_MODULE_PROVIDERS = [
    AuthService,
    CommonService,
]

@Module({
    imports: AUTH_MODULE_IMPORTS,
    controllers: AUTH_MODULE_CONTROLLERS,
    providers: AUTH_MODULE_PROVIDERS
})

export class AuthModule {
    constructor() {

    }
}