import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Res, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Work } from 'src/entity/work.entity';
import { NotFoundInterceptor } from 'src/utils/interceptors';
import { CreateWorkDto } from './dto/create-work.dto';
import { WorkService } from './work.service';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('work')
@ApiTags('work api')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  @ApiOperation({
    summary: '모든 수행평가 조회 API',
    description: '현재 db에 있는 모든 수행평가를 조회한다.',
  })
  async findAll(): Promise<Array<Work>> {
    return this.workService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: '수행평가 조회 API',
    description: 'id에 맞는 수행평가를 조회한다.',
  })
  @UseInterceptors(new NotFoundInterceptor('work id not found'))
  async findOne(@Param('id') id: number): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: '수행평가 생성 API',
    description: '수행평가를 생성한다.',
  })
  @ApiCreatedResponse({
    description: '수행평가를 생성한다.',
    type: Work,
  })
  async create(@Body() createWorkDto: CreateWorkDto) {
    return this.workService.create(createWorkDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '수행평가 수정 API',
    description: '수행평가를 수정한다.',
  })
  @ApiCreatedResponse({
    description: '수행평가를 수정한다.',
    type: Work,
  })
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
