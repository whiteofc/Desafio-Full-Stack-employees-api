import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Knowledgment } from '../modules/knowledgment/knowledgment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KnowledgmentsSeeder implements Seeder {
  constructor(
    @InjectRepository(Knowledgment)
    private readonly knowledgmentRepository: Repository<Knowledgment>,
  ) {}

  KNOWLEDGMENTS = [
    'Git',
    'React',
    'PHP',
    'NodeJS',
    'DevOps',
    'Banco de Dados',
    'TypeScript',
  ];

  async seed() {
    await Promise.all(
      this.KNOWLEDGMENTS.map(async (knowledgment) => {
        const newKnowledgment = new Knowledgment();
        newKnowledgment.name = knowledgment;
        await this.knowledgmentRepository.save(newKnowledgment);
      }),
    );
  }

  async drop() {}
}
