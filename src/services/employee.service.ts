import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../modules/employee/employee.entity';
import { Repository } from 'typeorm';
import { Knowledgment } from '../modules/knowledgment/knowledgment.entity';
import EmployeeDto from '../shared/dtos/employee.dto';
import { validate } from 'class-validator';

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

  async createEmployee(employeeData: EmployeeDto): Promise<Employee> {
    const employee = new EmployeeDto(employeeData);

    await validate(employee).then(async (errors) => {
      if (errors.length > 0) {
        throw {
          message: errors.map((error) => error.constraints),
        };
      }
    });

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
