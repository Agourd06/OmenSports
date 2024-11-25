import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';



@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {}

  async createUser(data: CreateUserDto): Promise<UserModel> {
    const user = new this.userModel(data);
    return user.save();
  }

  async findAll(): Promise<UserModel[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserModel> {
    return this.userModel.findById(id).populate('User').populate('Channel').exec();
  }
  

  async updateUser(id: string, data: UpdateUserDto): Promise<UserModel> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<UserModel> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
