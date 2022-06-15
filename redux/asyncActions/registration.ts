import { Dispatch } from 'redux'
import { api } from '../../http/index'
import { UserActionType, UserActionEnum } from '../../types/user'
import {
  IASYNCREGISTRATIONSTEP1,
  IASYNCREGISTRATIONSTEP2,
  IASYNCREGISTRATIONSTEP3,
} from '../../types/user'
import { RootState as IState } from '../../redux/reducers/rootReducer'

export const registrationStep1 = ({
  router,
  phone,
  tokenReCaptha,
}: IASYNCREGISTRATIONSTEP1) => {
  return async (dispatch: Dispatch<UserActionType>, getState: () => IState) => {
    // formatting the phone
    let formatPhone = `${phone.replace(/[^0-9]/g, '')}`
    formatPhone =
      formatPhone[0] === '8' ? formatPhone : `+7${formatPhone.slice(1)}`

    // validate to server
    try {
      const response = await api.post('/user-management/users/token', {
        phone: formatPhone,
        recaptcha: tokenReCaptha,
      })
      if (response.statusText === 'Created' || 'Ok') {
        dispatch({
          type: UserActionEnum.REGISTRATIONSTEP1,
          payload: { phone, token: response.data.token },
        })
        router.push(`/auth?token=${response.data.token}`)
      } else {
        throw new Error(response.statusText)
      }
    } catch (error) {
      dispatch({
        type: UserActionEnum.ERRORREGISTRATION,
        payload:
          typeof error === 'string'
            ? error
            : error instanceof Error
            ? error.message
            : '',
      })
    }
  }
}

export const registrationStep2 = ({ otp }: IASYNCREGISTRATIONSTEP2) => {
  return async (dispatch: Dispatch<UserActionType>, getState: () => IState) => {
    const { auth } = getState()
    try {
      if (!auth.step?.token) throw new Error('token is empty!')
      const token = auth.step?.token
      const response = await api.post('/user-management/users/token/verify', {
        otp,
        token,
      })
      if ((response.statusText = 'Ok')) {
        dispatch({
          type: UserActionEnum.REGISTRATIONSTEP2,
        })
      }
    } catch (error) {
      dispatch({
        type: UserActionEnum.ERRORREGISTRATION,
        payload:
          typeof error === 'string'
            ? error
            : error instanceof Error
            ? error.message
            : '',
      })
    }
  }
}

export const registrationStep3 = ({
  router,
  name,
  password,
}: IASYNCREGISTRATIONSTEP3) => {
  return async (dispatch: Dispatch<UserActionType>, getState: () => IState) => {
    const { auth } = getState()
    try {
      if (!auth.step?.token) throw new Error('token is empty!')
      const token = auth.step?.token
      const response = await api.post('/user-management/users/', {
        name,
        token,
        password,
        password_confirm: password,
      })
      if ((response.statusText = 'Ok')) {
        dispatch({
          type: UserActionEnum.REGISTRATIONSTEP3,
        })
      }
      router.push('/')
    } catch (error) {
      dispatch({
        type: UserActionEnum.ERRORREGISTRATION,
        payload:
          typeof error === 'string'
            ? error
            : error instanceof Error
            ? error.message
            : '',
      })
    }
  }
}
