import RegisterRequestDto from '@/model/RegisterRequestDto'
import {User} from '@/model/User'
import {createAsyncAction} from 'typesafe-actions'

export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'
export const registerAsyncAction = createAsyncAction(REGISTER, REGISTER_SUCCESS, REGISTER_ERROR)<
  RegisterRequestDto,
  User,
  Error
>()

export const USERNAME_DUP_CHECK = 'USERNAME_DUP_CHECK'
export const USERNAME_DUP_CHECK_SUCCESS = 'USERNAME_DUP_CHECK_SUCCESS'
export const USERNAME_DUP_CHECK_ERROR = 'USERNAME_DUP_CHECK_ERROR'
export const usernameDupCheckAction = createAsyncAction(
  USERNAME_DUP_CHECK,
  USERNAME_DUP_CHECK_SUCCESS,
  USERNAME_DUP_CHECK_ERROR,
)<string, Boolean, Error>()

export const NICKNAME_DUP_CHECK = 'NICKNAME_DUP_CHECK'
export const NICKNAME_DUP_CHECK_SUCCESS = 'NICKNAME_DUP_CHECK_SUCCESS'
export const NICKNAME_DUP_CHECK_ERROR = 'NICKNAME_DUP_CHECK_ERROR'
export const nicknameDupCheckAction = createAsyncAction(
  NICKNAME_DUP_CHECK,
  NICKNAME_DUP_CHECK_SUCCESS,
  NICKNAME_DUP_CHECK_ERROR,
)<string, Boolean, Error>()
