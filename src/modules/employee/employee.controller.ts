import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { EmployeeService } from '../../services/employee.service';
import EmployeeDto from 'src/shared/dtos/employee.dto';
import { validate } from 'class-validator';

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

  @Post('/create')
  async createEmployee(@Body() employeeData: EmployeeDto) {
    try {
      const employee = new EmployeeDto(employeeData);
      await validate(employee).then(async (errors) => {
        if (errors.length > 0) {
          throw {
            message: errors.map((error) => error.constraints),
          };
        }
      });
      await this.employeeService.createEmployee(employeeData);
      return {
        status: 200,
        message: 'Employee created successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
