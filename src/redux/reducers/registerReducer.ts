import {loginAsyncAction} from '../action/login'

import createAsyncThunk from '@/lib/createAsyncThunk'
import {LoginAction} from '@/redux/action_types/login'
import * as accountApi from '@/api/accounts'
import {asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import {createReducer} from 'typesafe-actions'
import {RegisterAction, RegisterState} from '../action_types/register'
import {
  nicknameDupCheckAction,
  registerAsyncAction,
  usernameDupCheckAction,
} from '../action/register'

const initialState: RegisterState = {
  registerResult: asyncState.initial(),
  usernameDupCheckResult: asyncState.initial(),
  nicknameDupCheckResult: asyncState.initial(),
}

export const register = createAsyncThunk(registerAsyncAction, accountApi.register)
export const checkUsernameDuplicate = createAsyncThunk(
  registerAsyncAction,
  accountApi.checkUsernameDuplicate,
)
export const checkNicknameDuplicate = createAsyncThunk(
  registerAsyncAction,
  accountApi.checkNicknameDuplicate,
)

export const registerReducer = createReducer<RegisterState, RegisterAction>(initialState)
  .handleAction(
    [registerAsyncAction.request, registerAsyncAction.success, registerAsyncAction.failure],
    createAsyncReducer(registerAsyncAction, 'registerResult'),
  )
  .handleAction(
    [
      usernameDupCheckAction.request,
      usernameDupCheckAction.success,
      usernameDupCheckAction.failure,
    ],
    createAsyncReducer(usernameDupCheckAction, 'usernameDupCheckResult'),
  )
  .handleAction(
    [
      nicknameDupCheckAction.request,
      nicknameDupCheckAction.success,
      nicknameDupCheckAction.failure,
    ],
    createAsyncReducer(nicknameDupCheckAction, 'nicknameDupCheckResult'),
  )
