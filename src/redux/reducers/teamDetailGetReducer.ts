import createAsyncThunk from "@/lib/createAsyncThunk";
import { asyncState, createAsyncReducer } from "@/lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import { teamDetailGetAsyncAction } from "../action/teamDetailGetAction";
import { TeamDetailGetActionType, TeamDetailGetState } from "../action_types/teamDetailGetActionType";
import * as teamApi from '@/api/team'

const initialState: TeamDetailGetState = {
    teamDetailGetResult: asyncState.initial({
        backendTotalRecruitCnt: 0, 
        backends: [], 
        designerTotalRecruitCnt: 0, 
        designers: [], 
        expectation: "",
        frontendTotalRecruitCnt: 0, 
        frontends: [],
        leaderUserId: "",
        openChatUrl: "",
        projectDescription: "",
        projectManagerTotalRecruitCnt: 1,
        projectManagers: [],
        projectName: "", 
        teamId: ""
      })
}

export const getTeamDetail = createAsyncThunk(teamDetailGetAsyncAction, teamApi.getTeamDetail)

export const teamDetailGetReducer = createReducer<TeamDetailGetState, TeamDetailGetActionType>(initialState)
    .handleAction(
        [teamDetailGetAsyncAction.request, teamDetailGetAsyncAction.success, teamDetailGetAsyncAction.failure],
        createAsyncReducer(teamDetailGetAsyncAction, 'teamDetailGetResult')
    )