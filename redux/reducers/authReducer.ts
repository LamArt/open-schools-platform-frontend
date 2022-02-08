import { UserActionType, UserActionEnum, IUser } from '../../types/user'

const initialState = { auth: false }

const authReducer = (
  state = initialState,
  action: UserActionType
): IUser | null => {
  switch (action.type) {
    case UserActionEnum.LOGIN:
      return { auth: true }
    case UserActionEnum.LOGOUT:
      return { auth: false }
    case UserActionEnum.REGISTRATION:
      return { auth: false, registrationStep: action.payload }
    case UserActionEnum.ERRORLOGIN:
      return { auth: false, error: action.payload }
    case UserActionEnum.ERRORREGISTRATION:
      return { auth: false, error: action.payload }
    default:
      return state
  }
}

export default authReducer
