import React from 'react'
import type { NextPage } from 'next'
import { Form, Input, Button } from 'antd'
import LayoutAuth from '../components/LayoutAuth'

const Registration: NextPage = () => {
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    console.log(values)
  }

  return (
    <LayoutAuth type="registration">
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
        style={{ minWidth: '430px', overflow: 'hidden' }}
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
