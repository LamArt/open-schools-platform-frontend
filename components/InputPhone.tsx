import { Form, Input } from 'antd'
import React from 'react'
import { PhoneOutlined } from '@ant-design/icons'

export default function InputPhone({ phone = '' }) {
  let getInputNumbersValue = function (input: EventTarget) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, '')
  }

  let onPhonePaste = function (e: React.FormEvent<HTMLInputElement>) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input)
    var pasted = e.clipboardData || window.clipboardData
    if (pasted) {
      var pastedText = pasted.getData('Text')
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue
        return
      }
    }
  }

  let onPhoneInput = function (e: React.FormEvent<HTMLInputElement>) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = ''

    if (!inputNumbersValue) {
      return (input.value = '')
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue
      }
      return
    }

    if (['7', '8', '9'].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == '9')
        inputNumbersValue = '7' + inputNumbersValue
      var firstSymbols = inputNumbersValue[0] == '8' ? '8' : '+7'
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
    var inputValue = e.target.value.replace(/\D/g, '')
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = ''
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
