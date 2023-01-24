import {createAsyncAction} from 'typesafe-actions'
import {AxiosError} from 'axios'
import {User} from '@/model/User'
import {ActionType} from 'typesafe-actions'

export interface LoginRequestDTO {
  username: string
  password: string
}

export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const loginAsyncAction = createAsyncAction(LOGIN, LOGIN_SUCCESS, LOGIN_ERROR)<
  LoginRequestDTO,
  User,
  Error
>()
