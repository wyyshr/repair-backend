export interface UserType{
  userName: string
  identity: number
  gender: number
  avatarUrl: string
}
export type FillInfo = {
  userName: string
  mobile: string
  address: string
}
export type GetUserInfo = {
  userName: string
}