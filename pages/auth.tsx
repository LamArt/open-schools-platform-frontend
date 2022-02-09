import type { NextPage } from 'next'

import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { login } from '../redux/asyncActions/user'
import LayoutAuth from '../components/LayoutAuth'

const Auth: NextPage = () => {
  const dispath = useDispatch()
  const router = useRouter()

  const onFinish = (values: { password: string; username: string }) => {
    const { password, username } = values

    dispath(login(password, username, router))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <LayoutAuth>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите логин!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
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

        <Form.Item>
          <Button
            style={{ display: 'block', background: '#57BBCA', width: '100%' }}
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
          Или
          <Link href="/registration">
            <a style={{ color: '#57BBCA' }}> Зарегистриуйтесь</a>
          </Link>
        </Form.Item>
      </Form>
    </LayoutAuth>
  )
}

export default Auth
