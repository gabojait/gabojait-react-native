import createAsyncThunk from "@/lib/createAsyncThunk";
import { asyncState, createAsyncReducer} from "@/lib/reducerUtils";
import * as teamApi from '@/api/team'
import { teamGetAsyncAction } from "../action/teamGetAction";
import { TeamGetActionType, TeamGetState } from "../action_types/teamGetActionType";
import { createReducer } from "typesafe-actions";

const initialState: TeamGetState = {
    teamGetResult: asyncState.initial(
        [
            {
                teamId: "",
                leaderUserId: "",
                projectName: "",
                projectDescription: "",
                designerTotalRecruitCnt: 0,
                backendTotalRecruitCnt: 0,
                frontendTotalRecruitCnt: 0,
                projectManagerTotalRecruitCnt: 0,
                openChatUrl: "",
                expectation: "",
                designers: [],
                backends: [],
                frontends: [
                    {
                    userId: "",
                    nickname: "",
                    position: "",
                    reviewCnt: 0,
                    rating: 0,
                    schemaVersion: "0"
                    }
                ],
                projectManagers: []
            }
        ]
    )
}

export const getTeam = createAsyncThunk(teamGetAsyncAction, teamApi.getTeams)

export const teamGetReducer = createReducer<TeamGetState, TeamGetActionType>(initialState)
    .handleAction(
        [teamGetAsyncAction.request, teamGetAsyncAction.success, teamGetAsyncAction.failure],
        createAsyncReducer(teamGetAsyncAction, 'teamGetResult')
    )