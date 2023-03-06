import {AsyncState} from '@/lib/reducerUtils'
import {User} from '@/model/User'
import {ActionType} from 'typesafe-actions'
import * as actions from '../action/login'

export type LoginAction = ActionType<typeof actions>
export type LoginState = {
  loginResult: AsyncState<User, Error>
  user: AsyncState<User, Error>
}
