import type { NextPage } from 'next'
import { Layout } from 'antd'
import bgLanding from '../assets/img/bgIm.jpg'

const { Header, Footer, Content } = Layout

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Layout
          style={{
            background: `fixed none url(${bgLanding.src}) center cover`,
            minHeight: '90vh',
          }}
        >
          <Header style={{ background: 'none' }}>schools ai</Header>
          <Content style={{ background: 'none' }}>Content</Content>
        </Layout>
        <Footer style={{ background: 'none' }}>Footer</Footer>
      </Layout>
    </>
  )
}

export default Home
