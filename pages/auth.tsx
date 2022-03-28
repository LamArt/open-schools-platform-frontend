import type { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useSelectorTypes } from '../redux/tupesHook'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  login,
  registrationStep1,
  registrationStep2,
  registrationTest,
} from '../redux/asyncActions/user'
import LayoutAuth from '../components/LayoutAuth'
import {
  LogIn,
  SMSForm,
  FinalRegistrForm,
  SignIn,
} from '../components/AuthForms'

const Auth: NextPage = () => {
  const dispath = useDispatch()
  const router = useRouter()

  const phone = useSelectorTypes((state) => state.auth.step?.phone)

  useEffect(() => {
    if (router.query.token && step === 0) {
      dispath(registrationTest({ router, token: `${router.query.token}` }))
    }
  })

  const onFinishLogIn = ({
    password,
    username,
  }: {
    password: string
    username: string
  }) => {
    dispath(login(password, username, router))
  }

  const step = useSelectorTypes((state) =>
    state.auth.step ? state.auth.step.step : 0
  )

  const onFinishSignInStep0 = ({ phone }: { phone: string }) => {
    dispath(registrationStep1({ router, phone }))
  }
  const onFinishSignInStep1 = ({ cod }: { cod: String }) => {
    dispath(registrationStep2({ cod, router, token: `${router.query.token}` }))
  }
  const onFinishSignInStep2 = ({
    password,
    username,
  }: {
    password: string
    username: string
  }) => {
    dispath(login(password, username, router))
  }

  switch (step) {
    case 0:
      return (
        <LayoutAuth>
          <LogIn onFinish={onFinishLogIn} />
          <SignIn onFinish={onFinishSignInStep0} />
        </LayoutAuth>
      )
    case 1:
      return (
        <LayoutAuth>
          <SMSForm phone={`${phone}`} onFinish={onFinishSignInStep1} />
        </LayoutAuth>
      )
    default:
      return (
        <LayoutAuth>
          <FinalRegistrForm phone={`${phone}`} onFinish={onFinishSignInStep2} />
        </LayoutAuth>
      )
  }
}

export default Auth
