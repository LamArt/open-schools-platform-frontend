import { NextRouter } from 'next/router'
import { type } from 'os'

// Actions types
export enum UserActionEnum {
  LOGOUT = 'LOG_OUT',
  LOGIN = 'LOG_IN',
  REGISTRATIONFINISH = 'REGISTRATIONFINISH',
  REGISTRATIONSTEP1 = 'REGISTRATIONSTEP1',
  REGISTRATIONSTEP2 = 'REGISTRATIONSTEP2',
  REGISTRATIONSTEP3 = 'REGISTRATIONSTEP3',
  ERRORREGISTRATION = 'ERROR_REGISTRATION',
  ERRORLOGIN = 'ERROR_LOGIN',
  VERIFICATION = 'VERIFICATION',
}

interface IREGISTRATIONSTEP1 {
  type: UserActionEnum.REGISTRATIONSTEP1
  payload: { phone: string; token: string }
}
interface IREGISTRATIONSTEP2 {
  type: UserActionEnum.REGISTRATIONSTEP2
}
interface IREGISTRATIONSTEP3 {
  type: UserActionEnum.REGISTRATIONSTEP3
}
interface IVERIFICATION {
  type: UserActionEnum.VERIFICATION
  payload?: string
}
interface ILOGIN {
  type: UserActionEnum.LOGIN
}
interface ILOGOUT {
  type: UserActionEnum.LOGOUT
}
interface IREGISTRATIONFINISH {
  type: UserActionEnum.REGISTRATIONFINISH
}
interface IERRORREGISTRATION {
  type: UserActionEnum.ERRORREGISTRATION
  payload: string
}
interface IERRORLOGIN {
  type: UserActionEnum.ERRORLOGIN
  payload: string
}
export type UserActionType =
  | ILOGIN
  | ILOGOUT
  | IREGISTRATIONFINISH
  | IERRORREGISTRATION
  | IERRORLOGIN
  | IVERIFICATION
  | IREGISTRATIONSTEP1
  | IREGISTRATIONSTEP2
  | IREGISTRATIONSTEP3

// Asynk actions type registration

export interface IASYNCREGISTRATIONSTEP1 {
  router: NextRouter
  phone: string
  tokenReCaptha: string
}
export interface IASYNCREGISTRATIONSTEP2 {
  otp: string
}
export interface IASYNCREGISTRATIONSTEP3 {
  router: NextRouter
  name: string
  password: string
}
// Asynk actions type logIn
export interface IASYNCLOGIN {
  router: NextRouter
  phone: string
  password: string
}

//State
export interface IUser {
  auth: boolean
  step?: { step: number; phone?: string; token?: string }
  errorSignIn?: string
  errorLogIn?: string
  verification?: boolean
  oldUrl?: string
}

export interface IState {
  auth: IUser
}
