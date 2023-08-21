import createAsyncThunk from '@/lib/createAsyncThunk'
import {asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import * as reviewApi from '@/data/api/review'
import {teamToReviewGetAsyncAction} from '../action/teamToReviewGetAction'
import {
  TeamToReviewGetActionState,
  TeamToReviewGetActionType,
} from '../action_types/teamToReviewGetActionType'
import {createReducer} from 'typesafe-actions'

const initialState: TeamToReviewGetActionState = {
  teamToReviewGetResult: asyncState.initial(),
}

export const getTeamToReview = createAsyncThunk(
  teamToReviewGetAsyncAction,
  reviewApi.getTeamToReview,
)

export const teamToReviewGetReducer = createReducer<
  TeamToReviewGetActionState,
  TeamToReviewGetActionType
>(initialState).handleAction(
  [
    teamToReviewGetAsyncAction.request,
    teamToReviewGetAsyncAction.success,
    teamToReviewGetAsyncAction.failure,
  ],
  createAsyncReducer(teamToReviewGetAsyncAction, 'teamToReviewGetResult'),
)
