import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from 'src/entity/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  providers: [WorkService],
  controllers: [WorkController],
})
export class WorkModule {}
