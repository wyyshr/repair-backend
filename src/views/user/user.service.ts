import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserInfo } from 'src/entity/userInfo.entity';
import { FillInfo, GetUserInfo, UserType } from 'src/interface/userType';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>
  ) { }

  // 登录
  async login(body: UserType) {
    const user = await this.userRepository.findOne({ userName: body.userName });
    !user ?
      await this.userRepository.save(body) : 
      await this.userRepository.update(user, { identity: body.identity })
    return { code: 1, success: true };
  }

  // 用户信息填写
  async fillInfo(query: FillInfo) {
    const { userName, mobile, address } = query;
    const user = await this.userInfoRepository.findOne({ userName });
    !user && await this.userInfoRepository.save(query);
    await this.userInfoRepository.update({ userName }, { mobile, address });
    return { code: 1, success: true };
  }

  // 获取用户信息
  async getUserInfo(query: GetUserInfo) {
    const user = await this.userInfoRepository.findOne({ userName: query.userName });
    if (!user) return { code: 0, success: false }
    return { code: 1, success: true, data: user }
  }
}
