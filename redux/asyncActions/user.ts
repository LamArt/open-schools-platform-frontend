import { NextRouter, withRouter } from 'next/router'
import { Dispatch } from 'redux'
import { api } from '../../http/index'
import { UserActionType, UserActionEnum } from '../../types/user'
import { IUser } from '../../types/user'

export const login = (
  userName: string,
  password: string,
  router: NextRouter
) => {
  return async (
    dispatch: Dispatch<UserActionType>,
    getState: () => { auth: IUser }
  ) => {
    try {
      const response = await api.post('auth', { userName, password })
      const { access, refresh } = response.data
      localStorage.setItem('access', access)
      localStorage.setItem('refresh', refresh)
      dispatch({ type: UserActionEnum.LOGIN })
      const oldUrl = getState().auth.oldUrl
      if (oldUrl) {
        console.log('1')
        router.push(`${oldUrl}`)
      } else {
        console.log('2')
        router.push('/')
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: UserActionEnum.ERRORLOGIN, payload: error })
      }
    }
  }
}

export const verification = (router: NextRouter) => {
  return async (
    dispatch: Dispatch<UserActionType>,
    getState: () => { auth: IUser }
  ) => {
    const auth = getState().auth.auth
    const acessToken = localStorage.getItem('access')
    const refreshToken = localStorage.getItem('refresh')
    if (!auth || (refreshToken && acessToken)) {
      dispatch({
        type: UserActionEnum.VERIFICATION,
        payload: router.asPath,
      })
      try {
        const response = await api.post('verification', {
          acessToken,
          refreshToken,
        })
        if (response.statusText !== 'OK') {
          throw response.data
        }
        dispatch({ type: UserActionEnum.LOGIN })
        if (router.asPath.search('/auth')) {
          router.push('/')
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch({ type: UserActionEnum.ERRORLOGIN, payload: error })
        }
        if (!router.asPath.search('/auth')) {
          router.push('/auth')
        }
      }
    }
  }
}

export const registrationTest = ({
  router,
  token,
}: {
  router: NextRouter
  token: string
}) => {
  return async (
    dispatch: Dispatch<UserActionType>,
    getState: () => { auth: IUser }
  ) => {
    const state = getState()
    // url transition with token
    if (
      token &&
      (!state.auth.step || (state.auth.step && state.auth.step.step === 0))
    ) {
      const response = await api.post('registration-token', { token })
      const { phone: phoneRes, verification: verificationRes } = response.data
      if (phoneRes && !verificationRes) {
        dispatch({
          type: UserActionEnum.REGISTRATIONSTEP,
          payload: { step: 1, phone: phoneRes },
        })
      }
      if (phoneRes && verificationRes) {
        dispatch({
          type: UserActionEnum.REGISTRATIONSTEP,
          payload: { step: 2, phone: phoneRes },
        })
      }
    }
  }
}

export const registrationStep1 = ({
  router,
  phone,
}: {
  router: NextRouter
  phone: string
}) => {
  return async (
    dispatch: Dispatch<UserActionType>,
    getState: () => { auth: IUser }
  ) => {
    const state = getState()
    const response = await api.post('registration')
    const { token } = response.data
    dispatch({
      type: UserActionEnum.REGISTRATIONSTEP,
      payload: { phone, step: 1 },
    })
    router.push(`/auth?token=${token}`)
  }
}

export const registrationStep2 = ({
  router,
  cod,
  token,
}: {
  router: NextRouter
  cod: String
  token: String
}) => {
  return async (
    dispatch: Dispatch<UserActionType>,
    getState: () => { auth: IUser }
  ) => {
    const state = getState()
    api.post('token', { token, cod })
    dispatch({
      type: UserActionEnum.REGISTRATIONSTEP,
      payload: { step: 2 },
    })
  }
}

export const registrationStep3 = ({ router }: { router: NextRouter }) => {
  return async (
    dispatch: Dispatch<UserActionType>,
    getState: () => { auth: IUser }
  ) => {
    const state = getState()
    dispatch({
      type: UserActionEnum.REGISTRATIONFINISH,
    })
  }
}
