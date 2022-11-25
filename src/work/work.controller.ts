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
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('work api')
@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @ApiOperation({
    summary: '모든 수행평가 조회 API',
    description: '현재 db에 있는 모든 수행평가를 조회한다.',
  })
  @ApiCreatedResponse({
    description: '모든 수행평가를 반환한다.',
    type: Work,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<Array<Work>> {
    return this.workService.findAll();
  }

  @ApiOperation({
    summary: '수행평가 조회 API',
    description: 'id에 맞는 수행평가를 조회한다.',
  })
  @ApiCreatedResponse({
    description: '수행평가를 반환한다.',
    type: Work,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('work id not found'))
  async findOne(@Param('id') id: number): Promise<Work> {
    return this.workService.findOne(id);
  }

  @ApiOperation({
    summary: '수행평가 생성 API',
    description: '수행평가를 생성한다.',
  })
  @ApiCreatedResponse({
    description: '생성된 수행평가를 반환한다.',
    type: Work,
  })
  @Post()
  async create(@Body() createWorkDto: CreateWorkDto) {
    return this.workService.create(createWorkDto);
  }

  @ApiOperation({
    summary: '수행평가 수정 API',
    description: '수행평가를 수정한다.',
  })
  @ApiCreatedResponse({
    description: '수정된 수행평가를 반환한다.',
    type: Work,
  })
  @Patch(':id')
  @UseInterceptors(new NotFoundInterceptor('work id not found'))
  async update(
    @Param('id') id: number,
    @Body() createWorkDto: CreateWorkDto,
  ): Promise<Work> {
    return this.workService.update(id, createWorkDto);
  }

  @ApiOperation({
    summary: '수행평가 삭제 API',
    description: '수행평가를 삭제한다.',
  })
  @ApiCreatedResponse({
    description: '삭제된 수행평가를 반환한다.',
    type: Work,
  })
  @Delete(':id')
  @UseInterceptors(new NotFoundInterceptor('work id not found'))
  async delete(@Param('id') id: number): Promise<Work> {
    return this.workService.delete(id);
  }
}
