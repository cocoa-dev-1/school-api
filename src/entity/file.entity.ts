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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  fileType: string;

  @Column()
  fileUrl: string;

  @ManyToOne(() => Work, (work) => work.id)
  work: Work;
}
