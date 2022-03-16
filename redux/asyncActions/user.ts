import { NextRouter, withRouter } from 'next/router'
import { Dispatch } from 'redux'
import { api } from '../../http/index'
import { UserActionType, UserActionEnum } from '../../types/user'
import { IUser } from '../../types/user'

export const noRedirect = ['/auth']

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
        router.push(oldUrl)
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
  return async (dispatch: Dispatch<UserActionType>) => {
    dispatch({ type: UserActionEnum.VERIFICATION })
    try {
      const acessToken = localStorage.getItem('access')
      const refreshToken = localStorage.getItem('refresh')
      if (!acessToken || !refreshToken) {
        throw new Error(`${acessToken ? 'acess' : 'refresh'} token not found`)
      }
      const response = await api.post('verification', {
        acessToken,
        refreshToken,
      })
      if (response.statusText !== 'OK') {
        throw response.data
      }
      dispatch({ type: UserActionEnum.LOGIN })
      if (router.asPath === '/auth') {
        router.push('/')
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: UserActionEnum.ERRORLOGIN, payload: error })
      }
      if (!noRedirect.map((el) => el.includes(router.asPath))) {
        router.push('/auth')
      }
    }
  }
}

export const registrationStep = (router: NextRouter, phone?: string) => {
  return async (
    dispatch: Dispatch<UserActionType>,
    getState: () => { auth: IUser }
  ) => {
    try {
      const response = await api.post('registration', phone ? { phone } : {})
      if (response.statusText !== 'OK') {
        throw new Error(response.data.toString())
      }
      dispatch({ type: UserActionEnum.REGISTRATIONSTEP })
      let step = getState().auth.step?.number
      router.push(`/registration/${++step}`)
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: UserActionEnum.ERRORREGISTRATION, payload: error })
      }
    }
  }
}
