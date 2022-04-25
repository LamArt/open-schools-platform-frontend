import type { NextPage } from 'next'
import React, { useEffect, useRef } from 'react'
import { useSelectorTypes } from '../redux/tupesHook'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  registrationStep2,
  registrationStep3,
} from '../redux/asyncActions/registration'
import LayoutAuth from '../components/LayoutAuth'
import {
  LogIn,
  SMSForm,
  FinalRegistrForm,
  SignIn,
} from '../components/AuthForms'
import { initializeApp } from 'firebase/app'

const Auth: NextPage = () => {
  const dispath = useDispatch()
  const router = useRouter()

  const appFirebase = useRef(true)
  if (appFirebase.current) {
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_apiKey,
      authDomain: process.env.NEXT_PUBLIC_authDomain,
      projectId: process.env.NEXT_PUBLIC_projectId,
      storageBucket: process.env.NEXT_PUBLIC_storageBucket,
      messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
      appId: process.env.NEXT_PUBLIC_appId,
      measurementId: process.env.NEXT_PUBLIC_measurementId,
    })
    appFirebase.current = false
  }

  const phone = useSelectorTypes((state) => state.auth.step?.phone)

  // useEffect(() => {
  //   if (router.query.token && step === 0) {
  //     dispath(registrationTest({ router, token: `${router.query.token}` }))
  //   }
  // })

  const step = useSelectorTypes((state) =>
    state.auth.step ? state.auth.step.step : 1
  )

  switch (step) {
    case 1:
      return (
        <LayoutAuth>
          <LogIn />
          <SignIn />
        </LayoutAuth>
      )
    case 2:
      return (
        <LayoutAuth>
          <SMSForm
            phone={`${phone}`}
            onFinish={({ otp }) => {
              dispath(registrationStep2({ otp }))
            }}
          />
        </LayoutAuth>
      )
    default:
      return (
        <LayoutAuth>
          <FinalRegistrForm
            phone={`${phone}`}
            onFinish={({ password, name }) => {
              dispath(registrationStep3({ router, name, password }))
            }}
          />
        </LayoutAuth>
      )
  }
}

export default Auth
