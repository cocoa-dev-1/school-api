import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
