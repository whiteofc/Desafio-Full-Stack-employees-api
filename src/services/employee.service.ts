import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../modules/employee/employee.entity';
import { Repository } from 'typeorm';
import EmployeeDto from 'src/shared/dtos/employee.dto';
import { Knowledgment } from 'src/modules/knowledgment/knowledgment.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Knowledgment)
    private readonly knowledgmentRepository: Repository<Knowledgment>,
  ) {}

  getEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  getEmployee(id: number): Promise<Employee> {
    return this.employeeRepository.findOneOrFail({
      where: { id },
    });
  }

  async createEmployee(employee: EmployeeDto): Promise<Employee> {
    const savedEmployee = this.employeeRepository.create(employee);
    savedEmployee.knowledgments = [];

    await Promise.all(
      employee.knowledgmentIds.map(async (knowledgmentId) => {
        const knowledgment = await this.knowledgmentRepository.findOneOrFail({
          where: { id: knowledgmentId },
        });
        savedEmployee.knowledgments.push(knowledgment);
      }),
    );

    return this.employeeRepository.save(savedEmployee);
  }
}
