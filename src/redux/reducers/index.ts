import {combineReducers} from 'redux'
import boardSwitchReducer from './boardSwitchReducer'
import countReducer from './countReducer'
import {loginReducer} from './loginReducer'
import { registerReducer } from './registerReducer'

export interface Result<T> {
  data?: T
  error?: Error
  loading?: boolean
}

export class Empty {}

// 모든 Reducer를 모아 하나의 Reducer로 만들어줍니다!
const rootReducer = combineReducers({
  loginReducer,
  boardSwitchReducer,
  registerReducer,
  countReducer
})

// 루트 리듀서를 내보내주세요.
export default rootReducer
