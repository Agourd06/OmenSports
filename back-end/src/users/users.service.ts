import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserModel } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    private eventService: EventsService, 
  ) {}

  async createUser(data: CreateUserDto, eventId: string) : Promise<UserModel> {
    const existingUser = await this.userModel.findOne({ email: data.email }).exec();
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const user = new this.userModel(data);
    const savedUser = await user.save();
    await this.eventService.addUserToEvent(eventId, savedUser._id);

    return savedUser; 
  }

  async findAll(): Promise<UserModel[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserModel> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<UserModel> {
    return await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteUser(id: string): Promise<UserModel> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
