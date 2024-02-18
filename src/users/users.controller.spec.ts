import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find All', async () => {
    const result: Users[] = [
      { id: 1, name: 'Smith' },
      { id: 2, name: 'John' },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await controller.findAll()).toBe(result);
  });

  it('find One', async () => {
    const result: Users = { id: 1, name: 'Smith' };
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    const id = '1';
    expect(await controller.findOne(id)).toBe(result);
  });

  it('create one', async () => {
    const result: Users = { id: 3, name: 'David' };
    jest.spyOn(service, 'create').mockImplementation(async () => result);

    const newUser: CreateUserDto = { name: 'David' };
    expect(await controller.create(newUser)).toBe(result);
  });

  it('update one', async () => {
    const result: Users = { id: 1, name: 'Kevin' };
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);
    jest.spyOn(service, 'update').mockImplementation(async () => result);

    const id = '1';
    const newUser: UpdateUserDto = { id: 1, name: 'Kevin' };
    await controller.update(id, newUser);
    expect(await controller.findOne(id)).toBe(result);
  });

  it('remove One', async () => {
    const result = undefined;
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    const id = '3';
    expect(await controller.findOne(id)).toBeUndefined();
  });
});
