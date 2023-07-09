import ReviewQuestions from '@/data/model/Review/ReviewQuestion'
import {createAsyncAction} from 'typesafe-actions'

export const REVIEW_QUESTIONS = 'REVIEW_QUESTION'
export const REVIEW_QUESTIONS_SUCCESS = 'REVIEW_QUESTION_SUCCESS'
export const REVIEW_QUESTIONS_ERROR = 'REVIEW_QUESTION_ERROR'
export const reviewQuestionsAsyncAction = createAsyncAction(
  REVIEW_QUESTIONS,
  REVIEW_QUESTIONS_SUCCESS,
  REVIEW_QUESTIONS_ERROR,
)<null, Array<ReviewQuestions>, Error>()
