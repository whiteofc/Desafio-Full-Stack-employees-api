import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './services/typeorm.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { KnowledgmentModule } from './modules/knowledgment/knowledgment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    EmployeeModule,
    KnowledgmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
