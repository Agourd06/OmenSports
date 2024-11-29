import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() data: CreateEventDto) {
    return this.eventsService.createEvent(data);
  }

  @Get()
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateEventDto) {
    return this.eventsService.updateEvent(id, data);
  }

  @Delete(':eventId/users/:userId')
  async removeUserFromEvent(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    this.eventsService.removeUserFromEvent(userId,eventId)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventsService.removeEvent(id);
  }
}
