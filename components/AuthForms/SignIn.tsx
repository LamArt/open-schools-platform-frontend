import { Button, Checkbox } from 'antd'
import { useState } from 'react'
import FormWraper from '../FormWraper'
import InputPhone from '../InputPhone'

const SignIn: React.FC<{
  onFinish: (errorInfo: any) => void
}> = ({ onFinish }) => {
  const [togleRegistrCheckbox, setTogleRegistrCheckbox] = useState(true)
  return (
    <FormWraper
      onFinish={onFinish}
      title="Впервые в Schools.ai?"
      description="Моментальная регистрация"
    >
      <InputPhone />
      <Checkbox
        onChange={(e) => {
          setTogleRegistrCheckbox(!e.target.checked)
        }}
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

export default SignIn
