import { Dispatch } from 'redux'
import { api } from '../../http/index'
import { UserActionType, UserActionEnum, IASYNCLOGIN } from '../../types/user'

export const login = ({ router, phone, password }: IASYNCLOGIN) => {
  return async (dispatch: Dispatch<UserActionType>) => {
    try {
      let formatPhone = `${phone.replace(/[^0-9]/g, '')}`
      formatPhone =
        formatPhone[0] === '8' ? formatPhone : `+7${formatPhone.slice(1)}`
      const response = await api.post('/user-management/auth/jwt/login/', {
        phone: formatPhone,
        password,
      })
      const { token } = response.data
      localStorage.setItem('token', token)
      dispatch({ type: UserActionEnum.LOGIN })
      router.push('/')
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: UserActionEnum.ERRORLOGIN, payload: error.message })
      }
    }
  }
}
