import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { defaultAvatar } from 'src/config/config';
import { Admin } from 'src/entity/admin.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

const resData = <T>(
  code: number,
  success: boolean,
  msg?: string,
  data?: T
) => {
  return { code, success, msg, data }
}

type AdminType = {
  userName: string
  password: string
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async login(body: AdminType) {
    const { userName, password } = body
    const admin = await this.adminRepository.findOne({ userName, password })
    if (!admin) return resData(0, false, '用户名或密码错误')
    return resData(1, true, '登录成功')
  }

  async register(body: AdminType) {
    const { userName } = body
    const admin = await this.adminRepository.findOne({ userName })
    if (admin) return resData(0, false, '用户名重复')
    await this.adminRepository.save(body)
    return resData(1, true, '注册成功')
  }

  // 获取用户或管理员
  async getUser(query: { hasPower: boolean }) {
    const { hasPower } = query
    let user: User[]
    hasPower ?
      user = await this.userRepository.find({ hasPower }) :
      user = await this.userRepository.find()
    return resData(1, true, '操作成功', user)
  }

  // 添加管理员
  async addManager(query: { userName: string }) {
    const { userName } = query
    const manager = await this.userRepository.findOne({ userName })
    if (manager) return resData(0, false, '该管理员已存在')
    await this.userRepository.save({
      userName,
      identity: 1,
      hasPower: true,
      avatarUrl: defaultAvatar,
      gender: 0
    })
    return resData(1, true, '添加成功')
  }

  // 删除用户
  async deleteUser(body: { id: number }) {
    const { id } = body
    const user = await this.userRepository.findOne({ id })
    if (!user) return resData(0, false, '该用户不存在')
    await this.userRepository.delete(id)
    return resData(1, true, '删除成功')
  }

  // 修改权限
  async changePower(body: { id: number }) {
    const { id } = body
    const user = await this.userRepository.findOne({ id })
    if (!user) return resData(0, false, '该用户不存在')
    await this.userRepository.update(user, { hasPower: !user.hasPower })
    return resData(1, true)
  }
}
