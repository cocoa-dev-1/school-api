import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from 'src/entity/work.entity';
import { EntityNotFoundException } from 'src/utils/interceptors';
import { Repository } from 'typeorm';
import { CreateWorkDto } from './dto/create-work.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
  ) {}

  async findAll(): Promise<Array<Work>> {
    const result = await this.workRepository.find();
    return result;
  }

  async findOne(id: number): Promise<Work> {
    const result = await this.workRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!result) throw new EntityNotFoundException();
    return result;
  }

  async create(body: CreateWorkDto): Promise<Work> {
    const newWork = this.workRepository.create();
    newWork.name = body.name;
    newWork.body = body.body;
    const result = await this.workRepository.save(newWork);
    return result;
  }

  async update(id: number, body: CreateWorkDto): Promise<Work> {
    const targetWork = await this.findOne(id);
    targetWork.name = body.name;
    targetWork.body = body.body;
    const result = this.workRepository.save(targetWork);
    return result;
  }

  async delete(id: number): Promise<Work> {
    const targetWork = await this.findOne(id);
    const result = await this.workRepository.remove(targetWork);
    return targetWork;
  }
}
