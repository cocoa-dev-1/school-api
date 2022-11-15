import { IsString } from 'class-validator';

export class CreateWorkDto {
  @IsString()
  name: string;

  @IsString()
  body: string;
}
