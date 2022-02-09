import { Col, Layout, Row } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/asyncActions/user'
import Logo from '../components/Logo'
import { useRouter } from 'next/router'
import FormWraper from '../components/formWraper'
import Image from 'next/image'
import mainImg from '../assets/common/pictures/authImg.png'
import typeFormAuth from '../components/formWraper'

const { Header, Footer, Content } = Layout

const LayoutAuth: React.FC<{ type?: typeof typeFormAuth }> = ({
  children,
  type = 'auth',
}) => {
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
            <Col span={7}>
              <FormWraper type={type}>{children}</FormWraper>
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
