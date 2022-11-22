import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from 'src/entity/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async findOne(id: number): Promise<File> {
    const file = await this.fileRepository.findOne({
      where: {
        id: id,
      },
    });
    return file;
  }

  async create(workId: number, file: Express.Multer.File): Promise<File> {
    const newFile = this.fileRepository.create({
      fileName: file.filename,
      fileType: file.mimetype,
      fileUrl: file.path,
    });
    const createdFile = await this.fileRepository.save(newFile);
    if (!createdFile) throw new InternalServerErrorException();
    return createdFile;
  }

  async uploadFiles(
    workId: number,
    files: Array<Express.Multer.File>,
  ): Promise<Array<File>> {
    const created = [];
    for (const file of files) {
      const newFile = await this.create(workId, file);
      created.push(newFile);
    }
    return created;
  }
}
