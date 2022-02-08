import Head from 'next/head'
import { useRouter } from 'next/router'
import { Layout } from 'antd'
import Menu from './Menu'
import Logo from './Logo'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verification } from '../redux/asyncActions/user'
import { IUser } from '../types/user'
const { Header, Content, Footer, Sider } = Layout

const LayoutCustom: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <Head>
        <title>Schools.ai</title>
      </Head>

      <Layout className="site-layout">
        <Header
          style={{
            background: '#fff',
          }}
        ></Header>
        <Content style={{ margin: '16px' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>created by lamart</Footer>
      </Layout>

      <style jsx>
        {`
          .logo {
            height: 48px;
            margin: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
          }
          .site-layout-background {
            background: #fff;
          }
        `}
      </style>
    </>
  )
}

export default LayoutCustom
