import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repairer } from 'src/entity/repairer.entity';
import { Report } from 'src/entity/report.entity';
import { RepairerController } from './repairer.controller';
import { RepairerService } from './repairer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Repairer, Report])],
  controllers: [RepairerController],
  providers: [RepairerService]
})
export class RepairerModule {}
