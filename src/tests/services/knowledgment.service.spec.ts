import { Test, TestingModule } from '@nestjs/testing';
import { KnowledgmentService } from '../../services/knowledgment.service';
import { TypeOrmTestingModule } from '../../test-utils/typeorm-testing-module';
import { Knowledgment } from '../../modules/knowledgment/knowledgment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../modules/employee/employee.entity';

describe('KnowledgmentService', () => {
  let knowledgmentService: KnowledgmentService; // renamed variable to pokemonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmTestingModule([Knowledgment, Employee]),
        TypeOrmModule.forFeature([Knowledgment, Employee]),
      ],
      providers: [KnowledgmentService],
    }).compile();

    knowledgmentService = module.get<KnowledgmentService>(KnowledgmentService);
  });

  it('should be defined', () => {
    expect(knowledgmentService).toBeDefined();
  });

  describe('getKnowledgments', () => {
    it('should create and return a knowledgment', async () => {
      await knowledgmentService.createKnowledgment({ name: 'test' });

      const knowledgments = await knowledgmentService.getKnowledgments();

      expect(knowledgments).toHaveLength(1);
      expect(knowledgments[0].name).toEqual('test');
    });
  });
});
