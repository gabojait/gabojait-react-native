/* eslint-disable @typescript-eslint/no-unused-vars */
import client, { axiosConfig } from '@/lib/axiosInstance';
import EmailVerifyDto from '@/data/model/EmailVerifyDto';
import LoginRequestDTO from '@/data/model/LoginRequestDto';
import RegisterRequestDto from '@/data/model/RegisterRequestDto';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { FindPasswordDto } from '@/data/model/FindPasswordDto';
import { ApiErrorCode } from '@/data/api/ApiErrorCode';

export const login = async (dto: LoginRequestDTO) => {
  // Get the device token
  const result = await client.post('user/login', { ...dto });

  console.log(result);
  return result;
};

export const getUser = async () => {
  const result = await client.get('user');
  console.log('res: ', result);
  return result;
};

export const checkUsernameDuplicate = async (username: string) => {
  const result = await client.get(`user/username?username=${username}`);
  console.log(result);
  return result;
};

export const checkNicknameDuplicate = async (nickname: string) => {
  const result = await client.get(`user/nickname?nickname=${nickname}`);
  console.log(result);
  return result;
};

export const register = async (dto: RegisterRequestDto) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + dto.emailAuthToken ?? '',
    },
    body: JSON.stringify({ ...dto, emailAuthToken: undefined }),
  };
  const result = await fetch(`${axiosConfig.baseURL}/user`, request);
  if (result.ok) {
    return result;
  } else {
    throw { name: 'TOKEN_UNAUTHORIZED', message: '승인되지 않은 요청입니다.' };
  }
};

export const sendAuthCode = async (email: string) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  };

  const result = await fetch(`${axiosConfig.baseURL}/contact`, request);
  console.log(result);
  if (result.ok && (await result.json()).responseCode === 'VERIFICATION_CODE_SENT') {
    return result.headers.get('Authorization') as string | null;
  } else {
    return null;
  }
};

export const verifyAuthCode = async (requestDto: EmailVerifyDto) => {
  const request = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + requestDto.token,
    },
    body: JSON.stringify({ ...requestDto, token: undefined }),
  };

  const result = await fetch(`${axiosConfig.baseURL}/contact`, request);
  console.log(result);
  // if (result.ok && (await result.json()).responseCode === 'EMAIL_VERIFIED')
};

export const findUserName = async (request: { email: string }) => {
  const result = await client.post('user/username', request);
  console.log(result);
  return result;
};

export const findPassword = async (request: FindPasswordDto) => {
  const result = await client.post('user/password', request);
  console.log(result);
  return result;
};

export const changePassword = async (request: { password: string; passwordReEntered: string }) => {
  const result = await client.patch('user/password', request);
  console.log(result);
  return result;
};
export const changeNickname = async (request: { nickname: string }) => {
  const result = await client.patch('user/nickname', request);
  console.log(result);
  return result;
};

export const verifyPassword = async (request: { password: string }) => {
  const result = await client.post('user/password/verify', request);
  console.log(result);
  return result;
};

export const refreshToken = async (request: { fcmToken: string }) => {
  const result = await client.post('user/token', request);
  console.log(result);
  return result;
};

export const updateNotification = async (isNotified: boolean) => {
  return await client.patch('user/notified', { isNotified: isNotified });
};
