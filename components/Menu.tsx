import { Menu } from 'antd'
import {
  SettingOutlined,
  FileProtectOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import React from 'react'
import {useRouter} from 'next/router'

const { SubMenu } = Menu

const MenuCustom = () => {
  const router = useRouter()
  return (
    <Menu
      style={{ paddingTop: '10px' }}
      theme="light"
      mode="inline"
      onClick={(e) => {
        e.key === 'group' ? router.push(`/`) : router.push(`/${e.key}`)
      }}
    >
      <Menu.Item key="group" icon={<TeamOutlined />}>
        Группы
      </Menu.Item>
      <Menu.Item key="license" icon={<FileProtectOutlined />}>
        Лицензии
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Настройки
      </Menu.Item>
    </Menu>
  )
}

export default MenuCustom
