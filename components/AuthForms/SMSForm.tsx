import { Form, Input } from 'antd'
import { useState } from 'react'
import FormWraper from '../FormWraper'
import Timer from './Timer'

const SMSForm: React.FC<{
  onFinish: (errorInfo: any) => void
  phone: string
}> = ({ onFinish, phone }) => {
  const [showPhone, setShowPhone] = useState(false)
  const [timerFinal, setTimerFinal] = useState(false)
  const [cod, setCod] = useState('')

  const calcPhone = (phone: string, show: boolean) => {
    const prefix = phone[0] === '+' ? 2 : 1
    const chankPhone = phone.slice(7 + prefix, 10 + prefix)
    const phone1 = phone.slice(0, 7 + prefix)
    const phone2 = phone.slice(10 + prefix)
    return `${phone1}${show ? chankPhone : '***'}${phone2}`
  }

  return (
    <FormWraper onFinish={onFinish} title="Регистрация">
      <p style={{ fontSize: '1em' }}>
        Мы отправили код для подтверждения на номер <br />
        <span style={{ fontWeight: 'bold' }}>
          {calcPhone(phone, showPhone)} (
          <a
            onClick={(e) => {
              e.preventDefault()
              setShowPhone((e) => !e)
            }}
            style={{ color: 'rgba(87, 187, 202, 1)', fontWeight: 'normal' }}
          >
            {!showPhone ? 'показать' : 'скрыть'}
          </a>
          )
        </span>
        . <br /> Введите его в поле ниже.
      </p>
      <Form.Item
        name="sms"
        style={{ marginBottom: '0.75em' }}
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите код!',
          },
        ]}
      >
        <Input
          name="cod"
          value={cod}
          onChange={(el) => {
            if (/^[0-9][0-9][0-9][0-9]/.test(el.target.value)) {
              onFinish({ cod: el.target.value })
            }
            if (/^[0-9]?[0-9]?[0-9]?[0-9]?/.test(el.target.value)) {
              setCod(el.target.value)
            }
          }}
          placeholder="Код из SMS"
        />
      </Form.Item>
      <p
        onClick={() => {
          if (!timerFinal) {
          }
        }}
        style={{
          cursor: timerFinal ? 'pointer' : 'auto',
          color: 'rgba(87, 187, 202, 1)',
        }}
      >
        Отправить СМС-код ещё раз{' '}
        <span style={{ color: 'black' }}>
          <Timer onFinish={() => setTimerFinal(true)} />
        </span>
      </p>
    </FormWraper>
  )
}

export default SMSForm
