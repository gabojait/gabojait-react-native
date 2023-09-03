import { SIGN_OUT, getUserInfoAction, loginAsyncAction, SET_TOKEN } from '../action/login';

import createAsyncThunk from '@/lib/createAsyncThunk';
import { LoginAction } from '@/redux/action_types/login';
import { asyncState, createAsyncReducer } from '@/lib/reducerUtils';
import { createReducer } from 'typesafe-actions';
import { LoginState } from '../action_types/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '@/lib/asyncStorageKey';

const initialState: LoginState = { loginResult: asyncState.initial(), user: asyncState.initial() };

export const loginReducer = createReducer<LoginState, LoginAction>(initialState, {
  [SIGN_OUT]: (state, action) => {
    AsyncStorage.removeItem(AsyncStorageKey.accessToken);
    AsyncStorage.removeItem(AsyncStorageKey.refreshToken);
    return {
      ...state,
      user: asyncState.initial(),
      loginResult: asyncState.initial(),
    };
  },
  [SET_TOKEN]: (state, action) => {
    AsyncStorage.setItem(AsyncStorageKey.accessToken, action.payload.accessToken);
    AsyncStorage.setItem(AsyncStorageKey.refreshToken, action.payload?.refreshToken ?? '');
    return {
      ...state,
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
