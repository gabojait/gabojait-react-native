import { SIGN_OUT, getUserInfoAction, loginAsyncAction } from '../action/login';

import createAsyncThunk from '@/lib/createAsyncThunk';
import { LoginAction } from '@/redux/action_types/login';
import { asyncState, createAsyncReducer } from '@/lib/reducerUtils';
import { createReducer } from 'typesafe-actions';
import { LoginState } from '../action_types/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: LoginState = { loginResult: asyncState.initial(), user: asyncState.initial() };

export const loginReducer = createReducer<LoginState, LoginAction>(initialState, {
  [SIGN_OUT]: (state, action) => {
    AsyncStorage.setItem('accessToken', '');
    AsyncStorage.setItem('refreshToken', '');
    return {
      ...state,
      user: asyncState.initial(),
      loginResult: asyncState.initial(),
    };
  },
})
  .handleAction(
    [loginAsyncAction.request, loginAsyncAction.success, loginAsyncAction.failure],
    createAsyncReducer(loginAsyncAction, 'loginResult'),
  )
  .handleAction(
    [getUserInfoAction.request, getUserInfoAction.success, getUserInfoAction.failure],
    createAsyncReducer(getUserInfoAction, 'user'),
  );
