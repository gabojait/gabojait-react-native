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
  RawAxiosRequestConfig,
} from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://gabojait-dev.nogamsung.com/api/v1',
  headers: {} as AxiosRequestHeaders,
}

interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: CustomResponseInterceptorManager
  }
  getUri(config?: AxiosRequestConfig): string
  request<T>(config: AxiosRequestConfig): Promise<T>
  get<T>(url: string, params?: RawAxiosRequestConfig, config?: AxiosRequestConfig): Promise<T>
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

const isSuccess = (statusCode: number) => 200 <= statusCode && statusCode < 300

const client: CustomInstance = axios.create(axiosConfig)
client.interceptors.request.use(async req => {
  // Todo: 재시도 구현
  const accessToken = await AsyncStorage.getItem('accessToken')
  const refreshToken = await AsyncStorage.getItem('refreshToken')
  if (accessToken) req.headers.Authorization = `Bearer ${accessToken}`
  if (refreshToken) req.headers['Refresh-Token'] = `Bearer ${refreshToken}`
  console.info(`'${req.url}'\nHeader:`, req.headers, req)
  return req
})

client.interceptors.response.use(
  async res => {
    console.info(
      `${res.config.url} \nResponsed: ${res.status}`,
      `\nResponse:`,
      res.data.responseData.data,
    )
    try {
      if (isSuccess(res.status)) {
        if (res.headers['authorization']) {
          await AsyncStorage.setItem('accessToken', res.headers['authorization'])
        }
        if (res.headers['refreshToken']) {
          await AsyncStorage.setItem('refreshToken', res.headers['refreshToken'])
        }
        if (!res.data.responseData.data || res.status == 204 || res.status == 201) {
          // Todo: Handle No Content
          // Todo: 빈 리스트(204?)/201 대응
          return []
        } else {
          return res.data.responseData.data
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
        name: e.name ?? 'UNKNOWN_ERROR',
        message: e.message ?? '알 수 없는 오류입니다.',
        stack: Error().stack,
      } as Error
    }
  },
  error => {
    const e = error as AxiosError
    console.error(
      `Path:`,
      e.config?.url,
      `\nStatusCode:`,
      e.response?.status,
      `\nAccessToken: `,
      e.config?.headers['Authorization'],
      `\nRefreshToken: `,
      e.config?.headers['Refresh-Token'],
      `\nResponse:`,
      e.response,
    )
    if (e.response?.status == 401 || e.response?.status == 403) {
      // Todo: Try token renew and logout when renew failed
      AsyncStorage.setItem('accessToken', '')
      AsyncStorage.setItem('refreshToken', '')
      throw {
        name: 'UNAUTHORIZED',
        message: '로그인 세션이 만료됐습니다.',
        stack: e.stack,
      }
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
