import { ActionType } from "typesafe-actions"
import * as actions from '@/redux/action/profileGetAction'
import { AsyncState } from "@/lib/reducerUtils"
import ProfileViewDto from "@/model/Profile/ProfileViewDto"

export type ProfileGetAsyncActionType = ActionType<typeof actions>
export type ProfileGetState = {
    profileGetResult: AsyncState<ProfileViewDto, Error>
}
