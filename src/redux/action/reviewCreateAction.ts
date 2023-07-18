import ReviewResponse from '@/data/model/Profile/ReviewResponse'
import {createAsyncAction} from 'typesafe-actions'

export const REVIEW_CREATE = 'REVIEW_CREATE'
export const REVIEW_CREATE_SUCCESS = 'REVIEW_CREATE_SUCCESS'
export const REVIEW_CREATE_ERROR = 'REVIEW_CREATE_ERROR'
export const reviewCreateAsyncAction = createAsyncAction(
  REVIEW_CREATE,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_ERROR,
)<ReviewResponse, {}, Error>()
