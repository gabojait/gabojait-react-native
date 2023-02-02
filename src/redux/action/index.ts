import {LoginActions} from './login'
import { RegisterActions } from './register'
import  {BoardSwitchActions} from '@/redux/action/boardSwitchActions'
import { CountActions } from '@/redux/action/countActions'
export type Action = LoginActions | RegisterActions | BoardSwitchActions | CountActions