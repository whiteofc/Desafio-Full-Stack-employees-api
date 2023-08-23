import { Employee } from 'src/modules/employee/employee.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('knowledgment')
export class Knowledgment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Employee, (employee) => employee.knowledgments)
  employees: Employee[];
}
