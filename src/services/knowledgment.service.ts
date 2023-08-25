import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Knowledgment } from '../modules/knowledgment/knowledgment.entity';
import KnowledgmentDto from 'src/shared/dtos/knowledgment.dto';

@Injectable()
export class KnowledgmentService {
  constructor(
    @InjectRepository(Knowledgment)
    private readonly knowledgmentRepository: Repository<Knowledgment>,
  ) {}

  getKnowledgments(): Promise<Knowledgment[]> {
    return this.knowledgmentRepository.find();
  }

  createKnowledgment(knowledgment: KnowledgmentDto): Promise<Knowledgment> {
    return this.knowledgmentRepository.save(knowledgment);
  }
}
