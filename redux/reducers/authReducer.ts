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
      return {auth: false }
    case UserActionEnum.REGISTRATIONFINISH:
      return {
        auth: true,
      }
    case UserActionEnum.REGISTRATIONSTEP1:
      return {
        ...state,
        step: {
          ...state.step,
          step: 2,
          phone: action.payload.phone,
          token: action.payload.token,
        },
      }
    case UserActionEnum.REGISTRATIONSTEP2:
      return {
        ...state,
        step: {
          ...state.step,
          step: 3,
        },
      }
    case UserActionEnum.REGISTRATIONSTEP3:
      return {
        auth: true,
      }
    case UserActionEnum.ERRORLOGIN:
      return {
        ...state,
        auth: false,
        errorLogIn: action.payload,
        verification: false,
      }
    case UserActionEnum.ERRORREGISTRATION:
      return {
        ...state,
        auth: false,
        errorSignIn: action.payload,
        verification: false,
      }
    case UserActionEnum.VERIFICATION:
      return { ...state, verification: true, oldUrl: action.payload }
    default:
      return state
  }
}

export default authReducer
