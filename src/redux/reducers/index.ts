import {combineReducers} from 'redux'
import {loginReducer} from './loginReducer'

export class Result<T> {
  data?: T
  error?: Error
  loading?: boolean = false
  constructor(data?: T, error?: Error, loading: boolean = false) {
    this.data = data
    this.error = error
    this.loading = loading
  }
}

export class Empty {}

// 모든 Reducer를 모아 하나의 Reducer로 만들어줍니다!
const rootReducer = combineReducers({
  loginReducer
})

// 루트 리듀서를 내보내주세요.
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
