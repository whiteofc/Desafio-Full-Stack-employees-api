import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { Employee } from './employee.entity';
import { Knowledgment } from 'src/shared/entities/knowledgment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Knowledgment])],
})
export class EmployeeModule {}
