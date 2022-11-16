import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import {
  EntityNotFoundException,
  UserAlreadyExistException,
} from 'src/utils/interceptors';
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
    if (!result) throw new EntityNotFoundException();
    return result;
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return result;
  }

  async create(body: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(body);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error?.code == 'ER_DUP_ENTRY') {
        throw new UserAlreadyExistException();
      }
      throw new InternalServerErrorException();
      // if (error?.code == )
    }
  }
}
