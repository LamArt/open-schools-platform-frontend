import React, { useEffect, useState } from 'react'
import { Col, Row, Typography } from 'antd'
import Image from 'next/image'

import { useGetStudentQuery } from '@domains/organization/redux/organizationApi'
import { getUuidFromUrl } from '@domains/common/utils/getUuidFromUrl'

import EmptyWrapper from '@domains/common/components/containers/EmptyWrapper'
import styles from './styles/styles.module.scss'
import { ErrorType } from '@store/commonApi'
import router from 'next/router'
import duckEmptyPage from '@public/image/duckEmptyPage.svg'
import { Button } from '@domains/common/components/button'
import { Field } from '@domains/common/components/field'

const CurrentStudent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    // const [mutation, isDeleteFinished] = useDeleteCircleMutation()
    const uuid = getUuidFromUrl()

    console.log(uuid)

    const { data: student, error: studentError, isLoading } = useGetStudentQuery({ student_id: uuid[0] })

    useEffect(() => {
        if (studentError && (studentError as ErrorType).status == 404) {
            router.push('/student')
        }
    }, [studentError])

    // if (isDeleteFinished.isSuccess) return null
    if (uuid.length === 0) router.push('/404')

    return (
        <EmptyWrapper
            titleText={'Упс, зайдите позже!'}
            descriptionText={
                'Ваше приглашение в кружок пока рассматривается. ' +
                'Уже скоро здесь появится информация об обучающемся!'
            }
            pageTitle={'Обучающийся'}
            data={student?.student.circle ?? student?.student.student_profile}
            isLoading={isLoading}
            searchTrigger={false}
        >
            <Row className={styles.headersBlock}>
                <Col lg={14} md={24} xs={24} sm={24} className={styles.queriesBlock}>
                    <Row className={styles.baseRowContainer}>
                        <Col lg={4} className={styles.image}>
                            <Image src={duckEmptyPage} alt={'Duck with a magnifying glass'} width={190} />
                        </Col>
                        <Col className={styles.infoContainer} lg={24}>
                            <Typography.Title className={styles.title} level={1}>
                                {student?.student.name ? student?.student.name : 'Имя не определено'}
                            </Typography.Title>
                            <Field
                                fieldName={'Телефон ученика:'}
                                fieldValue={student?.student.student_profile?.phone}
                            />
                            <Field fieldName={'Кружок:'} fieldValue={student?.student.circle?.name} />

                            <Button type='schoolDefaultAuto' block onClick={() => router.push('/student/edit')}>
                                Редактировать профиль
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col lg={10} md={24} xs={24} sm={24} className={styles.card}>
                    <div className={styles.text}>
                        <Typography.Title level={2}>Семья</Typography.Title>
                        <Field
                            fieldName={'Номер для связи:'}
                            fieldValue={student?.student.student_profile?.phone}
                            type='left'
                        />
                        <Field
                            fieldName={'Телефон родителя:'}
                            fieldValue={student?.student.student_profile?.parent_phones?.split(',')[0]}
                            type='left'
                        />
                        <Field fieldName={'E-mail родителя:'} defaultValue={'Не определено'} type='left' />
                    </div>
                </Col>
            </Row>
        </EmptyWrapper>
    )
}

export default CurrentStudent
