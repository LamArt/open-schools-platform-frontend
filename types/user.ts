import { login } from './../redux/asyncActions/user'
export enum UserActionEnum {
  LOGOUT = 'LOG_OUT',
  LOGIN = 'LOG_IN',
  REGISTRATION = 'REGISTRATION',
  ERRORREGISTRATION = 'ERROR_REGISTRATION',
  ERRORLOGIN = 'ERROR_LOGIN',
  VERIFICATION = 'VERIFICATION',
}
interface IVERIFICATION {
  type: UserActionEnum.VERIFICATION
}
interface ILOGIN {
  type: UserActionEnum.LOGIN
}
interface LOGOUT {
  type: UserActionEnum.LOGOUT
}
interface REGISTRATION {
  type: UserActionEnum.REGISTRATION
  payload: number
}
interface ERRORREGISTRATION {
  type: UserActionEnum.ERRORREGISTRATION
  payload: Error
}
interface ERRORLOGIN {
  type: UserActionEnum.ERRORLOGIN
  payload: Error
}

export interface IUser {
  auth: boolean
  registrationStep?: number
  error?: Error
  verification?: boolean
  oldUrl?: String
}

export type UserActionType =
  | ILOGIN
  | LOGOUT
  | REGISTRATION
  | ERRORREGISTRATION
  | ERRORLOGIN
  | IVERIFICATION
