import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { verification } from '../redux/asyncActions/user'
import { IUser } from '../types/user'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const auth = useSelector((state: { auth: IUser }) => state!.auth)
  useEffect(() => {
    dispatch(verification(router))
  }, [])
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default wrapper.withRedux(WrappedApp)
