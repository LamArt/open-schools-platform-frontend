import { Form, Input } from 'antd'
import React from 'react'
import { PhoneOutlined } from '@ant-design/icons'
import MaskedInput from 'antd-mask-input'

interface IINPUTPHONECONTROL {
  disabled?: false
  onChange: (phone: string) => void
}
interface IINPUTPHONEDISABLED {
  disabled: true
  phone: string
}
type INPUTPHONE = IINPUTPHONEDISABLED | IINPUTPHONECONTROL

export default function InputPhone(props: INPUTPHONE) {
  const phoneMask = '+7 (000) 000 00-00'
  const mask = React.useMemo(
    () => [
      {
        mask: phoneMask,
        lazy: true,
      },
    ],
    []
  )

  return (
    <Form.Item
      style={{ width: '100%', marginBottom: '0.75em' }}
      name="phone"
      rules={[
        {
          required: true,
          message: 'Пожалуйста введите номер!',
        },
        { min: 18, message: 'Пожалуйста введите номер!' },
      ]}
    >
      <MaskedInput
        mask={mask}
        type="tel"
        onChange={(el) =>
          props.disabled ? () => {} : props.onChange(el.target.value)
        }
        style={{ width: '100%' }}
        placeholder={props.disabled ? props.phone : 'Номер телефона'}
        disabled={props.disabled}
        prefix={<PhoneOutlined />}
      />
    </Form.Item>
  )
}
