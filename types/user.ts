import { Url } from 'url'
import { login } from './../redux/asyncActions/user'
export enum UserActionEnum {
  LOGOUT = 'LOG_OUT',
  LOGIN = 'LOG_IN',
  REGISTRATION = 'REGISTRATION',
  REGISTRATIONSTEP = 'REGISTRATIONSTEP',
  ERRORREGISTRATION = 'ERROR_REGISTRATION',
  ERRORLOGIN = 'ERROR_LOGIN',
  VERIFICATION = 'VERIFICATION',
}

interface REGISTRATIONSTEP {
  type: UserActionEnum.REGISTRATIONSTEP
  payload?: String
}
interface IVERIFICATION {
  type: UserActionEnum.VERIFICATION
  payload?: URL
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
  step?: { number: Number; phone?: String }
  error?: Error
  verification?: boolean
  oldUrl?: URL
}

export type UserActionType =
  | ILOGIN
  | LOGOUT
  | REGISTRATION
  | ERRORREGISTRATION
  | ERRORLOGIN
  | IVERIFICATION
  | REGISTRATIONSTEP
