import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './views/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportModule } from './views/report/report.module';
import { RepairerModule } from './views/repairer/repairer.module';
import { AdminModule } from './views/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'repair',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UserModule, ReportModule, RepairerModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
