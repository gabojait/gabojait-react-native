import {AsyncState} from '@/lib/reducerUtils'
import {User} from '@/data/model/User'
import {ActionType} from 'typesafe-actions'
import * as actions from '@/redux/action/register'

export type RegisterAction = ActionType<typeof actions>
export type RegisterState = {
  registerResult: AsyncState<User, Error>
  usernameDupCheckResult: AsyncState<Boolean, Error>
  nicknameDupCheckResult: AsyncState<Boolean, Error>
  sendAuthCodeResult: AsyncState<Boolean, Error>
  verifyAuthCodeResult: AsyncState<Boolean, Error>
}
