import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Report {
  @PrimaryGeneratedColumn() 
  id: number

  @Column() 
  userName: string  // 用户名

  @Column() 
  faultType: number  // 故障类型 1-供水 2-电力 3-其他

  @Column()
  faultDescription: string    // 故障描述

  @Column()
  faultStatus: number // 故障状态 1-未受理 2-处理中 3-已解决

  @Column()
  repairEvaluate: number // 评价

  @Column()
  repairName: string // 维修员

  @Column()
  date: string // 日期

  @Column()
  repairNumber: string // 单号

  @Column()
  address: string // 地址

  @Column()
  mobile: string // 电话
}