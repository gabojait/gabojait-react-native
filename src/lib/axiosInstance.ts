import {ResponseWrapper} from '@/model/ResponseWrapper'
import {Result} from '@/redux/reducers'
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosResponse,
  AxiosInterceptorOptions,
} from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'https://gabojait-dev.nogamsung.com/api/v1/',
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
    onRejected?: ((error: any) => any) | null,
    options?: AxiosInterceptorOptions,
  ): number
}

const isSuccess = (statusCode: number) => statusCode <= 200 && statusCode < 300

const client: CustomInstance = axios.create(axiosConfig)
client.interceptors.request.use(req => {
  console.log(`'${req.url}' Header: ${req.headers},`)
  console.log(req.data)
  // Todo: 토큰 삽입
  req.headers.Authorization = ''
  return req
})

client.interceptors.response.use(res => {
  console.log(`${res.config.url} Responsed: ${res.status}, \nBody: ${res.data.data}`)
  try {
    if (isSuccess(res.status)) {
      if (!res.data.data || res.status == 204) {
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
      },
      loading: false,
    }
  }
})

export default client
