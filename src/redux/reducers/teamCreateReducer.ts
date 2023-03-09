import createAsyncThunk from "@/lib/createAsyncThunk";
import { asyncState, createAsyncReducer } from "@/lib/reducerUtils";
import { teamCreateAsyncAction } from "../action/teamCreateAction";
import { TeamCreateActionType, TeamCreateState } from "../action_types/teamCreateActionType";
import * as teamApi from '@/api/team'
import { createReducer } from "typesafe-actions";

const initialState: TeamCreateState = {
    teamCreateResult: asyncState.initial()
}

export const createTeam = createAsyncThunk(teamCreateAsyncAction, teamApi.createTeam)

export const teamCreateReducer = createReducer<TeamCreateState, TeamCreateActionType>(initialState)
    .handleAction(
        [teamCreateAsyncAction.request, teamCreateAsyncAction.success, teamCreateAsyncAction.failure],
        createAsyncReducer(teamCreateAsyncAction, 'teamCreateResult')
    )