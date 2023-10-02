import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

export const Config = {
  envFilePath: ".env",
  isGlobal: true
}
export const IMPORT_MODULES = [
  AuthModule,
  UserModule,
  RoleModule,
  ConfigModule.forRoot(Config),
  MongooseModule.forRoot(process.env.DB_CONNECTION_URL),
  CommonModule
]

@Module({
  imports: IMPORT_MODULES
})
export class AppModule {

}
