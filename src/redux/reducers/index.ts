import {combineReducers} from 'redux'
import boardSwitchReducer from './boardSwitchReducer'
import {loginReducer} from './loginReducer'
import {registerReducer} from './registerReducer'
import {teamCreateReducer} from './teamCreateReducer'
import {teamGetReducer} from './teamGetReducer'
import {teamDetailGetReducer} from './teamDetailGetReducer'
import {applyToTeamReducer} from './applyToTeamReducer'
import {individualsFindReducer} from './individualsFindReducer'
import {teamsToReviewGetReducer} from './teamsToReviewGetReducer'
import {reviewQuestionsGetReducer} from './reviewQuestionsGetReducer'
import {profileReducer} from './profileReducer'
import { teamToReviewGetReducer } from './teamToReviewGetReducer'
import { reviewCreateReducer } from './reviewCreateReducer' 
import { profileGetReducer } from './profileGetReducer'

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
  teamCreateReducer,
  teamGetReducer,
  teamDetailGetReducer,
  applyToTeamReducer,
  individualsFindReducer,
  teamsToReviewGetReducer,
  reviewQuestionsGetReducer,
  teamToReviewGetReducer,
  reviewCreateReducer,
  profileGetReducer,
  profileReducer,
})

// 루트 리듀서를 내보내주세요.
export default rootReducer
