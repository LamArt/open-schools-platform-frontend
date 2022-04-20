import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import FormWraper from '../FormWraper'
import InputPhone from '../InputPhone'
import { LockOutlined } from '@ant-design/icons'
import { logIn } from '../../redux/asyncActions/user'

const LogIn: React.FC = () => {
  const onFinish = ({
    password,
    username,
  }: {
    password: string
    username: string
  }) => {
    // dispath(login(password, username, router))
  }

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

export default LogIn
