import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User as UserModel } from './users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    private eventService: EventsService, 
  ) {}

  async createUser(data: CreateUserDto, eventId: string): Promise<UserModel> {
    const existingUser = await this.userModel.findOne({ email: data.email }).exec();
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }
  
    const newUser = new this.userModel(data);
    await newUser.save();
  
    const event = await this.eventService.findOne(eventId);
    if (!event) {
      throw new BadRequestException('Event not found');
    }
  console.log(event.users)

  const userId = newUser._id?.toString()
  console.log(userId)


  event.users.push(userId);  
  await event.save();
  console.log(event.users)
  
    return newUser;
  }
  
  
  async findAll(): Promise<UserModel[]> {
    try {
        return await this.userModel.find({ role: 'participant' }).exec();
    } catch (error) {
        console.error('Error fetching participants:', error);
        throw new Error('Could not fetch participants');
    }
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
