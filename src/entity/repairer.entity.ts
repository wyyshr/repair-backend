import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Repairer {
  @PrimaryGeneratedColumn() 
  id: number

  @Column() 
  repairName: string  // 维修员

  @Column() 
  repairType: number  // 维修类型 1-供水 2-电力 3-其他

  @Column()
  mobile: string    // 手机号
}