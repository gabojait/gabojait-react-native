import ProfileViewDto from "@/model/Profile/ProfileViewDto"
import { createAsyncAction } from "typesafe-actions"

export const PROFILE_GET = 'PROFILE_GET'
export const PROFILE_GET_SUCCESS = 'PROFILE_GET_SUCCESS'
export const PROFILE_GET_ERROR = 'PROFILE_GET_ERROR'
export const profileGetAsyncAction = createAsyncAction(
    PROFILE_GET,
    PROFILE_GET_SUCCESS,
    PROFILE_GET_ERROR
)<null, ProfileViewDto, Error>()