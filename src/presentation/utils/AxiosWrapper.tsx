import {ResponseWrapper} from '@/data/model/ResponseWrapper';
import client, {isSuccess} from '@/lib/axiosInstance';
import {useAppDispatch} from '@/redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {ReactNode, useEffect} from 'react';
import {RootStackNavigationProps} from '../navigation/RootNavigation';
import {ApiErrorCode} from '@/data/api/ApiErrorCode';
import React from 'react'

/**
 * @param children
 * @returns {*}
 * @constructor
 */
export default function AxiosWrapper({children}: { children: ReactNode }) {
    const navigation = useNavigation<RootStackNavigationProps>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const resInterceptor = async (res: AxiosResponse) => {
            console.info(
                `${res.config.url} \nResponsed: ${res.status}`,
                `\nResponse:`,
                res.data.responseData,
            );
            try {
                if (isSuccess(res.status)) {
                    // Todo: Interceptor에서 AsyncStorage에 item을 set 하는 것 보다 헤더의 토큰을 reducer로 전달할 방법을 찾고, 전달 받은 토큰을 반영하는 방법을 찾아야 함.
                    console.log(res.headers);
                    if (res.headers['authorization']) {
                        await AsyncStorage.setItem('accessToken', res.headers['authorization']);
                    }
                    if (res.headers['refreshToken']) {
                        await AsyncStorage.setItem('refreshToken', res.headers['refreshToken']);
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
                return {
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
            );
            //로그인 화면으로 보내야 할 것
            if (
                response.responseMessage == ApiErrorCode[401].TOKEN_UNAUTHENTICATED.name ||
                response.responseMessage == ApiErrorCode[403].TOKEN_UNAUTHORIZED.name
            ) {
                // Todo: Try token renew and logout when renew failed
                AsyncStorage.removeItem('accessToken');
                AsyncStorage.removeItem('refershToken');
                navigation.navigate('OnboardingNavigation', {screen: 'Login'});
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
