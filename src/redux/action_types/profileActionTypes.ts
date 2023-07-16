import {AsyncState} from '@/lib/reducerUtils'
import {ActionType} from 'typesafe-actions'
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto'
import * as actions from '@/redux/action/profileActions'
import Education from '@/data/model/Profile/Education'
import WorkResponse from '@/data/model/Profile/WorkResponse'

export type ProfileAction = ActionType<typeof actions>
export type ProfileState = {
  userProfile: AsyncState<ProfileViewDto, Error>
  educations: Education[]
  works: WorkResponse[]
}
