import createAsyncThunk from "@/lib/createAsyncThunk";
import { asyncState, createAsyncReducer } from "@/lib/reducerUtils";
import { createReducer } from "typesafe-actions";
import { TeamsToReviewGetActionState, TeamsToReviewGetActionType } from "../action_types/teamsToReviewGetActionType";
import * as reviewApi from '@/api/review'
import { teamsToReviewGetAsyncAction } from "../action/teamsToReviewGetAction";

const initialState: TeamsToReviewGetActionState = {
    teamsToReviewGetResult: asyncState.initial([])
}

export const getTeamsToReview = createAsyncThunk(teamsToReviewGetAsyncAction, reviewApi.getTeamsToReview)

export const teamsToReviewGetReducer = createReducer<TeamsToReviewGetActionState, TeamsToReviewGetActionType>(initialState)
.handleAction(
    [teamsToReviewGetAsyncAction.request, teamsToReviewGetAsyncAction.success, teamsToReviewGetAsyncAction.failure],
    createAsyncReducer(teamsToReviewGetAsyncAction, 'teamsToReviewGetResult')
)