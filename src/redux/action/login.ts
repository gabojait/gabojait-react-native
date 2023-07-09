import {createAsyncAction} from 'typesafe-actions'
import {AxiosError} from 'axios'
import {User} from '@/data/model/User'
import {ActionType} from 'typesafe-actions'
import LoginRequestDTO from '@/data/model/LoginRequestDto'

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const loginAsyncAction = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_ERROR)<
  LoginRequestDTO,
  User,
  Error
>()

export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR'
export const getUserInfoAction = createAsyncAction(
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
)<null, Boolean, Error>()
