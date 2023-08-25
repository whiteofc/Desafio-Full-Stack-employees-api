import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from '../../test-utils/typeorm-testing-module';
import { Knowledgment } from '../../modules/knowledgment/knowledgment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../modules/employee/employee.entity';
import { EmployeeService } from '../../services/employee.service';
import EmployeeDto from '../../shared/dtos/employee.dto';
import { KnowledgmentService } from '../../services/knowledgment.service';

describe('EmployeeService', () => {
  let employeeService: EmployeeService;
  let knowledgmentService: KnowledgmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmTestingModule([Knowledgment, Employee]),
        TypeOrmModule.forFeature([Knowledgment, Employee]),
      ],
      providers: [EmployeeService, KnowledgmentService],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService);
    knowledgmentService = module.get<KnowledgmentService>(KnowledgmentService);
  });

  it('should be defined', () => {
    expect(employeeService).toBeDefined();
  });

  describe('getEmployees', () => {
    beforeEach(async () => {
      await knowledgmentService.createKnowledgment({ name: 'Javascript' });
      await knowledgmentService.createKnowledgment({ name: 'C' });
      await knowledgmentService.createKnowledgment({ name: 'PHP' });
      await knowledgmentService.createKnowledgment({ name: 'Python' });
    });

    it('should create an employee', async () => {
      const employee = new EmployeeDto({
        name: 'test',
        email: 'test@gmail.com',
        phone: '123456789',
        knowledgmentIds: [1],
        cpf: '11837011443',
      });

      const newEmployee = await employeeService.createEmployee(employee);

      expect(newEmployee).toBeDefined();
      expect(newEmployee.id).toBeDefined();

      expect(newEmployee.name).toEqual(employee.name);

      const employees = await employeeService.getEmployees();

      expect(employees).toBeDefined();
      expect(employees.length).toEqual(1);
    });

    // TODO: VALIDATION TEST
  });
});
