import { NextRouter } from 'next/router'
import { Dispatch } from 'redux'
import { api } from '../../http/index'
import { UserActionType, UserActionEnum } from '../../types/user'
import {
  IState,
  IASYNCREGISTRATIONSTEP1,
  IASYNCREGISTRATIONSTEP2,
  IASYNCREGISTRATIONSTEP3,
} from '../../types/user'

// export const registrationTest = ({
//   router,
//   token,
// }: {
//   router: NextRouter
//   token: string
// }) => {
//   return async (dispatch: Dispatch<UserActionType>, getState: () => IState) => {
//     const state = getState()
//     // url transition with token
//     if (
//       token &&
//       (!state.auth.step || (state.auth.step && state.auth.step.step === 0))
//     ) {
//       const response = await api.post('registration-token', { token })
//       const { phone: phoneRes, verification: verificationRes } = response.data
//       if (phoneRes && !verificationRes) {
//         dispatch({
//           type: UserActionEnum.REGISTRATIONSTEP,
//           payload: { step: 1, phone: phoneRes },
//         })
//       }
//       if (phoneRes && verificationRes) {
//         dispatch({
//           type: UserActionEnum.REGISTRATIONSTEP,
//           payload: { step: 2, phone: phoneRes },
//         })
//       }
//     }
//   }
// }

export const registrationStep1 = ({
  router,
  phone,
  tokenReCaptha,
}: IASYNCREGISTRATIONSTEP1) => {
  return async (dispatch: Dispatch<UserActionType>, getState: () => IState) => {
    // formatting the phone
    let formatPhone = `${phone.replace(/[^0-9]/g, '')}`
    formatPhone =
      formatPhone[0] === '8' ? '+7' + formatPhone.slice(1) : formatPhone

    // validate to server
    try {
      const response = await api.post('/user-management/users/token', {
        phone: formatPhone,
        recaptcha: tokenReCaptha,
      })
      if (response.statusText === 'Created') {
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
