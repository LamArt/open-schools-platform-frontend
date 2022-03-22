import type { NextPage } from 'next'

import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { login } from '../redux/asyncActions/user'
import LayoutAuth from '../components/LayoutAuth'
import FormWraper from '../components/FormWraper'
import InputPhone from '../components/InputPhone'

const Auth: NextPage = () => {
  const dispath = useDispatch()
  const router = useRouter()

  const onFinishLogIn = (values: { password: string; username: string }) => {
    const { password, username } = values

    dispath(login(password, username, router))
  }

  const onFinishSignIn = (values: { password: string; username: string }) => {
    const { password, username } = values

    dispath(login(password, username, router))
  }

  /* <LogIn onFinish={onFinishLogIn} />
      <SignIn onFinish={onFinishSignIn} /> 
       <FinalRegistrForm onFinish={onFinishLogIn} />
      <SMSForm phone="+79000285080" onFinish={onFinishLogIn} />*/

  return (
    <LayoutAuth>
      <FinalRegistrForm onFinish={onFinishLogIn} />
    </LayoutAuth>
  )
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
          prefix={<LockOutlined className="site-form-item-icon" />}
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
  const [togleRegistrCheckbox, setTogleRegistrCheckbox] = useState(false)
  return (
    <FormWraper
      onFinish={onFinish}
      title="Впервые в Schools.ai?"
      description="Моментальная регистрация"
    >
      <InputPhone />
      <Checkbox
        onChange={(e) => setTogleRegistrCheckbox(e.target.value)}
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

  const calcPhone = (phone: string, show: boolean) => {
    phone = phone.slice(phone[0] === '+' ? 2 : 1)
    let phone1 = phone.slice(0, 3)
    let phone2 = phone.slice(3, 6)
    let phone3 = phone.slice(6, 8)
    let phone4 = phone.slice(8, 10)
    return `+7 (${phone1}) ${show ? phone2 : '***'} ${phone3}-${phone4}`
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
        <Input placeholder="Код из SMS" />
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
    console.log(time < 60, timeStr.length)
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
}> = ({ onFinish }) => {
  return (
    <FormWraper title={'Регистрация'} onFinish={onFinish}>
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
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item
        name="password2"
        style={{ marginBottom: '0.75em' }}
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите пароль!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
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
