import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeeService } from '../../services/employee.service';
import EmployeeDto from 'src/shared/dtos/employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/')
  async getEmployees(@Query() query: any) {
    console.log(query);
    const employees = await this.employeeService.getEmployees(query);
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

  @Post('/approve/:id')
  async approveEmployee(@Param('id') id: number, @Body() data: any) {
    try {
      await this.employeeService.approveEmployee(id, data.valid);
      return {
        status: 200,
        message: 'Employee approved successfully',
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
