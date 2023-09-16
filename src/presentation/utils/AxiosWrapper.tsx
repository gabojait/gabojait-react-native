import { ResponseWrapper } from '@/data/model/ResponseWrapper';
import client, { axiosConfig, isSuccess } from '@/lib/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Axios, AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ReactNode, useEffect } from 'react';
import { RootStackNavigationProps } from '../navigation/RootNavigation';
import { ApiErrorCode } from '@/data/api/ApiErrorCode';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
// import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';

/**
 * @param children
 * @returns {*}
 * @constructor
 */
export default function AxiosWrapper({ children }: { children: ReactNode }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'default'>>();

  async function requestRefreshToken(originalRequest: InternalAxiosRequestConfig) {
    console.log('리프레시 토큰을 이용해 세션 유지를 시도합니다.');
    let fcmToken = await messaging().getToken();

    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw {
        name: 'UNAUTHORIZED',
        message: '로그인 세션이 만료됐습니다.',
      };
    }
    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'refresh-Token': `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({ fcmToken: fcmToken }),
    };

    fetch(`${axiosConfig.baseURL}/user/token`, request)
      .then(async res => {
        const headers = res.headers as unknown as AxiosHeaders;
        if (res.status === 200 || res.status === 201) {
          await AsyncStorage.setItem('accessToken', res.headers.get('authorization')!);
          await AsyncStorage.setItem('refreshToken', res.headers.get('refresh-token')!);
          const newRequest = JSON.parse(JSON.stringify(originalRequest));
          newRequest.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${res.headers.get('authorization')}`,
            'refresh-token': `Bearer ${headers['refresh-token']}`,
          };
          new Axios(newRequest);
        } else {
          throw new Error('');
        }
      })
      .catch(async err => {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        console.log(navigation);
        navigation.dispatch(
          StackActions.replace('OnboardingNavigation', {
            screen: 'Login',
          }),
        );
        throw {
          name: 'UNAUTHORIZED',
          message: '로그인 세션이 만료됐습니다.',
          stack: err.stack,
        };
      });
  }

  useEffect(() => {
    const resInterceptor = async (res: AxiosResponse) => {
      console.info(
        `${res.config.url} \nResponsed: ${res.status}`,
        '\nResponse:',
        res.data.responseData,
      );
      try {
        if (isSuccess(res.status)) {
          // Todo: Interceptor에서 AsyncStorage에 item을 set 하는 것 보다 헤더의 토큰을 reducer로 전달할 방법을 찾고, 전달 받은 토큰을 반영하는 방법을 찾아야 함.
          console.log(res.headers);
          if (res.headers.authorization) {
            await AsyncStorage.setItem('accessToken', res.headers.authorization);
          }
          if (res.headers['refresh-token']) {
            await AsyncStorage.setItem('refreshToken', res.headers['refresh-token']);
          }
          // Todo: res.status == 200 일 때 responseCode를 이용해 분기처리
          if (!res.data.responseData || res.status == 204) {
            //Todo: Handle No Content
            //Todo: 빈 리스트(204?)/201 대응
            return [];
          } else if (res.status == 200 || res.status == 201) {
            return res.data.responseData;
          }
        } else {
          throw {
            name: res.status.toString() ?? 'UNKNOWN_ERROR',
            message: res.data.responseMessage ?? '알 수 없는 오류입니다.',
            stack: Error().stack,
          } as Error;
        }
      } catch (e: any) {
        throw {
          name: e.name ?? 'UNKNOWN_ERROR',
          message: e.message ?? '알 수 없는 오류입니다.',
          stack: Error().stack,
        } as Error;
      }
    };
    const errorInterceptor = (error: AxiosError) => {
      const e = error as AxiosError;
      const response = e.response?.data as ResponseWrapper<undefined>;
      console.error(
        'Path:',
        e.config?.url,
        '\nStatusCode:',
        e.response?.status,
        '\nAccessToken: ',
        e.config?.headers.authorization,
        '\nRefreshToken: ',
        e.config?.headers['refresh-token'],
        '\nResponse:',
        e.response,
      );
      //재요청 필요한 것
      if (response.responseCode == ApiErrorCode[401].TOKEN_UNAUTHENTICATED.name) {
        console.log('------------refreshToken needs-----------------------------------');
        requestRefreshToken(e.config!);
      }
      //로그인 화면으로 보내야 할 것
      if (response.responseCode == ApiErrorCode[403].TOKEN_UNAUTHORIZED.name) {
        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('refreshToken');
        navigation.replace('OnboardingNavigation', { screen: 'Login' });
        throw {
          name: 'UNAUTHORIZED',
          message: '로그인 세션이 만료됐습니다.',
          stack: e.stack,
        };
      }
      throw {
        name: e.response?.status.toString() ?? 'UNKNOWN_ERROR',
        message: response.responseMessage ?? '알 수 없는 오류입니다.',
        stack: e.stack,
      } as Error;
    };
    const interceptor = client.interceptors.response.use(resInterceptor, errorInterceptor);
    return () => client.interceptors.response.eject(interceptor);
  }, [navigation]);

  return <>{children}</>;
}
