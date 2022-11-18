import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Work } from 'src/entity/work.entity';
import { NotFoundInterceptor } from 'src/utils/interceptors';
import { CreateWorkDto } from './dto/create-work.dto';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async findAll(): Promise<Array<Work>> {
    return this.workService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('work id not found'))
  async findOne(@Param('id') id: number): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Post()
  async create(@Body() createWorkDto: CreateWorkDto): Promise<Work> {
    return this.workService.create(createWorkDto);
  }

  @Patch(':id')
  @UseInterceptors(new NotFoundInterceptor('work id not found'))
  async update(
    @Param('id') id: number,
    @Body() createWorkDto: CreateWorkDto,
  ): Promise<Work> {
    return this.workService.update(id, createWorkDto);
  }

  @Delete(':id')
  @UseInterceptors(new NotFoundInterceptor('work id not found'))
  async delete(@Param('id') id: number): Promise<Work> {
    return this.workService.delete(id);
  }
}
