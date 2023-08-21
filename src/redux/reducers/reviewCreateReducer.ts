import createAsyncThunk from '@/lib/createAsyncThunk'
import {asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import {reviewCreateAsyncAction} from '../action/reviewCreateAction'
import {ReviewCreateActionType, ReviewCreateState} from '../action_types/reviewCreateActionType'
import * as reviewApi from '@/data/api/review'
import {createReducer} from 'typesafe-actions'

const initialState: ReviewCreateState = {
  reviewCreateResult: asyncState.initial(),
}

export const createReview = createAsyncThunk(reviewCreateAsyncAction, reviewApi.createReview)

export const reviewCreateReducer = createReducer<ReviewCreateState, ReviewCreateActionType>(
  initialState,
).handleAction(
  [
    reviewCreateAsyncAction.request,
    reviewCreateAsyncAction.success,
    reviewCreateAsyncAction.failure,
  ],
  createAsyncReducer(reviewCreateAsyncAction, 'reviewCreateResult'),
)
