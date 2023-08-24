import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../modules/employee/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  getEmployees(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  getEmployee(id: number): Promise<Employee> {
    return this.employeeRepository.findOneOrFail({
      where: { id },
    });
  }
}
