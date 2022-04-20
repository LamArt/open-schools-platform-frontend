import { NextRouter, withRouter } from 'next/router'
import { Dispatch } from 'redux'
import { api } from '../../http/index'
import { UserActionType, UserActionEnum } from '../../types/user'
import { IUser } from '../../types/user'

export const login = (
  router: NextRouter,
  userName: string,
  password: string
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
        router.push(`${oldUrl}`)
      } else {
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
