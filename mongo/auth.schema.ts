import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserModel>;

export enum Role {
    ADMIN = "ADMIN",
    USER = 'USER'
}

@Schema({
    timestamps: true // to create timestamps for each document.
})

// MongoDB schema.
export class UserModel {
    @Prop() name: string;
    @Prop() email: string;
    @Prop() mobile: string;
    @Prop() password: string;
    @Prop({ default: Role.USER }) role: Role
}

export const UserSchema = SchemaFactory.createForClass(UserModel);