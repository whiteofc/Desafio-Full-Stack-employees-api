import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';
import { IsCPF } from 'class-validator-cpf';

export default class EmployeeDto {
  constructor(employee: EmployeeDto) {
    this.name = employee.name;
    this.email = employee.email;
    this.cpf = employee.cpf;
    this.phone = employee.phone;
    this.knowledgmentIds = employee.knowledgmentIds;
  }

  @IsNotEmpty({ message: 'O nome do funcionário não pode ser vazio.' })
  name: string;

  @IsNotEmpty({ message: 'O email do funcionário não pode ser vazio.' })
  @IsEmail({}, { message: 'O email do funcionário deve ser um email válido.' })
  email: string;

  @IsNotEmpty({ message: 'O CPF do funcionário não pode ser vazio.' })
  @IsCPF({ message: 'O CPF do funcionário deve ser um CPF válido.' })
  cpf: string;

  phone: string;

  @ArrayNotEmpty({
    message: 'O funcionário deve ter pelo menos um conhecimento.',
  })
  @ArrayMaxSize(3, {
    message: 'O funcionário deve ter no máximo 3 conhecimentos.',
  })
  knowledgmentIds: number[];

  knowledgments: any[];
}
