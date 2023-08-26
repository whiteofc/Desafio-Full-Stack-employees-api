import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee, EmployeeStatus } from '../modules/employee/employee.entity';
import { ILike, Repository } from 'typeorm';
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

  async getEmployees(query: any): Promise<Employee[]> {
    const whereQuery: any = {};

    if (query.name) {
      whereQuery.name = ILike(`%${query.name}%`);
    }
    if (query.status) {
      whereQuery.status = query.status;
    }
    if (query.email) {
      whereQuery.email = ILike(`%${query.email}%`);
    }
    if (query.cpf) {
      whereQuery.cpf = ILike(`%${query.cpf}%`);
    }
    if (query.knowledgmentId) {
      return this.employeeRepository
        .createQueryBuilder()
        .innerJoinAndSelect('Employee.knowledgments', 'knowledgments')
        .orderBy('LOWER(Employee.name)', 'ASC')
        .where(whereQuery)
        .andWhere('knowledgments.id = :knowledgmentId', {
          knowledgmentId: query.knowledgmentId,
        })
        .getMany();
    }

    return this.employeeRepository
      .createQueryBuilder()
      .innerJoinAndSelect('Employee.knowledgments', 'knowledgments')
      .orderBy('LOWER(Employee.name)', 'ASC')
      .where(whereQuery)
      .getMany();
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

    console.log(savedEmployee);

    return this.employeeRepository.save(savedEmployee);
  }

  async approveEmployee(employeeId: number, valid): Promise<Employee> {
    const employee = await this.employeeRepository.findOneOrFail({
      where: { id: employeeId },
    });

    employee.status =
      valid == true ? EmployeeStatus.VALID : EmployeeStatus.INVALID;

    employee.validatedAt = new Date();

    const savedEmployee = await this.employeeRepository.save(employee);

    return savedEmployee;
  }
}
