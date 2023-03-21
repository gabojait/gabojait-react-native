import {AsyncState} from '@/lib/reducerUtils'
import {ActionType} from 'typesafe-actions'
import ProfileViewDto from '@/model/Profile/ProfileViewDto'
import * as actions from '@/redux/action/profileActions'

export type ProfileAction = ActionType<typeof actions>
export type ProfileState = {
  userProfile: AsyncState<ProfileViewDto, Error>
}
