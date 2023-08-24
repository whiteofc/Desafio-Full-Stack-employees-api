import { Module } from '@nestjs/common';
import { KnowledgmentController } from './knowledgment.controller';
import { KnowledgmentService } from '../../services/knowledgment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Knowledgment } from './knowledgment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Knowledgment])],
  controllers: [KnowledgmentController],
  providers: [KnowledgmentService],
})
export class KnowledgmentModule {}
