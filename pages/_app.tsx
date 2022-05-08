import React, { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { wrapper } from '../redux/store'
import 'antd/dist/antd.css'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
