import { seeder } from 'nestjs-seeder';
import { KnowledgmentsSeeder } from './seeders/knowledgments.seeder';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/typeorm.service';
import { Knowledgment } from './modules/knowledgment/knowledgment.entity';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Knowledgment]),
  ],
}).run([KnowledgmentsSeeder]);
