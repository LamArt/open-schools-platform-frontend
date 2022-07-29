import { Button, Col, Input, Pagination, Row } from 'antd'
import React, { useState } from 'react'
import EmployList from '../components/EmployList';
import LayoutCustom from '../components/LayoutCustom'
import SearchBar from '../components/SearchBar';


function Employee() {
  const [text, setText] = useState('');

  return (
    <LayoutCustom>
      <SearchBar/>
      <Row>
        <Col span={24}>
          <EmployList findText={text}/>
        </Col>
      </Row>
    </LayoutCustom>
  )
}

export default Employee