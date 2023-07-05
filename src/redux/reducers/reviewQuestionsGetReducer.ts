import createAsyncThunk from '@/lib/createAsyncThunk'
import {asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import {createReducer} from 'typesafe-actions'
import * as reviewApi from '@/data/api/review'
import {
  ReviewQuestionsActionType,
  ReviewQuestionsState,
} from '../action_types/reviewQuestionsGetActionType'
import {reviewQuestionsAsyncAction} from '../action/reviewQuestionsGetAction'

const initialState: ReviewQuestionsState = {
  reviewQuestionsResult: asyncState.initial([]),
}

export const getReviewQuestions = createAsyncThunk(
  reviewQuestionsAsyncAction,
  reviewApi.getReviewQuestions,
)

export const reviewQuestionsGetReducer = createReducer<
  ReviewQuestionsState,
  ReviewQuestionsActionType
>(initialState).handleAction(
  [
    reviewQuestionsAsyncAction.request,
    reviewQuestionsAsyncAction.success,
    reviewQuestionsAsyncAction.failure,
  ],
  createAsyncReducer(reviewQuestionsAsyncAction, 'reviewQuestionsResult'),
)
