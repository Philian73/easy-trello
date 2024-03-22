import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export const apiInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const createInstance = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const res = await apiInstance({ ...config, ...options })

  return res.data
}

export type BodyType<Data> = Data

export type ErrorType<Error> = AxiosError<Error>
