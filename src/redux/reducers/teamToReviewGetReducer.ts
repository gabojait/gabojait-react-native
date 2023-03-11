import createAsyncThunk from "@/lib/createAsyncThunk";
import { asyncState, createAsyncReducer } from "@/lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import { TeamToReviewGetActionState, TeamToReviewGetActionType } from "../action_types/teamToReviewGetActionType";
import * as reviewApi from '@/api/review'
import { teamToReviewGetAsyncAction } from "../action/teamToReviewGetAction";

const initialState: TeamToReviewGetActionState = {
    teamToReviewGetResult: asyncState.initial([])
}

export const getTeamToReview = createAsyncThunk(teamToReviewGetAsyncAction, reviewApi.getTeamToReview)

export const teamToReviewGetReducer = createReducer<TeamToReviewGetActionState, TeamToReviewGetActionType>(initialState)
.handleAction(
    [teamToReviewGetAsyncAction.request, teamToReviewGetAsyncAction.success, teamToReviewGetAsyncAction.failure],
    createAsyncReducer(teamToReviewGetAsyncAction, 'teamToReviewGetResult')
)