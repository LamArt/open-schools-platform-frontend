import { Avatar, Spin, Popover, Button } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useAuthApi } from '../http'
import {RestFilled} from "@ant-design/icons"
import { useDispatch } from 'react-redux'
import { logout } from '../redux/asyncActions/user'
import { useRouter } from 'next/router'

interface IUserAvatar {
  "phone": string,
  "name": string
}

export const UserAvatar = () => {
  const dispatch =  useDispatch()
  const router = useRouter()
  const menuContent = (<p style={{cursor:"pointer", marginBottom: "0", fontSize: "1rem", padding: "0.5rem"}} onClick={(el) => {
    dispatch(logout(router))
  }}><RestFilled /> Выход</p>)

  const {data, loading, error} = useAuthApi<IUserAvatar>({url: '/user-management/auth/me/'})
  
  return !data ? <Spin/> : (
    <Popover content={menuContent}>
      <Button style={{border: "none", padding: "0", height: '60px',}}>
        <Link href="/settings" >
                <a
                style={{
                  height: '60px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: "center",
                  textDecoration: "none",
                  color: "rgba(0, 0, 0, 0.85)"
                }}
              >
                <p style={{ 'paddingRight': '20px', margin: "0" }}>{data.name || data.phone}</p>
                <Avatar
                  src="https://joeschmoe.io/api/v1/1"
                  style={{
                    height: 48,
                    width: 48,
                  }}
                />
              </a>
          </Link>
        </Button>
      </Popover>
)
}
