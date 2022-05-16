import { useEffect, useState } from 'react';
import axios from 'axios'


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

export const useAuthApi = <T>(config:IUseAuthApi) => {
  const [state, setState] = useState<IStateRequest<T>>({data:undefined, loading:true, error: null })
  useEffect(() => {
    (async () => {
      const dataRequest = await apiAuth({method: MetodsRequest.GET, ...config })
      if (dataRequest.status < 300 && dataRequest.status >= 200){
        setState(el => ({...el, data: dataRequest.data,loading: false}))
      } else {
        setState(el => ({...el, error: new Error(dataRequest.data),loading: false}))
      }
    })()
  }, [])

  return state
}

 

export const api = axios.create({
  baseURL: BASE_URL,
})

