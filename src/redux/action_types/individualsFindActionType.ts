import {ActionType} from 'typesafe-actions'
import * as actions from '@/redux/action/individualsFindAction'
import {AsyncState} from '@/lib/reducerUtils'
import UserProfileBriefDto from '@/data/model/User/UserProfileBriefDto'

export type individualsFindActionType = ActionType<typeof actions>
export type IndividualsFindState = {
  individualsFindResult: AsyncState<Array<UserProfileBriefDto>, Error>
}
