import { MaxLength } from 'class-validator';
import { Knowledgment } from '../knowledgment/knowledgment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum EmployeeStatus {
  WAITING = 'waiting',
  VALID = 'valid',
  INVALID = 'invalid',
}

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(100, {
    message: 'O nome deve ter no máximo 100 caracteres',
  })
  name: string;

  @Column()
  @MaxLength(100, {
    message: 'O email deve ter no máximo 100 caracteres',
  })
  email: string;

  @Column({
    unique: true,
  })
  cpf: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToMany(() => Knowledgment, (knowledgment) => knowledgment.employees, {
    eager: true,
  })
  @JoinTable({
    name: 'employee_knowledgment',
  })
  knowledgments: Knowledgment[];

  @Column({
    type: 'enum',
    enum: EmployeeStatus,
    default: EmployeeStatus.WAITING,
  })
  status: EmployeeStatus;

  @Column({ nullable: true })
  validatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
