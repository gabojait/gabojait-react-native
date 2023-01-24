import {Empty, Result} from './index'
import {Action} from '../action'
import {loginAsyncAction, LoginRequestDTO} from '../action/login'

import createAsyncThunk from '@/lib/createAsyncThunk'
import {LoginAction} from '@/redux/action_types/login'
import {LOGIN, LOGIN_SUCCESS, LOGIN_ERROR} from '@/redux/action/login'
import * as loginApi from '@/api/login'
import {AsyncState, asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import {User} from '@/model/User'
import {createReducer} from 'typesafe-actions'
import {LoginState} from '../action_types/login'

const initialState: LoginState = {loginResult: asyncState.initial()}

export const login = createAsyncThunk(loginAsyncAction, loginApi.login)

export const loginReducer = createReducer<LoginState, LoginAction>(initialState).handleAction(
  [loginAsyncAction.request, loginAsyncAction.success, loginAsyncAction.failure],
  createAsyncReducer(loginAsyncAction, 'loginResult'),
)
