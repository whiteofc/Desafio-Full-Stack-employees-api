import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmTestingModule = (entities: any[]) => {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    username: 'postgres',
    password: '04758684',
    database: 'mesha_employees_test',
    entities: [...entities],
    synchronize: true,
    dropSchema: true,
  });
};
