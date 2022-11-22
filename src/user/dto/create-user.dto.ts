import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '유저 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '유저 비밀번호' })
  @IsString()
  password: string;

  @ApiProperty({ description: '유저 이름' })
  @IsString()
  name: string;
}
