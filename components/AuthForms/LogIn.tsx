import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import FormWraper from '../FormWraper'
import InputPhone from '../InputPhone'
import { LockOutlined } from '@ant-design/icons'
import { login } from '../../redux/asyncActions/user'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../types/user'
import { useState } from 'react'

const LogIn: React.FC = () => {
  const router = useRouter()
  const dispath = useDispatch()
  const error = useSelector((state: IState) => state.auth.errorLogIn)

  const onFinish = ({
    password,
    phone,
  }: {
    password: string
    phone: string
  }) => {
    dispath(login({ password, phone, router }))
  }

  return (
    <FormWraper title={'Авторизация'} onFinish={onFinish}>
      <InputPhone onChange={() => {}} />
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
      {error ? (
        <span
          style={{ color: '#ff4d4f', fontSize: '14px', lineHeight: '1.5715' }}
        >
          Аккаунта с таким номером телефона и паролем не существует
        </span>
      ) : (
        ''
      )}
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

export default LogIn
