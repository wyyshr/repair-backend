import { type } from "os"

export interface ReportType{
  userName: string
  faultType: number
  faultDescription: string
  date: string
  address: string
  mobile: string
}
export type GetReportInfo = {
  userName?: string
  faultStatus?: number
  repairNumber?: string
}
export type Evaluate = {
  repairNumber: string
  repairEvaluate: number
}