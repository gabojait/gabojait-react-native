import {ActionType, AsyncActionCreatorBuilder, getType} from 'typesafe-actions';
import {AnyAction} from 'redux';

export type AsyncState<T, E = any> = {
  data: T | null;
  loading: boolean;
  error: E | null;
};

export const asyncState = {
  // 다음 코드는 화살표 함수에 Generic 을 설정 한 것입니다.
  initial: <T, E = any>(initialData?: T): AsyncState<T, E> => ({
    loading: false,
    data: initialData || null,
    error: null,
  }),
  loading: <T, E = any>(data?: T): AsyncState<T, E> => ({
    loading: true,
    data: data || null,
    error: null,
  }),
  success: <T, E = any>(data: T): AsyncState<T, E> => ({
    loading: false,
    data,
    error: null,
  }),
  error: <T, E>(error: E): AsyncState<T, E> => ({
    loading: false,
    data: null,
    error: error,
  }),
};

export type AnyAsyncActionCreator = AsyncActionCreatorBuilder<any, any, any>;
export function createAsyncReducer<S, AC extends AnyAsyncActionCreator, K extends keyof S>(
  asyncActionCreator: AC,
  key: K,
  successAction: ((state: S, action: ActionType<AC>) => S) | undefined = undefined,
) {
  return (state: S, action: ActionType<AC>) => {
    // 각 액션 생성함수의 type 을 추출해줍니다.
    const [request, success, failure] = [
      asyncActionCreator.request,
      asyncActionCreator.success,
      asyncActionCreator.failure,
    ].map(getType) as [AC['request'], AC['success'], AC['failure']];
    switch (action.type) {
      case request:
        return {
          ...state,
          [key]: asyncState.loading(),
        };
      case success:
        return successAction
          ? successAction(state, action)
          : {
              ...state,
              [key]: asyncState.success(action.payload),
            };
      case failure:
        return {
          ...state,
          [key]: asyncState.error(action.payload),
        };
      default:
        return state;
    }
  };
}
