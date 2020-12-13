export interface RepairerType{
  repairName: string
  repairType: number
  mobile: string
}
export type GetRepairer = {
  repairType?: number
}
export type DelRepairer = {
  id: number
}
export type Distribute = {
  repairNumber: string
  repairName: string
}