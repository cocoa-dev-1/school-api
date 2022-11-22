import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { File } from 'src/entity/file.entity';
import { multerDiskOptions } from 'src/utils/file-upload-options';
import { FileService } from './file.service';

@ApiTags('file api')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary: '수행평가 파일 조회 API',
    description: '수행평가 파일을 조회한다.',
  })
  @ApiCreatedResponse({
    description: '조회된 수행평가 파일을 반환한다.',
    type: File,
  })
  @Get(':id')
  async get(@Param('id') id: number): Promise<File> {
    return this.fileService.findOne(id);
  }

  @ApiOperation({
    summary: '수행평가 파일 생성 API',
    description: '수행평가 파일을 생성한다.',
  })
  @ApiCreatedResponse({
    description: '생성된 수행평가 파일들을 반환한다.',
    type: File,
  })
  @Post()
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOptions))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('workId') workId: number,
  ): Promise<Array<File>> {
    return this.fileService.uploadFiles(workId, files);
  }
}
