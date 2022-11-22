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
import { File } from 'src/entity/file.entity';
import { multerDiskOptions } from 'src/utils/file-upload-options';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<File> {
    return this.fileService.findOne(id);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('files', null, multerDiskOptions))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('workId') workId: number,
  ): Promise<Array<File>> {
    console.log(files);
    return this.fileService.uploadFiles(workId, files);
  }
}
