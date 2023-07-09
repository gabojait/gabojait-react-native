import {ActionType} from 'typesafe-actions'
import * as actions from '@/redux/action/teamToReviewGetAction'
import TeamBriefDto from '@/data/model/Team/TeamBriefDto'
import {AsyncState} from '@/lib/reducerUtils'

export type TeamToReviewGetActionType = ActionType<typeof actions>
export type TeamToReviewGetActionState = {
  teamToReviewGetResult: AsyncState<TeamBriefDto, Error>
}
