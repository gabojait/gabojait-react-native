import {RegisterActionType} from '../action_types/register'
interface RegisterAction {
  type: RegisterActionType.REGISTER
  // payload?: string
}

interface RegisterSuccessAction {
  type: RegisterActionType.REGISTER_SUCCESS
  payload: string
}

interface RegisterErrorAction {
  type: RegisterActionType.REGISTER_ERROR
  payload: string
}

export type RegisterActions = RegisterAction | RegisterSuccessAction | RegisterErrorAction
