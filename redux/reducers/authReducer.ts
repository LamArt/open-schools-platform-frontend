import { UserActionType, UserActionEnum, IUser } from '../../types/user'

const initialState = null

const authReducer = (
  state = initialState,
  action: UserActionType
): IUser | null => {
  switch (action.type) {
    case UserActionEnum.LOGIN:
      return {
        accessToken: 'string',
        refreshToken: 'string',
      }
    case UserActionEnum.LOGOUT:
      return {
        accessToken: 'string',
        refreshToken: 'string',
      }
    case UserActionEnum.REGISTRATION:
      return {
        accessToken: 'string',
        refreshToken: 'string',
      }
    default:
      return state
  }
}

export default authReducer
