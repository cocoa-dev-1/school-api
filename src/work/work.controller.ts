import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Work } from 'src/entity/work.entity';
import { CreateWorkDto } from './dto/create-work.dto';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async findAll(): Promise<Array<Work>> {
    return this.workService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Post()
  async create(@Body() createWorkDto: CreateWorkDto): Promise<Work> {
    return this.workService.create(createWorkDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() createWorkDto: CreateWorkDto,
  ): Promise<Work> {
    return this.workService.update(id, createWorkDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Work> {
    return this.workService.delete(id);
  }
}
