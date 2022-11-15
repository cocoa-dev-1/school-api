import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Array<User>> {
    const result = await this.userRepository.find();
    return result;
  }

  async findOne(id: number): Promise<User> {
    const result = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return result;
  }

  async create(body: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(body);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
