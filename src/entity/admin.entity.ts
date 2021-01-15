import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class Admin {
  @PrimaryGeneratedColumn() 
  id: number

  @Column() 
  userName: string

  @Column()
  password: string
}