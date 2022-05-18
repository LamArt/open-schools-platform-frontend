import { Avatar, Spin, Popover, Button } from 'antd'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useAuthApi } from '../http'
import {RestFilled} from "@ant-design/icons"
import { useDispatch } from 'react-redux'
import { logout } from '../redux/asyncActions/user'
import { useRouter } from 'next/router'
import { IUserData, UserDataActionEnum } from '../types/user'



export const UserAvatar = () => {
  const dispatch =  useDispatch()
  const router = useRouter()
  const menuContent = (<p style={{cursor:"pointer", marginBottom: "0", fontSize: "1rem", padding: "0.5rem"}} onClick={(el) => {
    dispatch(logout(router))
  }}><RestFilled /> Выход</p>)

  const {data, loading, error} = useAuthApi<IUserData>({url: '/user-management/auth/me/'})
  
  useEffect(() => {
    if (data) {
      dispatch({type: UserDataActionEnum.FINALFETCH, payload: data})
    } else if (loading) {
      dispatch({type: UserDataActionEnum.LOADINGDATA})
    } else if (error) {
      dispatch({type: UserDataActionEnum.ERRORFRTCH, payload: error})
    }
  }, [data, loading, error, dispatch])
  

  return loading ? <Spin/> : data ? (
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
) : <></>
}
