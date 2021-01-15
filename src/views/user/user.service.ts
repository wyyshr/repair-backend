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

  /**
   * 首次登录
   * - 如果选择管理员，无法进入
   * - 如果选择普通住户，正常进入（保存信息）
   * 
   * 非首次登录
   * - 如果没有权限且选择管理员，无法进入
   * - 如果有权限，正常进入（更新信息）
   */
  async login(body: UserType) {
    const { identity, userName } = body
    const noPower = { code: 0, success: false, msg: '您暂无管理员权限' }
    const success = { code: 1, success: true }
    const user = await this.userRepository.findOne({ userName });
    if (!user) {
      if (identity === 1) return noPower
      await this.userRepository.save({ ...body, hasPower: false })
    } else {
      if (!user.hasPower && identity === 1) return noPower
      await this.userRepository.update(user, { ...body })
    }
    return success
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
