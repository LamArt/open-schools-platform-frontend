import type { NextPage } from 'next'

import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useSelectorTypes } from '../redux/tupesHook'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  login,
  registrationStep1,
  registrationStep2,
  registrationStep3,
  registrationTest,
} from '../redux/asyncActions/user'
import LayoutAuth from '../components/LayoutAuth'
import FormWraper from '../components/FormWraper'
import InputPhone from '../components/InputPhone'

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

const LogIn: React.FC<{
  onFinish: (errorInfo: any) => void
}> = ({ onFinish }) => {
  return (
    <FormWraper title={'Авторизация'} onFinish={onFinish}>
      <InputPhone />
      <Form.Item
        name="password"
        style={{ marginBottom: '0.75em' }}
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите пароль!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <div style={{ marginTop: '1.5em' }}>
        <Button
          style={{
            background: '#57BBCA',
            width: '100%',
            maxWidth: 'min(191px, 50%)',
          }}
          type="primary"
          htmlType="submit"
        >
          Войти
        </Button>
        <Link href="/registration">
          <a style={{ color: '#57BBCA', paddingLeft: '24px' }}>
            Забыли пароль?
          </a>
        </Link>
      </div>
    </FormWraper>
  )
}

const SignIn: React.FC<{
  onFinish: (errorInfo: any) => void
}> = ({ onFinish }) => {
  const [togleRegistrCheckbox, setTogleRegistrCheckbox] = useState(true)
  return (
    <FormWraper
      onFinish={onFinish}
      title="Впервые в Schools.ai?"
      description="Моментальная регистрация"
    >
      <InputPhone />
      <Checkbox
        onChange={(e) => {
          setTogleRegistrCheckbox(!e.target.checked)
        }}
        value={togleRegistrCheckbox}
        style={{ marginBottom: '0.75em', fontSize: '1em' }}
      >
        Я согласен на{' '}
        <span style={{ color: '#57BBCA' }}>обработку персональных данных</span>
      </Checkbox>
      <Button
        style={{ background: '#57BBCA', width: '100%', marginTop: '1.5em' }}
        type="primary"
        htmlType="submit"
        disabled={togleRegistrCheckbox}
      >
        Зарегистрироваться
      </Button>
    </FormWraper>
  )
}

const SMSForm: React.FC<{
  onFinish: (errorInfo: any) => void
  phone: string
}> = ({ onFinish, phone }) => {
  const [showPhone, setShowPhone] = useState(false)
  const [timerFinal, setTimerFinal] = useState(false)
  const [cod, setCod] = useState('')

  const calcPhone = (phone: string, show: boolean) => {
    const prefix = phone[0] === '+' ? 2 : 1
    const chankPhone = phone.slice(7 + prefix, 10 + prefix)
    const phone1 = phone.slice(0, 7 + prefix)
    const phone2 = phone.slice(10 + prefix)
    return `${phone1}${show ? chankPhone : '***'}${phone2}`
  }

  return (
    <FormWraper onFinish={onFinish} title="Регистрация">
      <p style={{ fontSize: '1em' }}>
        Мы отправили код для подтверждения на номер <br />
        <span style={{ fontWeight: 'bold' }}>
          {calcPhone(phone, showPhone)} (
          <a
            onClick={(e) => {
              e.preventDefault()
              setShowPhone((e) => !e)
            }}
            style={{ color: 'rgba(87, 187, 202, 1)', fontWeight: 'normal' }}
          >
            {!showPhone ? 'показать' : 'скрыть'}
          </a>
          )
        </span>
        . <br /> Введите его в поле ниже.
      </p>
      <Form.Item
        name="sms"
        style={{ marginBottom: '0.75em' }}
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите код!',
          },
        ]}
      >
        <Input
          name="cod"
          value={cod}
          onChange={(el) => {
            if (/^[0-9][0-9][0-9][0-9]/.test(el.target.value)) {
              onFinish({ cod: el.target.value })
            }
            if (/^[0-9]?[0-9]?[0-9]?[0-9]?/.test(el.target.value)) {
              setCod(el.target.value)
            }
          }}
          placeholder="Код из SMS"
        />
      </Form.Item>
      <p
        onClick={() => {
          if (!timerFinal) {
          }
        }}
        style={{
          cursor: timerFinal ? 'pointer' : 'auto',
          color: 'rgba(87, 187, 202, 1)',
        }}
      >
        Отправить СМС-код ещё раз{' '}
        <span style={{ color: 'black' }}>
          <Timer onFinish={() => setTimerFinal(true)} />
        </span>
      </p>
    </FormWraper>
  )
}
const Timer: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [time, setTime] = useState(60)
  const calcTime = (time: number) => {
    let timeStr = time.toString()
    switch (timeStr.length) {
      case 1:
        return time <= 0 ? '00:00' : `00:0${timeStr}`
      case 2:
        return time < 60 ? `00:${timeStr}` : `01:00`
      default:
        return `00:00`
    }
  }
  useEffect(() => {
    const tick = () => {
      setTime((el) => --el)
      if (time >= 0) {
        setTimeout(tick, 1000)
      } else onFinish()
    }
    setTimeout(tick, 1000)
  }, [])

  return <>{calcTime(time)}</>
}

const FinalRegistrForm: React.FC<{
  onFinish: (errorInfo: any) => void
  phone: string
}> = ({ onFinish, phone }) => {
  return (
    <FormWraper title={'Регистрация'} onFinish={onFinish}>
      <InputPhone phone={phone} />
      <Form.Item
        name="user"
        style={{ marginBottom: '0.75em' }}
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите Ф. И. О.!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
          type="text"
          placeholder="Ф. И. О."
        />
      </Form.Item>
      <Form.Item
        name="password"
        style={{ marginBottom: '0.75em' }}
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите пароль!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item
        name="password2"
        style={{ marginBottom: '0.75em' }}
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите пароль!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }

              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              )
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.5)' }} />}
          type="password"
          placeholder="Повторите пароль"
        />
      </Form.Item>
      <Button
        style={{ background: '#57BBCA', width: '100%', marginTop: '1.5em' }}
        type="primary"
        htmlType="submit"
      >
        Зарегистрироваться
      </Button>
    </FormWraper>
  )
}

export default Auth
