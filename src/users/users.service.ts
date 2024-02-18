import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  create(user: CreateUserDto) {
    const newUser = new Users();

    Object.keys(user).forEach((key) => {
      newUser[key] = user[key];
    });

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(oldUser: UpdateUserDto, newUser: UpdateUserDto) {
    const updatedUser = oldUser;

    Object.keys(newUser).forEach((key) => {
      updatedUser[key] = newUser[key];
    });

    return this.userRepository.save(updatedUser);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
