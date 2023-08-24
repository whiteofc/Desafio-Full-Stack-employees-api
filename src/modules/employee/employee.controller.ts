import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from '../../services/employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/')
  async getEmployees() {
    const employees = await this.employeeService.getEmployees();
    return employees;
  }

  @Get('/:id')
  async getEmployee(@Param('id') id: number) {
    const employee = await this.employeeService.getEmployee(id);
    return employee;
  }
}
