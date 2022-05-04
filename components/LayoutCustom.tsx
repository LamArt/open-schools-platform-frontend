import Head from 'next/head'
import { Layout } from 'antd'
import Menu from './Menu'
import Logo from './Logo'
import { useState } from 'react'
const { Header, Content, Footer, Sider } = Layout

const LayoutCustom: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <Head>
        <title>Schools.ai</title>
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => {
            setCollapsed((state) => !state)
          }}
          theme="light"
        >
          <div className="logo">
            <Logo min={collapsed} />
          </div>
          <Menu />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              background: '#fff',
              height: '80px',
              padding: '16px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                height: '48px',
                marginLeft: '16px',
              }}
            ></div>
          </Header>
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
