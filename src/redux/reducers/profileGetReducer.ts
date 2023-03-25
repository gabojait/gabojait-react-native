import createAsyncThunk from "@/lib/createAsyncThunk";
import { asyncState, createAsyncReducer } from "@/lib/reducerUtils";
import { profileGetAsyncAction } from "../action/profileGetAction";
import { ProfileGetAsyncActionType, ProfileGetState } from "../action_types/profileGetActionType";
import * as profileApi from '@/api/profile'
import { createReducer } from "typesafe-actions";

const initialState: ProfileGetState = {
    profileGetResult: asyncState.initial()
}

export const getProfile = createAsyncThunk(profileGetAsyncAction, profileApi.getProfile)

export const profileGetReducer = createReducer<ProfileGetState, ProfileGetAsyncActionType>(initialState)
    .handleAction(
        [profileGetAsyncAction.request, profileGetAsyncAction.success, profileGetAsyncAction.failure],
        createAsyncReducer(profileGetAsyncAction, 'profileGetResult')
    )