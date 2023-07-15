import {loginAsyncAction} from '../action/login';

import createAsyncThunk from '@/lib/createAsyncThunk';
import {LoginAction} from '@/redux/action_types/login';
import * as accountApi from '@/data/api/accounts';
import {asyncState, createAsyncReducer} from '@/lib/reducerUtils';
import {createReducer} from 'typesafe-actions';
import {RegisterAction, RegisterState} from '../action_types/register';
import {getType} from 'typesafe-actions';
import {
  nicknameDupCheckAction,
  registerAsyncAction,
  sendAuthCodeAction,
  usernameDupCheckAction,
  verifyAuthCodeAction,
} from '@/redux/action/register';

const initialState: RegisterState = {
  registerResult: asyncState.initial(),
  usernameDupCheckResult: asyncState.initial(),
  nicknameDupCheckResult: asyncState.initial(),
  sendAuthCodeResult: asyncState.initial(),
  verifyAuthCodeResult: asyncState.initial(),
};

export const register = createAsyncThunk(registerAsyncAction, accountApi.register);
export const checkUsernameDuplicate = createAsyncThunk(
  usernameDupCheckAction,
  accountApi.checkUsernameDuplicate,
);
export const checkNicknameDuplicate = createAsyncThunk(
  nicknameDupCheckAction,
  accountApi.checkNicknameDuplicate,
);
export const sendAuthCode = createAsyncThunk(sendAuthCodeAction, accountApi.sendAuthCode);
export const verifyAuthCode = createAsyncThunk(verifyAuthCodeAction, accountApi.verifyAuthCode);

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
  .handleAction(
    [sendAuthCodeAction.request, sendAuthCodeAction.success, sendAuthCodeAction.failure],
    createAsyncReducer(sendAuthCodeAction, 'sendAuthCodeResult'),
  )
  .handleAction(
    [verifyAuthCodeAction.request, verifyAuthCodeAction.success, verifyAuthCodeAction.failure],
    createAsyncReducer(verifyAuthCodeAction, 'verifyAuthCodeResult'),
  );
