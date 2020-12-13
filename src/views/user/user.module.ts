import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserInfo } from 'src/entity/userInfo.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserInfo])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
