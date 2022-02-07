import { Dispatch } from 'redux'
import { api } from '../../http/index'
import { UserActionType, UserActionEnum } from '../../types/user'

export const login = (userName: string, password: string) => {
  return async (dispatch: Dispatch<UserActionType>) => {
    try {
      const response = await api.post('auth', { userName, password })
      dispatch({ type: UserActionEnum.LOGIN })
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: UserActionEnum.ERRORLOGIN, payload: error })
      }
    }
  }
}
