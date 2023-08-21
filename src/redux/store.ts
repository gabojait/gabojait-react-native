import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import rootReducer from './reducers'
import logger from 'redux-logger'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware().concat(logger),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
