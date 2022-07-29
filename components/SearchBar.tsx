import { Button, Col, Input, Row } from 'antd'
import React, { useState } from 'react'

export default function SearchBar() {
  const[text , setText]= useState('')
    return (
        <Col span={24}>
          <Row style={{padding: "1rem", backgroundColor: "#F0F2F5", borderRadius: ".3rem", border: "1px solid #d9d9d9" }}>
            <Col span={8}>
              <Input style={{
                width: '100%',
                marginRight:"2rem",
                height: "2.5rem"
              }} 
              placeholder="Поиск по всем полям" 
              onChange={el => setText(el.target.value)} 
              value={text}/>
            </Col>
            <Col span={6} offset={10} >
              <Button
                style={{
                  background: '#57BBCA',
                  width: '100%',
                  height: "2.5rem"
                }}
                type="primary"
                htmlType="submit"
              >
                Добавить сотрудника
              </Button>
            </Col>
          </Row>
        </Col>
  )
}
