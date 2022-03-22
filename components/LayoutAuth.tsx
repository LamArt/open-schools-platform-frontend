import { Col, Layout, Row, Grid } from 'antd'
import React, { useRef } from 'react'
import Logo from '../components/Logo'
import Image from 'next/image'
import mainImg from '../assets/common/pictures/authImg.png'

const { Header, Footer, Content } = Layout
const { useBreakpoint } = Grid

const LayoutAuth: React.FC = ({ children }) => {
  const screens = useBreakpoint().lg

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
          <Row justify="center" align="middle" gutter={[0, 0]}>
            <Col style={screens ? {} : { display: 'none' }} span={14}>
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
            <Col style={screens ? {} : { display: 'none' }} span={1}></Col>
            <Col
              span={screens ? 7 : 20}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
                justifyContent: 'space-around',
                alignItems: 'stretch',
                ...(screens ? {} : { marginTop: '2rem' }),
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
      <style jsx>{`
        @media screen and (max-width: 990px) {
          .bd-image {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default LayoutAuth
