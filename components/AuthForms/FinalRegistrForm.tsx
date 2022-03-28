import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import FormWraper from '../FormWraper'
import InputPhone from '../InputPhone'

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

export default FinalRegistrForm
