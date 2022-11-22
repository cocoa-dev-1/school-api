import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { File } from './file.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'work' })
@Unique(['id'])
export class Work extends BaseEntity {
  @ApiProperty({ description: '고유 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '수행평가 이름' })
  @Column()
  name: string;

  @ApiProperty({ description: '수행평가 내용' })
  @Column({ type: 'varchar' })
  body: string;

  @ApiProperty({ description: '수행평가 생성시간' })
  @CreateDateColumn()
  created_at: Date; // Creation date

  @ApiProperty({ description: '수행평가 수정시간' })
  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @ApiProperty({ description: '수행평가 삭제시간' })
  @DeleteDateColumn()
  deleted_at: Date; // Deletion date

  @ApiProperty({ description: '수행평가 자료', type: () => File })
  @OneToMany(() => File, (file) => file.id)
  files: Array<File>;
}
