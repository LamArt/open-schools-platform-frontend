import { Button, Checkbox } from 'antd'
import { useState, useRef, useEffect } from 'react'
import FormWraper from '../FormWraper'
import InputPhone from '../InputPhone'
import { getAuth, RecaptchaVerifier } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { registrationStep1 } from '../../redux/asyncActions/registration'
import { IState } from '../../types/user'

const SignIn: React.FC = () => {
  const [togleRegistrCheckbox, setTogleRegistrCheckbox] = useState(true)
  const captchaRef = useRef<HTMLInputElement>(null)
  const [phone, setPhone] = useState('')
  const [tokenReCaptha, setTokenReCaptha] = useState('')
  const dispath = useDispatch()
  const router = useRouter()
  const error = useSelector((state: IState) => state.auth.errorSignIn)

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
    if (tokenReCaptha !== '' && phone.length === 18) {
      dispath(registrationStep1({ router, phone, tokenReCaptha }))
    }
  }, [tokenReCaptha, phone])

  return (
    <>
      <FormWraper
        onFinish={() => {}}
        title="Впервые в Schools.ai?"
        description="Моментальная регистрация"
      >
        <InputPhone disabled={false} onChange={(el: string) => setPhone(el)} />
        {error ? (
          <span
            style={{ color: '#ff4d4f', fontSize: '14px', lineHeight: '1.5715' }}
          >
            Аккаунта с таким номером телефона уже существует
          </span>
        ) : (
          ''
        )}
        <Checkbox
          onChange={(e) => {
            setTogleRegistrCheckbox(!e.target.checked)
          }}
          value={togleRegistrCheckbox}
          style={{ marginBottom: '0.75em', fontSize: '1em' }}
        >
          Я согласен на{' '}
          <span style={{ color: '#57BBCA' }}>
            обработку персональных данных
          </span>
        </Checkbox>
        {!togleRegistrCheckbox ? (
          ''
        ) : (
          <Button
            style={{ background: '#57BBCA', width: '100%', marginTop: '1.5em' }}
            type="primary"
            htmlType="submit"
            disabled={true}
          >
            Зарегистрироваться
          </Button>
        )}
        <Button
          {...(togleRegistrCheckbox ? { hidden: true } : {})}
          ref={captchaRef}
          id="recaptcha-container"
          style={{ background: '#57BBCA', width: '100%', marginTop: '1.5em' }}
          type="primary"
          htmlType="submit"
        >
          Зарегистрироваться
        </Button>
      </FormWraper>
    </>
  )
}

export default SignIn
