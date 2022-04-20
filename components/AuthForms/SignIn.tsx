import { Button, Checkbox } from 'antd'
import { useState, useRef, useEffect } from 'react'
import FormWraper from '../FormWraper'
import InputPhone from '../InputPhone'
import { getAuth, RecaptchaVerifier } from 'firebase/auth'

const SignIn: React.FC<{
  onFinish: (errorInfo: any) => void
}> = ({ onFinish }) => {
  const [togleRegistrCheckbox, setTogleRegistrCheckbox] = useState(true)
  const captchaRef = useRef<HTMLInputElement>(null)

  const [phone, setPhone] = useState('')
  const [tokenReCaptha, setTokenReCaptha] = useState('')

  useEffect(() => {
    const auth = getAuth()
    const recaptchaVerifierInstans = new RecaptchaVerifier(
      captchaRef.current === null ? 'recaptcha-container' : captchaRef.current,
      {
        size: 'invisible',
        callback: (tokenReCaptha: string) => {
          setTokenReCaptha(tokenReCaptha)
        },
      },
      auth
    )
    recaptchaVerifierInstans.render()
  }, [])

  useEffect(() => {
    if (tokenReCaptha !== '') {
      onFinish({ phone, tokenReCaptha })
    }
  }, [tokenReCaptha])

  return (
    <FormWraper
      onFinish={() => {}}
      title="Впервые в Schools.ai?"
      description="Моментальная регистрация"
    >
      <InputPhone setPhoneVal={setPhone} />
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
        ref={captchaRef}
        id="recaptcha-container"
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
