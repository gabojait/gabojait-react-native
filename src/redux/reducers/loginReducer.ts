import {getUserInfoAction, loginAsyncAction} from '../action/login'

import createAsyncThunk from '@/lib/createAsyncThunk'
import {LoginAction} from '@/redux/action_types/login'
import * as accountApi from '@/data/api/accounts'
import {asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import {createReducer} from 'typesafe-actions'
import {LoginState} from '../action_types/login'

const initialState: LoginState = {loginResult: asyncState.initial(), user: asyncState.initial()}

export const login = createAsyncThunk(loginAsyncAction, accountApi.login)
export const getUser = createAsyncThunk(getUserInfoAction, accountApi.getUser)

export const loginReducer = createReducer<LoginState, LoginAction>(initialState)
  .handleAction(
    [loginAsyncAction.request, loginAsyncAction.success, loginAsyncAction.failure],
    createAsyncReducer(loginAsyncAction, 'loginResult'),
  )
  .handleAction(
    [getUserInfoAction.request, getUserInfoAction.success, getUserInfoAction.failure],
    createAsyncReducer(getUserInfoAction, 'user'),
  )
