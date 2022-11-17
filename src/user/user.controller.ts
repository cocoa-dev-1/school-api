import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { NotFoundInterceptor } from 'src/utils/interceptors';
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
}
