import { ResponseWrapper } from '@/data/model/ResponseWrapper';
import { Result } from '@/redux/reducers';
import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  RawAxiosRequestConfig,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {} as AxiosRequestHeaders,
  timeout: 10 * 1000,
};

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}
interface CustomInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AdaptAxiosRequestConfig>;
    response: CustomResponseInterceptorManager;
  };
  getUri(config?: AxiosRequestConfig): string;
  request<T>(config: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, params?: RawAxiosRequestConfig, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

interface CustomResponseInterceptorManager
  extends AxiosInterceptorManager<AxiosResponse<ResponseWrapper>> {
  use(
    onFulfilled?:
      | ((value: AxiosResponse<ResponseWrapper>) => Result<any> | Promise<Result<any>>)
      | null,
    onRejected?: ((error: any) => Result<any>) | null,
    options?: AxiosInterceptorOptions,
  ): number;
}

export const isSuccess = (statusCode: number) => statusCode >= 200 && statusCode < 300;

const client: CustomInstance = axios.create(axiosConfig);
export const reqInterceptor = async (req: AdaptAxiosRequestConfig) => {
  // Todo: 재시도 구현
  if (!req.headers) {
    throw new Error('Unexpected Request');
  }
  const accessToken = await AsyncStorage.getItem('accessToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    req.headers['refresh-token'] = `Bearer ${refreshToken}`;
  }
  console.info(`'${req.url}'\nHeader:`, req.headers, req);
  return req;
};
client.interceptors.request.use(reqInterceptor);

export default client;
