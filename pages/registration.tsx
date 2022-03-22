import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Form, Button } from 'antd'
import LayoutAuth from '../components/LayoutAuth'
import InputPhone from '../components/InputPhone'
import { useDispatch } from 'react-redux'
import { registrationStep } from '../redux/asyncActions/user'
import { useRouter } from 'next/router'

const Registration: NextPage = () => {
  const [form] = Form.useForm()
  const dispath = useDispatch()
  const router = useRouter()

  const onFinish = async (values: { phone: string }) => {
    const { phone } = values

    dispath(registrationStep(router, phone))
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
        <InputPhone />

        <Form.Item></Form.Item>
        <Button
          style={{ background: '#57BBCA', width: '100%' }}
          type="primary"
          htmlType="submit"
        >
          Зарегистрироваться
        </Button>
      </Form>
    </LayoutAuth>
  )
}

export default Registration
