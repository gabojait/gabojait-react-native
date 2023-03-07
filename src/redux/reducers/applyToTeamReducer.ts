import createAsyncThunk from "@/lib/createAsyncThunk";
import { asyncState, createAsyncReducer } from "@/lib/reducerUtils";
import { applyToTeamAsyncAction } from "../action/applyToTeamAction";
import { ApplyToTeamActionType, ApplyToTeamState } from "../action_types/applyToTeamActionType";
import * as teamApi from '@/api/team'
import { createReducer } from "typesafe-actions";

const initialState: ApplyToTeamState = {
    applyToTeamResult: asyncState.initial()
}

export const applyToTeam = createAsyncThunk(applyToTeamAsyncAction, teamApi.applyToTeam)

export const applyToTeamReducer = createReducer<ApplyToTeamState, ApplyToTeamActionType>(initialState)
    .handleAction(
        [applyToTeamAsyncAction.request, applyToTeamAsyncAction.success, applyToTeamAsyncAction.failure],
        createAsyncReducer(applyToTeamAsyncAction, 'applyToTeamResult')
    )