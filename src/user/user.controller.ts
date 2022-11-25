import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { NotFoundInterceptor } from 'src/utils/interceptors';
import { UserService } from './user.service';

@ApiTags('user api')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '모든 유저 조회 API',
    description: '현재 db에 있는 모든 유저를 조회한다.',
  })
  @ApiCreatedResponse({
    description: '모든 수행평가를 반환한다.',
    type: User,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Array<User>> {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: '유저 조회 API',
    description: '유저 1명을 조회한다.',
  })
  @ApiCreatedResponse({
    description: '조회된 수행평가를 반환한다.',
    type: User,
  })
  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('user not found'))
  async findOne(@Param() id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
