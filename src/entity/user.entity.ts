import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ description: '유저 고유 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '유저 고유 이메일' })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @ApiProperty({ description: '유저 이름' })
  @Column()
  name: string;
}
