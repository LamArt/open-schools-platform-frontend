import axios from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  config.headers!.Authorization = 'Token ' + localStorage.getItem('access')
  return config
})

api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalConfig = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalConfig._isRetry = true
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/jwt/refresh/`,
          { refresh: localStorage.getItem('refresh') },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        localStorage.setItem('access', response.data.access)

        return api.request(originalConfig)
      } catch (e) {}
    }
    throw error
  }
)

export const apiNoAuth = axios.create({
  baseURL: BASE_URL,
})

export const apiAuthOrNoAuth = axios.create({ baseURL: BASE_URL })

apiAuthOrNoAuth.interceptors.request.use((config) => {
  config.headers!.Authorization = 'Token ' + localStorage.getItem('access')
  return config
})

apiAuthOrNoAuth.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalConfig = error.config
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalConfig._isRetry = true
      try {
        const response = await axios.post(
          `${BASE_URL}/auth/jwt/refresh/`,
          { refresh: localStorage.getItem('refresh') },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        localStorage.setItem('access', response.data.access)
        return apiAuthOrNoAuth.request(originalConfig)
      } catch (e) {
        try {
          delete originalConfig.headers.Authorization
          return apiNoAuth.request(originalConfig)
        } catch (e) {}
      }
    }
    throw error
  }
)
