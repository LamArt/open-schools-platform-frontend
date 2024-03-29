import React from 'react'

import AuthLayout, {
    IAuthLayoutProps,
} from '../../domains/user/components/auth/containers/AuthLayout'
import { ContainerPage } from '../_app'
import { FormContainer } from '../../domains/user/components/auth/formContainer'
import { SignInForm } from '../../domains/user/components/auth/signInForm'
import { TabsAuthAction } from '../../domains/user/components/auth/headerActions'
import Head from 'next/head'
import { CENTRALIZED } from '../../domains/common/components/styles/constantStyles'
import { Row } from 'antd'

const SignInPage: ContainerPage<IAuthLayoutProps> = (props) => {
    return (
        <>
            <Head>
                <title>Вход</title>
            </Head>
            <Row className={CENTRALIZED}>
                <FormContainer>
                    <TabsAuthAction currentActiveKey="/auth/signin" />
                    <SignInForm />
                </FormContainer>
            </Row>
        </>
    )
}

SignInPage.container = AuthLayout
export default SignInPage
