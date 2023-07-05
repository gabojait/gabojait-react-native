import {AsyncState} from '@/lib/reducerUtils'
import Team from '@/data/model/Team/Team'
import {ActionType} from 'typesafe-actions'
import * as actions from '@/redux/action/teamDetailGetAction'

export type TeamDetailGetActionType = ActionType<typeof actions>
export type TeamDetailGetState = {
  teamDetailGetResult: AsyncState<Team, Error>
}
