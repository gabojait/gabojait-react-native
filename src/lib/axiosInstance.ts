import {ResponseWrapper} from '@/model/ResponseWrapper'
import {Result} from '@/redux/reducers'
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosResponse,
  AxiosInterceptorOptions,
  AxiosError,
} from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://gabojait-dev.nogamsung.com/api/',
  headers: {} as AxiosRequestHeaders,
}

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: CustomResponseInterceptorManager
  }
  getUri(config?: AxiosRequestConfig): string
  request<T>(config: AxiosRequestConfig): Promise<T>
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
}

interface CustomResponseInterceptorManager
  extends AxiosInterceptorManager<AxiosResponse<ResponseWrapper>> {
  use(
    onFulfilled?:
      | ((value: AxiosResponse<ResponseWrapper>) => Result<any> | Promise<Result<any>>)
      | null,
    onRejected?: ((error: any) => Result<any>) | null,
    options?: AxiosInterceptorOptions,
  ): number
}

const isSuccess = (statusCode: number) => statusCode <= 200 && statusCode < 300

const client: CustomInstance = axios.create(axiosConfig)
client.interceptors.request.use(async req => {
  // Todo: 재시도 구현
  req.headers.Authorization = `Bearer ${await AsyncStorage.getItem('accessToken')}`
  console.log(`'${req.url}'\nHeader:`, req.headers, req)
  return req
})

client.interceptors.response.use(
  async res => {
    console.log(`${res.config.url} Responsed: ${res.status}}\n Response:`, res.data.data)
    try {
      if (isSuccess(res.status)) {
        if (res.headers['authorization']) {
          // authorization: [access-token: ]
          const headerRegex = /\[access-token: (.+?), refresh-token: (.+?)\]/g
          const tokens = headerRegex.exec(res.headers.authorization)!
          console.log(`Login Success! setting tokens: ${tokens[1]} ${tokens[2]}`)
          await AsyncStorage.setItem('accessToken', tokens[1])
          await AsyncStorage.setItem('refreshToken', tokens[2])
        }
        if (!res.data.data || res.status == 204 || res.status == 201) {
          // Todo: Handle No Content
          // Todo: 빈 리스트(204?)/201 대응

          return {data: [], loading: false}
        } else {
          return {data: res.data.data, loading: false}
        }
      } else {
        throw {
          name: res.data.responseCode ?? 'UNKNOWN_ERROR',
          message: res.data.responseMessage ?? '알 수 없는 오류입니다.',
          stack: Error().stack,
        } as Error
      }
    } catch (e: any) {
      return {
        error: {
          name: e.name ?? 'UNKNOWN_ERROR',
          message: e.message ?? '알 수 없는 오류입니다.',
          stack: Error().stack,
        } as Error,
        loading: false,
      }
    }
  },
  error => {
    const e = error as AxiosError
    console.log(
      `Path: ${e.config?.url} | StatusCode: ${e.response?.status}\nResponse:`,
      e.response?.data,
    )
    if (e.response?.status == 403) {
      // Todo: Try token renew and logout when renew failed
      AsyncStorage.setItem('accessToken', '')
      AsyncStorage.setItem('refreshToken', '')
    }
    const response = e.response?.data as ResponseWrapper<undefined>
    throw {
      name: response.responseCode ?? 'UNKNOWN_ERROR',
      message: response.responseMessage ?? '알 수 없는 오류입니다.',
      stack: e.stack,
    } as Error
  },
)

export default client
