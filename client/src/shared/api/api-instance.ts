import axios, { AxiosError, AxiosRequestConfig } from "axios"

export type BodyType<Data> = Data

export type ErrorType<Error> = AxiosError<Error>

export const apiInstance = axios.create({
  baseURL: "/api",

  headers: {
    "Content-Type": "application/json",
  },
})

export const createInstance = <T>(
  config: AxiosRequestConfig,

  options?: AxiosRequestConfig
): Promise<T> => {
  return apiInstance({ ...config, ...options }).then((res) => res.data)
}