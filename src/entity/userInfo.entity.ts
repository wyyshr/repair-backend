import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn() 
  id: number

  @Column() 
  userName: string  // 用户名

  @Column()
  mobile: string    // 手机号

  @Column()
  address: string   // 地址
}