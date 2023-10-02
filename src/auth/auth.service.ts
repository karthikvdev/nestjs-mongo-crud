
import { Injectable } from "@nestjs/common";
import { UserModel } from "../../mongo/auth.schema"
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { CommonService, IAPIResponse } from "src/common/common.controller";
import * as bcrypt from 'bcrypt';
import { UpdateUserDto, UpdateUserRoleDto, UserSigninDto } from "./auth.dto";
import { ObjectId } from "mongoose";
import { IMongoProjectionFields } from "mongo";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private projectionFields: IMongoProjectionFields = {
        password: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0
    }
    constructor(
        @InjectModel(UserModel.name)
        private userModel: mongoose.Model<UserModel>,
        private commonService: CommonService,
        private jwtService: JwtService
    ) { }

    public async signup(payload: UserModel): Promise<IAPIResponse> {
        try {
            const { password, ...rest } = payload;
            const isEmailAlreadySignedUp = await this.userModel.findOne({ email: rest?.email });
            if (isEmailAlreadySignedUp) {
                return this.commonService.FAILURE_RESPONSE({ message: 'Email already exists!' });
            }
            const isMobileAlreadySignedUp = await this.userModel.findOne({ mobile: rest?.mobile });
            if (isMobileAlreadySignedUp) {
                return this.commonService.FAILURE_RESPONSE({ message: 'Mobile already exists!' });
            }

            const salt = await bcrypt?.genSalt();
            const hashpassword = await bcrypt?.hash(password, salt);
            const user = new this.userModel({ password: hashpassword, ...rest });
            await user.save();
            return this.commonService.SUCCESS({ message: "User created succesfully" })
        } catch (error) {
            return this.commonService.SERVER_ERROR({ message: error?.message });
        }
    }

    public async signIn(payload: UserSigninDto): Promise<IAPIResponse> {
        try {
            const { password, email } = payload;
            const user = await this.userModel.findOne({ email });
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const access_token = await this.jwtService.signAsync(payload); // generating access token
                    delete user.password // hiding password before sending response.
                    return this.commonService.SUCCESS({ data: { user, access_token }, message: "User is authenticated" })
                }
                return this.commonService.FAILURE_RESPONSE({ message: "Invalid creds" })
            }

            return this.commonService.FAILURE_RESPONSE({ message: "User not found." })
        } catch (error) {
            return this.commonService.SERVER_ERROR({ message: error?.message })
        }
    }

    public async getUserById(userId: ObjectId): Promise<IAPIResponse> {
        try {
            const user = await this.userModel.findOne({ _id: userId }, this.projectionFields);
            if (user) {
                return this.commonService.SUCCESS({ data: user, message: "User details fetched successfully!" })
            }
            return this.commonService.FAILURE_RESPONSE({ message: "User not found!" })
        } catch (error) {
            return this.commonService.SERVER_ERROR({ message: error?.message })
        }
    }

    public async updateUserById(userId: ObjectId, userData: UpdateUserDto): Promise<IAPIResponse> {
        try {
            const user = await this.userModel.findOneAndUpdate({ _id: userId }, userData, { returnDocument: "after", projection: this.projectionFields })
            if (user) {
                return this.commonService.SUCCESS({ data: user, message: "User details updated successfully!" })
            }
            return this.commonService.FAILURE_RESPONSE({ message: "User not found!" })
        } catch (error) {
            return this.commonService.SERVER_ERROR({ message: error?.message })
        }
    }

    public async updateUserRole(userData: UpdateUserRoleDto): Promise<IAPIResponse> {
        try {
            const { userId, role } = userData;
            const user = await this.userModel.findByIdAndUpdate({ _id: userId }, { role }, { returnDocument: "after", projection: this.projectionFields });
            if (user) {
                return this.commonService.SUCCESS({ data: user, message: "User details updated successfully!" })
            }
            return this.commonService.FAILURE_RESPONSE({ message: "User not found!" })
        } catch (error) {
            return this.commonService.SERVER_ERROR({ message: error?.message })
        }
    }

    public async deleteUserById(userId: ObjectId): Promise<IAPIResponse> {
        try {
            const user = await this.userModel.deleteOne({ _id: userId });
            if (user?.deletedCount) {
                return this.commonService.SUCCESS({ message: "User deleted successfully!" })
            }
            return this.commonService.FAILURE_RESPONSE({ message: "Users not found!" })
        } catch (error) {
            return this.commonService.SERVER_ERROR({ message: error?.message })
        }
    }
}