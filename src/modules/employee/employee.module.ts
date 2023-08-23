import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Knowledgment } from 'src/shared/entities/knowledgment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Knowledgment])],
})
export class EmployeeModule {}
