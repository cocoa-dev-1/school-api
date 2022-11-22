import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { AlreadyExistInterceptor } from 'src/utils/interceptors';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RequestWithUser } from './type/request-with-user.interface';

@ApiTags('auth api')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '회원가입 API',
    description: '회원가입을 합니다.',
  })
  @ApiCreatedResponse({
    description: '회원가입된 유저를 반환합니다.',
    type: User,
  })
  @Post('register')
  @UseInterceptors(new AlreadyExistInterceptor('email already used'))
  async register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @ApiOperation({
    summary: '로그인 API',
    description: '로그인 합니다.',
  })
  @ApiCreatedResponse({
    description: '회원가입된 유저의 토큰을 반환합니다.',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    return this.authService.login(request.user);
  }
}
