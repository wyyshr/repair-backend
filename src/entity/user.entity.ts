import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn() 
  id: number

  @Column() 
  userName: string  // 用户名

  @Column() 
  identity: number  // 身份 1-管理员 0-用户

  @Column()
  gender: number    // 性别 1-男 2-女

  @Column()
  avatarUrl: string // 头像地址

  @Column()
  hasPower: boolean // 是否拥有权限
}