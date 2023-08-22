import { Form, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { Input } from '@domains/common/components/input'
import styles from './styles/styles.module.scss'
import { Button } from '@domains/common/components/button'
import { useCreateStudentFormValidators } from './hooks'
import { useOrganization } from '@domains/organization/providers/organizationProvider'
import { useRouter } from 'next/router'
import { useGetAllCirclesQuery, useInviteStudentMutation } from '@domains/circle/redux/circleApi'
import { isValidFormCheck } from '@domains/common/utils/form'
import {
    CIRCLES,
    PARENT_EMAIL,
    PARENT_PHONE,
    STUDENT_NAME,
    STUDENT_PHONE,
} from '@domains/student/components/createStudentForm/constants'
import { handleSubmitForm } from '@domains/student/handlers/student'
import { WithTooltip } from '@domains/common/components/tooltip/withTooltip'
import { TOOLTIP_MARGIN_TOP } from '@domains/student/components/createStudentForm/styles/constants'

export const CreateStudentForm = () => {
    const validators = useCreateStudentFormValidators()
    const [form] = Form.useForm()
    const [isFormValid, setIsFormValid] = useState(false)
    const { organization } = useOrganization()
    const [mutation] = useInviteStudentMutation()
    const circlesData = useGetAllCirclesQuery({
        organization: organization.id,
    })
    const router = useRouter()

    const validationCheck = () => {
        setIsFormValid(isValidFormCheck(form, [STUDENT_NAME, PARENT_PHONE, STUDENT_PHONE, PARENT_EMAIL, CIRCLES]))
    }

    return (
        <Form
            form={form}
            className={styles.table}
            colon={false}
            requiredMark={false}
            onFinish={() => {
                handleSubmitForm(form, mutation).then((isSuccess) => {
                    if (isSuccess) router.push('/student')
                })
            }}
            layout='vertical'
            onValuesChange={validationCheck}
        >
            <Typography.Title level={1}>Добавление обучаещегося</Typography.Title>
            <WithTooltip
                tooltipText={'Ф. И. О. ученика необходимо для ведения отчетности и добавления его в списки.'}
                margin={TOOLTIP_MARGIN_TOP}
            >
                <Form.Item
                    label='Ф. И. О. сотрудника'
                    name={STUDENT_NAME}
                    className={styles.label}
                    rules={validators.name}
                >
                    <Input placeholder='Введите Ф. И. О. обучающегося' />
                </Form.Item>
            </WithTooltip>
            <WithTooltip
                tooltipText={
                    'Телефон родителя или законного' +
                    'представителя необходим для связи и донесения важной информации. '
                }
                margin={TOOLTIP_MARGIN_TOP}
            >
                <Form.Item
                    label='Телефон родителя'
                    name={PARENT_PHONE}
                    className={styles.label}
                    rules={validators.phone}
                >
                    <Input customType='inputPhone' placeholder='Введите телефон родителя' />
                </Form.Item>
            </WithTooltip>

            <WithTooltip
                tooltipText={
                    'E-mail родителя или законного представителя' +
                    ' необходим для связи и донесения важной информации.'
                }
                margin={TOOLTIP_MARGIN_TOP}
            >
                <Form.Item label='Email родителя' name={PARENT_EMAIL} className={styles.label} rules={validators.email}>
                    <Input type='email' placeholder='Введите email родителя' />
                </Form.Item>
            </WithTooltip>
            <WithTooltip
                tooltipText={'Для связи с учеником при возникновении нештатной ситуации.'}
                margin={TOOLTIP_MARGIN_TOP}
            >
                <Form.Item
                    label='Телефон обучающегося'
                    name={STUDENT_PHONE}
                    className={styles.label}
                    rules={validators.phone}
                >
                    <Input customType='inputPhone' placeholder='Введите телефон обучающегося' />
                </Form.Item>
            </WithTooltip>
            <WithTooltip tooltipText={'Укажите кружок, на который будет ходить ученик.'} margin={TOOLTIP_MARGIN_TOP}>
                <Form.Item label='Название кружка' name={CIRCLES} className={styles.label} rules={validators.select}>
                    <Select
                        mode='multiple'
                        placeholder='Выберите кружок'
                        className={styles.select}
                        loading={circlesData.isLoading}
                        options={circlesData?.data?.results.map((x) => {
                            return {
                                value: x.id,
                                label: x.name,
                            }
                        })}
                    />
                </Form.Item>
            </WithTooltip>
            <Form.Item name='button'>
                <Button
                    disabled={!isFormValid}
                    key='submit'
                    type='schoolDefault'
                    htmlType='submit'
                    block
                    data-cy='resetcomplete-button'
                    style={{ width: '40%' }}
                    className={styles.button}
                >
                    Добавить обучаещегося
                </Button>
            </Form.Item>
        </Form>
    )
}
