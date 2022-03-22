import { login } from './../redux/asyncActions/user'
export enum UserActionEnum {
  LOGOUT = 'LOG_OUT',
  LOGIN = 'LOG_IN',
  REGISTRATIONFINISH = 'REGISTRATIONFINISH',
  REGISTRATIONSTEP = 'REGISTRATIONSTEP',
  ERRORREGISTRATION = 'ERROR_REGISTRATION',
  ERRORLOGIN = 'ERROR_LOGIN',
  VERIFICATION = 'VERIFICATION',
}

interface REGISTRATIONSTEP {
  type: UserActionEnum.REGISTRATIONSTEP
  payload: { phone?: String; step: Number }
}
interface IVERIFICATION {
  type: UserActionEnum.VERIFICATION
  payload?: String
}
interface ILOGIN {
  type: UserActionEnum.LOGIN
}
interface LOGOUT {
  type: UserActionEnum.LOGOUT
}
interface REGISTRATIONFINISH {
  type: UserActionEnum.REGISTRATIONFINISH
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
  step?: { step: Number; phone?: String }
  error?: Error
  verification?: boolean
  oldUrl?: String
}

export interface IState {
  auth: IUser
}

export type UserActionType =
  | ILOGIN
  | LOGOUT
  | REGISTRATIONFINISH
  | ERRORREGISTRATION
  | ERRORLOGIN
  | IVERIFICATION
  | REGISTRATIONSTEP
