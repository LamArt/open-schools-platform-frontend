import store from '../store/store'
import '../domains/common/components/styles/global.scss'
import 'antd/dist/antd.css'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { AuthProvider } from '@domains/user/providers/authProvider'
import React, { PropsWithChildren } from 'react'
import Head from 'next/head'
import { OrganizationProvider } from '@domains/organization/providers/organizationProvider'
import { BaseLayout } from '@domains/common/components/containers/BaseLayoutComponents/BaseLayout'
import { LayoutContextProvider } from '@domains/user/providers/baseLayoutProvider'
import { message } from 'antd'
import { EventBusProvider } from '@domains/common/providers/eventBusProvider'

export interface ContainerPage<PropsType> extends React.FC {
    container: React.FC<PropsType>
    isError?: boolean
}

interface CustomAppProps extends AppProps {
    Component: ContainerPage<PropsWithChildren>
}

message.config({
    maxCount: 1,
})

function MyApp({ Component, pageProps }: CustomAppProps): JSX.Element {
    const LayoutComponent = Component.container || BaseLayout
    const router = useRouter()

    if (router.pathname === '/mobile-recaptcha')
        return (
            <Provider store={store}>
                <Head>
                    <title>Открытые школы</title>
                    <link rel='icon' href='/icons/logo.svg' sizes='any' />
                </Head>
                <LayoutComponent>
                    <Component {...pageProps} />
                </LayoutComponent>
            </Provider>
        )

    return (
        <Provider store={store}>
            <EventBusProvider>
                <AuthProvider>
                    <LayoutContextProvider>
                        <OrganizationProvider>
                            <Head>
                                <title>Открытые школы</title>
                                <link rel='icon' href='/icons/logo.svg' sizes='any' />
                            </Head>
                            <LayoutComponent>
                                <Component {...pageProps} />
                            </LayoutComponent>
                        </OrganizationProvider>
                    </LayoutContextProvider>
                </AuthProvider>
            </EventBusProvider>
        </Provider>
    )
}

export default MyApp
