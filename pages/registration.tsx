import React from 'react'
import type { NextPage } from 'next'
import { Form, Input, Button } from 'antd'
import LayoutAuth from '../components/LayoutAuth'

import { UserOutlined, LockOutlined } from '@ant-design/icons'

const Registration: NextPage = () => {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    console.log(values)
  }

  return (
    <LayoutAuth>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        size="middle"
        labelAlign="left"
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваш логин',
              whitespace: true,
            },
          ]}
        >
          <Input
            placeholder="Логин"
            prefix={<UserOutlined className="site-form-item-icon" />}
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
          hasFeedback
        >
          <Input.Password
            placeholder="Пароль"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите пароль!',
            },
          ]}
        >
          <Input.Password
            placeholder="Повторите пароль"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 10 }}>
          <Button
            style={{ background: '#57BBCA' }}
            type="primary"
            htmlType="submit"
          >
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </LayoutAuth>
  )
}

export default Registration
