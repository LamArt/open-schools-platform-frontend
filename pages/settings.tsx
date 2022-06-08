import { Avatar, Button, Col, Row, Spin, Typography } from 'antd'
import React, { useState } from 'react'
import { useSelectorTypes } from '../redux/tupesHook'
import LayoutCustom from '../components/LayoutCustom'
import {EditFilled} from "@ant-design/icons"
const { Text, Title  } = Typography;

function Settings() {
  const userData = useSelectorTypes(state => state.userData)
  const [hoverButton, setHoverButton] = useState(false)
  return (
    <>
    <LayoutCustom>
      {userData.loading ? <Spin/> : 
      <Row>
        <Col span="4" >
          <Avatar
            src="https://joeschmoe.io/api/v1/1"
            style={{
              width: "calc(100% - 4rem)",
              height:"auto",
              margin: "0 2rem"
            }}
          />
        </Col>
        <Col span="20">
        <Row style={{rowGap: "40px"}}>
          <Title style={{margin: "0"}} level={1}>{userData.name}</Title>
            <Col span="24">
            <Row style={{rowGap: "24px"}}>
                <Col span="4">
                  <Text style={{fontSize:"0.875rem"}} type="secondary">Телефон</Text>
                </Col>
                <Col span="20">
                  <Text style={{fontSize:"1rem"}}>{userData.phone}</Text>
                </Col>
                <Col span="4">
                  <Text style={{fontSize:"0.875rem"}} type="secondary">Пароль</Text>
                </Col>
                <Col span="20">
                  <Text style={{fontSize:"1rem"}}>******</Text>
                </Col>
            </Row>
            </Col>
            <Col span="24">
              <div className="btn_settings"></div>
            <Button
            className="btn_settings"
            size="large"
              icon={<EditFilled />}
              style={ !hoverButton ? {
                backgroundColor: "#fff",
                color: "#57BBCA",
                border: "1px solid #57BBCA",
              }:{
                color: "#57BBCA",
                backgroundColor: "#d9d9d9",
                border: "1px solid #d9d9d9",
              }}
              type="primary"
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              onClick={() => {}}
            >
              Редактировать
            </Button>
            <style jsx>{`
          .btn_settings {
            
          }
          .btn_settings:hover {
            background-color: #d9d9d9;
            border-color: #d9d9d9;
          }
        `}</style>
            </Col>
          </Row>
        </Col>
      </Row>
      }
    </LayoutCustom>
    
    </>
  )
}

export default Settings