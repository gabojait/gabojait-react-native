import UserProfileBriefDto from "@/model/User/UserProfileBriefDto"
import { createAsyncAction } from "typesafe-actions"

export const INDIVIDUALS_FIND = 'INDIVIDUALS_FIND'
export const INDIVIDUALS_FIND_SUCCESS = 'INDIVIDUALS_FIND_SUCCESS'
export const INDIVIDUALS_FIND_ERROR = 'INDIVIDUALS_FIND_ERROR'
export const individualsFindAsyncAction = createAsyncAction(
    INDIVIDUALS_FIND,
    INDIVIDUALS_FIND_SUCCESS,
    INDIVIDUALS_FIND_ERROR
)<any, Array<UserProfileBriefDto>, Error>()