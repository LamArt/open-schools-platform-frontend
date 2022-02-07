export enum UserActionEnum {
  LOGOUT = 'LOG_OUT',
  LOGIN = 'LOG_IN',
  REGISTRATION = 'REGISTRATION',
}

interface ILOGIN {
  type: UserActionEnum.LOGIN
}

interface LOGOUT {
  type: UserActionEnum.LOGOUT
}

interface REGISTRATION {
  type: UserActionEnum.REGISTRATION
}

export interface IUser {
  accessToken: string
  refreshToken: string
}

export type UserActionType = ILOGIN | LOGOUT | REGISTRATION
