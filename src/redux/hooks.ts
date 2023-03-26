import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {RootState, AppDispatch} from './store'
import rootReducer from './reducers'
import React from 'react'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useData = (stateSelector: (state: RootState) => any) => {
  const result = useAppSelector(stateSelector)
  return {
    ...result,
    isSuccess: !result.loading && result.data && !result.error,
    isError: !result.loading && !result.data && result.error,
  }
}
