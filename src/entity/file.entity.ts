import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Work } from './work.entity';

@Entity({ name: 'file' })
export class File extends BaseEntity {
  @ApiProperty({ description: '수행평가 파일 고유 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '수행평가 파일 이름' })
  @Column()
  fileName: string;

  @ApiProperty({ description: '수행평가 파일 타입' })
  @Column()
  fileType: string;

  @ApiProperty({ description: '수행평가 파일 주소' })
  @Column()
  fileUrl: string;

  @ApiProperty({ description: '수행평가 id', type: () => Work })
  @ManyToOne(() => Work, (work) => work.id)
  work: Work;
}
