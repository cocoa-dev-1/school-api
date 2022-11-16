import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { NotFoundInterceptor } from 'src/utils/interceptors';
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
  @UseInterceptors(new NotFoundInterceptor('user not found'))
  async findOne(@Param() id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  // @Patch(':id')
  // @UseInterceptors(new NotFoundInterceptor('user not found'))
  // async update(
  //   @Param('id') id: number,
  //   @Body() createUserDto: CreateUserDto,
  // ): Promise<User> {
  //   return this.userService.update(id, createUserDto);
  // }
}
