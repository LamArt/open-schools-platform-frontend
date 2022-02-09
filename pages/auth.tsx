import type { NextPage } from 'next'
import { Col, Layout, Row } from 'antd'
import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/asyncActions/user'
import Logo from '../components/Logo'
import { useRouter } from 'next/router'
import FormWraper from '../components/formWraper'
import Image from 'next/image'
import mainImg from '../assets/common/pictures/authImg.png'

const { Header, Footer, Content } = Layout

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
    <Layout
      style={{ minHeight: '100vh', maxWidth: '1280px', margin: '0 auto' }}
    >
      <Header style={{ background: 'white' }}>
        <Logo />
      </Header>
      <Content style={{ background: 'white' }}>
        <Row justify="start" align="middle" gutter={[20, 20]}>
          <Col span={14}>
            <div style={{ zIndex: 1, position: 'relative' }}>
              <Image
                layout="responsive"
                width="1024px"
                height="768px"
                src={mainImg.src}
                alt="background image"
              />
            </div>
          </Col>
          <Col span={1}></Col>
          <Col span={7}>
            <FormWraper>
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
                    style={{ display: 'block' }}
                    type="primary"
                    htmlType="submit"
                  >
                    Войти
                  </Button>
                  Или
                  <Link href="/registration">
                    <a> Зарегистриуйтесь</a>
                  </Link>
                </Form.Item>
              </Form>
            </FormWraper>
          </Col>
        </Row>
      </Content>
      <Footer
        style={{ background: 'white', textAlign: 'center', color: '#757474' }}
      >
        Созданно с любовью в ЛамАрте
      </Footer>
    </Layout>
  )
}

export default Auth
