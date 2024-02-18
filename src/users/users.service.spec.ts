import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find All', async () => {
    const result: Users[] = [
      { id: 1, name: 'Smith' },
      { id: 2, name: 'John' },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(async () => result);

    expect(await service.findAll()).toBe(result);
  });

  it('find One', async () => {
    const result: Users = { id: 1, name: 'Smith' };
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    const id = 1;
    expect(await service.findOne(id)).toBe(result);
  });

  it('create one', async () => {
    const result: Users = { id: 3, name: 'David' };
    jest.spyOn(service, 'create').mockImplementation(async () => result);

    const newUser: CreateUserDto = { name: 'David' };
    expect(await service.create(newUser)).toBe(result);
  });

  it('update one', async () => {
    const result: Users = { id: 1, name: 'Kevin' };
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);
    jest.spyOn(service, 'update').mockImplementation(async () => result);

    const id = 1;
    const oldUser = { id: 1, name: 'Smith' };
    const newUser: UpdateUserDto = { id: 1, name: 'Kevin' };
    await service.update(oldUser, newUser);
    expect(await service.findOne(id)).toBe(result);
  });

  it('remove One', async () => {
    const result = undefined;
    jest.spyOn(service, 'findOne').mockImplementation(async () => result);

    const id = 3;
    expect(await service.findOne(id)).toBeUndefined();
  });
});
