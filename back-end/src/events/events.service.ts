import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,  
  ) {}

  async createEvent(data: CreateEventDto): Promise<Event> {
    const event = new this.eventModel(data);
    return event.save();
  }


  async addUserToEvent(eventId: string, userId: string) {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) {
      throw new BadRequestException('Event not found');
    }
  
    event.users.push(userId); 
    await event.save(); 
  
    const updatedEvent = await this.eventModel
      .findById(eventId)
      .populate('users', 'username email') 
      .exec();
  
    return updatedEvent;
  }
  

  async findAll(): Promise<Event[]> {
    return this.eventModel
      .find()
      .populate({
        path: 'users',
        model: 'User', 
        select: 'username email', 
      })
      .exec();
  }
  
  async findOne(id: string): Promise<Event> {
    return this.eventModel
      .findById(id)
      .populate({
        path: 'users',
        model: 'User', 
        select: 'username email',
      })
      .exec();
  }
  

  async updateEvent(id: string, data: UpdateEventDto): Promise<Event> {
    return this.eventModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async removeEvent(id: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }

  async removeUserFromEvent(userId : string , eventId : string){
console.log(userId,eventId)
    const x =  await this.eventModel.findByIdAndUpdate(
      eventId,
      { $pull: { users: new mongoose.Types.ObjectId(userId) } },
      { new: true } 
    ); 
    console.log(x)
    return x
   }

   
}
