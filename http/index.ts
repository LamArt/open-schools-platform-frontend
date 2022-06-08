import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { logout } from '../redux/asyncActions/user';


export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const apiAuth = axios.create({
  baseURL: BASE_URL,
})

apiAuth.interceptors.request.use((config) => {
  config.headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
  return config
})

enum MetodsRequest {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}
interface IUseAuthApi {
  url:string,
  method?:MetodsRequest,
  data?:Object
}
interface IStateRequest<T> {
  data: T | undefined,
  loading: boolean,
  error: null | Error
}

export const useAuthApi = <T>(config:IUseAuthApi, callback?: (data:T) => void  ) => {
  const dispatch =  useDispatch()
  const router = useRouter()
  const [state, setState] = useState<IStateRequest<T>>({data:undefined, loading:true, error: null })
  useEffect(() => {
    apiAuth({method: MetodsRequest.GET, ...config }).then(res => {
      setState(el => ({...el, data: res.data,loading: false}))
      if (callback) {
        callback(res.data)
      }
    },(error) => {
      if (error.response && error.response.status == 403) {
        console.error(error.data)
        setState(el => ({...el, error: new Error(error.data),loading: false}))
        dispatch(logout(router))
      } else {
        setState(el => ({...el, error: new Error(error.data),loading: false}))
      }
      return error.data
    })
  }, [])

  return state
}

 

export const api = axios.create({
  baseURL: BASE_URL,
})

