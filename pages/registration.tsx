import React from 'react'
import type { NextPage } from 'next'
import { Form, Input, Button } from 'antd'

const Registration: NextPage = () => {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    console.log(values)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        size="middle"
        labelAlign="left"
        style={{ minWidth: '65vh' }}
      >
        <Form.Item
          name="username"
          label="Логин"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите ваш логин',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="e-mail"
          rules={[
            {
              type: 'email',
              message: 'Введите корректный E-mail!',
            },
            {
              required: true,
              message: 'Пожалуйста введите свой E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите пароль!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Повторите пароль"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите пароль!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 8, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Регистрация
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Registration
