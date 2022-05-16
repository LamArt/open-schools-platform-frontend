import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import 'antd/dist/antd.css'
import { useSelectorTypes } from '../redux/tupesHook'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { UserActionEnum } from '../types/user'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const isAuth = useSelectorTypes(store => store.auth.auth)
  const router = useRouter()
  const dispath = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      if (router.asPath === "/auth") { 
        router.push('/')
      }
    } else if (isAuth && !token) { 
      dispath({type: UserActionEnum.ERRORLOGIN, payload: "localStorage token not exists"}) 
      router.push("/auth")
    } 
  },[isAuth])
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
