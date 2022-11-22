import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkDto {
  @IsString()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsString()
  @ApiProperty({ description: '내용' })
  body: string;
}
