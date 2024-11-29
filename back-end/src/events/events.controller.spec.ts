import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Types } from 'mongoose';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  const mockEvent = {
    id: 'eventId123',
    name: 'Event Name',
    users: [],
  };

  const mockEventsService = {
    createEvent: jest.fn().mockResolvedValue(mockEvent),
    addUserToEvent: jest.fn().mockResolvedValue({ ...mockEvent, users: ['userId123'] }),
    findAll: jest.fn().mockResolvedValue([mockEvent]),
    findOne: jest.fn().mockResolvedValue(mockEvent),
    updateEvent: jest.fn().mockResolvedValue({ ...mockEvent, name: 'Updated Event Name' }),
    removeUserFromEvent: jest.fn().mockResolvedValue({ ...mockEvent, users: [] }),
    removeEvent: jest.fn().mockResolvedValue(mockEvent),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const dto = { name: 'Event Name' ,description : 'description' , date: new Date('2000/06/06') , location: 'location' , users: [] as Types.ObjectId[] }; 
      const result = await controller.create(dto);

      expect(result).toEqual(mockEvent);
      expect(service.createEvent).toHaveBeenCalledWith(dto);
    });
  });

  describe('addUserToEvent', () => {
    it('should add a user to an event', async () => {
      const result = await controller.addUserToEvent('userId123', 'eventId123');

      expect(result).toEqual({ ...mockEvent, users: ['userId123'] });
      expect(service.addUserToEvent).toHaveBeenCalledWith('eventId123', 'userId123');
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([mockEvent]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const result = await controller.findOne('eventId123');

      expect(result).toEqual(mockEvent);
      expect(service.findOne).toHaveBeenCalledWith('eventId123');
    });
  });

  describe('update', () => {
    it('should update an event', async () => {
      const dto = { name: 'Updated Event Name' }; // Define your UpdateEventDto structure
      const result = await controller.update('eventId123', dto);

      expect(result).toEqual({ ...mockEvent, name: 'Updated Event Name' });
      expect(service.updateEvent).toHaveBeenCalledWith('eventId123', dto);
    });
  });

  describe('removeUserFromEvent', () => {
    it('should remove a user from an event', async () => {
      const result = await controller.removeUserFromEvent('userId123', 'eventId123');

      expect(result).toEqual({ ...mockEvent, users: [] });
      expect(service.removeUserFromEvent).toHaveBeenCalledWith('userId123', 'eventId123');
    });
  });

  describe('remove', () => {
    it('should delete an event', async () => {
      const result = await controller.remove('eventId123');

      expect(result).toEqual(mockEvent);
      expect(service.removeEvent).toHaveBeenCalledWith('eventId123');
    });
  });
});
