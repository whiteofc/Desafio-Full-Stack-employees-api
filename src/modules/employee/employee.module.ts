import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';

import { Employee } from './employee.entity';
import { Knowledgment } from 'src/modules/knowledgment/knowledgment.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from '../../services/employee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Knowledgment])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
