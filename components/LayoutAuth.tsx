import { Col, Layout, Row } from 'antd'
import React from 'react'
import Logo from '../components/Logo'
import Image from 'next/image'
import mainImg from '../assets/common/pictures/authImg.png'

const { Header, Footer, Content } = Layout

const LayoutAuth: React.FC = ({ children }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Layout
        style={{
          minHeight: '100vh',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <Header style={{ background: 'white' }}>
          <Logo />
        </Header>
        <Content style={{ background: 'white' }}>
          <Row justify="start" align="middle" gutter={[0, 0]}>
            <Col span={14}>
              <div style={{ zIndex: 1, position: 'relative' }}>
                <Image
                  layout="responsive"
                  width="1024px"
                  height="768px"
                  src={mainImg.src}
                  alt="background image"
                />
              </div>
            </Col>
            <Col span={1}></Col>
            <Col
              span={7}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
                justifyContent: 'space-around',
                alignItems: 'stretch',
              }}
            >
              {children}
            </Col>
          </Row>
        </Content>
        <Footer
          style={{ background: 'white', textAlign: 'center', color: '#757474' }}
        >
          Созданно с любовью в ЛамАрте
        </Footer>
      </Layout>
    </div>
  )
}

export default LayoutAuth
