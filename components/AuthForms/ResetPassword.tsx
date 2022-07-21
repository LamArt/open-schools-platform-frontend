import {Button, Form, Input, Typography} from 'antd'
import Link from 'next/link'
import FormWraper from '../FormWraper'
import InputPhone from '../InputPhone'
import { LockOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState as IState } from '../../redux/reducers/rootReducer'

const ResetPassword: React.FC = () => {
    const router = useRouter()
    const dispath = useDispatch()
    const error = useSelector((state: IState) => state.auth.errorLogIn)

    const onFinish = ({
                          phone,
                      }:
                       {
        phone: string
    }) => {
        alert("Сбрасывем пароль...")
    }

    return (
        <FormWraper title={'Восстановление пароля'} onFinish={onFinish}>
            <Typography.Text>Введите номер телефона для восстановления доступа к вашей учетной записи</Typography.Text>
            <div style={{ marginTop: '1.5em' }}>
                <InputPhone onChange={() => {}} />
            </div>
            <div style={{ marginTop: '1.5em' }}>
                <Button
                    style={{
                        background: '#57BBCA',
                        width: '100%',
                    }}
                    type="primary"
                    htmlType="submit"
                >
                    Восстановление пароля
                </Button>
            </div>
        </FormWraper>
    )
}

export default ResetPassword
