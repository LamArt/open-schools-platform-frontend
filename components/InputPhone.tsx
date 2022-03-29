import { Form, Input } from 'antd'
import React from 'react'
import { PhoneOutlined } from '@ant-design/icons'

export default function InputPhone({ phone = '' }) {
  let getInputNumbersValue = function (input: string) {
    // Return stripped input value — just numbers
    return input.replace(/\D/g, '')
  }

  let onPhonePaste = function (e: React.FormEvent<HTMLInputElement>) {
    let input = e.currentTarget,
      inputNumbersValue = getInputNumbersValue(input.value)
    let pasted = e.clipboardData || window.clipboardData
    if (pasted) {
      let pastedText = pasted.getData('Text')
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue
        return
      }
    }
  }

  let onPhoneInput = function (e: React.FormEvent<HTMLInputElement>) {
    let input = e.currentTarget,
      inputNumbersValue = getInputNumbersValue(input.value),
      selectionStart = input.selectionStart,
      formattedInputValue = ''

    if (!inputNumbersValue) {
      return (input.value = '')
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (input.value && /\D/g.test(input.value)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue
      }
      return
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == '9')
        inputNumbersValue = '7' + inputNumbersValue
      let firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7'
      formattedInputValue = input.value = firstSymbols + ' '
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4)
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7)
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9)
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11)
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16)
    }
    input.value = formattedInputValue
  }
  let onPhoneKeyDown = function (e: React.KeyboardEvent<HTMLInputElement>) {
    // Clear input after remove last symbol
    let inputValue = e.currentTarget.value.replace(/\D/g, '')
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.currentTarget.value = ''
    }
  }
  return (
    <Form.Item
      style={{ width: '100%', marginBottom: '0.75em' }}
      name="phone"
      rules={[
        {
          required: phone === '',
          message: 'Пожалуйста введите ваш номер телефона',
          whitespace: true,
        },
      ]}
    >
      <Input
        type="tel"
        style={{ width: '100%' }}
        onInput={onPhoneInput}
        onKeyDown={onPhoneKeyDown}
        onPaste={onPhonePaste}
        placeholder={phone === '' ? 'Номер телефона' : phone}
        disabled={phone !== ''}
        prefix={<PhoneOutlined />}
      />
    </Form.Item>
  )
}
