import { verification } from './../asyncActions/user'
import { UserActionType, UserActionEnum, IUser } from '../../types/user'

const initialState: IUser = { auth: false }

const authReducer = (
  state = initialState,
  action: UserActionType
): IUser | null => {
  switch (action.type) {
    case UserActionEnum.LOGIN:
      return { ...state, auth: true }
    case UserActionEnum.LOGOUT:
      return { ...state, auth: false }
    case UserActionEnum.REGISTRATIONFINISH:
      return {
        auth: true,
      }
    case UserActionEnum.REGISTRATIONSTEP:
      return {
        ...state,
        step: {
          ...state.step,
          step: action.payload.step,
          ...(action.payload?.phone ? { phone: action.payload.phone } : {}),
        },
      }
    case UserActionEnum.ERRORLOGIN:
      return {
        ...state,
        auth: false,
        error: action.payload,
        verification: false,
      }
    case UserActionEnum.ERRORREGISTRATION:
      return {
        ...state,
        auth: false,
        error: action.payload,
        verification: false,
      }
    case UserActionEnum.VERIFICATION:
      return { ...state, verification: true, oldUrl: action.payload }
    default:
      return state
  }
}

export default authReducer
